import { loadPartials } from "../../utils/viewpartials.js";
import { listarArtesanos } from "./api.js";
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
        const artesanos = await listarArtesanos();
        gridArtesanos(artesanos);

        const searchInput = document.getElementById("searchInputArtesano");
        const searchButton = document.getElementById("searchButtonArtesano");

        searchInput.addEventListener("input", () => {
            buscarArtesanos(artesanos, searchInput);
        });
        
        searchButton.addEventListener("click", () => {
            buscarArtesanos(artesanos, searchInput);
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
            const button = document.createElement("button");

            card.className = "person-card";

            img.src = artesano.foto1 || "https://via.placeholder.com/200";
            img.alt = artesano.nombres;

            img.onmouseover = () => {
                img.src = artesano.foto2 || img.src;
            };

            img.onmouseout = () => {
                img.src = artesano.foto1 || "https://via.placeholder.com/200";
            };

            name.textContent = artesano.nombres;

            button.textContent = "Ver Perfil";
            button.onclick = () => {
                window.location.href = `artesano.html?id=${artesano.id}`;
            };

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(button);
            artesanoList.appendChild(card);
        });
    } catch (e) {
        console.error(e);
    }
};

const buscarArtesanos = async (artesanos, searchInput) => {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredArtesanos = artesanos.filter((artesano) =>
        artesano.nombres.toLowerCase().includes(searchTerm)
    );
    
    gridArtesanos(filteredArtesanos);
};
