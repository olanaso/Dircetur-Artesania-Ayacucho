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
    // const listTaller = JSON.parse(JSON.parse(artesano.lst_taller));
    // const lst_videoenlace = JSON.parse(JSON.parse(artesano.lst_videoenlace));
    // const listEspecialidadesTecnicas = JSON.parse(
    //     JSON.parse(artesano.lst_especialidadtecnicas)
    // );
    // const listReconocimientos = JSON.parse(
    //     JSON.parse(artesano.lst_reconocimientos)
    // );
}


function startApp () {
    infoArtesanoById();
    // showStep(currentStep);     // crearListaInicial();
    // cargarDataPortada();
    // rellenarFormulario();
    // realizarBusqueda();
}



