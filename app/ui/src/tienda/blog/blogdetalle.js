

import { loadPartials } from "../../utils/viewpartials.js";
import { custom, menuselec } from '../utils/common.js';
import { categoryNews, sizeNews } from '../../utils/config.js';
import { getCategories, getMedia, search, dateToString } from './api.js';




(async function () {
    let partials = [
        { path: '../partials/tienda/header.html', container: 'header' },
        { path: '../partials/tienda/footer.html', container: 'footer' },
    ];
    try {

        await loadPartials(partials);

        custom()
        menuselec()

        console.log('Las vistas parciales se han cargado correctamente!');

        startApp();
    } catch (e) {
        console.error(e);
    } ``
})();


function startApp () {
    // alert(1)

    // Obtener el valor del parámetro 'url'
    const url = getParameterByName('url');

    // Validar que sea una URL válida
    if (url) {
        const iframe = document.getElementById('listanoticias');
        iframe.src = url;
    } else {
        alert("No se encontró una URL válida en los parámetros.");
    }

}



function getParameterByName (name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}


async function paintNews () {
    let html = '';
    let categorias = await getCategories(categoryNews, sizeNews);

    for (let cat of categorias) {
        let datamedia = null;

        try {
            // Intentar obtener los datos multimedia
            datamedia = await getMedia(cat);
            html += `
            <div class="col-md-4">
                <div class="item">
                    <div class="thumb-content">
                        <div class="date-post">
                          
                        </div>
                        <div class="thumb-inner">
                            <a href="blogdetalle.html?url=${cat.link}"><img src="${datamedia.media_details && datamedia.media_details.sizes.medium ? datamedia.media_details.sizes.medium.source_url : ''}" alt=""></a>
                        </div>
                    </div>
                    <div class="down-content">
                        <a href="blogdetalle.html?url=${cat.link}">
                            <h4>${cat.title.rendered}</h4>
                        </a>
                        <ul>
                            <li>${dateToString(cat.date)}</li>
                        </ul>
                        <div class="text-button">
                            <a url="blogdetalle.html?url=${cat.link}" href="#">Leer más <i class="fa fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        } catch (error) {
            console.error(`Error al obtener media para la categoría ${cat.name}:`, error);
            // Continuar con el siguiente sin abortar el bucle
            datamedia = {}; // Asignar un objeto vacío para evitar errores de acceso a propiedades
        }

        // Generar el HTML con los datos disponibles, manejando la ausencia de datamedia

    }

    $('#listanoticias').html('');
    $('#listanoticias').append(html);
}
