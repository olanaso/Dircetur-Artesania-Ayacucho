import{_ as f}from"./preload-helper-101896b7.js";import{h}from"./init-bc9bbeea.js";import{b as n}from"./config-64035b4f.js";import{s as i}from"./toast-8abe4fe9.js";import{l as v}from"./viewpartials-ac66bf27.js";function c(){console.log("modificarNavbarSegunRol function called");try{const e=localStorage.getItem("rol");if(!e)throw new Error("User role not found in localStorage user");if(e==="3"){const t=document.getElementById("user-icon");t&&(t.style.display="block");const r=document.querySelector('li:has(a[href="login-cliente.html"])');r&&(r.style.display="none")}}catch(e){console.error("Error in modificarNavbarSegunRol:",e)}}function w(){localStorage.removeItem("rol"),window.location.href="/login-cliente.html"}function d(e){const t=document.getElementById("deseados-count");t&&(e===0?t.style.display="none":(t.style.display="block",t.textContent=e))}async function y(){const e=localStorage.getItem("idCliente");if(e){const t=await l(e);t&&t.data&&d(t.data.length)}}document.addEventListener("DOMContentLoaded",()=>{c(),y()});async function l(e){try{const t={method:"GET",headers:{"Content-Type":"application/json"}};return await(await fetch(`${n}/v1/productos-favoritos/clientes/${e}`,t)).json()}catch(t){console.error("Error:",t)}}async function P(e,t){const r=`${n}/v1/productos-favoritos`,o={id_producto:e,id_cliente:t};try{const a=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)});if(!a.ok){if(a.status===400){const p=(await a.json()).errors[0].msg;return i(p),null}throw new Error("Network response was not ok")}i("Producto agregado correctamente");const s=await a.json();console.log("Product added to wishlist:",s);const m=await l(t);return d(m.data.length),s}catch(a){throw console.error("There was a problem with the fetch operation:",a),a}}async function O({productId:e,clientId:t}){const r={method:"DELETE",headers:{"Content-Type":"application/x-www-form-urlencoded"}};try{return(await fetch(`${n}/v1/productos-favoritos/${e}/${t}`,r)).ok}catch(o){return console.error("Error al eliminar el producto deseado:",o),!1}}async function g(){try{return await(await fetch(`${n}/categoria`,{method:"GET"})).json()}catch(e){console.error("Error:",e)}}async function b(e){try{const t=new URLSearchParams(e);return await(await fetch(`${n}/prductosFiltrados?${t}`,{method:"GET"})).json()}catch(t){console.error("Error:",t)}}h();(async function(){let e=[{path:"partials/shared/menuNavCliente.html",container:"main-header"},{path:"partials/shared/footerCliente.html",container:"main-footer"}];try{await v(e),f(()=>import("./common-8d3221b9.js"),[]),console.log("Las vistas parciales se han cargado correctamente!"),E()}catch(t){console.error(t)}})();function E(){c();const e=document.getElementById("cerrar-sesion-link");e&&e.addEventListener("click",t=>{t.preventDefault(),w()})}$(document).ready(async function(){await S(),await u(),$(".Modern-Slider").length&&$(".Modern-Slider").slick({dots:!0,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:2e3,prevArrow:$(".PrevArrow"),nextArrow:$(".NextArrow")})});async function S(){const e=await g();$("#owl-top-features").empty();let t="";for(let r of e)t+=`
            <div class="item car-item">
              <div class="thumb-content">
               <a href="productos_por_categoria.html?categoriaId=${r.abreviatura}"><img src="${r.foto_referente}" alt="${r.abreviatura}"></a>
              </div>
              <div class="down-content">
               <a href="productos_por_categoria.html?categoriaId=${r.abreviatura}"><h4>${r.denominacion}</h4></a> 
              </div>
           </div>`;$("#owl-top-features").append(t),$("#owl-top-features").owlCarousel({items:3,loop:!0,margin:10,nav:!0,autoplay:!0,autoplayTimeout:5e3,autoplayHoverPause:!0})}async function u(){const e=await b(),t=document.querySelector(".recent-content .row");t.innerHTML="",e.sort((o,a)=>new Date(a.createdat)-new Date(o.createdat)).slice(0,6).forEach(o=>{const a=`
            <div class="col-md-4 col-sm-6">
                <div class="product-card wow fadeIn animated" data-wow-duration="0.75s">
                    <div class="thumb-inner">
                        <a href="principal-detalle.html?id=${o.id}"><img src="${o.imagen_principal}" alt="${o.nombres_es}"></a>
                    </div>
                    <div class="product-details">
                        <a href="principal-detalle.html?id=${o.id}">
                            <h4>${o.nombres_es}</h4>
                        </a>
                        <span>S/ ${o.precio}</span>
                        <div class="product-card-link">
                            <div class="primary-button">
                                <a href="principal-detalle.html?id=${o.id}">Ver mas</a>
                            </div>
                        </div>
                    </div>
                    <div class="product-banner">
                        <h3>Nuevo</h3>
                    </div>
                </div>
            </div>
        `;t.insertAdjacentHTML("beforeend",a)})}document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".recent-title");new IntersectionObserver(r=>{r.forEach(o=>{o.isIntersecting&&e.classList.add("animate")})}).observe(e)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".recent-cars");new IntersectionObserver(r=>{r.forEach(o=>{o.isIntersecting&&e.classList.add("animate")})}).observe(e)});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelector(".recent-subtitle");new IntersectionObserver(r=>{r.forEach(o=>{o.isIntersecting&&e.classList.add("animate")})}).observe(e)});document.addEventListener("DOMContentLoaded",()=>{u()});export{P as a,O as d,l,d as u};
