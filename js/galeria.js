/* ==================================================
   GALERÍA
================================================== */

const botonesCategoria =
    document.querySelectorAll(
        ".categorias .btn"
    );


const fotosGaleria =
    document.querySelectorAll(
        ".galeria-item"
    );


botonesCategoria.forEach((boton) => {

    boton.addEventListener(
        "click",
        () => {


            /* OBTENER CATEGORÍA */

            const categoriaSeleccionada =
                boton.dataset.categoria;


            /* QUITAR ACTIVE */

            botonesCategoria.forEach(
                (botonCategoria) => {

                    botonCategoria.classList.remove(
                        "active"
                    );

                }
            );


            /* ACTIVAR BOTÓN */

            boton.classList.add(
                "active"
            );


            /* FILTRAR FOTOS */

            fotosGaleria.forEach((foto) => {

                const categoriaFoto =
                    foto.dataset.categoria;


                const mostrarFoto =

                    categoriaSeleccionada === "todas"

                    ||

                    categoriaSeleccionada === categoriaFoto;


                foto.classList.toggle(
                    "d-none",
                    !mostrarFoto
                );

            });

        }
    );

});