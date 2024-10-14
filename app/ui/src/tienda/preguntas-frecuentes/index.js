

import { loadPartials } from "../../utils/viewpartials.js";
import { custom } from '../utils/common.js';

import { marked } from 'marked';



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


function startApp () {


    callMarkdown()
}

function callMarkdown () {
    fetch("./info/preguntas-frecuentes.md") // Ruta correcta al archivo markdown
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo Markdown.');
            }
            return response.text();
        })
        .then(text => {
            // Convertir el markdown a HTML usando la librería marked
            const htmlContent = marked(text);
            // Mostrar el contenido en el contenedor con id 'markdown-content'
            document.getElementById("markdown-content").innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Error al cargar el archivo markdown:', error);
        });

}
