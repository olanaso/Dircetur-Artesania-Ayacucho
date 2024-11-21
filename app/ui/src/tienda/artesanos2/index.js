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

function startApp() {
    mostrarArtesanos();
}

async function mostrarArtesanos() {
    try {
        const categorias = await listarFiltros();
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

        artesanos.forEach((artesano) => {
            const card = document.createElement("div");
            const img = document.createElement("img");
            const name = document.createElement("h2");
            const categoria = document.createElement("p");
            const button = document.createElement("button");

            let nombreCompleto = titleCase(`${artesano.nombres} ${artesano.apellidos}`);
            nombreCompleto = sliceText(nombreCompleto, 23);

            card.className = "person-card";
            
            const fotoPlaceholder = "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280-580x580.jpg";
            const foto1 = artesano.foto1
                            ? artesano.foto1.includes("https") ? artesano.foto1 : fotoPlaceholder
                            : fotoPlaceholder;
            
            const foto2 = artesano.foto2
                            ? artesano.foto2.includes("https") ? artesano.foto2 : fotoPlaceholder
                            : fotoPlaceholder;
                            
            img.src = foto1;

            img.alt = nombreCompleto;

            img.onmouseover = () => {
                img.src = foto2;
            };

            img.onmouseout = () => {
                img.src = foto1;
            };

            name.textContent = nombreCompleto;
            categoria.innerText = artesano.categoria_artesano;
            categoria.style.fontWeight = "bold";
            categoria.style.marginBottom = "0";
            categoria.style.marginLeft = "10px";
            categoria.style.color = "green";
            categoria.style.textAlign = "left";

            button.textContent = "Ver Perfil";
            button.onclick = () => {
                window.location.href = `artesano.html?id=${artesano.id}`;
            };

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(categoria);
            card.appendChild(button);

            artesanoList.appendChild(card);
        });
    } catch (e) {
        console.error(e);
    }
};

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