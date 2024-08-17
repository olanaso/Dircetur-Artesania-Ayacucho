/*
import { listarArtesanoById } from './api.js';

document.addEventListener("DOMContentLoaded", () => {
    mostrarListaArtesanos().then(r => console.log(' >Lista de artesanos mostrada'));
});

async function mostrarListaArtesanos() {
    try {
        const response = await listarArtesanoById('40');
        const artesanos = response.data;
        console.log(' >DATA artesanos: ', artesanos);
        const teamMembersContainer = document.querySelector('.team-members');
        teamMembersContainer.innerHTML = '';

        artesanos.forEach(artesano => {
            const artesanoElement = document.createElement('div');
            artesanoElement.classList.add('team-member');
            artesanoElement.innerHTML = `
                <img src="${artesano.foto1}" alt="${artesano.nombres}">
                <h3>${artesano.nombres}</h3>
                <p>— ${artesano.descripcion}</p>
            `;
            teamMembersContainer.appendChild(artesanoElement);
        });
    } catch (error) {
        console.error('Error al mostrar la lista de artesanos:', error);
    }
}
*/