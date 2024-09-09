import { validarHTML5 } from "../utils/validateForm";
import { saveDataToLocalStorage } from "../utils/config";
import { hideLoading } from "../utils/init";
import { obtenerParametrosURL } from "../utils/path";
import { obtenerProducByArtesano, obtenerArtesanoById } from "./api";

import "./principal-artesano.css";

import { loadPartials } from "../utils/viewpartials.js";

(async function () {
    let partials = [
        { path: 'partials/tienda/header.html', container: 'header' },
        { path: 'partials/tienda/footer.html', container: 'footer' },
    ];
    try {

        await loadPartials(partials);
        // import('../utils/common');

        console.log('Las vistas parciales se han cargado correctamente!');

        startApp();
    } catch (e) {
        console.error(e);
    }
})();

//  href = /principal-artesano.html?id=${data.id}
hideLoading();
document.addEventListener("DOMContentLoaded", () => {
    infoArtesanoById();
    cargarProducts();
});

function getQueryParameter (name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function infoArtesanoById () {
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
    const desotro = especialidades.desotro
    if (especialidades.piedra === 1) listLineaArtesanal.push("piedra");
    if (especialidades.ceramica === 1) listLineaArtesanal.push("ceramica");
    if (especialidades.talabarteria === 1)
        listLineaArtesanal.push("talabarteria");
    if (especialidades.otro === 1 && desotro) listLineaArtesanal.push(desotro);

    const lineaArtesanal = listLineaArtesanal.join(" , ");
    // Actualizar elementos del DOM
    $("#nombreArtesano").text(`${artesano.nombres}`);
    $("#foto1Artesano").attr("src", artesano.foto1).show();
    $("#foto2Artesano").attr("src", artesano.foto2).show();
    $("#celularArtesano").text(`+51 ${artesano.celular}`);
    $("#calleArtesano").text(`${artesano.calle ? artesano.caller : "Asoc. Artesanos"}`);
    $("#namesArtesano").text(`${artesano.nombres} ${artesano.apellidos}`);
    $("#correoArtesano").text(`${artesano.correo}`);
    $("#lugarProcArtesano").text(`${artesano.lugarProcedencia ? artesano.lugarProcedencia : "Ayacucho-Huamanga"}`);
    $("#nombreTaller").text(listTaller[0].nombretaller);
    $("#rucTaller").text(listTaller[0].ructaller);
    $("#direccionTaller").text(listTaller[0].direccionfisica);
    $("#atencionTaller").text(listTaller[0].horarioatencion);
    $("#habilidades").text(listEspecialidadesTecnicas[0].descripcionhabilidades);
    $("#tiposArtesania").text(listEspecialidadesTecnicas[0].tipoartesania);
    $("#lineaArtesanal").text(lineaArtesanal); // aui el tring de los 1
    initMap(listTaller[0].latitud, listTaller[0].longitud);

    // Actualizar el iframe
    /*
    if (lst_videoenlace.length > 0) {
      $("#videoArtesano").attr("src", lst_videoenlace[0].src);
    }
  */
    if (lst_videoenlace.length > 0) {
        const videoUrl = lst_videoenlace[0].src;
        console.log("> url", videoUrl)
        const embedUrl = videoUrl.replace("watch?v=", "embed/");
        $("#videoArtesano").attr("src", embedUrl).show();
    }
    if (listReconocimientos.length > 0) {
        for (let reconocimiento of listReconocimientos) {
            $("#listReconocimientos").append(`
          <div class="sep-section-heading">
              <div class="certificate-artesano">
                  <div class="title">${reconocimiento.Título} </div>
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

function initMap (latitud, longitud) {
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

async function cargarProducts () {
    const productoByArtesano = await obtenerProducByArtesano(getQueryParameter("id"));
    console.log("> CANTD PRODUCT: ", productoByArtesano.data.length);

    let cards = "";
    for (let data of productoByArtesano.data) {
        cards += `
<a href="principal-detalle.html?id=${data.id}" style="text-decoration: none;">
    <div class="productos-artesano">
        <div class="productos-artesano-card">
            <img src="${data.imagen_principal}" alt="Producto">
            <p class="text-limited">${data.nombres_es}</p>
            <p class="text-limited"><strong>Precio:</strong> S/. ${data.precio}</p>
            <p class="text-limited text-limited-category">${data.categoria_producto.denominacion}</p>
        </div>
    </div>
`;
    }
    $("#products-artesano").html(cards);

    // Initialize Slick Carousel
    function initializeSlick () {
        $('#products-artesano').not('.slick-initialized').slick({
            slidesToShow: 4,
            slidesToScroll: 4,
            autoplay: true,
            autoplaySpeed: 2000,
            prevArrow: $('#left-arrow'),
            nextArrow: $('#right-arrow'),
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,

                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,


                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    initializeSlick();

    $(window).on('resize', function () {
        $('#products-artesano').slick('resize');
    });
}