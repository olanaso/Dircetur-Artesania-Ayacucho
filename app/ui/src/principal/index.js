
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
});