import"./modulepreload-polyfill-3cfb730f.js";import"./index-4fa915dd.js";import{h as m}from"./init-bc9bbeea.js";import{b as l}from"./config-64035b4f.js";import"./preload-helper-101896b7.js";import"./toast-8abe4fe9.js";import"./viewpartials-ac66bf27.js";async function h(e){try{return await(await fetch(`${l}/artesano/${e}`,{method:"GET"})).json()}catch(t){console.error("Error:",t)}}async function f(e){try{return await(await fetch(`${l}/v1/productos/artesanos/${e}`,{method:"GET"})).json()}catch(t){console.error("Error:",t)}}m();document.addEventListener("DOMContentLoaded",()=>{g(),A()});function d(e){return new URLSearchParams(window.location.search).get(e)}async function g(){const e=await h(d("id"));console.log(" >DATA artesano: ",e);const t=JSON.parse(JSON.parse(e.lst_taller)),o=JSON.parse(JSON.parse(e.lst_videoenlace)),a=JSON.parse(JSON.parse(e.lst_especialidadtecnicas)),n=JSON.parse(JSON.parse(e.lst_reconocimientos)),s=a[0],i=[],c=s.desotro;s.piedra===1&&i.push("piedra"),s.ceramica===1&&i.push("ceramica"),s.talabarteria===1&&i.push("talabarteria"),s.otro===1&&c&&i.push(c);const p=i.join(" , ");if($("#nombreArtesano").text(`${e.nombres}`),$("#foto1Artesano").attr("src",e.foto1).show(),$("#foto2Artesano").attr("src",e.foto2).show(),$("#celularArtesano").text(`+51 ${e.celular}`),$("#calleArtesano").text(`${e.calle?e.caller:"Asoc. Artesanos"}`),$("#namesArtesano").text(`${e.nombres} ${e.apellidos}`),$("#correoArtesano").text(`${e.correo}`),$("#lugarProcArtesano").text(`${e.lugarProcedencia?e.lugarProcedencia:"Ayacucho-Huamanga"}`),$("#nombreTaller").text(t[0].nombretaller),$("#rucTaller").text(t[0].ructaller),$("#direccionTaller").text(t[0].direccionfisica),$("#atencionTaller").text(t[0].horarioatencion),$("#habilidades").text(a[0].descripcionhabilidades),$("#tiposArtesania").text(a[0].tipoartesania),$("#lineaArtesanal").text(p),w(t[0].latitud,t[0].longitud),o.length>0){const r=o[0].src;console.log("> url",r);const u=r.replace("watch?v=","embed/");$("#videoArtesano").attr("src",u).show()}if(n.length>0)for(let r of n)$("#listReconocimientos").append(`
          <div class="sep-section-heading">
              <div class="certificate-artesano">
                  <div class="title">${r.Título} </div>
                  <div class="subtitle">Otorgado por ${r.Entidad} </div>
                  <div class="content">
                      ${r.Descripcion}
                  </div>
              </div>
          </div>
      `)}function w(e,t){var o=L.map("map").setView([e,t],15);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(o),L.marker([e,t]).addTo(o).bindPopup("¡Aquí estoy!").openPopup()}async function A(){const e=await f(d("id"));console.log("> CANTD PRODUCT: ",e.data.length);let t="";for(let a of e.data)t+=`
<a href="principal-detalle.html?id=${a.id}" style="text-decoration: none;">
    <div class="productos-artesano">
        <div class="productos-artesano-card">
            <img src="${a.imagen_principal}" alt="Producto">
            <p class="text-limited">${a.nombres_es}</p>
            <p class="text-limited"><strong>Precio:</strong> S/. ${a.precio}</p>
            <p class="text-limited text-limited-category">${a.categoria_producto.denominacion}</p>
        </div>
    </div>
`;$("#products-artesano").html(t);function o(){$("#products-artesano").not(".slick-initialized").slick({slidesToShow:4,slidesToScroll:4,autoplay:!0,autoplaySpeed:2e3,prevArrow:$("#left-arrow"),nextArrow:$("#right-arrow"),responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:3}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]})}o(),$(window).on("resize",function(){$("#products-artesano").slick("resize")})}
