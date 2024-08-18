import { listarArtesanosPorCategoriaArtesania} from "./api.js";

//Llamando funcion al ingresar
$(document).ready(function () {
    mostrarListaArtesanosPorCategoria();
});

async function mostrarListaArtesanosPorCategoria() {
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
                artesanoElement.classList.add('team-member');
                artesanoElement.innerHTML = `
                    <img src="${artesano.foto1}" alt="${artesano.nombres}" class="foto1">
                    <h3>${artesano.nombres}</h3>
                    <p>— F por la descripción</p>
                `;
                artesanoElement.addEventListener('click', () => {
                    window.location.href = `principal-artesano.html?id=${artesano.id}`;
                });

                // Add hover effect to change image
                artesanoElement.addEventListener('mouseenter', () => {
                    const img = artesanoElement.querySelector('.foto1');
                    img.src = artesano.foto2;
                });

                artesanoElement.addEventListener('mouseleave', () => {
                    const img = artesanoElement.querySelector('.foto1');
                    img.src = artesano.foto1;
                });

                if (category.categoria === 'CERÁMICA') {
                    categories.Cerámica.appendChild(artesanoElement);
                } else if  (category.categoria === 'TEXTILERÍA') {
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

function performSearch(callback) {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const teamMembers = document.querySelectorAll('.team-member');
    const teamCategories = document.querySelectorAll('.team-category');
    const searchResultHeader = document.getElementById('search-result-header');

    if (searchTerm === '') {
        // Muestra todas las categorias y artesanos
        teamCategories.forEach(category => {
            category.style.display = '';
        });
        teamMembers.forEach(member => {
            member.style.display = '';
        });
        searchResultHeader.style.display = 'none';
        if (callback) callback();
        return;
    }

    // esconde las categorias
    teamCategories.forEach(category => {
        category.style.display = 'none';
    });

    // Muestra el resulktado de la busqueda
    if (searchResultHeader) {
        searchResultHeader.textContent = `Resultado de "${searchTerm}"`;
        searchResultHeader.style.display = 'block';
    }

    // Filter team members
    let hasResults = false;
    teamMembers.forEach(member => {
        const name = member.querySelector('h3').textContent.toLowerCase();
        const role = member.querySelector('p').textContent.toLowerCase();
        if (name.includes(searchTerm) || role.includes(searchTerm)) {
            member.style.display = '';
            hasResults = true;
        } else {
            member.style.display = 'none';
        }
    });

    // Si hay error se muestra esto
    if (!hasResults) {
        searchResultHeader.textContent = `No se encontró "${searchTerm}"`;
    }

    if (callback) callback();
}

document.getElementById('search-button').addEventListener('click', function() {
    this.classList.add('loading');
    setLoadingState(true);
    setTimeout(() => {
        performSearch(() => {
            this.classList.remove('loading');
            setLoadingState(false);
        });
    }, 2000);
});

document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('search-button').click();
    }
});

document.getElementById('clear-button').addEventListener('click', function() {
    document.getElementById('search-input').value = '';
    document.getElementById('search-input').focus();
    performSearch();
});

function setLoadingState(isLoading) {
    const searchButton = document.getElementById('search-button');
    const clearButton = document.getElementById('clear-button');
    if (isLoading) {
        searchButton.innerHTML = 'Buscando...';
        searchButton.classList.add('loading');
        searchButton.disabled = true;
        clearButton.style.right = '120px';
    } else {
        searchButton.innerHTML = '<i class="fas fa-search"></i>';
        searchButton.classList.remove('loading');
        searchButton.disabled = false;
        clearButton.style.right = '50px';
    }
}