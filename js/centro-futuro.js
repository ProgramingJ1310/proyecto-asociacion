(() => {
  const seccion = document.querySelector("[data-centro-futuro]");

  if (!seccion) {
    return;
  }

  const opciones = Array.from(
    seccion.querySelectorAll(".centro-futuro-opcion")
  );
  const marco = seccion.querySelector("[data-centro-futuro-marco]");
  const titulo = seccion.querySelector("[data-centro-futuro-titulo]");
  const descripcion = seccion.querySelector("[data-centro-futuro-descripcion]");
  const numero = seccion.querySelector("[data-centro-futuro-numero]");
  const estado = seccion.querySelector("[data-centro-futuro-estado]");
  let opcionActual = opciones.find(
    (opcion) => opcion.getAttribute("aria-pressed") === "true"
  );
  let cambiando = false;

  if (
    opciones.length === 0 ||
    !marco ||
    !titulo ||
    !descripcion ||
    !numero ||
    !estado ||
    !opcionActual
  ) {
    console.error("La sección de espacios futuros está incompleta.");
    return;
  }

  const imagenActual = marco.querySelector(".centro-futuro-foto-actual");

  if (!imagenActual) {
    console.error("No se encontró la imagen inicial de espacios futuros.");
    return;
  }

  function seleccionarOpcion(opcion) {
    if (cambiando || opcion === opcionActual) {
      return;
    }

    const rutaImagen = opcion.dataset.imagen;
    const textoAlternativo = opcion.dataset.alternativo;
    const nombre = opcion.dataset.titulo;
    const resumen = opcion.dataset.descripcion;
    const textoEstado = opcion.dataset.estado;
    const claseEstado = opcion.dataset.estadoClase;
    const numeroOpcion = opcion.querySelector(".centro-futuro-numero");
    const imagenAnterior = marco.querySelector(".centro-futuro-foto-actual");

    if (
      !rutaImagen ||
      !textoAlternativo ||
      !nombre ||
      !resumen ||
      !textoEstado ||
      !claseEstado ||
      !numeroOpcion ||
      !imagenAnterior
    ) {
      console.error("La opción seleccionada de espacios futuros está incompleta.");
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
        "centro-futuro-foto centro-futuro-foto-siguiente";
      imagenSiguiente.src = precarga.src;
      imagenSiguiente.alt = textoAlternativo;
      imagenSiguiente.decoding = "async";
      marco.append(imagenSiguiente);

      opciones.forEach((item) => {
        const seleccionada = item === opcion;
        item.classList.toggle("activa", seleccionada);
        item.setAttribute("aria-pressed", String(seleccionada));
      });

      numero.textContent = numeroOpcion.textContent.trim();
      titulo.textContent = nombre;
      descripcion.textContent = resumen;
      estado.textContent = textoEstado;
      estado.className = `centro-estado ${claseEstado}`;

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
        imagenSiguiente.classList.remove("centro-futuro-foto-siguiente");
        imagenSiguiente.classList.add("centro-futuro-foto-actual");
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
