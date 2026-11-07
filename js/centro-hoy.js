(() => {
  const seccion = document.querySelector("[data-centro-hoy]");

  if (!seccion) {
    return;
  }

  const opciones = Array.from(seccion.querySelectorAll(".centro-hoy-opcion"));
  const marco = seccion.querySelector("[data-centro-hoy-marco]");
  const contacto = seccion.querySelector("[data-centro-hoy-contacto]");
  const textoContacto = seccion.querySelector("[data-centro-hoy-contacto-texto]");
  let opcionActual = opciones.find(
    (opcion) => opcion.getAttribute("aria-pressed") === "true"
  );
  let cambiando = false;

  if (
    opciones.length === 0 ||
    !marco ||
    !contacto ||
    !textoContacto ||
    !opcionActual
  ) {
    console.error("La sección Centro de hoy está incompleta.");
    return;
  }

  if (!marco.querySelector(".centro-hoy-foto-actual")) {
    console.error("No se encontró la imagen inicial de Centro de hoy.");
    return;
  }

  function seleccionarOpcion(opcion) {
    if (cambiando || opcion === opcionActual) {
      return;
    }

    const rutaImagen = opcion.dataset.imagen;
    const textoAlternativo = opcion.dataset.alternativo;
    const rutaContacto = opcion.dataset.contacto;
    const textoContactoNuevo = opcion.dataset.contactoTexto;
    const imagenAnterior = marco.querySelector(".centro-hoy-foto-actual");

    if (
      !rutaImagen ||
      !textoAlternativo ||
      !rutaContacto ||
      !textoContactoNuevo ||
      !imagenAnterior
    ) {
      console.error("La opción seleccionada de Centro de hoy está incompleta.");
      return;
    }

    cambiando = true;
    opciones.forEach((item) => {
      item.disabled = true;
    });
    marco.setAttribute("aria-busy", "true");

    const precarga = new Image();
    let procesada = false;

    precarga.onload = () => {
      if (procesada) {
        return;
      }
      procesada = true;

      const imagenSiguiente = document.createElement("img");
      imagenSiguiente.className =
        "centro-hoy-foto centro-hoy-foto-siguiente";
      imagenSiguiente.src = precarga.src;
      imagenSiguiente.alt = textoAlternativo;
      imagenSiguiente.decoding = "async";
      marco.append(imagenSiguiente);

      opciones.forEach((item) => {
        const seleccionada = item === opcion;
        item.classList.toggle("activa", seleccionada);
        item.setAttribute("aria-pressed", String(seleccionada));
      });

      contacto.href = rutaContacto;
      textoContacto.textContent = textoContactoNuevo;

      const direccion =
        opciones.indexOf(opcion) > opciones.indexOf(opcionActual)
          ? "deslizando-adelante"
          : "deslizando-atras";
      opcionActual = opcion;

      let deslizamientoFinalizado = false;
      let temporizador;
      const finalizarDeslizamiento = () => {
        if (deslizamientoFinalizado) {
          return;
        }
        deslizamientoFinalizado = true;
        window.clearTimeout(temporizador);
        imagenAnterior.removeEventListener("transitionend", alTerminarTransicion);
        imagenAnterior.remove();
        imagenSiguiente.classList.remove("centro-hoy-foto-siguiente");
        imagenSiguiente.classList.add("centro-hoy-foto-actual");
        marco.classList.remove("deslizando-adelante", "deslizando-atras");
        marco.setAttribute("aria-busy", "false");
        opciones.forEach((item) => {
          item.disabled = false;
        });
        cambiando = false;
      };
      const alTerminarTransicion = (evento) => {
        if (
          evento.target === imagenAnterior &&
          evento.propertyName === "transform"
        ) {
          finalizarDeslizamiento();
        }
      };
      temporizador = window.setTimeout(finalizarDeslizamiento, 700);

      imagenAnterior.addEventListener("transitionend", alTerminarTransicion);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          marco.classList.add(direccion);
        });
      });
    };

    precarga.onerror = () => {
      if (procesada) {
        return;
      }
      procesada = true;
      console.error(`No se pudo cargar la imagen: ${rutaImagen}`);
      marco.setAttribute("aria-busy", "false");
      opciones.forEach((item) => {
        item.disabled = false;
      });
      cambiando = false;
    };

    precarga.src = rutaImagen;
  }

  opciones.forEach((opcion) => {
    opcion.addEventListener("click", () => seleccionarOpcion(opcion));
  });
})();
