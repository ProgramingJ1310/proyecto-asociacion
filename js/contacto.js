/* ==================================================
   FORMULARIO DE CONTACTO
================================================== */

const formularioContacto =
    document.getElementById("formContacto");

const tipoPersona =
    document.getElementById("tipoPersona");

const datosSocio =
    document.getElementById("datosSocio");

const manzana =
    document.getElementById("manzana");

const lote =
    document.getElementById("lote");

const mensajeContacto =
    document.getElementById("mensaje");

const contadorCaracteres =
    document.getElementById("contadorCaracteres");


/* ==================================================
   MOSTRAR U OCULTAR DATOS DEL SOCIO
================================================== */

tipoPersona.addEventListener("change", () => {

    if (tipoPersona.value === "Socio") {

        datosSocio.classList.add("activo");

        manzana.required = true;
        lote.required = true;

    } else {

        datosSocio.classList.remove("activo");

        manzana.required = false;
        lote.required = false;

        manzana.value = "";
        lote.value = "";

    }

});


/* ==================================================
   CONTADOR DE CARACTERES
================================================== */

mensajeContacto.addEventListener("input", () => {

    contadorCaracteres.textContent =
        mensajeContacto.value.length;

});


/* ==================================================
   ENVIAR FORMULARIO
================================================== */

formularioContacto.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        /* OBTENER DATOS */

        const nombre =
            document
                .getElementById("nombre")
                .value
                .trim();

        const telefono =
            document
                .getElementById("telefono")
                .value
                .trim();

        const tipo =
            tipoPersona.value;

        const mz =
            manzana.value.trim();

        const numeroLote =
            lote.value.trim();

        const asunto =
            document
                .getElementById("asunto")
                .value;

        const mensaje =
            mensajeContacto
                .value
                .trim();


        /* ==================================================
           VALIDAR NOMBRE
        ================================================== */

        if (nombre.length < 3) {

            alert(
                "Por favor ingresa tu nombre completo."
            );

            return;
        }


        /* ==================================================
           VALIDAR TELÉFONO
        ================================================== */

        const telefonoValido =
            /^[0-9]{9}$/;


        if (!telefonoValido.test(telefono)) {

            alert(
                "El teléfono debe contener 9 números."
            );

            return;
        }


        /* ==================================================
           VALIDAR TIPO
        ================================================== */

        if (tipo === "") {

            alert(
                "Selecciona si eres socio o visitante."
            );

            return;
        }


        /* ==================================================
           VALIDAR DATOS DEL SOCIO
        ================================================== */

        if (tipo === "Socio") {

            if (mz === "") {

                alert(
                    "Ingresa tu manzana."
                );

                return;
            }


            if (numeroLote === "") {

                alert(
                    "Ingresa tu lote."
                );

                return;
            }

        }


        /* ==================================================
           VALIDAR ASUNTO
        ================================================== */

        if (asunto === "") {

            alert(
                "Selecciona el motivo de tu consulta."
            );

            return;
        }


        /* ==================================================
           VALIDAR MENSAJE
        ================================================== */

        if (mensaje.length < 10) {

            alert(
                "Escribe un mensaje de al menos 10 caracteres."
            );

            return;
        }


        /* ==================================================
           CREAR DATOS DEL SOCIO
        ================================================== */

        let datosUbicacion = "";


        if (tipo === "Socio") {

            datosUbicacion =
`Manzana: ${mz}
Lote: ${numeroLote}
`;

        }


        /* ==================================================
           CREAR MENSAJE DE WHATSAPP
        ================================================== */

        const textoWhatsApp =
`Hola, quisiera realizar una consulta a la Asociación de Vivienda Virgen de Loreto.

Nombre: ${nombre}
Teléfono: ${telefono}
Tipo: ${tipo}
${datosUbicacion}Motivo: ${asunto}

Mensaje:
${mensaje}`;


        /* ==================================================
           WHATSAPP DE LA ASOCIACIÓN
        ================================================== */

        const numeroWhatsApp =
            "51908912426";


        const urlWhatsApp =

            "https://wa.me/" +

            numeroWhatsApp +

            "?text=" +

            encodeURIComponent(
                textoWhatsApp
            );


        /* ==================================================
           ABRIR WHATSAPP
        ================================================== */

        window.open(
            urlWhatsApp,
            "_blank"
        );

    }
);