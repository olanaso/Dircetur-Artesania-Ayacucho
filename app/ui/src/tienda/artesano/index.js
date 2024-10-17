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

async function infoArtesanoById () {
    const artesano = await obtenerArtesanoById(getQueryParameter("id"));
    console.log(" >DATA artesano: ", artesano);
    mostrarInformacion(artesano);
}

async function mostrarInformacion (artesano) {


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
    $('#artesano-ubigeo').text(artesano.ubigeo);
    //mapa//
    initMap(listTaller[0].latitud, listTaller[0].longitud, listTaller[0].direccionfisica, artesano.foto1);
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
        $("#reconocimientos").append(`
				<div class="col-12 mb-3" style="background-color: #2b76f7; border-radius: 5px;">
					<div class="card recognition-card " style="color: #004085;
                    background-color: #cce5ff;
                    border-color: #b8daff;">
						<div class="card-body">
							<h5 class="card-title">No se encuentran reconocimientos</h5>
						</div>
					</div>
				</div>
      `);
    }

    loadProductosDestacados(artesano.productos)
}

function initMap (latitud, longitud, ubicacion, fotoArtesano) {
    // Crear el mapa centrado en las coordenadas proporcionadas
    var mymap = L.map("map").setView([latitud, longitud], 15);

    // Agregar capa de OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mymap);

    // Crear un icono personalizado con la foto del artesano
    var artisanIcon = L.divIcon({
        className: 'custom-icon', // Clase CSS personalizada
        html: `<img src="${fotoArtesano}" class="rounded-image" onerror="this.src='https://placehold.jp/DEDEDEE/EEEEEE/40x40.png?text=A';">`, // HTML para la imagen redondeada
        iconSize: [50, 50], // Tamaño del icono
        iconAnchor: [25, 50], // Punto de anclaje
        popupAnchor: [0, -50] // Punto donde aparecerá el popup
    });

    // Crear el contenido del popup con el botón para abrir Google Maps
    var popupContent = `
        <div>
            <p>${ubicacion}</p>
            <button style="background: #ea0397;padding: 10px 20px; color:#fff" onclick="window.open('https://www.google.com/maps?q=${latitud},${longitud}', '_blank')">
                Visitar en Google Maps
            </button>
        </div>
    `;

    // Agregar marcador personalizado con el popup
    var marker = L.marker([latitud, longitud], { icon: artisanIcon })
        .addTo(mymap)
        .bindPopup(popupContent)
        .openPopup();
}



function startApp () {
    infoArtesanoById();
    // showStep(currentStep);     // crearListaInicial();
    // cargarDataPortada();
    // rellenarFormulario();
    // realizarBusqueda();
}

function formatearNumero (numero) {
    return numero.toLocaleString('es-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function loadProductosDestacados (data) {

    debugger

    let html = ` `
    for (let item of data) {

        let artenia_anviar_carrito = {
            artesano_id: item.artesano_id,
            id: item.id,
            categoria_id: item.categoria_id,
            artesano: item.datos_artesano.nombres + ' ' + item.datos_artesano.apellidos,
            datos: {
                imagen_principal: item.imagen_principal,
                descripcion_es: item.nombres_es,
                cualidades_es: item.descripcion_es,
                precio: parseFloat(item.precio)
            },
        }

        let artenia_deseados = {
            id: item.id + '-' + item.artesano_id,
            artesania: {
                id: item.id,
                nombre_es: item.nombres_es,
                precio: parseFloat(item.precio),
                imagen_principal: item.imagen_principal,
                url_carrito: encodeURIComponent(JSON.stringify(artenia_anviar_carrito))
            },
            artesano: {
                id: item.artesano_id,
                nombres: item.datos_artesano.nombres + ' ' + item.datos_artesano.apellidos,
                foto1: item.datos_artesano.foto1,
            }
        }


        //alert(item.imagen)
        html = html + `
       <div class="item wow fadeIn card " data-wow-duration="0.75s">
						<div class="img-contenedor-destacados">
                          <a href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}" style="color:#000">
							<img class="img-destacados"
								src="${item?.imagen_principal || "https://via.placeholder.com/400x200"}" />
                                   </a>
						</div>
						
						<div class="line-dec"></div>

						<div class="card-body">
							<!-- <div class="d-flex justify-content-between align-items-center mb-2">
								<span class="badge badge-danger" style="color: #fff;">-15%</span>
								<span class="text-muted"><s>S/. 1770.00</s></span>
							</div> -->
                            <a href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}" style="color:#000">
							<h5 title="${item?.nombres_es || ""}" class="card-title font-weight-bold product-description">${item.nombres_es || "-"}</h5>
                            </a>
							<p class="h4 text-danger font-weight-bold">S/.${formatearNumero(item?.precio) || ""}</p>
							<p class="card-text text-muted">Categoría: ${item?.categoria_producto?.denominacion}</p>


							<div class="author-rate">
								
								<h4><a style: "color:#dedede!important" href="artesano.html?id=${item?.artesano_id}"> ${item?.artesano || ""}</a></h4>
								<div class="line-dec2"></div>
								
                                <a href="carrito-de-compra.html?producto=${encodeURIComponent(JSON.stringify(artenia_anviar_carrito))}" title="Ir a carrito de compras">Comprar <i class="fa fa-shopping-cart"></i></a>
							</div>
						</div>
					</div>


        `
    }
    $('#owl-testimonials').append(html)


    $('#owl-testimonials').owlCarousel({
        pagination: true,
        paginationNumbers: false,
        autoplay: true,
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    })
}






