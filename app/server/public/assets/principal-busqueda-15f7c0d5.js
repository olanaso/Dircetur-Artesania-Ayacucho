import"./modulepreload-polyfill-3cfb730f.js";/* empty css             */import"./principal-90e94c9b.js";import{b as n}from"./config-ef5f6dbc.js";import"./viewpartials-7a86f681.js";import"./init-52a8aa54.js";import"./navbar-79b7ff75.js";async function i(a){try{const t=new URLSearchParams(a);return await(await fetch(`${n}/prductosFiltrados?${t}`,{method:"GET"})).json()}catch(t){console.error("Error:",t)}}async function s(a,t){try{return await(await fetch(`${n}/categoria`,{method:"GET"})).json()}catch(e){console.error("Error:",e)}}document.addEventListener("DOMContentLoaded",()=>{l(),d()});async function c(a){$("#contenedorProductos").empty();let t="",e=0;for(let o of a)t+=`
            <div class="col-md-4 col-sm-6">
                <div class="car-item wow fadeIn animated" data-wow-duration="0.75s" style="visibility: visible;-webkit-animation-duration: 0.75s; -moz-animation-duration: 0.75s; animation-duration: 0.75s;">
                    <div class="thumb-content">
                        <div class="car-banner">
                            <a href="principal-detalle.html?id=${o.id}">En Venta</a>
                        </div>
                        <div class="thumb-inner">
                            <a href="principal-detalle.html?id=${o.id}"><img src=${o.imagen_principal} alt=""></a>
                        </div>
                    </div>
                    <div class="down-content">
                        <a href="principal-detalle.html?id=${o.id}"><h4>${o.nombres_es}</h4></a>
                        <span>S/. ${o.precio} </span>
                        <p>${o.resumen_es}</p>
                        <div class="similar-info">
                            <div class="primary-button">
                                <a href="principal-detalle.html?id=${o.id}">Ver más</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`,e++;$("#contenedorProductos").append(t),console.log(`Total products: ${e}`);const r=document.querySelector(".contador-productos");return r.innerHTML=`
        <h2>${e}</h2>
        <span>Resultados de busqueda</span>
    `,e}async function d(){const a={categoria:$("#brand").prop("selectedIndex")=="0"?"":$("#brand option:selected").val(),oferta:"",precio_min:"",precio_max:""},t=await i(a);c(t),console.log("producto: ",t)}async function l(){const a=await s();let t="";const e=document.getElementById("brand");a.forEach(o=>{t+=`<option value="${o.id}">${o.denominacion}</option>`});let r='<option value ="0">Seleccione Categoría</option>'+t;e.innerHTML=r}
