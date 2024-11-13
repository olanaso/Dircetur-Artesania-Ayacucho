

import { loadPartials } from "../../utils/viewpartials.js";
import { custom, menuselec } from '../utils/common.js';

import { marked } from 'marked';



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



}

function callMarkdown () {


}
