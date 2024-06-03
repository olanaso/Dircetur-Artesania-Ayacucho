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
    const tablaCategoria = document.getElementById('tablaCategoria');
    const tablaCategoriaBody = tablaCategoria.getElementsByTagName('tbody')[0];

    tablaCategoriaBody.innerHTML = '';

    pedidos.forEach(pedido => {
        const row = document.createElement('tr');

        // Agregar clase badge dependiendo del estado del pedido
        let estadoClass = '';
        switch (pedido.estado) {
            case 'pendiente':
                estadoClass = 'badge badge-pill badge-warning text-white'; 
                break;
            case 'pagado':
                estadoClass = 'badge badge-pill badge-success'; 
                break;
            case 'envio':
                estadoClass = 'badge badge-pill badge-info'; 
                break;
            case 'finalizado':
                estadoClass = 'badge badge-pill badge-primary'; 
                break;
            case 'anulado':
                estadoClass = 'badge badge-pill badge-danger';
                break;
            default:
                estadoClass = ''; 
        }

        row.innerHTML = `
            <td>${pedido.num_pedido}</td>
            <td>${pedido.cliente.nombres} ${pedido.cliente.apellidos}</td>
            <td>${pedido.artesano.nombres} ${pedido.artesano.apellidos}</td>
            <td>${formatearFecha(pedido.fecha_pedido)}</td>
            <td>${formatearFecha(pedido.updatedAt)}</td>
            <td><span class="${estadoClass}">${pedido.estado}</span></td>
            <td>
                <button type="button" class="btn btn-light btn-sm">
                    <a href="/historial-ventas.html?id=${pedido.num_pedido}">
                        <i class="icon icon-eye2"></i>
                    </a>
                </button>
            </td>
        `;

        tablaCategoriaBody.appendChild(row);
    });
}


async function filtrarPedidosAction() {
    const btnFiltrar = document.getElementById('filtrar-pedido');

    btnFiltrar.addEventListener('click', async (event) => {
        event.preventDefault();

        const numPedido = document.getElementById('num-pedido').value;
        const artesano = document.getElementById('nombre-artesano').value;
        const cliente = document.getElementById('nombre-cliente').value;
        const fecha = document.getElementById('fecha-pedido').value;
        const estado = document.getElementById('estado').value;

        const filtro = {
            num_pedido: numPedido,
            nombre_artesano: artesano,
            nombre_cliente: cliente,
            fecha_pedido: fecha,
            estado: estado
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