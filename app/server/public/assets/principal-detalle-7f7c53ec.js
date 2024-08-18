import"./modulepreload-polyfill-3cfb730f.js";import"./principal-90e94c9b.js";import{b as c}from"./config-ef5f6dbc.js";import"./viewpartials-7a86f681.js";import"./init-52a8aa54.js";import"./navbar-79b7ff75.js";async function S(r){try{return await(await fetch(`${c}/producto/${r}`,{method:"GET"})).json()}catch(e){console.error("Error:",e)}}async function _(r){try{return await(await fetch(`${c}/artesano/${r}`,{method:"GET"})).json()}catch(e){console.error("Error:",e)}}async function E(r){try{const t=await(await fetch(`${c}/v1/productos/categoria/${r}`,{method:"GET"})).json();return console.log("productos: ",t),t}catch(e){console.error("Error:",e)}}document.addEventListener("DOMContentLoaded",async()=>{await k(),I()});async function k(){const r=y("id"),e=await S(r),t=await _(e.artesano_id);let x={101:"TE",108:"CER",113:"PT"}[e.categoria_id]||e.categoria_id.toString(),s=await E(x);console.log("productosRecomendadosPorCategoria: ",JSON.stringify(s,null,2));const i=document.getElementById("lists-recommenders");if(!i){console.error('Element with id "lists-recommenders" not found.');return}i.innerHTML="";for(let o=0;o<s.length;o++){s[o];const a=document.createElement("div");a.className="producto-item",a.innerHTML=`
                <div>
                    <h4>${e.nombres_es}</h4>
                    <p>Precio: S/. ${e.precio}</p>
                </div>
            `,i.appendChild(a)}const l=JSON.parse(JSON.parse(e.lst_imagenes.replace(/\/\//g,"/")));console.log("imagenesProd: ",l);let d=`<div class="sp-slide" data-index="0">
                <div class="sp-image-container">
                    <img class="sp-image" src="${e.imagen_principal}" alt="Imagen Principal">
                </div>
             </div>`,p=`<div class="sp-thumbnail-container">
                <img class="sp-thumbnail" src="${e.imagen_principal}" alt="Imagen Principal">
              </div>`,m=1;for(let o of l)o.src.startsWith("http:/")&&!o.src.startsWith("http://")&&(o.src=o.src.replace("http:/","http://")),d+=`<div class="sp-slide" data-index="${m}">
                <div class="sp-image-container">
                    <img class="sp-image" src="${o.src}" alt="Imagen ${e.nombres_es}">
                </div>
               </div>`,p+=`<div class="sp-thumbnail-container">
                <img class="sp-thumbnail" src="${o.src}" alt="Imagen ${e.nombres_es}">
               </div>`,m++;$("#slider1").empty().append(d),$("#slider2").empty().append(p),$("#slider1").slick({slidesToShow:1,slidesToScroll:1,arrows:!0,fade:!0,asNavFor:"#slider2",prevArrow:$(".sp-arrow.sp-previous-arrow"),nextArrow:$(".sp-arrow.sp-next-arrow"),initialSlide:0}),$("#slider2").slick({slidesToShow:3,slidesToScroll:1,asNavFor:"#slider1",dots:!0,centerMode:!0,focusOnSelect:!0,prevArrow:$(".sp-arrow.sp-previous-arrow"),nextArrow:$(".sp-arrow.sp-next-arrow"),initialSlide:0}),$("#slider1").slick("slickGoTo",0,!0),$("#slider2").slick("slickGoTo",0,!0),$(".sp-arrow.sp-next-arrow").click(),setTimeout(()=>{$(".sp-arrow.sp-previous-arrow").click()},500);function y(o){return new URLSearchParams(window.location.search).get(o)}const u=JSON.parse(JSON.parse(e.lst_colores)),g=JSON.parse(JSON.parse(e.lst_talla)),f=JSON.parse(JSON.parse(e.lst_ofertas)),b=JSON.parse(JSON.parse(e.lst_otros_costos)),n=JSON.parse(JSON.parse(t.lst_mediospago));if(console.log("coloes: ",n),u.length>0)for(let o of u)$("#Colores").append(`<button id="sizeButton-6-US" type="button" class="size-button selected rebranded red-text" style="background: ${o.color};width: 30px;height: 30px;"> </button>`);else $("#Colores").append("<p>No hay colores disponibles</p>");if(g.length>0)for(let o of g)$("#tallas").append(`<button id="sizeButton-6-US" type="button" class="size-button selected rebranded red-text" >${o.talla} </button>`);else $("#tallas").append("<p>No hay tallas disponibles</p>");if(b.length>0)for(let o of b)$("#otrosCostos").append(`<option value="${o.id}">${o.nombre} (S/ ${o.precio})</option>`);if(e.cantidad>10?$(".stock-info").append(`<p id="cantidadProd" style="margin-bottom: 0;margin-top: 0px !important;">${e.cantidad} disponibles 
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
            </p>`),f.length>0){const o=f.reduce((h,w)=>new Date(h.fechaInicio)>new Date(w.fechaInicio)?h:w),a=new Date,P=new Date(o.fechaInicio),v=new Date(o.fechaFin);a>=P&&a<=v?(console.log("La fecha actual está dentro del rango."),$("#GralProd").append(`<span id="precioProd" style="white-space: nowrap;">S/.${o.precioOfertado} <s style="color: #999;">S/.${e.precio}</s></span>`),$("#oferta").append(`<p style="color: red; margin-top: 0;">En oferta hasta el: ${o.fechaFin}.</p>`)):(console.log("La fecha actual no está dentro del rango."),$("#GralProd").append(`<span id="precioProd" style="white-space: nowrap;">S/. ${e.precio}</span> 
				`))}else $("#GralProd").append(`<span id="precioProd" style="white-space: nowrap;">S/. ${e.precio}</span> 
            `);if(e.igv==1&&$("#GralProd").append('<p  id="igvProd" style="color: red; margin-top: 0;">El precio incluye IGV.</p>'),$("#nombreProd").text(e.nombres_es),$("#resumenProd").text(e.resumen_es),$("#descripcionProd").text(e.descripcion_es),$("#cualidadesProd").text(e.cualidades_es),$("#palabrasClave").text(e.palabra_clave_es),$("#cantPiezas").text(e.numero_piezas_es),$("#medidasProd").text(`Alto: ${e.alto} Ancho: ${e.ancho}`),$("#materialesProd").text(e.materiales_es),$("#pesoProd").text(`${e.peso} Kg.`),$("#tecnicasProd").text(e.tecnicas_es),$("#tiempoElaboracion").text(`${e.tiempo_elaboracion} días`),$("#datosArtesano").append(`
        <div style=" width: 100px; heigth:100px;">
            <img class="sp-image" src="${t.foto1}" alt="" style="width: 100%; border-radius: 50%;">
        </div>
        
        <p id="nombreArtesano" class="m-2">${t.nombres} ${t.apellidos}
            <br>
            <a style="color: red;" href="principal-artesano.html?id=${t.id}">Ver mas... <i class="fas fa-plus-circle"></i></a>
            
        </p>
        

        `),$("#telArtesano").text(t.celular),$("#correoArtesano").text(t.correo),e.precios_envio==1?$("#preciosEnv").append(`
            <p>Precio local: ${e.precio_local}</p>
            <p>Precio nacional: ${e.precio_nacional}</p>
            <p>Precio extranjero: ${e.precio_extranjero}</p>
        `):$("#preciosEnv").append(`
            <p>Coordinar con el artesano sobre el envío</p>
        `),n.length>0)for(let o of n)$("#mediosPago").append(`
                <div style="border:solid 1px #f4c23d; text-align: center;">${o.Pago}</div>
            `);else $("#mediosPago").append(`
            <p>Coordinar con el artesano el medio de pago</p>
        `)}function I(){let e=0;document.getElementById("increment-btn").addEventListener("click",function(){e<10&&(e++,document.getElementById("counter-value").value=e,document.getElementById("decrement-btn").disabled=!1),e===10&&(this.disabled=!0)}),document.getElementById("decrement-btn").addEventListener("click",function(){e>0&&(e--,document.getElementById("counter-value").value=e,document.getElementById("increment-btn").disabled=!1),e===0&&(this.disabled=!0)})}
