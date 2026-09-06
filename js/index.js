/* ==================================================
   VISOR DE GALERÍA DEL INDEX
================================================== */

const itemsGaleriaIndex =
    document.querySelectorAll(".galeria-inicio .galeria-item");

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


        const rutaImagen =
            item.dataset.imagen;

        const titulo =
            item.dataset.titulo;


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