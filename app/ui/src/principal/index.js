import { validarHTML5 } from '../utils/validateForm';
import {saveDataToLocalStorage} from '../utils/config';
import {hideLoading} from '../utils/init';
import {obtenerParametrosURL} from '../utils/path';
import {login, listarSliders, listarCategorias, listarProductosRecientes} from './api';
import './flaticon.css';
import './main.css';
import './owl-carousel.css';
import './sliderPro.css';
import './animated.css';
import './font-awesome.min.css';
import '../../src/Shared/navbar.js';
import {modificarNavbarSegunRol, cerrarSesion} from '../Shared/navbar.js';

import {loadPartials} from "../utils/viewpartials.js";
import {showToast} from "../utils/toast.js";

hideLoading();
// Uso de la función
(async function () {
    let partials = [
        { path: 'partials/shared/menuNavCliente.html', container: 'main-header' },
        { path: 'partials/shared/footerCliente.html', container: 'main-footer' },
    ];
    try {
        await loadPartials(partials);
        import('../utils/common');

        console.log('Las vistas parciales se han cargado correctamente!');

        startApp();
    } catch (e) {
        console.error(e);
    }
})();

function startApp() {
    // Colocar el código que deseas ejecutar después de cargar las vistas parciales.
    modificarNavbarSegunRol();
    const cerrarSesionLink = document.getElementById('cerrar-sesion-link');
    if (cerrarSesionLink) {
        cerrarSesionLink.addEventListener('click', (event) => {
            event.preventDefault();
            cerrarSesion();
        });
    }
}

$(document).ready(async function(){
    //await cargarSliders();
    await cargarCategorias();
    await cargarProductosRecientes();
    if ($('.Modern-Slider').length) {
        $('.Modern-Slider').slick({
            // Tus opciones de configuración aquí
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            prevArrow: $('.PrevArrow'),
            nextArrow: $('.NextArrow')
        });
    }

    //initMap();
});

function initMap() {
    // Coordenadas de ejemplo (Lima, Perú)
    var mymap = L.map('map').setView([-12.046374, -77.042793], 15);

    // Agregar capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    // Agregar marcador personalizado
    var marker = L.marker([-12.046374, -77.042793]).addTo(mymap)
        .bindPopup('¡Aquí estoy!')
        .openPopup();
}

async function cargarSliders(){
    const sliders =  await listarSliders(1, 10000);
    $('#modernSlider').empty();
    let filas = '';
    for (let data of sliders.sliders) {
        let cleanUrl = data.imagen.replace(/"/g, '');
        filas += `
            <div class="item">
            <div class="img-fill">
                <img src="${cleanUrl}" alt="">
                <div class="info">
                    <div>
                        <h5>Ayacucho tiene la mejor opción</h5>
                        <h3>Buscando lo perfecto en <em>Artesanias</em>?</h3>
                        <h6 class="secondary-button">
                            <a href="#">Registrate <i class="fa fa-user-plus"></i></a>
                        </h6>
                    </div>
                </div>
            </div>
        </div>`;
    }
    $('#modernSlider').append(filas);
    $('#modernSlider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: $('.PrevArrow'),
        nextArrow: $('.NextArrow')
    });
}

async function cargarCategorias() {
    const categorias = await listarCategorias();
    $('#owl-top-features').empty();
    let cards = '';
    for (let data of categorias) {
        cards += `
            <div class="item car-item">
              <div class="thumb-content">
               <a href="productos_por_categoria.html?categoriaId=${data.abreviatura}"><img src="${data.foto_referente}" alt="${data.abreviatura}"></a>
              </div>
              <div class="down-content">
               <a href="productos_por_categoria.html?categoriaId=${data.abreviatura}"><h4>${data.denominacion}</h4></a> 
              </div>
           </div>`;
    }
    $('#owl-top-features').append(cards);

    // Reinitialize Owl Carousel
    $("#owl-top-features").owlCarousel({
        items: 3,
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true
    });
}

async function cargarProductosRecientes() {
    const productos = await listarProductosRecientes();
    const container = document.querySelector('.recent-content .row');
    container.innerHTML = '';

    const sortedProductos = productos.sort((a, b) => new Date(b.createdat) - new Date(a.createdat)).slice(0, 6);

    sortedProductos.forEach(producto => {
        const productHTML = `
            <div class="col-md-4 col-sm-6">
                <div class="product-card wow fadeIn animated" data-wow-duration="0.75s">
                    <div class="thumb-inner">
                        <a href="principal-detalle.html?id=${producto.id}"><img src="${producto.imagen_principal}" alt="${producto.nombres_es}"></a>
                    </div>
                    <div class="product-details">
                        <a href="principal-detalle.html?id=${producto.id}">
                            <h4>${producto.nombres_es}</h4>
                        </a>
                        <span>S/ ${producto.precio}</span>
                        <div class="product-card-link">
                            <div class="primary-button">
                                <a href="principal-detalle.html?id=${producto.id}">Ver mas</a>
                            </div>
                        </div>
                    </div>
                    <div class="product-banner">
                        <h3>Nuevo</h3>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', productHTML);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const recentTitle = document.querySelector('.recent-title');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                recentTitle.classList.add('animate');
            }
        });
    });

    observer.observe(recentTitle);
});
document.addEventListener('DOMContentLoaded', () => {
    const recentSection = document.querySelector('.recent-cars');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                recentSection.classList.add('animate');
            }
        });
    });

    observer.observe(recentSection);
});
document.addEventListener('DOMContentLoaded', () => {
    const recentSubtitle = document.querySelector('.recent-subtitle');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                recentSubtitle.classList.add('animate');
            }
        });
    });

    observer.observe(recentSubtitle);
});

document.addEventListener('DOMContentLoaded', () => {
    //cargarSliders();
    //cargarCategorias();
    cargarProductosRecientes();
});