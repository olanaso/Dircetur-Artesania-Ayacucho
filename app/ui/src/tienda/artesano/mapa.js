import { loadPartials } from "../../utils/viewpartials.js";
import { getArtesanosMapa } from './api.js';
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




async function startApp () {
    let artesanos = await getArtesanosMapa()
    $('[data-toggle="tooltip"]').tooltip();
    initMap(artesanos)
}

function isValidCoordinate (lat, lng) {
    // Expresión regular para verificar si la cadena es un número válido (positivo o negativo con decimales)
    const validNumberPattern = /^-?\d+(\.\d+)?$/;

    // Verificar si lat y lng cumplen con el patrón numérico
    if (!validNumberPattern.test(lat) || !validNumberPattern.test(lng)) {
        return false;
    }

    // Intentar convertir los valores a números
    lat = parseFloat(lat);
    lng = parseFloat(lng);

    // Asegurarse de que estén dentro del rango permitido
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        return false;
    }

    return true;
}


function initMap (artesanos) {

    // Crear el mapa centrado en una coordenada genérica
    var mymap = L.map("map").setView([-13.162303470168109, -74.23621448987504], 10);

    // Agregar capa de OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: 'Dircetur Ayacucho',
    }).addTo(mymap);

    // URL del avatar por defecto en caso de error
    var defaultAvatar = 'https://via.placeholder.com/50';

    // Contadores para los artesanos con y sin ubicación
    let artesanosConUbicacion = 0;
    let artesanosSinUbicacion = 0;


    // Iterar sobre la lista de artesanos y agregar un marcador para cada uno
    artesanos.forEach(artesano => {

        console.log(artesano)
        // Parsear los campos lst_taller y lst_especialidadtecnicas
        var talleres = JSON.parse(JSON.parse(artesano.lst_taller));
        var taller = talleres[0]; // Asumimos que hay al menos un taller
        var especialidades = JSON.parse(JSON.parse(artesano.lst_especialidadtecnicas));
        var especialidad = especialidades[0]; // Asumimos que hay al menos una especialidad

        // Validar las coordenadas del taller
        if (isValidCoordinate(taller.latitud, taller.longitud)) {
            // Contar como artesano con ubicación
            artesanosConUbicacion++;

            // Crear un icono personalizado con la foto del artesano
            var artisanIcon = L.divIcon({
                className: 'custom-icon', // Clase CSS personalizada
                html: `<img src="${artesano.foto1}" class="rounded-image" onerror="this.onerror=null; this.src='${defaultAvatar}'">`,
                iconSize: [50, 50], // Tamaño del icono
                iconAnchor: [25, 50], // Punto de anclaje
                popupAnchor: [0, -50] // Punto donde aparecerá el popup
            });

            // Crear el contenido del popup con la información del taller y especialidades técnicas
            var popupContent = `
                <div>
                <img style="height:100px" src="${artesano.foto1}" class="" onerror="this.onerror=null; this.src='${defaultAvatar}'">
                    <p><strong>${artesano.nombres} ${artesano.apellidos}</strong></p>
                    <p><strong>Taller:</strong></p>
                    <ul>
                        <li><strong>Nombre:</strong> ${taller.nombretaller}</li>
                        <li><strong>Horario de Atención:</strong> ${taller.horarioatencion}</li>
                        <li><strong>RUC:</strong> ${taller.ructaller}</li>
                        <li><strong>Dirección:</strong> ${taller.direccionfisica}</li>
                    </ul>
                    <p><strong>Especialidades Técnicas:</strong></p>
                    <ul>
                        <li><strong>Tipo de Artesanía:</strong> ${especialidad.tipoartesania}</li>
                        <li><strong>Habilidades:</strong> ${especialidad.descripcionhabilidades}</li>
                          <li><strong>Tipo de artesania:</strong> ${especialidad.desotro + ' - ' + especialidad.tipoartesania}</li>
                    </ul>
                     <button style="background: #ea0397; border:solid 0px #fff" class="btn btn-primary btn-sm" onclick="window.open('artesano.html?id='+${artesano.id}, '_blank')">
                    <i class="fas fa-user"></i> Perfil
                    </button>
                    <button style="background: #ea0397  border:solid 0px #fff" class="btn btn-primary btn-sm" onclick="window.open('https://www.google.com/maps?q=${taller.latitud},${taller.longitud}', '_blank')">
                     <i class="fas fa-map-marker"></i> Ir a dirección
                    </button>
                </div>
            `;

            // Agregar marcador personalizado con el popup
            L.marker([taller.latitud, taller.longitud], { icon: artisanIcon })
                .addTo(mymap)
                .bindPopup(popupContent);
        } else {
            // Contar como artesano sin ubicación
            artesanosSinUbicacion++;
        }


    })



    L.Control.geocoder({
        defaultMarkGeocode: false
    }).on('markgeocode', function (e) {
        var bbox = e.geocode.bbox;
        var poly = L.polygon([
            [bbox.getSouthEast().lat, bbox.getSouthEast().lng],
            [bbox.getNorthEast().lat, bbox.getNorthEast().lng],
            [bbox.getNorthWest().lat, bbox.getNorthWest().lng],
            [bbox.getSouthWest().lat, bbox.getSouthWest().lng]
        ]);
        mymap.fitBounds(poly.getBounds());
    }).addTo(mymap);
    // Agregar la leyenda
    var legend = L.control({ position: 'bottomleft' });
    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'legend');
        div.innerHTML = `
            <h4>Total de Artesanos: ${artesanos.length}</h4>
            <p>Con ubicación: ${artesanosConUbicacion}</p>
            <p>Sin ubicación: ${artesanosSinUbicacion}</p>
        `;
        return div;
    };
    legend.addTo(mymap);


}


