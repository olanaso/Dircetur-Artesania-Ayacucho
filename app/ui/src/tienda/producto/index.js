

import { loadPartials } from "../../utils/viewpartials.js";
// import { getPortadaBusqueda, busquedaProductos } from './api';
import { custom } from '../utils/common.js';
import {obtenerProducto} from "../producto/api.js";


(async function () {
    let partials = [
        { path: '../partials/tienda/header.html', container: 'header' },
        { path: '../partials/tienda/footer.html', container: 'footer' },
    ];
    try {

        await loadPartials(partials);

        custom()

        console.log('Las vistas parciales se han cargado correctamente!');

        startApp();
    } catch (e) {
        console.error(e);
    } ``
})();

function getQueryParameter (name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function infoProductoById() {
    const producto = await obtenerProducto(getQueryParameter("id"));
    console.log(" >DATA producto: ", producto);
    mostrarInformacion(producto);
    // botonComprar(producto); // para agregar al carrito de compras pero el endpoint no trae los datos necesarios
}

 function transformarMaterialesResponseToArray(materiales) {
    return materiales.split('\n');
}
function transformarImagenesSecResponseToArray(imagenes) {
    // 1er parseo
    const innerString = JSON.parse(imagenes);
    // 2do parseo
    const parsedResponse = JSON.parse(innerString);
    //map para obtener src
    const srcArray = parsedResponse.map(item => item.src);
    return srcArray;

}
async function mostrarInformacion(producto){
    const listColores = JSON.parse(JSON.parse(producto.lst_colores));
    const colores = listColores.join(", ")
    const materiales = transformarMaterialesResponseToArray(producto.materiales_es)
    const imagenesSecundarias = transformarImagenesSecResponseToArray(producto.lst_imagenes)
    console.log('imagenPrincipal', producto.imagen_principal)
    console.log('imagenesSecundarias', imagenesSecundarias)
    $(".imagen-principal").attr("src", producto.imagen_principal).show();
    $("#producto-nombre").text(`${producto.nombres_es}`);
    $("#producto-precio").text(`${producto.precio} S/`);
    $("#producto-descripcion").text(`${producto.descripcion_es}`);
    $("#producto-alto").text(`${producto.alto} cm.`);
    $("#producto-ancho").text(`${producto.ancho} cm.`);
    $("#producto-color").text(`${colores}`);
    $("#producto-cantidad").text(`${producto.cantidad}`);
    $("#producto-cualidades").text(`${producto.cualidades_es}`);
    $("#artesano-celular").text(`${producto.datos_artesano.celular}`);
    $("#artesano-correo").text(`${producto.datos_artesano.correo}`);
    //materiales
    if(materiales.length > 0) {
        for(let material of materiales) {
            $("#producto-materiales").append(`
                <ul>
                <li><i class="fa fa-check-square"></i><span>${material}</span></li>
                </ul>
            `)
        }
    }

    
    // Limpia las imágenes existentes
    $(".sp-slides").empty();
    $(".sp-thumbnails").empty();

    // Imagen principal (agregada primero)
    $(".sp-slides").append(`
        <div class="sp-slide">
            <img class="sp-image" src="${producto.imagen_principal}" alt="Imagen Principal">
        </div>
    `);

    $(".sp-thumbnails").append(`
        <img class="sp-thumbnail" src="${producto.imagen_principal}" alt="Thumbnail Principal">
    `);

    if(imagenesSecundarias.length > 0) {
        for(let imagen of imagenesSecundarias) {
            $(".sp-slides").append(`
                <div class="sp-slide">
                    <img class="sp-image" src="${imagen}" alt="Imagen Secundaria">
                </div>
            `);
            $(".sp-thumbnails").append(`
                <img class="sp-thumbnail" src="${imagen}" alt="Thumbnail Secundaria">
            `);
        }
    }

    createSlidersProd();
}

async function botonComprar(producto) {
    
    let artenia_anviar_carrito = {
        artesano_id: producto.artesano_id,
        id: producto.id, //no aparece
        categoria_id: producto.categoria_id, //no aparece
        artesano: producto.artesano, //no aparece
        datos: {
            imagen_principal: producto.imagen_principal,
            descripcion_es: producto.descripcion_es,
            cualidades_es: producto.cualidades_es,
            precio: parseFloat(producto.precio)
        },
    }
    $("#agregar-carrito").attr("href", `carrito-de-compra.html?producto=${encodeURIComponent(JSON.stringify(artenia_anviar_carrito))}`);

}

function startApp () {

    infoProductoById()

}

function createSlidersProd () {
    $('#single-car').sliderPro({
        width: 570,
        height: 450,
        fade: true,
        arrows: true,
        buttons: false,
        fullScreen: true,
        shuffle: true,
        smallSize: 500,
        mediumSize: 1000,
        largeSize: 3000,
        thumbnailArrows: true,
        autoplay: true,
        startSlide: 0
    });

}