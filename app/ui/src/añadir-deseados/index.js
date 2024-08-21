import { getDataFromLocalStorage, saveDataToLocalStorage } from "../utils/config.js";
import { listarDeseados, removeProductFromWishlist } from "./api.js";
import { AlertDialog } from "../utils/alert";
const alertDialog = new AlertDialog();

$(document).ready(function () {
    ObtenerDeseados();
});

let products = [];

async function ObtenerDeseados() {
    try {
        const response = await listarDeseados(getDataFromLocalStorage('idCliente'));
        console.log(response);

        products = response.data;
        renderProducts();
    } catch (e) {
        console.error(e);
    }
}

function renderProducts() {
    const productContainer = document.querySelector('.product-list');

    productContainer.innerHTML = products.map(product => {
        const datosProducto = product.datosProducto;
        return `
            <div class="product-card" data-product-id="${product.id_producto}" data-lst-imagenes='${datosProducto.lst_imagenes}'>
                <div class="product-image">
                    <i class="fa fa-trash trash-icon"></i>
                    <img src="${datosProducto.imagen_principal}" alt="${datosProducto.nombres_es}">
                </div>
                <div class="product-details">
                    <h3 class="product-name">${datosProducto.nombres_es}</h3>
                    <p class="product-maker">Hecho por: ${datosProducto.datos_artesano.nombres} ${datosProducto.datos_artesano.apellidos}</p>
                </div>
                <div class="product-price">
                    <p class="price-label">Precio:</p>
                    <p class="price-value">S/${datosProducto.precio}</p>
                </div>
            </div>
        `;
    }).join('');

    // Add event listeners for hover effects and delete functionality
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const trashIcon = card.querySelector('.trash-icon');
        $(trashIcon).on('click', async function(e) {
            alertDialog.createAlertDialog(
                'confirm',
                'Confirmar Alerta',
                '¿Estás seguro de que deseas eliminar el producto?',
                'Cancelar',
                'Continuar',
                async() => {
                    try {
                        e.preventDefault();
                        const productId = card.getAttribute('data-product-id');
                        const clientId = getDataFromLocalStorage('idCliente');
                        const result = await removeProductFromWishlist(productId, clientId);
                        if (result) {
                            products = products.filter(product => product.id_producto !== productId);
                            saveDataToLocalStorage('listadeseados', products); // Save updated products to localStorage
                            renderProducts(); // Re-render the product list
                        } else {
                            console.error('Error removing product from wishlist');
                        }
                    } catch (error) {
                        console.error('Error removing product from wishlist:', error);
                    }
                }
            );
        });
    });
}