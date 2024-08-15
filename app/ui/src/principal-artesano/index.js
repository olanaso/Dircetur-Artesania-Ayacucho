import { validarHTML5 } from "../utils/validateForm";
import { saveDataToLocalStorage } from "../utils/config";
import { hideLoading } from "../utils/init";
import { obtenerParametrosURL } from "../utils/path";
import { obtenerProducByArtesano, obtenerArtesanoById } from "./api";
import "./flaticon.css";
import "./main.css";
import "./owl-carousel.css";
import "./sliderPro.css";
import "./animated.css";
import "./font-awesome.min.css";
import "../../src/Shared/navbar.js";
import { loadPartials } from "../utils/viewpartials.js";
//  href = /principal-artesano.html?id=${data.id}
hideLoading();
document.addEventListener("DOMContentLoaded", () => {
  infoArtesanoById();
});

$(document).ready(async function () {
  //await cargarSliders();
  await cargarProducts();
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

(async function () {
  let partials = [
    { path: "partials/shared/menuNavCliente.html", container: "main-header" },
    { path: "partials/shared/footerCliente.html", container: "main-footer" },
  ];
  try {
    await loadPartials(partials);
    import("../utils/common");

    // Aquí coloca el código que deseas ejecutar después de que todas las vistas parciales se hayan cargado.
    console.log("Las vistas parciales se han cargado correctamente!");
    // Por ejemplo, podrías iniciar tu aplicación aquí.

    startApp();
  } catch (e) {
    console.error(e);
  }
})();

function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}


async function infoArtesanoById() {
  const artesano = await obtenerArtesanoById(getQueryParameter("id"));
  console.log(" >DATA artesano: ", artesano);
  const listTaller = JSON.parse(JSON.parse(artesano.lst_taller));
  const lst_videoenlace = JSON.parse(JSON.parse(artesano.lst_videoenlace));

  const listEspecialidadesTecnicas = JSON.parse(
    JSON.parse(artesano.lst_especialidadtecnicas)
  );
  const listReconocimientos = JSON.parse(
    JSON.parse(artesano.lst_reconocimientos)
  );

  const especialidades = listEspecialidadesTecnicas[0];
  const listLineaArtesanal = [];
  const desotro =especialidades.desotro
  if (especialidades.piedra === 1) listLineaArtesanal.push("piedra");
  if (especialidades.ceramica === 1) listLineaArtesanal.push("ceramica");
  if (especialidades.talabarteria === 1)
    listLineaArtesanal.push("talabarteria");
  if (especialidades.otro === 1 &&  desotro) listLineaArtesanal.push(desotro);

  const lineaArtesanal = listLineaArtesanal.join(" , ");

  // Actualizar elementos del DOM
  $("#foto1Artesano").attr("src", artesano.foto1).show();
  $("#foto2Artesano").attr("src", artesano.foto2).show();
  $("#celularArtesano").text(`+51 ${artesano.celular}`);
  $("#calleArtesano").text(`${artesano.calle}`);
  $("#namesArtesano").text(`${artesano.nombres} ${artesano.apellidos}`);
  $("#correoArtesano").text(`${artesano.correo}`);
  $("#lugarProcArtesano").text(`${artesano.lugarProcedencia}`);
  $("#nombreTaller").text(listTaller[0].nombretaller);
  $("#rucTaller").text(listTaller[0].ructaller);
  $("#direccionTaller").text(listTaller[0].direccionfisica);
  $("#atencionTaller").text(listTaller[0].horarioatencion);
  $("#habilidades").text(listEspecialidadesTecnicas[0].descripcionhabilidades);
  $("#tiposArtesania").text(listEspecialidadesTecnicas[0].tipoartesania);
  $("#lineaArtesanal").text(lineaArtesanal); // aui el tring de los 1
  initMap(listTaller[0].latitud, listTaller[0].longitud);

  // Actualizar el iframe
  if (lst_videoenlace.length > 0) {
    $("#videoArtesano").attr("src", lst_videoenlace[0].src);
  }

  if (listReconocimientos.length > 0) {
    for (let reconocimiento of listReconocimientos) {
      $("#listReconocimientos").append(`
          <div class="sep-section-heading">
              <div class="certificate">
                  <div class="title">${reconocimiento.Título}</div>
                  <div class="subtitle">Otorgado por ${reconocimiento.Entidad} </div>
                  <div class="content">
                      ${reconocimiento.Descripcion}
                  </div>
              </div>
          </div>
      `);
    }
  } else {
    // Manejar el caso donde no hay reconocimientos si es necesario
  }
}

function initMap(latitud, longitud) {
  // Coordenadas de ejemplo (Lima, Perú)
  var mymap = L.map("map").setView([latitud, longitud], 15);

  // Agregar capa de OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mymap);

  // Agregar marcador personalizado
  var marker = L.marker([latitud, longitud])
    .addTo(mymap)
    .bindPopup("¡Aquí estoy!")
    .openPopup();
}

async function cargarProducts() {
  // const categorias =  await listarCategorias()
  const productoByArtesano = await obtenerProducByArtesano(
    getQueryParameter("id")
  );
  $("#owl-top-features").empty();
  let cards = "";
  for (let data of productoByArtesano.data) {
        cards += `
    <div class="item car-item">
    <div class="car-item wow fadeIn animated" data-wow-duration="0.75s"
      style="visibility: visible;">
      <div class="thumb-content" style="position: relative;">
        <div class="thumb-inner" style="position: relative;">
          <a href="principal-detalle.html"><img src=${data.imagen_principal}
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
          <h4>${data.nombres_es.length > 20 ? data.nombres_es.slice(0, 20) + '...' : data.nombres_es}</h4>
        </a>
        <span>S/. ${ data.precio}</span>
        <p>${data.categoria_producto.denominacion}</p>
      </div>
    </div>
  </div>`;
  }
  $("#owl-top-features2").append(cards);

  // Reinitialize Owl Carousel
  $("#owl-top-features2").owlCarousel({
    items: 5,
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
  });
}
