/* ==================================================
   NAVBAR
================================================== */

const navbar =
    document.querySelector(".navbar-asociacion");

const hero =
    document.querySelector(".hero");

const menuSubmenus = {
    Nosotros: [
        { label: "Quiénes Somos", href: "quienes-somos.html" },
        { label: "Nuestra Historia", href: "historia.html" },
        {
            label: "Información Legal",
            href: "legal.html",
            children: [
                { label: "Partida Registral", href: "partida-registral.html" },
                { label: "Habilitación Urbana", href: "habilitacion-urbana.html" },
                { label: "Estudio de Suelos", href: "estudio-suelos.html" },
                { label: "Cambio de Uso", href: "cambio-uso.html" }
            ]
        }
    ],
    Proyectos: [
        { label: "Centro Recreacional", href: "centro-recreacional.html" },
        { label: "Proyecto de Electrificación", href: "electrificacion.html" },
        { label: "Habilitación Urbana", href: "habilitacion-urbana.html" }
    ]
};

function createSubmenu(items, parentLabel) {
    const submenu = document.createElement("ul");
    submenu.className = "submenu-navegacion";

    items.forEach((item, index) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");

        link.href = item.href;
        link.textContent = item.label;
        listItem.append(link);

        if (item.children) {
            const submenuId = `submenu-${parentLabel.toLowerCase()}-${index}`;
            const toggle = document.createElement("button");

            listItem.classList.add("tiene-submenu");
            toggle.type = "button";
            toggle.className = "submenu-alternar";
            toggle.setAttribute("aria-label", `Mostrar opciones de ${item.label}`);
            toggle.setAttribute("aria-haspopup", "true");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-controls", submenuId);
            const nestedSubmenu = createSubmenu(item.children, item.label);
            nestedSubmenu.id = submenuId;
            listItem.append(toggle);
            listItem.append(nestedSubmenu);
            listItem.addEventListener("pointerenter", (event) => {
                if (event.pointerType === "mouse") {
                    setSubmenuState(listItem, true);
                }
            });
            listItem.addEventListener("pointerleave", (event) => {
                if (event.pointerType === "mouse") {
                    setSubmenuState(listItem, false);
                }
            });
            listItem.addEventListener("focusout", (event) => {
                if (!listItem.contains(event.relatedTarget)) {
                    setSubmenuState(listItem, false);
                }
            });
            toggle.addEventListener("click", () => {
                setSubmenuState(listItem, !listItem.classList.contains("submenu-abierto"));
            });
        }

        submenu.append(listItem);
    });

    return submenu;
}

function setSubmenuState(listItem, isOpen) {
    const toggle = listItem.querySelector(":scope > .submenu-alternar");

    listItem.classList.toggle("submenu-abierto", isOpen);

    if (toggle) {
        toggle.setAttribute("aria-expanded", String(isOpen));
    }

    if (!isOpen) {
        listItem.querySelectorAll(".submenu-abierto").forEach((nestedItem) => {
            nestedItem.classList.remove("submenu-abierto");
            nestedItem.querySelector(":scope > .submenu-alternar")
                ?.setAttribute("aria-expanded", "false");
        });
    }
}

function initializeDropdownNavigation() {
    const menu = document.querySelector("#menuPrincipal .navbar-nav");

    if (!menu) {
        return;
    }

    Object.entries(menuSubmenus).forEach(([label, items]) => {
        const link = Array.from(menu.querySelectorAll(":scope > .nav-item > .nav-link"))
            .find((item) => item.textContent.trim() === label);
        const listItem = link?.parentElement;

        if (!link || !listItem || listItem.querySelector(":scope > .submenu-navegacion")) {
            return;
        }

        if (label === "Nosotros") {
            link.href = "quienes-somos.html";
        }

        const toggle = document.createElement("button");
        const submenuId = `submenu-${label.toLowerCase()}`;

        listItem.classList.add("item-con-submenu");
        toggle.type = "button";
        toggle.className = "submenu-alternar";
        toggle.setAttribute("aria-label", `Mostrar opciones de ${label}`);
        toggle.setAttribute("aria-haspopup", "true");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-controls", submenuId);
        link.insertAdjacentElement("afterend", toggle);

        const submenu = createSubmenu(items, label);
        submenu.id = submenuId;
        listItem.append(submenu);

        listItem.addEventListener("pointerenter", (event) => {
            if (event.pointerType === "mouse") {
                setSubmenuState(listItem, true);
            }
        });

        listItem.addEventListener("pointerleave", (event) => {
            if (event.pointerType === "mouse") {
                setSubmenuState(listItem, false);
            }
        });

        listItem.addEventListener("focusout", (event) => {
            if (!listItem.contains(event.relatedTarget)) {
                setSubmenuState(listItem, false);
            }
        });

        toggle.addEventListener("click", () => {
            const isOpen = !listItem.classList.contains("submenu-abierto");

            menu.querySelectorAll(":scope > .item-con-submenu.submenu-abierto")
                .forEach((openItem) => setSubmenuState(openItem, false));
            setSubmenuState(listItem, isOpen);
        });
    });

    document.addEventListener("click", (event) => {
        if (!menu.contains(event.target)) {
            menu.querySelectorAll(".item-con-submenu.submenu-abierto")
                .forEach((listItem) => setSubmenuState(listItem, false));
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            menu.querySelectorAll(".item-con-submenu.submenu-abierto")
                .forEach((listItem) => {
                    setSubmenuState(listItem, false);
                    listItem.querySelector(":scope > .submenu-alternar")?.focus();
                });
        }
    });
}


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
initializeDropdownNavigation();