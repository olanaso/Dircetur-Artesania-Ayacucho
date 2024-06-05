import { listarPedidos, filtrarPedidos } from './api';

const DEFAULT_PAGE_LIMIT = 10;
let currentPage = 1;
let totalPages = 0;
let currentFilter = {}; // Objeto para almacenar el filtro actual

async function cargarPedidos() {
    try {
        let pedidos;

        // Determinar si se está filtrando o no
        if (Object.keys(currentFilter).length === 0) {
            pedidos = await listarPedidos(currentPage, DEFAULT_PAGE_LIMIT);
        } else {
            const filtro = {
                ...currentFilter,
                page: currentPage,
                limit: DEFAULT_PAGE_LIMIT
            };
            pedidos = await filtrarPedidos(filtro);
        }

        cargarTabla(pedidos.pedidos);
        totalPages = Math.ceil(pedidos.totalItems / DEFAULT_PAGE_LIMIT);
        actualizarControlesPaginacion(totalPages);
    } catch (error) {
        console.error('Error:', error);
    }
}

function actualizarControlesPaginacion(totalPages) {
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const currentPageDisplay = document.getElementById('currentPageDisplay');

    prevPageBtn.addEventListener('click', onClickPrevPage);
    nextPageBtn.addEventListener('click', onClickNextPage);

    currentPageDisplay.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = 'page-item';
        const link = document.createElement('a');
        link.className = 'page-link';
        link.href = '#';
        link.textContent = i;
        if (i === currentPage) {
            li.classList.add('active');
        }
        link.addEventListener('click', () => cambiarPagina(i));
        li.appendChild(link);
        currentPageDisplay.appendChild(li);
    }

    // Deshabilitar botones de navegación según la página actual
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

async function cambiarPagina(page) {
    if (page !== currentPage) {
        currentPage = page;
        await cargarPedidos();
    }
}

async function onClickNextPage(event) {
    event.preventDefault();
    if (currentPage < totalPages) {
        currentPage++;
        await cargarPedidos();
    }
}

async function onClickPrevPage(event) {
    event.preventDefault();
    if (currentPage > 1) {
        currentPage--;
        await cargarPedidos();
    }
}

async function filtrarPedidosAction() {
    const btnFiltrar = document.getElementById('filtrar-pedido');

    btnFiltrar.addEventListener('click', async (event) => {
        event.preventDefault();

        // Obtener valores de los campos de filtro
        const numPedido = document.getElementById('num-pedido').value;
        const artesano = document.getElementById('nombre-artesano').value;
        const cliente = document.getElementById('nombre-cliente').value;
        const fecha = document.getElementById('fecha-pedido').value;
        const estado = document.getElementById('estado').value;

        // Construir el objeto de filtro
        currentFilter = {
            num_pedido: numPedido,
            nombre_artesano: artesano,
            nombre_cliente: cliente,
            fecha_pedido: fecha,
            estado: estado
        };

        // Reiniciar currentPage al filtrar
        currentPage = 1;

        try {
            // Filtrar pedidos con los parámetros actuales
            const filtro = {
                ...currentFilter,
                page: currentPage,
                limit: DEFAULT_PAGE_LIMIT
            };
            const pedidosFiltrados = await filtrarPedidos(filtro);

            // Cargar los resultados filtrados en la tabla y actualizar la paginación
            cargarTabla(pedidosFiltrados.pedidos);
            totalPages = Math.ceil(pedidosFiltrados.totalItems / DEFAULT_PAGE_LIMIT);
            actualizarControlesPaginacion(totalPages);
        } catch (error) {
            console.error('Error al filtrar pedidos:', error);
        }
    });
}

function cargarTabla(pedidos) {
    const tablaCategoria = document.getElementById('tablaCategoria');
    const tablaCategoriaBody = tablaCategoria.getElementsByTagName('tbody')[0];
    tablaCategoriaBody.innerHTML = '';

    pedidos.forEach(pedido => {
        const row = document.createElement('tr');
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

function formatearFecha(fecha) {
    const date = new Date(fecha);
    const anio = date.getUTCFullYear();
    const mes = ('0' + (date.getUTCMonth() + 1)).slice(-2);
    const dia = ('0' + date.getUTCDate()).slice(-2);
    return `${dia}/${mes}/${anio}`;
}

document.addEventListener('DOMContentLoaded', () => {
    cargarPedidos();
    filtrarPedidosAction();
});
