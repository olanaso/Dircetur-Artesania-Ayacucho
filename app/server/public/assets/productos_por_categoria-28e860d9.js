import"./modulepreload-polyfill-3cfb730f.js";import{b as L}from"./config-d2c69cb0.js";import"./index-339297ac.js";import"./preload-helper-101896b7.js";import"./init-b7ef0f37.js";import"./toast-8abe4fe9.js";import"./viewpartials-ac66bf27.js";async function M(w){try{const g=await(await fetch(`${L}/v1/productos/categoria/${w}`,{method:"GET"})).json();return console.log("productos: ",g),g}catch(c){console.error("Error:",c)}}document.addEventListener("DOMContentLoaded",async()=>{const c=new URLSearchParams(window.location.search).get("categoriaId")||"PT",y={CER:{denominacion:"Cerámica"},PT:{denominacion:"Piedra Tallada"},TE:{denominacion:"Textilería"}}[c],s=document.getElementById("contenedorProductos"),a=document.createElement("div");a.id="paginationControls",s.parentNode.appendChild(a);const C=document.querySelector(".heading-content h2");C&&(C.innerHTML=`<h2>PRODUCTOS DE<em> ${y.denominacion}</em></h2>`);const P=document.querySelector(".heading-content p");P&&(P.innerHTML=`<a href="principal.html">Inicio</a> / <a <em>${y.denominacion}</em></a> / <em>Productos</em>`);const d=(await M(c)).data,v=9;let e=1;const T=document.querySelector(".contador-productos h2");T&&(T.textContent=`Mostrando ${d.length} productos`);function l(p){s.innerHTML="";const o=(p-1)*v,r=o+v;d.slice(o,r).forEach(t=>{const n=JSON.parse(JSON.parse(t.lst_imagenes.replace(/\/\//g,"/")));let f=0;for(let i of n)i.src.startsWith("http:/")&&!i.src.startsWith("http://")&&(i.src=i.src.replace("http:/","http://"));const I=`
                <div class="col-md-4 col-sm-6">
                    <div class="product-card wow fadeIn animated" data-wow-duration="0.75s" style="visibility: visible;-webkit-animation-duration: 0.75s; -moz-animation-duration: 0.75s; animation-duration: 0.75s;">
                        <div class="thumb-content">
                            <div class="product-banner">
                                <h3>Nuevo</h3>
                            </div>
                            <div class="thumb-inner">
                                <a href="principal-detalle.html?id=${t.id}">
                                    <img class="product-image" src="" alt="" style="display: none;">
                                </a>
                            </div>
                        </div>
                        <div class="product-details">
                            <a href="principal-detalle.html?id=${t.id}"><h4>${t.nombres_es}</h4></a>
                            <span>S/. ${t.precio}</span>
                            <div class="similar-info">
                                <div class="primary-button">
                                    <a href="principal-detalle.html?id=${t.id}">Ver más</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;s.insertAdjacentHTML("beforeend",I);const b=s.lastElementChild.querySelector(".product-card"),h=b.querySelector(".product-image"),E=new Image;E.src=t.imagen_principal,E.onload=()=>{h.src=E.src,h.style.display="block"},b.addEventListener("mouseover",()=>{const i=setInterval(()=>{f=(f+1)%n.length,h.src=n[f].src},800);b.addEventListener("mouseout",()=>{clearInterval(i),h.src=t.imagen_principal},{once:!0})})}),m()}function m(){a.innerHTML="";const p=Math.ceil(d.length/v),o=3;let r=Math.max(1,e-Math.floor(o/2)),u=Math.min(p,r+o-1);if(u-r+1<o&&(r=Math.max(1,u-o+1)),e>1){const t=document.createElement("button");t.textContent="Anterior",t.addEventListener("click",()=>{e--,l(e),m(),window.scrollTo({top:300,behavior:"smooth"})}),a.appendChild(t)}for(let t=r;t<=u;t++){const n=document.createElement("button");n.textContent=t,t===e&&n.classList.add("active"),n.addEventListener("click",()=>{e=t,l(e),m(),window.scrollTo({top:300,behavior:"smooth"})}),a.appendChild(n)}if(e<p){const t=document.createElement("button");t.textContent="Siguiente",t.addEventListener("click",()=>{e++,l(e),m(),window.scrollTo({top:300,behavior:"smooth"})}),a.appendChild(t)}}Array.isArray(d)&&d.length>0?l(e):s.innerHTML="<p>No hay productos disponibles en esta categoría.</p>"});
