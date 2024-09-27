import"./modulepreload-polyfill-3cfb730f.js";import{a as E}from"./index-4fa915dd.js";import{b as l,g as k}from"./config-64035b4f.js";import"./preload-helper-101896b7.js";import"./init-bc9bbeea.js";import"./toast-8abe4fe9.js";import"./viewpartials-ac66bf27.js";async function T(s){try{return await(await fetch(`${l}/producto/${s}`,{method:"GET"})).json()}catch(e){console.error("Error:",e)}}async function I(s){try{return await(await fetch(`${l}/artesano/${s}`,{method:"GET"})).json()}catch(e){console.error("Error:",e)}}async function C(s){try{const o=await(await fetch(`${l}/v1/productos/categoria/${s}`,{method:"GET"})).json();return console.log("productos: ",o),o}catch(e){console.error("Error:",e)}}function O(){return k("idCliente")}document.querySelector(".add-to-wishlist a").addEventListener("click",s=>{s.preventDefault();const e=y("id"),o=O();console.log(`Adding product ${e} to wishlist for client ${o}`),E(e,o)});document.addEventListener("DOMContentLoaded",async()=>{N(),L()});async function N(){const s=y("id"),e=await T(s),o=await I(e.artesano_id);let S={101:"TE",108:"CER",113:"PT",131:"RET",132:"OH"}[e.categoria_id]||e.categoria_id.toString(),c=(await C(S)).data.filter(t=>t.id!==parseInt(s)),d="";for(let t=0;t<c.length;t++){let r=c[t];d+=`
        <a href="principal-detalle.html?id=${r.id}">
        <div class="recommended-product">
        <div class="recommended-product-card">
            <img src="${r.imagen_principal}" alt="${r.nombres_es}">
            <p class="text-limited">${r.nombres_es}</p>
            <p class="text-limited">${r.resumen_es}</p>
            <p class="price-design">S/. ${r.precio}</p>
        </div>
        </div>
        </a>`}document.getElementById("recommended-products").innerHTML=d,$("#recommended-products").slick({slidesToShow:4,slidesToScroll:4,prevArrow:$(".left-arrow"),nextArrow:$(".right-arrow"),touchMove:!0,swipe:!0,draggable:!0,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:3,arrows:!1}},{breakpoint:768,settings:{slidesToShow:2,slidesToScroll:2,arrows:!1}},{breakpoint:480,settings:{slidesToShow:2,slidesToScroll:2,arrows:!1}}]});const p=JSON.parse(JSON.parse(e.lst_imagenes.replace(/\/\//g,"/")));console.log("imagenesProd: ",p);let m=`<div class="sp-slide" data-index="0">
            <div class="sp-image-container">
                <img class="sp-image" src="${e.imagen_principal}" alt="Imagen Principal">
            </div>
         </div>`,u=`<div class="sp-thumbnail-container">
            <img class="sp-thumbnail" src="${e.imagen_principal}" alt="Imagen Principal">
          </div>`,g=1;for(let t of p)t.src.startsWith("http:/")&&!t.src.startsWith("http://")&&(t.src=t.src.replace("http:/","http://")),m+=`<div class="sp-slide" data-index="${g}">
            <div class="sp-image-container">
                <img class="sp-image" src="${t.src}" alt="Imagen ${e.nombres_es}">
            </div>
           </div>`,u+=`<div class="sp-thumbnail-container">
            <img class="sp-thumbnail" src="${t.src}" alt="Imagen ${e.nombres_es}">
           </div>`,g++;$("#slider1").empty().append(m),$("#slider2").empty().append(u),$("#slider1").slick({slidesToShow:1,slidesToScroll:1,arrows:!0,fade:!0,asNavFor:"#slider2",prevArrow:$(".sp-arrow.sp-previous-arrow"),nextArrow:$(".sp-arrow.sp-next-arrow"),initialSlide:0,touchMove:!1,swipe:!1,draggable:!1}),$("#slider2").slick({slidesToShow:3,slidesToScroll:1,asNavFor:"#slider1",dots:!0,centerMode:!0,focusOnSelect:!0,prevArrow:$(".sp-arrow.sp-previous-arrow"),nextArrow:$(".sp-arrow.sp-next-arrow"),initialSlide:0,touchMove:!0,swipe:!0,draggable:!0}),$("#slider1").slick("slickGoTo",0,!0),$("#slider2").slick("slickGoTo",0,!0),$(".sp-arrow.sp-next-arrow").click(),setTimeout(()=>{$(".sp-arrow.sp-previous-arrow").click()},500);const f=JSON.parse(JSON.parse(e.lst_colores)),h=JSON.parse(JSON.parse(e.lst_talla)),b=JSON.parse(JSON.parse(e.lst_ofertas)),w=JSON.parse(JSON.parse(e.lst_otros_costos)),n=JSON.parse(JSON.parse(o.lst_mediospago));if(console.log("coloes: ",n),f.length>0)for(let t of f)$("#Colores").append(`<button id="sizeButton-6-US" type="button" class="size-button selected rebranded red-text" style="background: ${t.color};width: 30px;height: 30px;"> </button>`);else $("#Colores").append("<p>No hay colores disponibles</p>");if(h.length>0)for(let t of h)$("#tallas").append(`<button id="sizeButton-6-US" type="button" class="size-button selected rebranded red-text" >${t.talla} </button>`);else $("#tallas").append("<p>No hay tallas disponibles</p>");if(w.length>0)for(let t of w)$("#otrosCostos").append(`<option value="${t.id}">${t.nombre} (S/ ${t.precio})</option>`);if(e.cantidad>10?$(".stock-info").append(`<p id="cantidadProd" style="margin-bottom: 0;margin-top: 0px !important;">${e.cantidad} disponibles 
                <span id="disponible" style="display: inline-block; background-color: rgb(40 167 69 / 58%); color: white; padding: 3px 8px; border-radius: 5px; margin-left: 5px; cursor: pointer;">
                    En stock
                </span>
            </p>`):e.cantidad>5?$(".stock-info").append(`<p id="cantidadProd" style="margin-bottom: 0;margin-top: 0px !important;">${e.cantidad} disponibles 
                <span id="disponible" style="display: inline-block; background-color: rgb(0 0 255 / 58%); color: white; padding: 3px 8px; border-radius: 5px; margin-left: 5px; cursor: pointer;">
                    Bajo stock
                </span>
            </p>`):$(".stock-info").append(`<p id="cantidadProd" style="margin-bottom: 0;margin-top: 0px !important;">${e.cantidad} disponibles 
                <span id="disponible" style="display: inline-block; background-color: rgb(255 0 0 / 58%); color: white; padding: 3px 8px; border-radius: 5px; margin-left: 5px; cursor: pointer;">
                    Sin stock
                </span>
            </p>`),b.length>0){const t=b.reduce((x,v)=>new Date(x.fechaInicio)>new Date(v.fechaInicio)?x:v),r=new Date,P=new Date(t.fechaInicio),_=new Date(t.fechaFin);r>=P&&r<=_?(console.log("La fecha actual está dentro del rango."),$("#GralProd").append(`<span id="precioProd" style="white-space: nowrap;">S/.${t.precioOfertado} <s style="color: #999;">S/.${e.precio}</s></span>`),$("#oferta").append(`<p style="color: red; margin-top: 0;">En oferta hasta el: ${t.fechaFin}.</p>`)):(console.log("La fecha actual no está dentro del rango."),$("#GralProd").append(`<span id="precioProd" style="white-space: nowrap;">S/. ${e.precio}</span> 
                `))}else $("#GralProd").append(`<span id="precioProd" style="white-space: nowrap;">S/. ${e.precio}</span> 
            `);if(e.igv==1&&$("#GralProd").append('<p  id="igvProd" style="color: red; margin-top: 0;">El precio incluye IGV.</p>'),$("#nombreProd").text(e.nombres_es),$("#resumenProd").text(e.resumen_es),$("#descripcionProd").text(e.descripcion_es),$("#cualidadesProd").text(e.cualidades_es),$("#palabrasClave").text(e.palabra_clave_es),$("#cantPiezas").text(e.numero_piezas_es),$("#medidasProd").text(`Alto: ${e.alto} Ancho: ${e.ancho}`),$("#materialesProd").text(e.materiales_es),$("#pesoProd").text(`${e.peso} Kg.`),$("#tecnicasProd").text(e.tecnicas_es),$("#tiempoElaboracion").text(`${e.tiempo_elaboracion} días`),$("#datosArtesano").append(`
    <div style="width: 120px; height: 120px;">
        <img class="artesano-image" src="${o.foto1}" alt="${o.nombres}" >
    </div>
    <p id="nombreArtesano" class="m-2" style="font-size: 20px; font-weight: 600;" data-artesano-id="${o.id}">
        ${o.nombres} ${o.apellidos}
        <br>
        <a class="ver-mas-btn" href="principal-artesano.html?id=${o.id}" >
            Ver más... <i class="fas fa-plus-circle"></i>
        </a>
    </p>
`),$("#telArtesano").text(o.celular),$("#correoArtesano").text(o.correo),e.precios_envio==1?$("#preciosEnv").append(`
            <p>Precio local: ${e.precio_local}</p>
            <p>Precio nacional: ${e.precio_nacional}</p>
            <p>Precio extranjero: ${e.precio_extranjero}</p>
        `):$("#preciosEnv").append(`
            <p>Coordinar con el artesano sobre el envío</p>
        `),n.length>0)for(let t of n)$("#mediosPago").append(`
                <div style="border:solid 1px #f4c23d; text-align: center;">${t.Pago}</div>
            `);else $("#mediosPago").append(`
            <p>Coordinar con el artesano el medio de pago</p>
        `)}const a=document.getElementsByClassName("accordion");let i;for(i=0;i<a.length;i++)a[i].addEventListener("click",function(){for(let o=0;o<a.length;o++)a[o]!==this&&(a[o].classList.remove("active"),a[o].nextElementSibling.style.maxHeight=null,a[o].querySelector(".icon").classList.remove("rotate"),a[o].querySelector(".icon").textContent="+");this.classList.toggle("active");const s=this.nextElementSibling,e=this.querySelector(".icon");s.style.maxHeight?(s.style.maxHeight=null,e.classList.remove("rotate"),e.textContent="+"):(s.style.maxHeight=s.scrollHeight+"px",e.classList.add("rotate"),e.textContent="-")});function L(){let e=0;document.getElementById("increment-btn").addEventListener("click",function(){e<10&&(e++,document.getElementById("counter-value").value=e,document.getElementById("decrement-btn").disabled=!1),e===10&&(this.disabled=!0)}),document.getElementById("decrement-btn").addEventListener("click",function(){e>0&&(e--,document.getElementById("counter-value").value=e,document.getElementById("increment-btn").disabled=!1),e===0&&(this.disabled=!0)})}function y(s){return new URLSearchParams(window.location.search).get(s)}
