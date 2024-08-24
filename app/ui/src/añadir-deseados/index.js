// src/a%C3%B1adir-deseados/index.js
import { getDataFromLocalStorage, saveDataToLocalStorage } from "../utils/config.js";
import { listarDeseados, deleteProductoDeseado, addProductToWishlist } from "./api.js";
import { AlertDialog } from "../utils/alert";
import { showToast } from "../utils/toast.js";
import { showLoading, hideLoading } from "../utils/init.js";
import { updateDeseadosCount } from '../Shared/navbar.js';
import './añadir-deseados.css';

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
        const clientId = getDataFromLocalStorage('idCliente');
        const response = await listarDeseados(clientId);
        console.log(response);

        products = response.data;
        renderProducts();
        renderPagination();
        updateDeseadosCount(products.length);
    } catch (e) {
        console.error(e);
    } finally {
        hideLoading();
    }
}

function renderProducts() {
    const productContainer = document.querySelector('.product-list');
    productContainer.innerHTML = ''; // Clear previous content

    if (products.length === 0) {
        const title = document.querySelector('.title');
        const hr = document.querySelector('hr');

        title.style.display = 'none';
        hr.style.display = 'none';

        productContainer.innerHTML = `
        <div class="no-products">
            <img src="../../public/img/broken-heart.png" class="broken-heart-img" alt="Broken Heart">
            <h2>Oops... aún no has agregado productos a tu lista de deseados</h2>
            <p>Presiona el siguiente botón para <em>explorar ahora</em> nuestros productos</p>
            <button id="explore-products-button" class="explore-button">
                <i class="fa fa-search"></i> Explorar Productos
            </button>
        </div>
    `;
        document.getElementById('explore-products-button').addEventListener('click', function() {
            const button = this;
            button.textContent = 'Redirigiéndote...';
            setTimeout(() => {
                window.location.href = 'principal-busqueda.html';
            }, 1000);
        });

        return;
    }

    /*
    for (let i = 0; i < productsPerPage; i++) {
        productContainer.innerHTML += `
            <div class="product-card skeleton">
                <div class="product-info">
                    <div class="product-image skeleton-box"></div>
                    <div class="product-details">
                        <h3 class="product-name skeleton-box"></h3>
                        <p class="product-maker skeleton-box"></p>
                        <div class="product-price">
                            <p class="price-label skeleton-box"></p>
                            <p class="price-value skeleton-box"></p>
                        </div>
                        <div class="product-price-actions">
                            <div class="product-actions">
                                <div class="custom-button-wrapper custom-button skeleton-box"></div>
                                <div class="custom-button-wrapper custom-button skeleton-box"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <i class="fa fa-heart-broken trash-icon skeleton-box"></i>
            </div>
        `;
    }
*/

    setTimeout(() => {
        const start = (currentPage - 1) * productsPerPage;
        const end = start + productsPerPage;
        const paginatedProducts = products.slice(start, end);

        productContainer.innerHTML = paginatedProducts.map(product => {
            const datosProducto = product.datosProducto;
            return `
                <div class="product-card" data-product-id="${product.id_producto}" data-client-id="${getDataFromLocalStorage('idCliente')}" data-lst-imagenes='${datosProducto.lst_imagenes}'>
                    <div class="product-info">
                        <div class="product-image">
                            <img src="${datosProducto.imagen_principal}" alt="${datosProducto.nombres_es}">
                        </div>
                        <div class="product-details">
                            <h3 class="product-name">${datosProducto.nombres_es}</h3>
                            <p class="product-maker">
                                Hecho por: ${datosProducto.datos_artesano.nombres} ${datosProducto.datos_artesano.apellidos}
                                <a href="principal-artesano.html?id=${datosProducto.artesano_id}" class="artisan-link">
                                    <i class="fa fa-plus-circle"></i>
                                </a>
                            </p>                            
                            <div class="product-price">
                                <p class="price-label">Precio:</p>
                                <p class="price-value">S/${datosProducto.precio}</p>
                            </div>
                           
                            <div class="product-price-actions">
                                <div class="product-actions">
                                    <div class="custom-button-wrapper custom-button">
                                        <div class="custom-text">Añadir al carrito</div>
                                        <span class="custom-icon">
                                            <svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <div class="custom-button-wrapper custom-button">
                                        <div class="custom-text">Ver Detalles</div>
                                        <span class="custom-icon">
                                            <svg viewBox="0 0 16 16" class="bi bi-eye" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 3.5a5.5 5.5 0 0 1 5.5 5.5A5.5 5.5 0 0 1 8 14.5a5.5 5.5 0 0 1-5.5-5.5A5.5 5.5 0 0 1 8 3.5zm0 1a4.5 4.5 0 0 0-4.5 4.5A4.5 4.5 0 0 0 8 13.5a4.5 4.5 0 0 0 4.5-4.5A4.5 4.5 0 0 0 8 4.5zm0 1a3.5 3.5 0 0 1 3.5 3.5A3.5 3.5 0 0 1 8 12.5a3.5 3.5 0 0 1-3.5-3.5A3.5 3.5 0 0 1 8 5.5zm0 1a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 8 11.5a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 8 6.5z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <i class="fa fa-heart-broken trash-icon btn_EliminarDeseado"></i>
                </div>
            `;
        }).join('');
        document.querySelectorAll('.custom-button-wrapper.custom-button .custom-text').forEach(button => {
            if (button.textContent.trim() === 'Ver Detalles') {
                button.parentElement.addEventListener('click', function() {
                    const productId = this.closest('.product-card').dataset.productId;
                    window.location.href = `principal-detalle.html?id=${productId}`;
                });
            }
        });
    }, 500);

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

document.getElementById('add-to-wishlist-button').addEventListener('click', async function() {
    let productId = $(this).closest('.product-card').data('product-id');
    let clientId = $(this).closest('.product-card').data('client-id');
    if (clientId) {
        await listarDeseados(clientId, productId);
        await addProductToWishlist(productId, clientId);
        const updatedWishlist = await listarDeseados(clientId);
        updateDeseadosCount(updatedWishlist.data.length);
    }
});
