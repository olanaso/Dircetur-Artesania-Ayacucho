import { listarCategorias, listarProductos } from './api';
import { validarHTML5 } from '../utils/validateForm';
import { saveDataToLocalStorage } from '../utils/config';
import { hideLoading } from '../utils/init';
import { obtenerParametrosURL } from '../utils/path';

document.addEventListener('DOMContentLoaded', async () => {
    const productos = await listarProductos();
    cargarProductos(productos);

    document.getElementById('filterButton').addEventListener('click', (event) => {
        event.preventDefault();
        const filteredProducts = filtrarProductos(productos);
        cargarProductos(filteredProducts);
    });

    document.getElementById('clearButton').addEventListener('click', (event) => {
        event.preventDefault();
        clearFilters();
        cargarProductos(productos);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            document.getElementById('filterButton').click();
        }
    });
});

function filtrarProductos(productos) {
    const filterName = document.getElementById('filterName').value.toLowerCase();
    const filterPriceMin = parseFloat(document.getElementById('filterPriceMin').value) || 0;
    const filterPriceMax = parseFloat(document.getElementById('filterPriceMax').value) || Infinity;

    return productos.filter(producto => {
        const nombre = producto.nombres_es.toLowerCase();
        const precio = parseFloat(producto.precio.replace('S/.', ''));
        return nombre.includes(filterName) && precio >= filterPriceMin && precio <= filterPriceMax;
    });
}

function clearFilters() {
    document.getElementById('filterName').value = '';
    document.getElementById('filterPriceMin').value = '';
    document.getElementById('filterPriceMax').value = '';
}

const itemsPerPage = 9;
let currentPage = 1;
let totalPages = 1;

async function cargarProductos(productos) {
    totalPages = Math.ceil(productos.length / itemsPerPage);
    renderPage(productos, currentPage);
    updatePaginationControls(productos);
}

function renderPage(productos, page) {
    $('#contenedorProductos').empty();
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = productos.slice(start, end);
    let productCount = 0;

    pageItems.forEach(producto => {
        const imagenesProd = JSON.parse(JSON.parse(producto.lst_imagenes.replace(/\/\//g, '/')));
        let currentImageIndex = 0;
        let intervalId;

        for (let imagen of imagenesProd) {
            if (imagen.src.startsWith('http:/') && !imagen.src.startsWith('http://')) {
                imagen.src = imagen.src.replace('http:/', 'http://');
            }
        }

        const productHtml = `
            <div class="col-md-4 col-sm-6">
                <div class="product-card wow fadeIn animated" data-wow-duration="0.75s" style="visibility: visible;-webkit-animation-duration: 0.75s; -moz-animation-duration: 0.75s; animation-duration: 0.75s;">
                    <div class="thumb-content">
                        <div class="product-banner">
                            <h3>Nuevo</h3>
                        </div>
                        <div class="thumb-inner">
                            <a href="principal-detalle.html?id=${producto.id}">
                                <img class="product-image" src="" alt="" style="display: none;">
                            </a>
                        </div>
                    </div>
                    <div class="product-details">
                        <h4>${producto.nombres_es}</h4>
                        <span>S/. ${producto.precio}</span>
                        <div class="similar-info">
                            <div class="primary-button">
                                <a href="principal-detalle.html?id=${producto.id}">Ver más</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        $('#contenedorProductos').append(productHtml);

        const productCard = $('#contenedorProductos').children().last().find('.product-card');
        const productImage = productCard.find('.product-image');

        const mainImage = new Image();
        mainImage.src = producto.imagen_principal;
        mainImage.onload = () => {
            productImage.attr('src', mainImage.src).show();
        };

        productCard.on('mouseover', () => {
            intervalId = setInterval(() => {
                currentImageIndex = (currentImageIndex + 1) % imagenesProd.length;
                productImage.attr('src', imagenesProd[currentImageIndex].src);
            }, 800);
        });

        productCard.on('mouseout', () => {
            clearInterval(intervalId);
            productImage.attr('src', producto.imagen_principal);
        });
    });

    const textContentElement = document.querySelector('.contador-productos');
    textContentElement.innerHTML = `
        <h2>${productos.length}</h2>
        <span>Resultados de busqueda</span>
    `;
}

function updatePaginationControls(productos) {
    const paginationContainer = document.getElementById('paginationControls');
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(productos.length / itemsPerPage);
    const maxPagesToShow = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Anterior';
        prevButton.addEventListener('click', () => {
            currentPage--;
            renderPage(productos, currentPage);
            updatePaginationControls(productos);
            window.scrollTo({ top: 300, behavior: 'smooth' });
        });
        paginationContainer.appendChild(prevButton);
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderPage(productos, currentPage);
            updatePaginationControls(productos);
            window.scrollTo({ top: 300, behavior: 'smooth' });
        });
        paginationContainer.appendChild(pageButton);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Siguiente';
        nextButton.addEventListener('click', () => {
            currentPage++;
            renderPage(productos, currentPage);
            updatePaginationControls(productos);
            window.scrollTo({ top: 300, behavior: 'smooth' });
        });
        paginationContainer.appendChild(nextButton);
    }
}
