import { listarPedidos, filtrarPedidos } from './api';

import { loadPartials } from '../utils/viewpartials'; 
import { AlertDialog } from "../utils/alert";
const alertDialog = new AlertDialog(); 
import {  hideLoading, llenarinformacionIESTPProg,marcarSubMenuSeleccionado } from '../utils/init';
import { getDataFromLocalStorage, } from '../utils/config' 




 
hideLoading();
// Uso de la función
(async function () {
  let partials = [
    { path: 'partials/shared/header.html', container: 'app-header' },
    { path: 'partials/shared/menu.html', container: 'app-side' },


  ]; 
  try {
    await loadPartials(partials);
    import ('../utils/common')

   
    // Aquí coloca el código que deseas ejecutar después de que todas las vistas parciales se hayan cargado.
    console.log('Las vistas parciales se han cargado correctamente!');
    // Por ejemplo, podrías iniciar tu aplicación aquí.

    startApp();
  } catch (e) {
    console.error(e);
  }
})();

function startApp () {
  //checkadminsession(); 
  setTimeout(function() {
    llenarinformacionIESTPProg();
   // marcarSubMenuSeleccionado();
}, 500); 

}
/*async function checkadminsession () {
  let result = await checkSession()
  if (result.usuario.rolid != 1) {
    location.href = "sinacceso.html"
  }
}*/







var artesanoId=0;
let usuario=getDataFromLocalStorage('session').usuarios;
  artesanoId = usuario.datos[0].id;

const DEFAULT_PAGE_LIMIT = 10;
let currentPage = 1;
let totalPages = 0;
let currentFilter = {};

const btnFiltrar = document.getElementById('filtrar-pedido');

const tablaPedidos = document.getElementById('tablaPedidos');
const tablaPedidoBody = tablaPedidos.getElementsByTagName('tbody')[0];



async function cargarPedidos() {
    try {
        let pedidos;

        // Determinar si se está filtrando o no
        if (Object.keys(currentFilter).length === 0) {
            pedidos = await listarPedidos(currentPage, DEFAULT_PAGE_LIMIT,artesanoId);
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
        actualizarControlesPaginacion(totalPages, pedidos.totalItems);
    } catch (error) {
        console.error('Error:', error);
    }
}

function actualizarControlesPaginacion(totalPages, totalItems) {
    // Calculamos el rango mostrado actualmente
    const fromItem = (currentPage - 1) * DEFAULT_PAGE_LIMIT + 1;
    let toItem = currentPage * DEFAULT_PAGE_LIMIT;
    if (toItem > totalItems) {
        toItem = totalItems;
    }

    // Actualizamos la información de paginación
    const paginationInfo = document.getElementById('paginationInfo');
    paginationInfo.innerHTML = `Viendo del ${fromItem} al ${toItem} de un total de ${totalItems} resultados`;

    // Limpiamos y generamos los controles de paginación
    const paginationControls = document.getElementById('paginationControls');
    paginationControls.innerHTML = '';

    // Crear botón Previous
    const previousBtn = document.createElement('li');
    previousBtn.className = 'paginate_button page-item previous';
    previousBtn.id = 'apiCallbacks_previous';
    if (currentPage === 1) {
        previousBtn.classList.add('disabled');
    }
    const previousLink = document.createElement('a');
    previousLink.className = 'page-link';
    previousLink.href = '#';
    previousLink.textContent = 'Anterior';
    previousLink.addEventListener('click', () => cambiarPagina(currentPage - 1));
    previousBtn.appendChild(previousLink);
    paginationControls.appendChild(previousBtn);

    // Lógica para generar páginas intermedias con puntos suspensivos
    const maxVisiblePages = 3; // Número máximo de páginas visibles antes de mostrar los puntos suspensivos

    if (totalPages <= maxVisiblePages) {
        // Si hay pocas páginas, mostrar todas
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('li');
            pageBtn.className = 'paginate_button page-item';
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
            const pageLink = document.createElement('a');
            pageLink.className = 'page-link';
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.addEventListener('click', () => cambiarPagina(i));
            pageBtn.appendChild(pageLink);
            paginationControls.appendChild(pageBtn);
        }
    } else {
        // Mostrar la primera página
        const firstPageBtn = document.createElement('li');
        firstPageBtn.className = 'paginate_button page-item';
        if (currentPage === 1) {
            firstPageBtn.classList.add('active');
        }
        const firstPageLink = document.createElement('a');
        firstPageLink.className = 'page-link';
        firstPageLink.href = '#';
        firstPageLink.textContent = 1;
        firstPageLink.addEventListener('click', () => cambiarPagina(1));
        firstPageBtn.appendChild(firstPageLink);
        paginationControls.appendChild(firstPageBtn);

        // Agregar puntos suspensivos al inicio si no se muestra la primera página
        if (currentPage > Math.floor(maxVisiblePages / 2) + 1) {
            const ellipsisStart = document.createElement('li');
            ellipsisStart.className = 'paginate_button page-item disabled';
            ellipsisStart.id = 'apiCallbacks_ellipsis';
            const ellipsisLinkStart = document.createElement('a');
            ellipsisLinkStart.className = 'page-link';
            ellipsisLinkStart.href = '#';
            ellipsisLinkStart.textContent = '…';
            ellipsisStart.appendChild(ellipsisLinkStart);
            paginationControls.appendChild(ellipsisStart);
        }

        // Mostrar las páginas visibles
        let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 2);
        let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages - 1);

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('li');
            pageBtn.className = 'paginate_button page-item';
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
            const pageLink = document.createElement('a');
            pageLink.className = 'page-link';
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.addEventListener('click', () => cambiarPagina(i));
            pageBtn.appendChild(pageLink);
            paginationControls.appendChild(pageBtn);
        }

        // Agregar puntos suspensivos al final si no se muestra la última página
        if (endPage < totalPages - 1) {
            const ellipsisEnd = document.createElement('li');
            ellipsisEnd.className = 'paginate_button page-item disabled';
            ellipsisEnd.id = 'apiCallbacks_ellipsis';
            const ellipsisLinkEnd = document.createElement('a');
            ellipsisLinkEnd.className = 'page-link';
            ellipsisLinkEnd.href = '#';
            ellipsisLinkEnd.textContent = '…';
            ellipsisEnd.appendChild(ellipsisLinkEnd);
            paginationControls.appendChild(ellipsisEnd);
        }

        // Mostrar la última página
        const lastPageBtn = document.createElement('li');
        lastPageBtn.className = 'paginate_button page-item';
        if (currentPage === totalPages) {
            lastPageBtn.classList.add('active');
        }
        const lastPageLink = document.createElement('a');
        lastPageLink.className = 'page-link';
        lastPageLink.href = '#';
        lastPageLink.textContent = totalPages;
        lastPageLink.addEventListener('click', () => cambiarPagina(totalPages));
        lastPageBtn.appendChild(lastPageLink);
        paginationControls.appendChild(lastPageBtn);
    }

    // Crear botón Next
    const nextBtn = document.createElement('li');
    nextBtn.className = 'paginate_button page-item next';
    nextBtn.id = 'apiCallbacks_next';
    if (currentPage === totalPages) {
        nextBtn.classList.add('disabled');
    }
    const nextLink = document.createElement('a');
    nextLink.className = 'page-link';
    nextLink.href = '#';
    nextLink.textContent = 'Siguiente';
    nextLink.addEventListener('click', () => cambiarPagina(currentPage + 1));
    nextBtn.appendChild(nextLink);
    paginationControls.appendChild(nextBtn);
}

async function cambiarPagina(page) {
    if (page !== currentPage) {
        currentPage = page;
        await cargarPedidos();
    }
}

async function filtrarPedidosAction() {
    btnFiltrar.addEventListener('click', async (event) => {
        event.preventDefault();

        // Obtener valores de los campos de filtro
        const numPedido = document.getElementById('num-pedido').value;
        //const artesano = document.getElementById('nombre-artesano').value;
        const cliente = document.getElementById('nombre-cliente').value;
        const fecha = document.getElementById('fecha-pedido').value;
        const estado = document.getElementById('estado').value;

        // Construir el objeto de filtro
        currentFilter = {
            num_pedido: numPedido,
            nombre_cliente: cliente,
            fecha_pedido: fecha,
            estado: estado,
            idartesano: artesanoId
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
            actualizarControlesPaginacion(totalPages, pedidosFiltrados.totalItems);
        } catch (error) {
            console.error('Error al filtrar pedidos:', error);
        }
    });
}

function cargarTabla(pedidos) {
    tablaPedidoBody.innerHTML = '';

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
            case 'enviado':
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
            <td>${formatearFecha(pedido.fecha_pedido)}</td>
            <td>${formatearFecha(pedido.updatedAt)}</td>
            <td><span class="${estadoClass}">${pedido.estado}</span></td>
            <td>
                <button type="button" class="btn btn-light btn-sm">
                    <a href="/ventaartesano-detalle.html?id=${pedido.num_pedido}">
                        <i class="icon icon-eye2"></i>
                    </a>
                </button>
            </td>
        `;
        tablaPedidoBody.appendChild(row);
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

