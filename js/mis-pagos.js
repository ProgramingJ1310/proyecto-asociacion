const filtroPredio = document.getElementById("predioPago");
const filtroAnio = document.getElementById("anioPago");
const filasPagos = Array.from(document.querySelectorAll(".pago-fila"));
const filaSinResultados = document.getElementById("pagosSinResultados");
const pagosRegistrados = document.getElementById("pagosRegistrados");
const totalPagado = document.getElementById("totalPagado");
const ultimoPago = document.getElementById("ultimoPago");
const pagosMensaje = document.getElementById("pagosMensaje");

const formatoMoneda = new Intl.NumberFormat("es-PE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

function actualizarHistorial() {
    const predioSeleccionado = filtroPredio.value;
    const anioSeleccionado = filtroAnio.value;

    const pagosVisibles = filasPagos.filter((fila) => {
        const coincidePredio =
            predioSeleccionado === "todos" ||
            fila.dataset.predio === predioSeleccionado;
        const coincideAnio =
            anioSeleccionado === "todos" ||
            fila.dataset.anio === anioSeleccionado;
        const coincide = coincidePredio && coincideAnio;

        fila.hidden = !coincide;

        return coincide;
    });

    const montoVisible = pagosVisibles
        .filter((fila) => fila.dataset.estado === "pagado")
        .reduce((total, fila) => total + Number(fila.dataset.monto), 0);

    const ultimoPagoVisible = pagosVisibles
        .map((fila) => fila.dataset.fecha)
        .sort()
        .slice(-1)[0];

    pagosRegistrados.textContent = String(pagosVisibles.length);
    totalPagado.textContent = `S/ ${formatoMoneda.format(montoVisible)}`;
    ultimoPago.textContent = ultimoPagoVisible
        ? ultimoPagoVisible.split("-").reverse().join("/")
        : "—";
    filaSinResultados.hidden = pagosVisibles.length > 0;
    pagosMensaje.textContent = pagosVisibles.length
        ? `Se muestran ${pagosVisibles.length} ${
              pagosVisibles.length === 1 ? "pago" : "pagos"
          }.`
        : "No se encontraron pagos con los filtros seleccionados.";
}

filtroPredio.addEventListener("change", actualizarHistorial);
filtroAnio.addEventListener("change", actualizarHistorial);

const comprobanteModalElement = document.getElementById("comprobanteModal");
const comprobanteModal = bootstrap.Modal.getOrCreateInstance(
    comprobanteModalElement,
);

document.querySelector(".cuenta-tabla tbody").addEventListener("click", (event) => {
    const boton = event.target.closest(".pago-comprobante");

    if (!boton) {
        return;
    }

    const fila = boton.closest(".pago-fila");
    const celdas = fila.cells;

    document.getElementById("comprobanteFecha").textContent =
        celdas[0].textContent.trim();
    document.getElementById("comprobanteConcepto").textContent =
        celdas[1].textContent.trim();
    document.getElementById("comprobantePredio").textContent =
        celdas[2].textContent.trim();
    document.getElementById("comprobanteMonto").textContent =
        celdas[3].textContent.trim();
    document.getElementById("comprobanteEstado").textContent =
        celdas[4].textContent.trim();

    comprobanteModal.show();
});

actualizarHistorial();
