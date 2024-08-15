// app/ui/src/productos_por_categoria/index.js
import { filtrarproductoscategoria } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaId = urlParams.get('categoriaId') || 'PT'; // Default to 'PT' if not provided
    const productos = await filtrarproductoscategoria(categoriaId);
    const productContainer = document.getElementById('contenedorProductos');

    // Log the fetched data to the console for debugging
    console.log('Fetched productos:', productos);

    // Extract the data array from the fetched productos object
    const productosData = productos.data;

    if (Array.isArray(productosData) && productosData.length > 0) {
        for (let i = 0; i < productosData.length; i++) {
            const producto = productosData[i];
            const productHtml = `
               <div class="col-md-4 col-sm-6">
    <div class="product-card wow fadeIn animated" data-wow-duration="0.75s" style="visibility: visible;-webkit-animation-duration: 0.75s; -moz-animation-duration: 0.75s; animation-duration: 0.75s;">
        <div class="thumb-content">
            <div class="product-banner">
                <a href="principal-detalle.html?id=${producto.id}">En Venta</a>
            </div>
            <div class="thumb-inner">
                <a href="principal-detalle.html?id=${producto.id}"><img src="${producto.imagen_principal}" alt=""></a>
            </div>
        </div>
        <div class="product-details">
            <a href="principal-detalle.html?id=${producto.id}"><h4>${producto.nombres_es}</h4></a>
            <span>S/. ${producto.precio} </span>
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
        }
    } else {
        productContainer.innerHTML = '<p>No hay productos disponibles en esta categoría.</p>';
    }
});