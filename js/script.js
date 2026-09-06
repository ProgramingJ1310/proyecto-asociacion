console.log("Página cargada correctamente");


/* =========================================
   GALERÍA
========================================= */

const botonesCategoria = document.querySelectorAll(".categorias .btn");
const fotosGaleria = document.querySelectorAll(".galeria-item");

botonesCategoria.forEach((boton) => {

    boton.addEventListener("click", () => {

        const categoriaSeleccionada = boton.dataset.categoria;

        botonesCategoria.forEach((botonCategoria) => {
            botonCategoria.classList.remove("active");
        });

        boton.classList.add("active");

        fotosGaleria.forEach((foto) => {

            const categoriaFoto = foto.dataset.categoria;

            const mostrarFoto =
                categoriaSeleccionada === "todas" ||
                categoriaSeleccionada === categoriaFoto;

            foto.classList.toggle("d-none", !mostrarFoto);

        });

    });

});


/* =========================================
   ANIMACIONES AL HACER SCROLL
========================================= */

const elementosAnimados = document.querySelectorAll(
    ".animar, .animar-izquierda, .animar-derecha"
);

const observer = new IntersectionObserver((entradas) => {

    entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
        }

    });

}, {
    threshold: 0.15
});

elementosAnimados.forEach((elemento) => {
    observer.observe(elemento);
});


/* =========================================
   INICIAR PÁGINA DESDE ARRIBA
========================================= */

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
    });

});


/* =========================================
   NAVBAR SEGÚN EL HERO
========================================= */

const navbar = document.querySelector(".navbar-asociacion");
const hero = document.querySelector(".hero");

function cambiarNavbar() {

    if (!navbar || !hero) {
        return;
    }

    const finalHero = hero.offsetHeight - navbar.offsetHeight;

    if (window.scrollY >= finalHero) {

        navbar.classList.add("navbar-scroll");

    } else {

        navbar.classList.remove("navbar-scroll");

    }

}

window.addEventListener("scroll", cambiarNavbar);

cambiarNavbar();


/* =========================================
   LIGHTBOX GALERIA - INICIO
========================================= */

const lightboxGaleria = document.querySelector("#lightboxGaleria");
const lightboxImagen = document.querySelector("#lightboxImagen");
const lightboxTitulo = document.querySelector("#lightboxTitulo");
const lightboxCerrar = document.querySelector(".lightbox-cerrar");
const imagenesInicioGaleria = document.querySelectorAll(
    ".galeria-inicio .galeria-item"
);

function cerrarLightboxGaleria() {

    if (!lightboxGaleria) {
        return;
    }

    lightboxGaleria.classList.remove("activo");
    lightboxGaleria.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-abierto");

}

imagenesInicioGaleria.forEach((imagen) => {

    imagen.addEventListener("click", (evento) => {

        if (!lightboxGaleria || !lightboxImagen || !lightboxTitulo) {
            return;
        }

        evento.preventDefault();

        const rutaImagen = imagen.dataset.imagen;
        const tituloImagen = imagen.dataset.titulo;
        const textoAlternativo = imagen.querySelector("img")?.alt || tituloImagen;

        lightboxImagen.src = rutaImagen;
        lightboxImagen.alt = textoAlternativo;
        lightboxTitulo.textContent = tituloImagen;

        lightboxGaleria.classList.add("activo");
        lightboxGaleria.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-abierto");

    });

});

if (lightboxCerrar) {
    lightboxCerrar.addEventListener("click", cerrarLightboxGaleria);
}

if (lightboxGaleria) {
    lightboxGaleria.addEventListener("click", (evento) => {

        if (evento.target === lightboxGaleria) {
            cerrarLightboxGaleria();
        }

    });
}

document.addEventListener("keydown", (evento) => {

    if (evento.key === "Escape") {
        cerrarLightboxGaleria();
    }

});

/* ==================================================
   FORMULARIO DE CONTACTO
================================================== */

const formularioContacto =
    document.getElementById("formContacto");

const mensajeContacto =
    document.getElementById("mensaje");

const contadorCaracteres =
    document.getElementById("contadorCaracteres");


/* ==================================================
   CONTADOR DEL MENSAJE
================================================== */

if (mensajeContacto && contadorCaracteres) {

    mensajeContacto.addEventListener("input", () => {

        contadorCaracteres.textContent =
            mensajeContacto.value.length;

    });

}


/* ==================================================
   ENVIAR FORMULARIO
================================================== */

if (formularioContacto) {

    formularioContacto.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            /* OBTENER DATOS */

            const nombre =
                document.getElementById("nombre").value.trim();

            const telefono =
                document.getElementById("telefono").value.trim();

            const correo =
                document.getElementById("correo").value.trim();

            const asunto =
                document.getElementById("asunto").value;

            const mensaje =
                document.getElementById("mensaje").value.trim();


            /* ==================================================
               VALIDACIÓN
            ================================================== */

            if (nombre.length < 3) {

                alert(
                    "Por favor ingresa tu nombre completo."
                );

                return;
            }


            const telefonoValido =
                /^[0-9]{9}$/;

            if (!telefonoValido.test(telefono)) {

                alert(
                    "El teléfono debe contener 9 números."
                );

                return;
            }


            if (asunto === "") {

                alert(
                    "Selecciona el motivo de tu consulta."
                );

                return;
            }


            if (mensaje.length < 10) {

                alert(
                    "Escribe un mensaje de al menos 10 caracteres."
                );

                return;
            }


            /* ==================================================
               CREAR MENSAJE DE WHATSAPP
            ================================================== */

            const textoWhatsApp =
`Hola, quisiera realizar una consulta a la Asociación de Vivienda Virgen de Loreto.

Nombre: ${nombre}
Teléfono: ${telefono}
Correo: ${correo || "No indicado"}
Motivo: ${asunto}

Mensaje:
${mensaje}`;


            /* NÚMERO DE LA ASOCIACIÓN */

            const numeroWhatsApp =
                "51908912426";


            /* CREAR URL */

            const urlWhatsApp =
                "https://wa.me/" +
                numeroWhatsApp +
                "?text=" +
                encodeURIComponent(textoWhatsApp);


            /* ABRIR WHATSAPP */

            window.open(
                urlWhatsApp,
                "_blank"
            );

        }
    );

}


/* ==================================================
   ELEMENTOS DEL LOGIN
================================================== */

const formLogin = document.getElementById("formLogin");

const inputDni = document.getElementById("dni");
const inputPassword = document.getElementById("password");

const errorDni = document.getElementById("errorDni");
const errorPassword = document.getElementById("errorPassword");

const mostrarPassword = document.getElementById("mostrarPassword");
const iconoPassword = document.getElementById("iconoPassword");

const loginMensaje = document.getElementById("loginMensaje");


/* ==================================================
   MOSTRAR / OCULTAR CONTRASEÑA
================================================== */

mostrarPassword.addEventListener("click", () => {

    if (inputPassword.type === "password") {

        inputPassword.type = "text";

        iconoPassword.classList.remove("bi-eye");
        iconoPassword.classList.add("bi-eye-slash");

    } else {

        inputPassword.type = "password";

        iconoPassword.classList.remove("bi-eye-slash");
        iconoPassword.classList.add("bi-eye");

    }

});


/* ==================================================
   PERMITIR SOLO NÚMEROS EN DNI
================================================== */

inputDni.addEventListener("input", () => {

    inputDni.value =
        inputDni.value.replace(/\D/g, "");

});


/* ==================================================
   VALIDAR FORMULARIO
================================================== */

formLogin.addEventListener("submit", (evento) => {

    evento.preventDefault();


    /* LIMPIAR MENSAJES ANTERIORES */

    errorDni.textContent = "";
    errorPassword.textContent = "";
    loginMensaje.textContent = "";


    const dni = inputDni.value.trim();

    const password = inputPassword.value.trim();

    let formularioValido = true;


    /* ==================================================
       VALIDAR DNI
    ================================================== */

    if (dni === "") {

        errorDni.textContent =
            "Ingresa tu DNI.";

        formularioValido = false;

    } else if (dni.length !== 8) {

        errorDni.textContent =
            "El DNI debe tener 8 dígitos.";

        formularioValido = false;

    }


    /* ==================================================
       VALIDAR CONTRASEÑA
    ================================================== */

    if (password === "") {

        errorPassword.textContent =
            "Ingresa tu contraseña.";

        formularioValido = false;

    }


    /* ==================================================
       SI LOS DATOS SON VÁLIDOS
    ================================================== */

    if (formularioValido) {

        loginMensaje.textContent =
            "Datos completados correctamente.";

        loginMensaje.classList.add("correcto");

        /*
           MÁS ADELANTE:

           Aquí enviaremos el DNI y la contraseña
           al backend para verificar al socio.

           NO validaremos contraseñas reales
           directamente en JavaScript.
        */

    }

});