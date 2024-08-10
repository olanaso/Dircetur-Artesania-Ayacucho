
import { validarHTML5 } from '../utils/validateForm';
import {saveDataToLocalStorage} from '../utils/config'
import {hideLoading} from '../utils/init'
import {obtenerParametrosURL} from '../utils/path'
import {login, listarSliders, listarCategorias} from './api'
import './flaticon.css'
import './main.css'
import './owl-carousel.css'
import './sliderPro.css'
import './animated.css'
import './font-awesome.min.css'
 

$(document).ready(async function(){
    //await cargarSliders();
    await cargarCategorias();
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
    const sliders =  await listarSliders(1, 10000)
    $('#modernSlider').empty()
    let filas = ''
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
        </div>`
    }
    $('#modernSlider').append(filas)
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

  async function cargarCategorias(){
    const categorias =  await listarCategorias()
    //console.log(categorias)
    $('#owl-top-features').empty()
    let cards = ''
    for (let data of categorias) {
        //console.log(data);
        
      //let cleanUrl = data.imagen.replace(/"/g, '');
        cards += `
            <div class="item car-item">
                <div class="thumb-content">
                    <a href="principal-detalle.html"><img src=${data.foto_referente} alt=${data.abreviatura}></a>
                </div>
                <div class="down-content">
                    <a href="principal-detalle.html"><h4>${data.denominacion}</h4></a> 
                </div>
            </div>`
        
            //console.log(cards);
            
    }
    $('#owl-top-features').append(cards)

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

  
// Llamar a la función de inicialización del mapa cuando el documento esté listo
//document.addEventListener('DOMContentLoaded', initMap);
document.addEventListener('DOMContentLoaded', () => {
    //cargarSliders()
    //cargarCategorias()
  });