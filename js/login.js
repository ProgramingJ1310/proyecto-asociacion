const formLogin = document.getElementById("formLogin");

const inputUsuario = document.getElementById("dni");
const inputPassword = document.getElementById("password");

const errorUsuario = document.getElementById("errorDni");
const errorPassword = document.getElementById("errorPassword");

const loginMensaje = document.getElementById("loginMensaje");

formLogin.addEventListener("submit", (evento) => {

    evento.preventDefault();

    errorUsuario.textContent = "";
    errorPassword.textContent = "";
    loginMensaje.textContent = "";

    const usuario = inputUsuario.value.trim();
    const password = inputPassword.value.trim();


    if (usuario === "") {

        errorUsuario.textContent =
            "Ingresa tu usuario.";

        return;
    }


    if (password === "") {

        errorPassword.textContent =
            "Ingresa tu contraseña.";

        return;
    }


    /* LOGIN TEMPORAL DE PRUEBA */

    if (
        usuario === "admin" &&
        password === "123"
    ) {

        loginMensaje.textContent =
            "Inicio de sesión correcto.";

        loginMensaje.classList.remove(
            "incorrecto"
        );

        loginMensaje.classList.add(
            "correcto"
        );


        setTimeout(() => {

            window.location.href =
                "html-socio/portal.html";

        }, 500);

    } else {

        loginMensaje.textContent =
            "Usuario o contraseña incorrectos.";

        loginMensaje.classList.remove(
            "correcto"
        );

        loginMensaje.classList.add(
            "incorrecto"
        );

    }

});