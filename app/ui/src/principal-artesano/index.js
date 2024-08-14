import { validarHTML5 } from "../utils/validateForm";
import { saveDataToLocalStorage } from "../utils/config";
import { hideLoading } from "../utils/init";
import { obtenerParametrosURL } from "../utils/path";
import { obtenerArtesano, obtenerArtesanoById } from "./api";

//  href = /principal-artesano.html?id=${data.id}
document.addEventListener("DOMContentLoaded", () => {
  //cargarSliders()
  //cargarCategorias()
  //   infoArtesano();
  infoArtesanoById();
});

function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

async function infoArtesanoById() {
    const artesano = await obtenerArtesano(getQueryParameter("id"));
    const listTaller = JSON.parse(JSON.parse(artesano.lst_taller));
    const lst_videoenlace = JSON.parse(JSON.parse(artesano.lst_videoenlace));
  
    const listEspecialidadesTecnicas = JSON.parse(
      JSON.parse(artesano.lst_especialidadtecnicas)
    );
    const listReconocimientos = JSON.parse(
      JSON.parse(artesano.lst_reconocimientos)
    );
    console.log(" >DATA VIDEO: ", lst_videoenlace);
  
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
    $("#lineaArtesanal").text(listEspecialidadesTecnicas[0].tipoartesania);
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
  

async function infoArtesano() {
  const artesano = await obtenerArtesano(getQueryParameter("id"));
  console.log("producto: ", artesano);
  const listContactos = JSON.parse(JSON.parse(artesano.lst_contactos));
  const listTaller = JSON.parse(JSON.parse(artesano.lst_taller));
  const listEspecialidadesTecnicas = JSON.parse(
    JSON.parse(artesano.lst_especialidadtecnicas)
  );
  const listMediosPago = JSON.parse(JSON.parse(artesano.lst_mediospago));
  const listReconocimientos = JSON.parse(
    JSON.parse(artesano.lst_reconocimientos)
  );
  const listVideos = JSON.parse(JSON.parse(artesano.lst_videos));
  const listvideoEnlace = JSON.parse(JSON.parse(artesano.lst_videoenlace));
  $("#fotoArtesano").attr("src", artesano.foto1).show();
  $("#nombresArtesano").text(`${artesano.nombres} ${artesano.apellidos}`);
  $("#telefonoArtesano").text(artesano.celular);
  $("#emailArtesano").text(artesano.correo);
  $("#habilidades").text(listEspecialidadesTecnicas[0].descripcionhabilidades);
  $("#tiposArtesania").text(listEspecialidadesTecnicas[0].tipoartesania);
  console.log("taller: ", listReconocimientos);
  $("#nombreTaller").text(listTaller[0].nombretaller);
  $("#rucTaller").text(listTaller[0].ructaller);
  $("#direccionTaller").text(listTaller[0].direccionfisica);
  $("#atencionTaller").text(listTaller[0].horarioatencion);
  initMap(listTaller[0].latitud, listTaller[0].longitud);

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
