// Modificar el archivo principal para usar la nueva función
import { filtrarproductosporcategoria, listarProductos, obtenerTodosLosArtesanos } from './api';
import { validarHTML5 } from '../utils/validateForm';
import { saveDataToLocalStorage } from '../utils/config';
import { obtenerParametrosURL } from '../utils/path';
const categoriaMap = {
    101: 'Textilería',
    108: 'Cerámica',
    113: 'Piedra tallada'
};
document.addEventListener('DOMContentLoaded', async () => {
    const productos = await listarProductos();
    const artesanos = await obtenerTodosLosArtesanos();

    // Create a dictionary of artisans
    const artesanosDict = {};
    artesanos.forEach(artesano => {
        artesanosDict[artesano.id] = artesano;
    });

    // Map products with their respective artisans
    productos.forEach(producto => {
        producto.artesano = artesanosDict[producto.artesano_id];
    });

    cargarProductos(productos);

    console.log(productos);
    console.log(artesanos);

    const filterButton = document.getElementById('filterButton');
    const clearButton = document.getElementById('clearButton');

    if (!filterButton) {
        console.error('filterButton not found');
        return;
    }
    if (!clearButton) {
        console.error('clearButton not found');
        return;
    }

    // Evento para el botón de filtrar
    filterButton.addEventListener('click', async (event) => {
        event.preventDefault();
        setLoadingState(true);
        const filteredProducts = await filtrarProductos(productos);
        cargarProductos(filteredProducts);
        setLoadingState(false);
    });

    // Evento para el botón de limpiar filtros
    clearButton.addEventListener('click', (event) => {
        event.preventDefault();
        setLoadingState(true);
        clearFilters();
        cargarProductos(productos);
        setLoadingState(false);
    });

    // Evento para el botón de Enter
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            filterButton.click();
        }
    });
});

// Función para establecer el estado de carga
function setLoadingState(isLoading) {
    const filterButton = document.getElementById('filterButton');
    const clearButton = document.querySelector('.fa-times').parentElement;

    if (isLoading) {
        filterButton.innerHTML = 'Buscando';
        filterButton.classList.add('loading');
        filterButton.disabled = true;
        clearButton.classList.add('move-right');
    } else {
        filterButton.innerHTML = '<i class="fa fa-filter"></i>';
        filterButton.classList.remove('loading');
        filterButton.disabled = false;
        clearButton.classList.remove('move-right');
    }
}

// Función para filtrar productos
async function filtrarProductos(productos) {
    const filterName = document.getElementById('filterName').value.toLowerCase();
    const filterPriceMin = parseFloat(document.getElementById('filterPriceMin').value) || 0;
    const filterPriceMax = parseFloat(document.getElementById('filterPriceMax').value) || Infinity;
    const categoriaId = document.getElementById('category-filter').value;

    const artesanos = await obtenerTodosLosArtesanos();
    const artesanosDict = {};
    artesanos.forEach(artesano => {
        artesanosDict[artesano.id] = artesano;
    });

    let filteredProducts = productos.filter(producto => {
        const nombre = producto.nombres_es.toLowerCase();
        const precio = parseFloat(producto.precio.replace('S/.', ''));
        const categoriaMatch = !categoriaId || producto.categoriaid === categoriaId;
        return nombre.includes(filterName) && precio >= filterPriceMin && precio <= filterPriceMax && categoriaMatch;
    });

    if (categoriaId) {
        const result = await filtrarproductosporcategoria(categoriaId);
        filteredProducts = result.data.filter(producto => {
            const nombre = producto.nombres_es.toLowerCase();
            const precio = parseFloat(producto.precio.replace('S/.', ''));
            return nombre.includes(filterName) && precio >= filterPriceMin && precio <= filterPriceMax;
        });
    }

    filteredProducts.forEach(producto => {
        producto.artesano = artesanosDict[producto.artesano_id];
    });

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(filteredProducts);
        }, 500);
    });
}

// Evento para el botón de filtrar
filterButton.addEventListener('click', async (event) => {
    event.preventDefault();
    setLoadingState(true);
    currentPage = 1; // Resetear a la página 1
    const filteredProducts = await filtrarProductos(productos);
    cargarProductos(filteredProducts);
    setLoadingState(false);
});

// Función para limpiar filtros
function clearFilters() {
    setLoadingState(true);
    document.getElementById('filterName').value = '';
    document.getElementById('filterPriceMin').value = '';
    document.getElementById('filterPriceMax').value = '';
    document.getElementById('category-filter').value = '';
    setLoadingState(false);
}

const itemsPerPage = 9;
let currentPage = 1;
let totalPages = 1;

// Función para cargar productos
async function cargarProductos(productos) {
    totalPages = Math.ceil(productos.length / itemsPerPage);
    renderPage(productos, currentPage);
    updatePaginationControls(productos);
}

// Función para renderizar la página
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
        function formatName(name) {
            return name.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()).replace(/ - /g, ' ');
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
                     <span>S/. ${producto.precio}</span>
                     <p>Artesano: ${producto.artesano ? formatName(producto.artesano.completo) : 'Desconocido'}</p>
                     <p>Categoria: ${categoriaMap[producto.categoria_id] || 'Desconocida'}</p>
                      <div class="similar-info">
                <div class="primary-button">
                    <a href="principal-detalle.html?id=${producto.id}">Ver más</a>
                </div>
                <div class="icon-container">
                <a href="añadir-deseados.html"><i class="fa fa-heart" id="navbar-heart-icon"></i><span id="deseados-count" class="deseados-count"></span></a>
                    <i class="fas fa-shopping-cart"></i>
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

// Función para actualizar los controles de paginación
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
        const firstButton = document.createElement('button');
        firstButton.textContent = '<<';
        firstButton.addEventListener('click', () => {
            currentPage = 1;
            renderPage(productos, currentPage);
            updatePaginationControls(productos);
            window.scrollTo({ top: 300, behavior: 'smooth' });
        });
        paginationContainer.appendChild(firstButton);

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

        const lastButton = document.createElement('button');
        lastButton.textContent = '>>';
        lastButton.addEventListener('click', () => {
            currentPage = totalPages;
            renderPage(productos, currentPage);
            updatePaginationControls(productos);
            window.scrollTo({ top: 300, behavior: 'smooth' });
        });
        paginationContainer.appendChild(lastButton);
    }
}