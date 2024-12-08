

import { loadPartials } from "../../utils/viewpartials.js";
import { getPortadaBusqueda, busquedaProductos } from './api';
import { custom, menuselec } from '../utils/common.js';


(async function () {
    let partials = [
        { path: '../partials/tienda/header.html', container: 'header' },
        { path: '../partials/tienda/footer.html', container: 'footer' },
    ];
    try {

        await loadPartials(partials);
        custom()
        menuselec()
        // import('../utils/common');
        console.log('Las vistas parciales se han cargado correctamente!');

        startApp();
    } catch (e) {
        console.error(e);
    }
})();


function startApp () {
    cargarDataPortada();
    rellenarFormulario();
    realizarBusqueda();
    changeRelevancia()
}


function validarSession () {
    const favoritosLinks = document.querySelectorAll('a[href^="productos-deseados.html?producto="]');

    favoritosLinks.forEach(favoritosLink => {
        favoritosLink.addEventListener('click', function (event) {
            const idCliente = localStorage.getItem('idCliente');

            if (!idCliente) {
                event.preventDefault();
                alert('Para agregar productos a tus favoritos, primero debes iniciar sesión.');
            }
        });
    });
}


function changeRelevancia () {
    $('#drpordenamientosbusqueda').on('change', function (e) {
        ordenamientosBusqueda()
    })
}

function generarURL () {

    const formulario = $('#miFormulario');
    const formData = new FormData(formulario[0]);
    const params = new URLSearchParams();

    formData.forEach((value, key) => {
        if (value) {  // Solo agregar a la URL si el valor no está vacío
            params.append(key, value);
        }
    });

    // Redirige a la misma página con los nuevos parámetros en la URL
    window.location.href = '?' + params.toString();

    // Previene el submit tradicional
    return false;
}

// Asigna la función generarURL al evento submit del formulario
$('#miFormulario').submit(generarURL);

// Rellena el formulario con los valores de la URL
function rellenarFormulario () {

    setTimeout(function () {
        const params = new URLSearchParams(window.location.search);

        params.forEach((value, key) => {
            const campo = $(`[name=${key}]`);

            if (campo.is('input') || campo.is('select')) {
                campo.val(value);
            }
        });
    }, 1000)


}

// Rellena el formulario con los valores de la URL
async function realizarBusqueda () {


    const params = new URLSearchParams(window.location.search);

    let busqueda = await busquedaProductos(params)

    loadProductos(busqueda)


}

function formatearNumero (numero) {
    // Convierte el valor a un número si es una cadena
    let numeroConvertido = parseFloat(numero);

    // Verifica que la conversión fue exitosa
    if (isNaN(numeroConvertido)) {
        return numero;
    }

    return numeroConvertido.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function loadProductos (data) {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page')) || 1;
    const itemsPerPage = 9;
    const totalRows = data.total_filas;
    const displayedItems = Math.min(page * itemsPerPage, totalRows);

    $('#lblTotales').text(`Resultados: ${displayedItems} de ${totalRows}`);


    let htmlPagination = generatePaginationHTML(data.paginas_totales)
    $('#paginationContainer').append(htmlPagination);
    let html = ` `
    console.log * (data.datos)
    for (let item of data.datos) {


        let artenia_anviar_carrito = {
            artesano_id: item.artesano_id,
            id: item.id,
            categoria_id: item.categoria_id,
            artesano: item.artesano,
            datos: {
                imagen_principal: item.imagen_principal,
                precio: item.imagen_principal,
                descripcion_es: item.nombres_es,
                cualidades_es: item.descripcion_es,
                precio: parseFloat(item.precio),
                oferta: item.lst_ofertas
            },
        }

        let artenia_deseados = {

            id: item.id + '-' + item.artesano_id,
            artesania: {
                id: item.id,
                nombre_es: item.nombres_es,
                precio: parseFloat(item.precio),
                imagen_principal: item.imagen_principal,
                url_carrito: encodeURIComponent(JSON.stringify(artenia_anviar_carrito))
            },
            artesano: {
                id: item.artesano_id,
                nombres: item.artesano,
                foto1: item.foto1,
            }
        }
        //alert(item.imagen)
        if (item.oferta) {
            html = html + `

                  <div class="col-md-4" style=" margin-bottom: 1rem;">
                <div class="card__busqueda shadow-lg" style=" height: 100%;">
                 <a href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}">
                    <img onerror="this.src='https://placehold.jp/DEDEDEE/EEEEEE/200x220.png?text=En proceso de carga';" class="card__busqueda-img-top" style="height:200px; width:100%; object-fit: cover;  transform: scale(0.85);  transform-origin: center;  "   src="${item?.imagen_principal || 'https://via.placeholder.com/300x250'}" alt="Casaca artesanal">
                    <span class="discount-label">Oferta</span>
                    </a>
                    <div class="card-body text-center" style="margin-top: 0px ">
                      <a href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}">   <h5 class="card__busqueda-title">${item?.nombres_es || ''}</h5>
                       </a>
                        <p class="card__busqueda-price-after-discount">${formatearNumero(item?.precio) || ''} PEN</p>
                        <p class="card__busqueda-price">${formatearNumero(item?.lst_ofertas[0]?.precioOfertado) || ''} PEN</p>
                        <p class="card__busqueda-category"> ${item?.categoria || ''}</p>
                       
                        <div class="d-flex align-items-center justify-content-center my-3">
                         <a  href="artesano.html?id=${item?.artesano_id || ''}"> 
                            <img  src="${item?.foto1 || 'https://via.placeholder.com/40'}" alt="Artesano" class="card__busqueda-artisan-img"></a>
                            <div class="ml-3 text-left">
                               <a  href="artesano.html?id=${item?.artesano_id || ''}"> <p class="card__busqueda-artisan mb-0">
                              ${item?.artesano || ''}
                               </p></a>
                                <p class="card__busqueda-location mb-0">Artesano</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between card__busqueda-buttons" >
                            <a href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}" class="btn btn-primary btn-sm">Ver más</a>
                            <a title="Agregar carrito de compras" class="btn btn-outline-dark btn-sm" href="carrito-de-compra.html?producto=${encodeURIComponent(JSON.stringify(artenia_anviar_carrito))}">
                                <i class="fas fa-shopping-cart"></i>
                            </a>
                            <a  title="Agregar mis favoritos" class="btn btn-outline-danger btn-sm" href="productos-deseados.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}">
                                <i class="fas fa-heart"></i>
                            </a>
                        </div>
                       
                    </div>
                </div>
            </div>
            
     
        `
        } else {
            html = html + `

                  <div class="col-md-4" style=" margin-bottom: 1rem;">
                <div class="card__busqueda shadow-lg" style=" height: 100%;">
                 <a href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}">
                    <img onerror="this.src='https://placehold.jp/DEDEDEE/EEEEEE/200x220.png?text=En proceso de carga';" class="card__busqueda-img-top" style="height:200px; width:100%; object-fit: cover;  transform: scale(0.85);  transform-origin: center;  "   src="${item?.imagen_principal || 'https://via.placeholder.com/300x250'}" alt="Casaca artesanal">
                    </a>
                    <div class="card-body text-center" style="margin-top: 0px ">
                      <a style="color:#000 !important" href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}">   
                      <h5 class="card__busqueda-title">${item?.nombres_es || ''}</h5>
                       </a>
                      
                        <p class="card__busqueda-price">${formatearNumero(item?.precio) || ''} PEN</p>
                        <p class="card__busqueda-category"> ${item?.categoria || ''}</p>
                       
                        <div class="d-flex align-items-center justify-content-center my-3">
                         <a  href="artesano.html?id=${item?.artesano_id || ''}"> 
                            <img  src="${item?.foto1 || 'https://via.placeholder.com/40'}" alt="Artesano" class="card__busqueda-artisan-img"></a>
                            <div class="ml-3 text-left">
                               <a  href="artesano.html?id=${item?.artesano_id || ''}"> <p class="card__busqueda-artisan mb-0">
                              ${item?.artesano || ''}
                               </p></a>
                                <p class="card__busqueda-location mb-0">Artesano</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between card__busqueda-buttons" >
                            <a href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}" class="btn btn-primary btn-sm">Ver más</a>
                            <a title="Agregar carrito de compras" class="btn btn-outline-dark btn-sm" href="carrito-de-compra.html?producto=${encodeURIComponent(JSON.stringify(artenia_anviar_carrito))}">
                                <i class="fas fa-shopping-cart"></i>
                            </a>
                            <a  title="Agregar mis favoritos" class="btn btn-outline-danger btn-sm" href="productos-deseados.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}">
                                <i class="fas fa-heart"></i>
                            </a>
                        </div>
                       
                    </div>
                </div>
            </div>
            
     
        `

        }

    }
    $('#listaProductosNovedades').append(html)

    setTimeout(() => validarSession(), 500)

}

function generatePaginationHTML (totalPages) {


    const maxVisiblePages = 5; // Máximo número de páginas visibles en la paginación

    // Obtener el parámetro `page` de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(urlParams.get('page')) || 1;

    let paginationHTML = '<div class="page-numbers"><div class="pagination-content"><ul>';

    // Botón "Primero"
    if (currentPage > 1) {
        paginationHTML += `<li><a href="#" onclick="goToPage(1)">Primero</a></li>`;
    }

    // Botón "Anterior"
    if (currentPage > 1) {
        paginationHTML += `<li><a href="#" onclick="goToPage(${currentPage - 1})">Anterior</a></li>`;
    }

    if (totalPages <= maxVisiblePages) {
        // Mostrar todas las páginas si el total de páginas es menor o igual al máximo visible
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += generatePageItem(i, currentPage);
        }
    } else {
        // Mostrar la primera página
        paginationHTML += generatePageItem(1, currentPage);

        if (currentPage > Math.ceil(maxVisiblePages / 2) + 1) {
            paginationHTML += '<li><span>...</span></li>';
        }

        // Calcular el rango de páginas a mostrar
        const startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxVisiblePages / 2));

        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += generatePageItem(i, currentPage);
        }

        if (currentPage < totalPages - Math.floor(maxVisiblePages / 2)) {
            paginationHTML += '<li><span>...</span></li>';
        }

        // Mostrar la última página
        paginationHTML += generatePageItem(totalPages, currentPage);
    }

    // Botón "Siguiente"
    if (currentPage < totalPages) {
        paginationHTML += `<li><a href="#" onclick="goToPage(${currentPage + 1})">Siguiente</a></li>`;
    }

    // Botón "Último"
    if (currentPage < totalPages) {
        paginationHTML += `<li><a href="#" onclick="goToPage(${totalPages})">Último</a></li>`;
    }

    paginationHTML += '</ul></div></div>';
    return paginationHTML;

}

function generatePageItem (pageNumber, currentPage) {
    if (pageNumber === currentPage) {
        return `<li class="active"><a href="#" onclick="goToPage(${pageNumber})">${pageNumber}</a></li>`;
    } else {
        return `<li><a href="#" onclick="goToPage(${pageNumber})">${pageNumber}</a></li>`;
    }
}

function goToPage (pageNumber) {
    let url = new URL(window.location.href);
    url.searchParams.set('page', pageNumber);
    window.location.href = url.href;
}
window.goToPage = goToPage
// Llamar a la función para rellenar el formulario al cargar la página


async function cargarDataPortada () {

    let resultado = await getPortadaBusqueda()
    cargarComboCategorias(resultado.listCategorias)
    cargarComboAertesanos(resultado.listArtesanos)
}

function cargarComboCategorias (list) {

    let html = `
<option value="">- TODOS -</option>
    `;

    for (let item of list) {
        // Escapar los valores para evitar problemas de seguridad
        const idEscaped = $('<div>').text(item.id).html();
        const categoriaEscaped = $('<div>').text(item.categoria).html();

        html += `<option value="${idEscaped}">${categoriaEscaped}</option>\n`;
    }

    // Reemplazar el contenido de #categorias con el nuevo HTML
    $('#id_categoria').html(html);

}

function cargarComboAertesanos (list) {
    let html = `
<option value="">- TODOS -</option>
    `;

    for (let item of list) {
        // Escapar los valores para evitar problemas de seguridad
        const idEscaped = $('<div>').text(item.id).html();
        const categoriaEscaped = $('<div>').text(item.artesano).html();

        html += `<option value="${idEscaped}">${categoriaEscaped}</option>\n`;
    }

    // Reemplazar el contenido de #categorias con el nuevo HTML
    $('#id_artesano').html(html);
}

function ordenamientosBusqueda () {
    let valorordenamiento = $('#drpordenamientosbusqueda option:selected').val()
    // alert(valorordenamiento)

    // Obtener los parámetros actuales de la URL
    const currentParams = new URLSearchParams(window.location.search);

    // Agregar o actualizar el parámetro 'order' con el valor seleccionado
    currentParams.set('order', valorordenamiento);

    // Redirige a la misma página con los parámetros actualizados en la URL
    window.location.href = '?' + currentParams.toString();

    // Previene el submit tradicional
    return false;
    /* const formulario = $('#miFormulario');
     const formData = new FormData(formulario[0]);
     const params = new URLSearchParams();
 
     formData.forEach((value, key) => {
         if (value) {  // Solo agregar a la URL si el valor no está vacío
             params.append(key, value);
         }
     });
     params.append('order', valorordenamiento);
     // Redirige a la misma página con los nuevos parámetros en la URL
     window.location.href = '?' + params.toString();
 
     // Previene el submit tradicional
     return false;*/
}
