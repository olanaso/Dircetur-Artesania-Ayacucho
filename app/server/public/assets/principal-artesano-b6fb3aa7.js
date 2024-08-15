import"./modulepreload-polyfill-3cfb730f.js";import{l as u,_ as m}from"./viewpartials-7a86f681.js";import{h}from"./init-52a8aa54.js";import{b as c}from"./config-ef5f6dbc.js";import"./navbar-79b7ff75.js";async function f(e){try{return await(await fetch(`${c}/artesano/${e}`,{method:"GET"})).json()}catch(t){console.error("Error:",t)}}async function v(e){try{return await(await fetch(`${c}/v1/productos/artesanos/${e}`,{method:"GET"})).json()}catch(t){console.error("Error:",t)}}h();document.addEventListener("DOMContentLoaded",()=>{w()});$(document).ready(async function(){await b(),$(".Modern-Slider").length&&$(".Modern-Slider").slick({dots:!0,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:2e3,prevArrow:$(".PrevArrow"),nextArrow:$(".NextArrow")})});(async function(){let e=[{path:"partials/shared/menuNavCliente.html",container:"main-header"},{path:"partials/shared/footerCliente.html",container:"main-footer"}];try{await u(e),m(()=>import("./common-8d3221b9.js"),[]),console.log("Las vistas parciales se han cargado correctamente!"),startApp()}catch(t){console.error(t)}})();function d(e){return new URLSearchParams(window.location.search).get(e)}async function w(){const e=await f(d("id"));console.log(" >DATA artesano: ",e);const t=JSON.parse(JSON.parse(e.lst_taller)),a=JSON.parse(JSON.parse(e.lst_videoenlace)),s=JSON.parse(JSON.parse(e.lst_especialidadtecnicas)),n=JSON.parse(JSON.parse(e.lst_reconocimientos)),o=s[0],r=[],l=o.desotro;o.piedra===1&&r.push("piedra"),o.ceramica===1&&r.push("ceramica"),o.talabarteria===1&&r.push("talabarteria"),o.otro===1&&l&&r.push(l);const p=r.join(" , ");if($("#foto1Artesano").attr("src",e.foto1).show(),$("#foto2Artesano").attr("src",e.foto2).show(),$("#celularArtesano").text(`+51 ${e.celular}`),$("#calleArtesano").text(`${e.calle}`),$("#namesArtesano").text(`${e.nombres} ${e.apellidos}`),$("#correoArtesano").text(`${e.correo}`),$("#lugarProcArtesano").text(`${e.lugarProcedencia}`),$("#nombreTaller").text(t[0].nombretaller),$("#rucTaller").text(t[0].ructaller),$("#direccionTaller").text(t[0].direccionfisica),$("#atencionTaller").text(t[0].horarioatencion),$("#habilidades").text(s[0].descripcionhabilidades),$("#tiposArtesania").text(s[0].tipoartesania),$("#lineaArtesanal").text(p),y(t[0].latitud,t[0].longitud),a.length>0&&$("#videoArtesano").attr("src",a[0].src),n.length>0)for(let i of n)$("#listReconocimientos").append(`
          <div class="sep-section-heading">
              <div class="certificate">
                  <div class="title">${i.Título}</div>
                  <div class="subtitle">Otorgado por ${i.Entidad} </div>
                  <div class="content">
                      ${i.Descripcion}
                  </div>
              </div>
          </div>
      `)}function y(e,t){var a=L.map("map").setView([e,t],15);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(a),L.marker([e,t]).addTo(a).bindPopup("¡Aquí estoy!").openPopup()}async function b(){const e=await v(d("id"));$("#owl-top-features").empty();let t="";for(let a of e.data)t+=`
    <div class="item car-item">
    <div class="car-item wow fadeIn animated" data-wow-duration="0.75s"
      style="visibility: visible;">
      <div class="thumb-content" style="position: relative;">
        <div class="thumb-inner" style="position: relative;">
          <a href="principal-detalle.html"><img src=${a.imagen_principal}
              alt=""></a>
          <div class="car-banner"
            style="position: absolute;top: 96%;left: 20%;transform: translate(-50%, -50%);">
            <a href="principal-detalle.html" class="car-banner-link"
              style="background-color: #f4c23d;border-radius: 3px;color: #1e1e1e;font-size: 13px;font-weight: 700;text-transform: uppercase;width: 85px;height: 36px;text-align: center;line-height: 36px;display: inline-block;">En
              venta</a>
          </div>
        </div>
      </div>
      <div class="down-content">
        <a href="principal-detalle.html">
          <h4>${a.nombres_es.length>20?a.nombres_es.slice(0,20)+"...":a.nombres_es}</h4>
        </a>
        <span>S/. ${a.precio}</span>
        <p>${a.categoria_producto.denominacion}</p>
      </div>
    </div>
  </div>`;$("#owl-top-features2").append(t),$("#owl-top-features2").owlCarousel({items:5,loop:!0,margin:10,nav:!0,autoplay:!0,autoplayTimeout:5e3,autoplayHoverPause:!0})}
