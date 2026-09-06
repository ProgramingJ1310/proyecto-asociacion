/* ==================================================
   NAVBAR
================================================== */

const navbar =
    document.querySelector(".navbar-asociacion");

const hero =
    document.querySelector(".hero");


/* ==================================================
   CAMBIAR NAVBAR AL HACER SCROLL
================================================== */

function cambiarNavbar() {

    if (!navbar || !hero) {
        return;
    }


    const finalHero =
        hero.offsetHeight - navbar.offsetHeight;


    if (window.scrollY >= finalHero) {

        navbar.classList.add("navbar-scroll");

    } else {

        navbar.classList.remove("navbar-scroll");

    }

}


window.addEventListener(
    "scroll",
    cambiarNavbar
);


cambiarNavbar();