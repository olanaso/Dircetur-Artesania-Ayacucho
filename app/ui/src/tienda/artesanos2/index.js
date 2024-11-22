import { loadPartials } from "../../utils/viewpartials.js";
import { listarArtesanos, listarFiltros } from "./api.js";
import { custom, menuselec } from "../utils/common.js";

(async function () {
    let partials = [
        { path: "../partials/tienda/header.html", container: "header" },
        { path: "../partials/tienda/footer.html", container: "footer" },
    ];

    try {
        await loadPartials(partials);

        custom();
        menuselec();

        console.log("Las vistas parciales se han cargado correctamente!");

        startApp();
    } catch (e) {
        console.error(e);
    }
})();

function startApp () {
    mostrarArtesanos();
}
let listadoCategorias = null;

async function mostrarArtesanos () {
    try {
        const categorias = await listarFiltros();
        listadoCategorias = categorias;
        llenarFiltros(categorias);

        const artesanos = await listarArtesanos();
        gridArtesanos(artesanos);

        const searchInput = document.getElementById("searchInputArtesano");
        const searchButton = document.getElementById("searchButtonArtesano");
        const filterSelect = document.getElementById("filterSelect");

        searchInput.addEventListener("input", () => {
            buscarArtesanos(artesanos, searchInput);
        });

        searchButton.addEventListener("click", () => {
            buscarArtesanos(artesanos, searchInput);
        });

        filterSelect.addEventListener("change", () => {
            filtrarPorCategoria(artesanos, filterSelect.value);
        });

    } catch (e) {
        console.error(e);
    }
}

const gridArtesanos = async (artesanos) => {
    const artesanoList = document.getElementById("person-list");
    artesanoList.innerHTML = ""; // Clear previous results

    try {
        if (artesanos.length === 0) {
            const noData = document.createElement("p");
            noData.textContent = "No hay artesanos registrados";
            noData.style.textAlign = "center";
            noData.style.width = "100%";
            noData.style.marginTop = "20px";
            noData.style.fontSize = "20px";
            noData.style.fontWeight = "bold";
            noData.style.color = "red";

            artesanoList.appendChild(noData);
            return;
        }
        $('#person-list').html('');
        artesanos.forEach((artesano) => {
            let htmlcardArtesano = crearteCardArtesano(artesano);
            $('#person-list').append(htmlcardArtesano);
            //artesanoList.appendChild(htmlcardArtesano);
        });
    } catch (e) {
        console.error(e);
    }
};


function generateBadges (text) {
    const categoryColors = {
        "CERÁMICA": "#3498db", // Azul
        "TEXTILERÍA": "#e74c3c", // Rojo
        "PIEDRA TALLADA": "#2ecc71" // Verde
    };

    const categories = text.split(',').map(item => item.trim());
    let badgesHTML = '';

    categories.forEach(category => {
        const color = categoryColors[category.toUpperCase()] || "#95a5a6"; // Color gris por defecto
        badgesHTML += `
                    <span style="
                        display: inline-block;
                        padding: 0.4em 0.8em;
                        margin: 0.2em;
                        font-size: 0.9em;
                        font-weight: bold;
                        color: white;
                        background-color: ${color};
                        border-radius: 12px;
                    ">
                        ${category}
                    </span>
                `;
    });

    return badgesHTML;
}
function crearteCardArtesano (artesano) {
    return `
   <div class="person-card">
        <img src="${artesano.foto1}" alt="${artesano.nombres} ${artesano.apellidos}" style="cursor: pointer;" onerror="this.src='https://placehold.jp/DEDEDEE/EEEEEE/200x220.png?text=No disponible';">
        <h2>${artesano.nombres} ${artesano.apellidos}</h2>
        <p style="font-weight: bold; margin-bottom: 0px; margin-left: 10px; color: white;  text-align: left;">
        ${generateBadges(artesano.categoria_artesano)}
        </p>
    </div>
    `
}

const llenarFiltros = async (categorias) => {
    const selectElement = document.getElementById('filterSelect');

    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.categoria_artesano;
        option.textContent = categoria.categoria_artesano;

        selectElement.appendChild(option);
    });
}

const buscarArtesanos = async (artesanos, searchInput) => {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredArtesanos = artesanos.filter((artesano) =>
        artesano.nombres.toLowerCase().includes(searchTerm)
    );

    gridArtesanos(filteredArtesanos);
};

const filtrarPorCategoria = async (artesanos, categoria) => {
    if (categoria === "TODOS") {
        gridArtesanos(artesanos);
        return;
    }

    const filteredArtesanos = artesanos.filter((artesano) =>
        artesano.categoria_artesano.toLowerCase().includes(categoria.toLowerCase())
    );

    gridArtesanos(filteredArtesanos);
}

const titleCase = (str) => {
    return str.toLowerCase().replace(/\b(\w)/g, (s) => s && s.toUpperCase());
}

const sliceText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}