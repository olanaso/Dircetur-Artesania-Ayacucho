import"./modulepreload-polyfill-3cfb730f.js";import{l as r,_ as o}from"./viewpartials-7a86f681.js";import{h as n}from"./init-52a8aa54.js";import{b as i}from"./config-ef5f6dbc.js";import{m as s,c as l}from"./navbar-79b7ff75.js";async function c(){try{return await(await fetch(`${i}/categoria`,{method:"GET"})).json()}catch(e){console.error("Error:",e)}}n();(async function(){let e=[{path:"partials/shared/menuNavCliente.html",container:"main-header"},{path:"partials/shared/footerCliente.html",container:"main-footer"}];try{await r(e),o(()=>import("./common-8d3221b9.js"),[]),console.log("Las vistas parciales se han cargado correctamente!"),d()}catch(t){console.error(t)}})();function d(){s();const e=document.getElementById("cerrar-sesion-link");e&&e.addEventListener("click",t=>{t.preventDefault(),l()})}$(document).ready(async function(){await m(),$(".Modern-Slider").length&&$(".Modern-Slider").slick({dots:!0,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:2e3,prevArrow:$(".PrevArrow"),nextArrow:$(".NextArrow")})});async function m(){const e=await c();$("#owl-top-features").empty();let t="";for(let a of e)t+=`
            <div class="item car-item">
                <div class="thumb-content">
                    <a href="principal-detalle.html"><img src=${a.foto_referente} alt=${a.abreviatura}></a>
                </div>
                <div class="down-content">
                    <a href="principal-detalle.html"><h4>${a.denominacion}</h4></a> 
                </div>
            </div>`;$("#owl-top-features").append(t),$("#owl-top-features").owlCarousel({items:3,loop:!0,margin:10,nav:!0,autoplay:!0,autoplayTimeout:5e3,autoplayHoverPause:!0})}document.addEventListener("DOMContentLoaded",()=>{});
