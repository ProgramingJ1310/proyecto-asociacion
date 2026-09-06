/* ==================================================
   ANIMACIONES AL HACER SCROLL
================================================== */

const elementosAnimados =
    document.querySelectorAll(
        ".animar, .animar-izquierda, .animar-derecha"
    );


const observer =
    new IntersectionObserver(

        (entradas) => {

            entradas.forEach((entrada) => {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add(
                        "visible"
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


elementosAnimados.forEach((elemento) => {

    observer.observe(elemento);

});