import"./modulepreload-polyfill-3cfb730f.js";import{g as m}from"./config-64035b4f.js";import{l as u,u as h,d as b,a as y}from"./index-4fa915dd.js";import{A as w}from"./alert-3bd678b2.js";import{s as p}from"./toast-8abe4fe9.js";import{s as g,h as v}from"./init-bc9bbeea.js";import"./login-cliente-0ebeea33.js";import"./preload-helper-101896b7.js";import"./viewpartials-ac66bf27.js";const L=new w;$(document).ready(function(){f()});let n=[],r=1;const c=3;async function f(){try{g();const e=m("idCliente"),t=await u(e);console.log(t),n=t.data,l(),P(),h(n.length)}catch(e){console.error(e)}finally{v()}}function l(){const e=document.querySelector(".product-list");if(e.innerHTML="",n.length===0){const t=document.querySelector(".title"),o=document.querySelector("hr");t.style.display="none",o.style.display="none",e.innerHTML=`
        <div class="no-products">
            <img src="../../public/img/broken-heart.png" class="broken-heart-img" alt="Broken Heart">
            <h2>Oops... aún no has agregado productos a tu lista de deseados</h2>
            <p>Presiona el siguiente botón para <em>explorar ahora</em> nuestros productos</p>
            <button id="explore-products-button" class="explore-button">
                <i class="fa fa-search"></i> Explorar Productos
            </button>
        </div>
    `,document.getElementById("explore-products-button").addEventListener("click",function(){const a=this;a.textContent="Redirigiéndote...",setTimeout(()=>{window.location.href="principal-busqueda.html"},1e3)});return}setTimeout(()=>{const t=(r-1)*c,o=t+c,a=n.slice(t,o);e.innerHTML=a.map(i=>{const s=i.datosProducto;return`
                <div class="product-card" data-product-id="${i.id_producto}" data-client-id="${m("idCliente")}" data-lst-imagenes='${s.lst_imagenes}'>
                    <div class="product-info">
                        <div class="product-image">
                            <img src="${s.imagen_principal}" alt="${s.nombres_es}">
                        </div>
                        <div class="product-details">
                            <h3 class="product-name">${s.nombres_es}</h3>
                            <p class="product-maker">
                                Hecho por: ${s.datos_artesano.nombres} ${s.datos_artesano.apellidos}
                                <a href="principal-artesano.html?id=${s.artesano_id}" class="artisan-link">
                                    <i class="fa fa-plus-circle"></i>
                                </a>
                            </p>                            
                            <div class="product-price">
                                <p class="price-label">Precio:</p>
                                <p class="price-value">S/${s.precio}</p>
                            </div>
                           
                            <div class="product-price-actions">
                                <div class="product-actions">
                                    <div class="custom-button-wrapper custom-button">
                                        <div class="custom-text">Añadir al carrito</div>
                                        <span class="custom-icon">
                                            <svg viewBox="0 0 16 16" class="bi bi-cart2" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                    <div class="custom-button-wrapper custom-button">
                                        <div class="custom-text">Ver Detalles</div>
                                        <span class="custom-icon">
                                            <svg viewBox="0 0 16 16" class="bi bi-eye" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M8 3.5a5.5 5.5 0 0 1 5.5 5.5A5.5 5.5 0 0 1 8 14.5a5.5 5.5 0 0 1-5.5-5.5A5.5 5.5 0 0 1 8 3.5zm0 1a4.5 4.5 0 0 0-4.5 4.5A4.5 4.5 0 0 0 8 13.5a4.5 4.5 0 0 0 4.5-4.5A4.5 4.5 0 0 0 8 4.5zm0 1a3.5 3.5 0 0 1 3.5 3.5A3.5 3.5 0 0 1 8 12.5a3.5 3.5 0 0 1-3.5-3.5A3.5 3.5 0 0 1 8 5.5zm0 1a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 8 11.5a2.5 2.5 0 0 0 2.5-2.5A2.5 2.5 0 0 0 8 6.5z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <i class="fa fa-heart-broken trash-icon btn_EliminarDeseado"></i>
                </div>
            `}).join(""),document.querySelectorAll(".custom-button-wrapper.custom-button .custom-text").forEach(i=>{i.textContent.trim()==="Ver Detalles"&&i.parentElement.addEventListener("click",function(){const s=this.closest(".product-card").dataset.productId;window.location.href=`principal-detalle.html?id=${s}`})})},500)}function P(){const e=Math.ceil(n.length/c),t=document.querySelector(".page-numbers");t.innerHTML="";for(let o=1;o<=e;o++){const a=document.createElement("button");a.classList.add("page-number"),a.textContent=o,a.addEventListener("click",()=>{r=o,l(),d()}),t.appendChild(a)}d()}function d(){const e=Math.ceil(n.length/c);document.querySelectorAll(".page-number").forEach((o,a)=>{o.classList.remove("active"),a+1===r&&o.classList.add("active")}),document.querySelector(".btn-prev").style.display=r>1?"inline-block":"none",document.querySelector(".btn-next").style.display=r<e?"inline-block":"none"}document.querySelector(".btn-prev").addEventListener("click",()=>{r>1&&(r--,l(),d())});document.querySelector(".btn-next").addEventListener("click",()=>{const e=Math.ceil(n.length/c);r<e&&(r++,l(),d())});$(document).on("click",".btn_EliminarDeseado",async function(e){L.createAlertDialog("confirm","Confirmar Alerta","¿Estás seguro de que deseas eliminar este producto de tus deseados?","Cancelar","Continuar",async()=>{try{e.preventDefault(),g();let t=$(this).closest(".product-card").data("product-id"),o=$(this).closest(".product-card").data("client-id");await b({productId:t,clientId:o})?(p("Producto eliminado de tus deseados correctamente"),f()):p("Ocurrió un error.")}catch(t){console.error("Error al eliminar el producto deseado:",t)}finally{v()}})});document.getElementById("add-to-wishlist-button").addEventListener("click",async function(){let e=$(this).closest(".product-card").data("product-id"),t=$(this).closest(".product-card").data("client-id");if(t){await u(t),await y(e,t);const o=await u(t);h(o.data.length)}});
