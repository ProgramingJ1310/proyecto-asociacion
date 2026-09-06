/* ==================================================
   PORTAL DEL SOCIO
================================================== */

const sidebar = document.getElementById("portalSidebar");
const botonMenu = document.getElementById("abrirMenu");


/* ==================================================
   ABRIR / CERRAR SIDEBAR EN MÓVIL
================================================== */

if (sidebar && botonMenu) {

    botonMenu.addEventListener("click", () => {

        sidebar.classList.toggle("activo");

        const menuAbierto =
            sidebar.classList.contains("activo");

        botonMenu.setAttribute(
            "aria-expanded",
            menuAbierto
        );

    });

}


/* ==================================================
   CERRAR SIDEBAR AL PRESIONAR UN ENLACE
   SOLO EN PANTALLAS PEQUEÑAS
================================================== */

const enlacesSidebar =
    document.querySelectorAll(".sidebar-link");


enlacesSidebar.forEach((enlace) => {

    enlace.addEventListener("click", () => {

        if (window.innerWidth <= 900 && sidebar) {

            sidebar.classList.remove("activo");

            if (botonMenu) {

                botonMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    });

});


/* ==================================================
   CERRAR SIDEBAR CON ESC
================================================== */

document.addEventListener("keydown", (evento) => {

    if (evento.key === "Escape" && sidebar) {

        sidebar.classList.remove("activo");

        if (botonMenu) {

            botonMenu.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }

});


/* ==================================================
   CORREGIR SIDEBAR AL CAMBIAR TAMAÑO DE PANTALLA
================================================== */

window.addEventListener("resize", () => {

    if (window.innerWidth > 900 && sidebar) {

        sidebar.classList.remove("activo");

        if (botonMenu) {

            botonMenu.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }

});