/* ==================================================
   VISOR DE GALERIA
================================================== */

const itemsGaleriaIndex =
    document.querySelectorAll(
        ".galeria-inicio .galeria-item, .galeria .galeria-item"
    );

const visorImagen =
    document.getElementById("visorImagen");

const imagenAmpliada =
    document.getElementById("imagenAmpliada");

const tituloImagen =
    document.getElementById("tituloImagen");

const cerrarVisor =
    document.getElementById("cerrarVisor");


/* ==================================================
   ABRIR IMAGEN
================================================== */

itemsGaleriaIndex.forEach((item) => {

    item.addEventListener("click", (evento) => {

        evento.preventDefault();


        const imagen =
            item.querySelector("img");

        const rutaImagen =
            item.dataset.imagen || imagen?.getAttribute("src");

        const titulo =
            item.dataset.titulo || imagen?.alt || "Imagen de la galeria";


        if (!rutaImagen) {

            return;

        }


        imagenAmpliada.src =
            rutaImagen;

        imagenAmpliada.alt =
            titulo;

        tituloImagen.textContent =
            titulo;


        visorImagen.classList.add(
            "activo"
        );


        document.body.style.overflow =
            "hidden";

    });

});


/* ==================================================
   CERRAR VISOR
================================================== */

function cerrarImagen() {

    visorImagen.classList.remove(
        "activo"
    );

    document.body.style.overflow =
        "";

}


/* BOTÓN X */

cerrarVisor.addEventListener(
    "click",
    cerrarImagen
);


/* CLICK FUERA */

visorImagen.addEventListener(
    "click",
    (evento) => {

        if (evento.target === visorImagen) {

            cerrarImagen();

        }

    }
);


/* TECLA ESC */

document.addEventListener(
    "keydown",
    (evento) => {

        if (
            evento.key === "Escape" &&
            visorImagen.classList.contains("activo")
        ) {

            cerrarImagen();

        }

    }
);