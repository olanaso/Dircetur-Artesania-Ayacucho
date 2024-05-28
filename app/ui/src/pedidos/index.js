import { listarPedidos, filtrarPedidos } from './api';

async function cargarPedidos() {
    try {
        const pedidos = await listarPedidos();
        cargarTabla(pedidos);
    } catch (error) {
        console.error('Error:', error);
    }
}

function cargarTabla(pedidos) {
    const tablaCategoriaBody = document.getElementById('tablaCategoria').getElementsByTagName('tbody')[0];

    // Limpiar el contenido existente del tbody
    tablaCategoriaBody.innerHTML = '';
    pedidos.forEach(pedido => {
        const row = tablaCategoriaBody.insertRow();

        const cellNumPedido = row.insertCell(0);
        const cellCliente = row.insertCell(1);
        const cellArtesano = row.insertCell(2);
        const cellFechaPedido = row.insertCell(3);
        const cellFechaModificacion = row.insertCell(4);
        const cellMonto = row.insertCell(5);
        const cellEstado = row.insertCell(6);
        const cellAcciones = row.insertCell(7);


        cellNumPedido.textContent = pedido.num_pedido;
        cellCliente.textContent = pedido.cliente_id;
        cellArtesano.textContent = pedido.artesano_id;
        cellFechaPedido.textContent = formatearFecha(pedido.fecha_pedido);
        cellFechaModificacion.textContent = formatearFecha(pedido.fecha_modificacion);
        cellMonto.textContent = pedido.monto;
        cellEstado.textContent = pedido.estado;


        //botones de editar y eliminar con eventos asociados
        const editarBtn = document.createElement('button');
        editarBtn.type = 'button';
        editarBtn.className = 'btn btn-light btn-sm';
        editarBtn.innerHTML = '<a href="/historial-ventas.html"><i class="icon icon-eye2"></i></a>';
        editarBtn.addEventListener('click', (event) =>  {
            event.preventDefault();
            window.location.href = `/historial-ventas.html?id=${pedido.num_pedido}`
        });
        cellAcciones.appendChild(editarBtn);
    });
}

async function filtrarPedidosAction() {
    const btnFiltrar = document.getElementById('filtrar-pedido');

    btnFiltrar.addEventListener('click', async (event) => {
        event.preventDefault();

        const numPedido = document.getElementById('num-pedido').value;
        //   const artesano = document.getElementById('nombre-artesano').value;
        //   const cliente = document.getElementById('nombre-cliente').value;
        const fecha = document.getElementById('fecha-pedido').value;

        const filtro = {
            num_pedido: numPedido,
            fecha_pedido: fecha
        };

        const pedidos = await filtrarPedidos(filtro);
        cargarTabla(pedidos);
    });
}

function formatearFecha(fecha) {
    const date = new Date(fecha);

    const anio = date.getUTCFullYear(); // Obtener el año (ej. 2024)
    const mes = ('0' + (date.getUTCMonth() + 1)).slice(-2); // Obtener el mes (ej. 05)
    const dia = ('0' + date.getUTCDate()).slice(-2); // Obtener el día (ej. 27)

    // Formar la fecha en el formato deseado (YYYY-MM-DD)
    return `${dia}/${mes}/${anio}`;
}
document.addEventListener('DOMContentLoaded', () => {
    cargarPedidos();
    filtrarPedidosAction();
});