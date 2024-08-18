import { filtrarproductoscategoria, listarCategoria } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaId = urlParams.get('categoriaId') || 'PT';

    // Mapping of categoriaId to denominacion and ruta
    const categoriaMap = {
        'CER': { denominacion: 'Cerámica'},
        'PT': { denominacion: 'Piedra Tallada'},
        'TE': { denominacion: 'Textilería'}
    };

    const categoria = categoriaMap[categoriaId];

    const productContainer = document.getElementById('contenedorProductos');
    const paginationContainer = document.createElement('div');
    paginationContainer.id = 'paginationControls';
    productContainer.parentNode.appendChild(paginationContainer);

    // Actualizar el título segun a la categoria que esta ingresando el usuario
    const headingElement = document.querySelector('.heading-content h2');
    if (headingElement) {
        headingElement.innerHTML = `<h2>PRODUCTOS DE<em> ${categoria.denominacion}</em></h2>`;
    }
    // Actualizar la ruta de los productos en el header
    const breadcrumbElement = document.querySelector('.heading-content p');
    if (breadcrumbElement) {
        breadcrumbElement.innerHTML = `<a href="principal.html">Inicio</a> / <a <em>${categoria.denominacion}</em></a> / <em>Productos</em>`;
    }

    // Obtener los productos de la categoria seleccionada
    const productos = await filtrarproductoscategoria(categoriaId);
    const productosData = productos.data;
    const itemsPerPage = 9;
    let currentPage = 1;

    // Mostrar la cantidad de productos que se estan mostrando
    const productCountElement = document.querySelector('.contador-productos h2');
    if (productCountElement) {
        productCountElement.textContent = `Mostrando ${productosData.length} productos`;
    }

    function renderPage(page) {
        productContainer.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = productosData.slice(start, end);

        pageItems.forEach(producto => {
            const imagenesProd = JSON.parse(JSON.parse(producto.lst_imagenes.replace(/\/\//g, '/')));
            let currentImageIndex = 0;

            for (let imagen of imagenesProd) {
                if (imagen.src.startsWith('http:/') && !imagen.src.startsWith('http://')) {
                    imagen.src = imagen.src.replace('http:/', 'http://');
                }
            }
            // Iterar sobre los productos y mostrarlos en la página
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
                            <a href="principal-detalle.html?id=${producto.id}"><h4>${producto.nombres_es}</h4></a>
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
            productContainer.insertAdjacentHTML('beforeend', productHtml);

            const productCard = productContainer.lastElementChild.querySelector('.product-card');
            const productImage = productCard.querySelector('.product-image');

            const mainImage = new Image();
            mainImage.src = producto.imagen_principal;
            mainImage.onload = () => {
                productImage.src = mainImage.src;
                productImage.style.display = 'block';
            };

            productCard.addEventListener('mouseover', () => {
                const intervalId = setInterval(() => {
                    currentImageIndex = (currentImageIndex + 1) % imagenesProd.length;
                    productImage.src = imagenesProd[currentImageIndex].src;
                }, 800);

                productCard.addEventListener('mouseout', () => {
                    clearInterval(intervalId);
                    productImage.src = producto.imagen_principal;
                }, { once: true });
            });
        });

        renderPaginationControls();
    }

    // Paginacion de los productos
    function renderPaginationControls() {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(productosData.length / itemsPerPage);
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
                renderPage(currentPage);
                renderPaginationControls();
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
                renderPage(currentPage);
                renderPaginationControls();
                window.scrollTo({ top: 300, behavior: 'smooth' });
            });
            paginationContainer.appendChild(pageButton);
        }

        if (currentPage < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Siguiente';
            nextButton.addEventListener('click', () => {
                currentPage++;
                renderPage(currentPage);
                renderPaginationControls();
                window.scrollTo({ top: 300, behavior: 'smooth' });
            });
            paginationContainer.appendChild(nextButton);
        }
    }

    if (Array.isArray(productosData) && productosData.length > 0) {
        renderPage(currentPage);
    } else {
        productContainer.innerHTML = '<p>No hay productos disponibles en esta categoría.</p>';
    }
});