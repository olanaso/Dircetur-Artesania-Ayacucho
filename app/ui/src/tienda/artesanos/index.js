

import { loadPartials } from "../../utils/viewpartials.js";
import { listarArtesanosPorCategoriaArtesania } from "./api.js";
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


    //callMarkdown()
    mostrarListaArtesanosPorCategoria();
}





async function mostrarListaArtesanosPorCategoria () {
    try {
        const response = await listarArtesanosPorCategoriaArtesania();

        const categories = {
            Cerámica: document.getElementById('ceramica-members'),
            Textilería: document.getElementById('textileria-members'),
            PiedraTallada: document.getElementById('piedra-tallada-members')
        };

        for (const category of response) {
            for (const artesano of category.artesanos) {

                const artesanoElement = document.createElement('div');
                artesanoElement.classList.add('col-md-4', 'mb-4'); // Añadimos clases de Bootstrap para layout
                artesanoElement.innerHTML = `
                    <div class="card shadow-lg border-0" style="cursor: pointer;">
                        <div class="card-body text-center p-4">
                            <div class="circle-image-container mb-3">
                                <img src="${artesano.foto1}" alt="${artesano.nombres}" class="rounded-circle img-fluid" style="width: 150px; height: 150px; object-fit: cover;">
                            </div>
                            <h5 class="card-title font-weight-bold">${artesano.nombres}</h5>
                           
                         <span class="check">&#10003;</span>
    <span class="verificado">Verificado</span>
                            <a href="artesano.html?id=${artesano.id}" class="btn btn-outline-danger btn-block">Ver Perfil</a>
                        </div>
                    </div>
                `;

                // Añadir funcionalidad para redirigir al hacer clic
                artesanoElement.addEventListener('click', () => {
                    window.location.href = `artesano.html?id=${artesano.id}`;
                });

                // Cambiar la imagen al hacer hover
                artesanoElement.querySelector('img').addEventListener('mouseenter', () => {
                    artesanoElement.querySelector('img').src = artesano.foto2;
                });

                artesanoElement.querySelector('img').addEventListener('mouseleave', () => {
                    artesanoElement.querySelector('img').src = artesano.foto1;
                });

                // Añadir el card al contenedor correspondiente según la categoría
                if (category.categoria === 'CERÁMICA') {
                    categories.Cerámica.appendChild(artesanoElement);
                } else if (category.categoria === 'TEXTILERÍA') {
                    categories.Textilería.appendChild(artesanoElement);
                } else if (category.categoria === 'PIEDRA TALLADA') {
                    categories.PiedraTallada.appendChild(artesanoElement);
                }
            }
        }
    } catch (e) {
        console.error(e);
    }
}

