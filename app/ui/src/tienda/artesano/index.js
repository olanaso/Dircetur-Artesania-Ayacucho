import './styles.css';

import { loadPartials } from "../../utils/viewpartials.js";
import { getPortadaBusqueda, busquedaProductos, obtenerArtesanoById } from './api.js';
import { custom } from '../utils/common.js';


(async function () {
    let partials = [
        { path: '../partials/tienda/header.html', container: 'header' },
        { path: '../partials/tienda/footer.html', container: 'footer' },
    ];
    try {

        await loadPartials(partials);

        // import('../utils/common');
        console.log('Las vistas parciales se han cargado correctamente!');

        startApp();
        setTimeout(function () {
            custom()
        }, 1000)
    } catch (e) {
        console.error(e);
    }
})();

function getQueryParameter (name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function infoArtesanoById() {
    const artesano = await obtenerArtesanoById(getQueryParameter("id"));
    console.log(" >DATA artesano: ", artesano);
    mostrarInformacion(artesano);
}

async function mostrarInformacion(artesano){
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

    $("#artesano-foto").attr("src", artesano.foto1).show();
    $("#artesano-nombre").text(`${artesano.nombres}`);
    $("#artesano-telefono").text(`+51 ${artesano.celular}`);
    $("#artesano-whatsapp").attr("href", `https://wa.me/51${artesano.celular}`);
    $("#artesano-youtube").attr("href", lst_videoenlace[0].src);
    $("#artesano-telefono-enlace").attr("href", `tel:+51${artesano.celular}`)
    $("#artesano-nombre-completo").text(`${artesano.nombres} ${artesano.apellidos}`);
    $("#artesano-correo").text(`${artesano.correo}`);
    $("#artesano-lugar-procedencia").text(`${artesano.lugar_nacimiento ? artesano.lugar_nacimiento : "Ayacucho-Huamanga"}`);
    $("#taller-nombre").text(listTaller[0].nombretaller);
    $("#taller-ruc").text(listTaller[0].ructaller);
    $("#taller-direccion").text(listTaller[0].direccionfisica);
    $("#artesano-habilidades").text(listEspecialidadesTecnicas[0].descripcionhabilidades);
    $("#artesano-tipo-artesania").text(listEspecialidadesTecnicas[0].tipoartesania);
    $("#artesano-linea-artesanal").text(lineaArtesanal); // aui el tring de los 1
    //mapa//
    initMap(listTaller[0].latitud, listTaller[0].longitud);
    //video//
    if (lst_videoenlace.length > 0) {
        const videoUrl = lst_videoenlace[0].src;
        console.log("> url", videoUrl)
        const embedUrl = videoUrl.replace("watch?v=", "embed/");
        $("#artesano-video").attr("src", embedUrl).show();
    }

    if (listReconocimientos.length > 0) {
        for (let reconocimiento of listReconocimientos) {
            $("#reconocimientos").append(`
				<div class="col-12 mb-3" style="background-color: #2b76f7; border-radius: 5px;">
					<div class="card recognition-card " style="color: #004085;
                    background-color: #cce5ff;
                    border-color: #b8daff;">
						<div class="card-body">
							<h5 class="card-title">${reconocimiento.Título}</h5>
							<h6 class="card-subtitle mb-2">Otorgado por ${reconocimiento.Entidad}</h6>
							<p class="card-text">${reconocimiento.Descripcion}</p>
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

function startApp () {
    infoArtesanoById();
    // showStep(currentStep);     // crearListaInicial();
    // cargarDataPortada();
    // rellenarFormulario();
    // realizarBusqueda();
}



