
import { validarHTML5 } from '../utils/validateForm';
import {saveDataToLocalStorage} from '../utils/config'
import {hideLoading} from '../utils/init'
import {obtenerParametrosURL} from '../utils/path'
import {login} from './api'
import './flaticon.css'
import './main.css'
import './owl-carousel.css'
import './sliderPro.css'
import './animated.css'
import './font-awesome.min.css'
 

$(document).ready(function(){
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
   initMap();
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

// Llamar a la función de inicialización del mapa cuando el documento esté listo
document.addEventListener('DOMContentLoaded', initMap);