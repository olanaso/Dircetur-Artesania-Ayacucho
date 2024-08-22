import { getDataFromLocalStorage, saveDataToLocalStorage } from "../utils/config.js";
import { listarDeseados, deleteProductoDeseado } from "./api.js";
import { AlertDialog } from "../utils/alert";
import { showToast } from "../utils/toast.js";
import { showLoading, hideLoading } from "../utils/init.js";

const alertDialog = new AlertDialog();

$(document).ready(function () {
    ObtenerDeseados();
});

let products = [];
let currentPage = 1;
const productsPerPage = 3;

async function ObtenerDeseados() {
    try {
        showLoading();
        const response = await listarDeseados(getDataFromLocalStorage('idCliente'));
        console.log(response);

        products = response.data;
        renderProducts();
        renderPagination();
    } catch (e) {
        console.error(e);
    } finally {
        hideLoading();
    }
}

function renderProducts() {
    const productContainer = document.querySelector('.product-list');
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = products.slice(start, end);

    productContainer.innerHTML = paginatedProducts.map(product => {
        const datosProducto = product.datosProducto;
        return `
            <div class="product-card" data-product-id="${product.id_producto}" data-client-id="${getDataFromLocalStorage('idCliente')}" data-lst-imagenes='${datosProducto.lst_imagenes}'>
                <div class="product-info">
                    <div class="product-image">
                        <i class="fa fa-heart-broken trash-icon btn_EliminarDeseado"></i>
                        <img src="${datosProducto.imagen_principal}" alt="${datosProducto.nombres_es}">
                    </div>
                    <div class="product-details">
                        <h3 class="product-name">${datosProducto.nombres_es}</h3>
                        <p class="product-maker">Hecho por: ${datosProducto.datos_artesano.nombres} ${datosProducto.datos_artesano.apellidos}</p>
                    </div>
                </div>
                <div class="product-price-actions">
                    <div class="product-price">
                        <p class="price-label">Precio:</p>
                        <p class="price-value">S/${datosProducto.precio}</p>
                    </div>
                    <div class="product-actions">
                        <div class="custom-button-wrapper custom-button">
                            <div class="custom-text">Añadir al carrito</div>
                            <span class="custom-icon">
                                <svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            window.location.href = `principal-detalle.html?id=${productId}`;
        });
    });
}
function renderPagination() {
    const totalPages = Math.ceil(products.length / productsPerPage);
    const pageNumbersContainer = document.querySelector('.page-numbers');
    pageNumbersContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('button');
        pageNumber.classList.add('page-number');
        pageNumber.textContent = i;
        pageNumber.addEventListener('click', () => {
            currentPage = i;
            renderProducts();
            updatePaginationButtons();
        });
        pageNumbersContainer.appendChild(pageNumber);
    }

    updatePaginationButtons();
}

function updatePaginationButtons() {
    const totalPages = Math.ceil(products.length / productsPerPage);
    const pageButtons = document.querySelectorAll('.page-number');

    pageButtons.forEach((button, index) => {
        button.classList.remove('active');
        if (index + 1 === currentPage) {
            button.classList.add('active');
        }
    });

    document.querySelector('.btn-prev').style.display = currentPage > 1 ? 'inline-block' : 'none';
    document.querySelector('.btn-next').style.display = currentPage < totalPages ? 'inline-block' : 'none';
}

document.querySelector('.btn-prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderProducts();
        updatePaginationButtons();
    }
});

document.querySelector('.btn-next').addEventListener('click', () => {
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderProducts();
        updatePaginationButtons();
    }
});

$(document).on('click', '.btn_EliminarDeseado', async function(e) {
    alertDialog.createAlertDialog(
        'confirm',
        'Confirmar Alerta',
        '¿Estás seguro de que deseas eliminar este producto de tus deseados?',
        'Cancelar',
        'Continuar',
        async() => {
            try {
                e.preventDefault();
                showLoading();
                let productId = $(this).closest('.product-card').data('product-id');
                let clientId = $(this).closest('.product-card').data('client-id');
                let result = await deleteProductoDeseado({ productId, clientId });
                if (result) {
                    showToast('Producto eliminado de tus deseados correctamente');
                    ObtenerDeseados();
                } else {
                    showToast('Ocurrió un error.');
                }
            } catch (error) {
                console.error('Error al eliminar el producto deseado:', error);
            } finally {
                hideLoading();
            }
        }
    );
});