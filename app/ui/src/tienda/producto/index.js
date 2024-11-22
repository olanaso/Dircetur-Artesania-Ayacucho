

import { loadPartials } from "../../utils/viewpartials.js";
import { getPortadaBusqueda, busquedaProductos, listarComentarios, nuevoComentario, obtenerPuntuacion, enviarPuntuacion } from './api';
import { custom } from '../utils/common.js';
import { obtenerProducto } from "../producto/api.js";


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
    }
})();


function startApp () {
    createMenuMobil()
    //createSlidersProd()
    // cargarDataPortada();
    // rellenarFormulario();
    // realizarBusqueda();
    obtenerUrlProducto()
}

const setearPuntuacion = async (productoid) => {

    let puntuacion = await obtenerPuntuacion(productoid);
    puntuacion = puntuacion > 5 ? 5 : puntuacion;
    puntuacion = puntuacion < 0 ? 0 : puntuacion;

    const estrella = document.querySelector(`input[name="rate"][value="${puntuacion}"]`);

    if (estrella) {
        estrella.checked = true;
    }
}

const enviarCalificacion = async (productoId) => {
    document.querySelectorAll('input[name="rate"]').forEach(star => {
        star.addEventListener('change', async () => {
            const valor = star.value;

            const data = {
                libroid: productoId,
                valor: parseInt(valor)
            };

            const resp = await enviarPuntuacion(data);

            const ratingContainer = document.querySelector('.rating-container');
            const mensajeElement = document.createElement('p');
            mensajeElement.style.color = resp ? '#4caf50' : '#f44336';
            mensajeElement.style.fontWeight = 'bold';

            if (resp) {
                mensajeElement.textContent = '¡Gracias por tu calificación!';
                setearPuntuacion(productoId);
            } else {
                mensajeElement.textContent = 'Ocurrió un error al enviar tu calificación.';
            }

            ratingContainer.appendChild(mensajeElement);

            setTimeout(() => {
                mensajeElement.remove();
            }, 3000);
        });
    });
}

const obtenerComentarios = async (id) => {
    const commentsList = document.querySelector('.comments-list');

    try {
        commentsList.innerHTML = '';

        const comentarios = await listarComentarios(id);

        debugger

        if (!comentarios || comentarios.length === 0) {
            commentsList.innerHTML = '<div id="noComentarios" style="text-align: center; padding: 20px; color: #666; font-size: 16px; font-style: italic; border: 1px dashed #ccc; border-radius: 8px; margin: 10px 0;">No hay comentarios disponibles para este producto.</div>';
            return;
        }

        const comentariosOrdenados = comentarios.sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );

        const fragment = document.createDocumentFragment();

        comentariosOrdenados.forEach(comentario => {
            const newCommentElement = document.createElement('div');
            newCommentElement.classList.add('comment', 'fadeInUp');

            const fecha = new Date(comentario.createdAt);
            const fechaFormateada = fecha.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const nombres = comentario.cliente.nombres || '';
            const apellidos = comentario.cliente.apellidos || '';

            const iniciales = (nombres.charAt(0) + apellidos.charAt(0)).toUpperCase();

            newCommentElement.innerHTML = `
                <div class="comment-avatar">
                    <div class='avatar-initial'>${iniciales}</div>
                </div>
                <div class="comment-content">
                    <div class="comment-header">
                        <h3 class='comment-author'>${nombres} ${apellidos}</h3>
                        <span class='comment-date'>${fechaFormateada}</span>
                    </div>
                    <p class='comment-text'>${comentario.comentario}</p>
                </div>
            `;

            fragment.appendChild(newCommentElement);
        });

        commentsList.appendChild(fragment);

    } catch (error) {
        console.error('Error al cargar comentarios:', error);
        commentsList.innerHTML = '<div class="error-message">Ocurrió un error al cargar los comentarios.</div>';
    }
}

const agregarComentario = async (artesaniaId) => {

    const commentForm = document.getElementById('comment-form');
    const newCommentTextarea = document.getElementById('new-comment');
    const commentsList = document.querySelector('.comments-list');

    const loaderComentario = document.getElementById('loaderComentario');

    commentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        loaderComentario.style.display = 'block';

        const idCliente = localStorage.getItem('idCliente')

        if (!idCliente || idCliente === 'null' || idCliente === 'undefined') {
            loaderComentario.style.display = 'none';
            alert('Debes iniciar sesión para poder comentar.');
            return;
        }

        const comentario = newCommentTextarea.value.trim();

        if (comentario.length === 0) {
            loaderComentario.style.display = 'none';
            alert('Por favor, escribe un comentario antes de enviarlo.');
            return;
        }

        try {
            const objComentario = {
                clienteid: Number(idCliente),
                productoid: artesaniaId,
                nropagina: 1,
                comentario,
            };

            const data = await nuevoComentario(objComentario);
            debugger

            if (data === null || data === undefined) {
                loaderComentario.style.display = 'none';
                alert('Ocurrió un error al enviar el comentario.');
                return;
            }

            // Quita el mensaje de "No hay comentarios"
            const noComentarios = document.getElementById('noComentarios');
            if (noComentarios) {
                noComentarios.remove();
            }

            newCommentTextarea.value = '';

            // agregar el nuevo comentario a la lista
            const fecha = new Date(data.createdAt);
            const fechaFormateada = fecha.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const nombres = data.cliente.nombres || '';
            const apellidos = data.cliente.apellidos || '';

            const iniciales = (nombres.charAt(0) + apellidos.charAt(0)).toUpperCase();

            const newCommentElement = document.createElement('div');
            newCommentElement.classList.add('comment', 'fadeInUp');

            newCommentElement.innerHTML = `
                <div class="comment-avatar">
                    <div class='avatar-initial'>${iniciales}</div>
                </div>
                <div class="comment-content">
                    <div class="comment-header">
                        <h3 class='comment-author'>${nombres} ${apellidos}</h3>
                        <span class='comment-date'>${fechaFormateada}</span>
                    </div>
                    <p class='comment-text'>${data.comentario}</p>
                </div>
            `;

            commentsList.prepend(newCommentElement);

        } catch (error) {
            console.error('Error al enviar comentario:', error);
            alert('Ocurrió un error al enviar el comentario.');
        } finally {
            loaderComentario.style.display = 'none';
        }
    });

}

function obtenerUrlProducto () {
    const queryString = window.location.search;

    // Parsear la cadena de consulta para obtener los parámetros
    const urlParams = new URLSearchParams(queryString);

    // Obtener el valor del parámetro 'data'
    const data = urlParams.get('producto');

    console.log({ data })

    // Decodificar y convertir el objeto JSON nuevamente
    if (data) {
        const artesaniaenviada = JSON.parse(data);

        // Mostrar el objeto en el DOM
        //    debugger

        const artesaniaId = artesaniaenviada.artesania.id;
        console.log(artesaniaenviada)

        infoProductoById(artesaniaId)
        obtenerComentarios(artesaniaId)
        agregarComentario(artesaniaId)
        setearPuntuacion(artesaniaId)
        enviarCalificacion(artesaniaId)

        $('#btnagregarcarrito').attr('href', `carrito-de-compra.html?producto=${artesaniaenviada.artesania.url_carrito}`)
        //guardarArtesania(artesaniaenviada.artesania.id);


    } else {
        console.log('Ningun Objeto recibido')
    }
    // generarInterfaz();
}

function getQueryParameter (name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function infoProductoById (id) {

    const producto = await obtenerProducto(id);
    console.log(" >DATA producto: ", producto);
    mostrarInformacion(producto);
}

function transformarMaterialesResponseToArray (materiales) {
    return materiales.split('\n');
}
function transformarImagenesSecResponseToArray (imagenes) {
    // 1er parseo
    const innerString = JSON.parse(imagenes);
    // 2do parseo
    const parsedResponse = JSON.parse(innerString);
    //map para obtener src
    const srcArray = parsedResponse.map(item => item.src);
    return srcArray;

}

function showMaterials (materiales) {
    //materiales
    if (materiales.length > 0) {
        for (let material of materiales) {
            $("#producto-materiales").append(`
                <ul>
                <li><i class="fa fa-check-square"></i><span>${material}</span></li>
                </ul>
            `)
        }
    }
    else {
        console.log('no hay materiales')
    }
}

function showVideos (listaVideos) {
    //materiales
    if (listaVideos.length > 0) {
        for (let material of materiales) {
            $("#producto-materiales").append(`
                <ul>
                <li><i class="fa fa-check-square"></i><span>${material}</span></li>
                </ul>
            `)
        }
    }
    else {
        console.log('no hay materiales')
    }
}

function showProductSlider (imagenesSecundarias, imagenPrincial) {

    let imagenes = [imagenPrincial, ...imagenesSecundarias]
    let sp_slides = ``
    let sp_thumbnails = ``
    for (let imagen of imagenes) {
        sp_slides += `
        <div class="sp-slide ">
									<img class="sp-image" src="${imagen}" alt="" onerror="this.src='https://placehold.jp/DEDEDEE/EEEEEE/200x220.png?text=En proceso de carga';"/>
								</div>
        `
        sp_thumbnails += `<img style="heigth:120;width:180px" class="sp-thumbnail" src="${imagen}" alt="" onerror="this.src='https://placehold.jp/DEDEDEE/EEEEEE/100x100.png?text=En proceso de carga';" />`
    }

    $('#id-sp-slides').html('');
    $('#id-sp-thumbnails').html('');
    $('#id-sp-slides').append(sp_slides);
    $('#id-sp-thumbnails').append(sp_thumbnails);

    $('#single-car').sliderPro({
        width: 570,
        height: 450,
        fade: true,
        arrows: true,
        buttons: false,
        fullScreen: true,
        shuffle: true,
        smallSize: 500,
        mediumSize: 1000,
        largeSize: 3000,
        thumbnailArrows: true,
        autoplay: false
    });

    console.log('imagenesSecundarias', imagenesSecundarias)

}


// Función para generar el HTML de los cuadritos de color
function generarHtmlColores (colores) {
    if (colores.length == 0) {
        return '<span>-</span>';
    }
    let html = '';
    colores.forEach(item => {
        html += `<div class="cuadro-color" style="background-color: ${item.color.trim()}"></div>`;
    });
    return html;
}
//Gestionar las tallas
function convertirTallasEnString (lista) {
    // Filtrar elementos con talla no nula ni vacía y extraer solo las tallas
    const tallas = lista
        .filter(item => item.talla !== null && item.talla !== '')
        .map(item => item.talla);

    // Si no hay tallas válidas, devolver "ninguno"
    if (tallas.length === 0) {
        return "Ninguno";
    }

    // Unir las tallas en un solo string separado por comas
    return tallas.join(", ");
}


async function mostrarInformacion (producto) {

    // debugger
    const listColores = JSON.parse(JSON.parse(producto.lst_colores));
    const lst_ofertas = JSON.parse(JSON.parse(producto.lst_ofertas));
    const lst_otros_costos = JSON.parse(JSON.parse(producto.lst_otros_costos));
    const lst_tallas = JSON.parse(JSON.parse(producto.lst_talla));
    const lst_videoenlace = JSON.parse(JSON.parse(producto.lst_videoenlace));
    const lst_videos = JSON.parse(JSON.parse(producto.lst_videos));

    const colores = generarHtmlColores(listColores)
    const materiales = transformarMaterialesResponseToArray(producto.materiales_es)
    const imagenesSecundarias = transformarImagenesSecResponseToArray(producto.lst_imagenes)
    console.log('imagenPrincipal', producto.imagen_principal)

    $("#producto-nombre").text(`${producto.nombres_es}`);
    $("#producto-precio").text(`S/ ${producto.precio}  | $ ${producto.precio_usd}`);
    $("#producto-descripcion").text(`${producto.descripcion_es}`);
    $("#producto-alto").text(`Alto: ${producto.alto} cm`);
    $("#producto-ancho").text(`Ancho:${producto.ancho} cm`);
    $("#producto-tallas").text(`Tallas: ${convertirTallasEnString(lst_tallas)} `);

    $('#contenedor-colores').append(colores);
    $("#producto-color").text(`${colores == "" ? 'No disponible' : colores}`);
    $("#producto-peso").text(`Peso: ${producto.peso}`);
    $("#producto-cantidad").text(`Cant. disponible: ${producto.cantidad}`);
    $("#producto-cualidades").text(`${producto.cualidades_es}`);
    $("#artesano-celular").text(`${producto.datos_artesano.celular}`);
    $("#artesano-correo").text(`${producto.datos_artesano.correo}`);
    $("#artesano-informacion").text(`${producto.datos_artesano.nombres} ${producto.datos_artesano.apellidos} `);
    $("#artesano-informacion").attr("href", `artesano.html?id=${producto.artesano_id}`);
    $("#artesano-img").attr("src", `${producto.datos_artesano.foto1}`);

    $("#producto-tecnicas").text(`${producto.tecnicas_es}`);
    $("#producto-cualidades_es").text(`${producto.cualidades_es}`);
    $("#producto-numero_piezas_es").text(`${producto.numero_piezas_es}`);

    $("#producto-preventas").text(`${producto.preventas == 0 || '0' ? 'Sujeta a Stock' : 'En preventa'}`);
    $("#producto-tiempo_elaboracion").text(`${producto.tiempo_elaboracion == 0 || '0' ? 'Acuerdo con el artesano' : producto.tiempo_elaboracion + ' Días'}`);
    $("#producto-tiempo_envio").text(`${producto.tiempo_envio == 0 || '0' ? 'Acuerdo con el artesano' : producto.tiempo_envio + ' Días'}`);


    loadProductosDestacados(producto.productosRelacionados)

    showMaterials(materiales);
    showProductSlider(imagenesSecundarias, producto.imagen_principal);
    //showVideos(lst_videoenlace);

    $('#videoproducto').attr('src', lst_videos[0].src)

}

function createSlidersProd () {
    $('#single-car').sliderPro({
        width: 570,
        height: 450,
        fade: true,
        arrows: true,
        buttons: false,
        fullScreen: true,
        shuffle: true,
        smallSize: 500,
        mediumSize: 1000,
        largeSize: 3000,
        thumbnailArrows: true,
        autoplay: false
    });

}

function createMenuMobil () {

    $("#cssmenu").menumaker({
        title: "Menu",
        format: "multitoggle"
    });
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
    return numero.toLocaleString('es-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


function loadProductos (data) {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page')) || 1;
    const itemsPerPage = 10;
    const totalRows = data.total_filas;
    const displayedItems = Math.min(page * itemsPerPage, totalRows);

    $('#lblTotales').text(`Resultados: ${displayedItems} de ${totalRows}`);


    let htmlPagination = generatePaginationHTML(data.paginas_totales)
    $('#paginationContainer').append(htmlPagination);
    let html = ` `
    console.log * (data.datos)
    for (let item of data.datos) {
        //alert(item.imagen)
        html = html + `
       	<div class="col-md-6 col-sm-6">
							<div class="car-item wow fadeIn" data-wow-duration="0.75s">
								<div class="thumb-content">
									<div class="car-banner nuevo-producto">
										
									</div>
									<div class="thumb-inner photo-prod">
										<a href="producto.html?id=${item.id}"><img style="height:250px" src="${item?.imagen_principal || "https://via.placeholder.com/400x200"}" alt=""></a>
									</div>
								</div>
								<div class="down-content">
  <a href="producto.html?id=${item.id}" style="color:#000">
									
									<h5 title="${item?.nombres_es || ""}" class="card-title font-weight-bold product-description">${item?.nombres_es || ""}</h5>
</a>
									<p class="h4 text-danger font-weight-bold">S/.${formatearNumero(item?.precio) || ""} </p>
									<p class="card-text text-muted">Categoría: ${item?.categoria}</p>
									<div class="d-flex align-items-center mt-3" title="Artesano">
										<img class="rounded-circle mr-2"
											src="${item?.foto1 || "https://via.placeholder.com/40"}"
											alt="Jose Mendoza" style="width: 40px; height: 40px;">
										<span class="text-dark">
                                        <a style: "color:#dedede!important" href="artesano.html?id=${item?.artesano_id}"> ${item?.artesano || ""}</a>
                                       
                                         
                                         </span>
                                        	<div class="line-dec2"></div>
								
									</div>
										<div class="d-flex mt-4">

                                    <div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-light"><a class="" href="producto.html?id=${item.id}">Ver más</a></button>
  <button type="button" class="btn btn-light btn-comprar" producto_id="${item.id}"><svg
												width="15" height="15" viewBox="0 0 15 15" fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M0 0.5C0 0.367392 0.0526784 0.240215 0.146447 0.146447C0.240215 0.0526784 0.367392 0 0.5 0H2C2.11153 3.08115e-05 2.21985 0.0373507 2.30773 0.106025C2.39561 0.174699 2.45801 0.270784 2.485 0.379L2.89 2H14.5C14.5734 2.00007 14.6459 2.0163 14.7124 2.04755C14.7788 2.0788 14.8375 2.12429 14.8844 2.1808C14.9313 2.23731 14.9651 2.30345 14.9835 2.37452C15.002 2.44558 15.0045 2.51984 14.991 2.592L13.491 10.592C13.4696 10.7066 13.4087 10.8101 13.3191 10.8846C13.2294 10.9591 13.1166 10.9999 13 11H4C3.88343 10.9999 3.77057 10.9591 3.68091 10.8846C3.59126 10.8101 3.53045 10.7066 3.509 10.592L2.01 2.607L1.61 1H0.5C0.367392 1 0.240215 0.947322 0.146447 0.853553C0.0526784 0.759785 0 0.632608 0 0.5ZM5 11C4.46957 11 3.96086 11.2107 3.58579 11.5858C3.21071 11.9609 3 12.4696 3 13C3 13.5304 3.21071 14.0391 3.58579 14.4142C3.96086 14.7893 4.46957 15 5 15C5.53043 15 6.03914 14.7893 6.41421 14.4142C6.78929 14.0391 7 13.5304 7 13C7 12.4696 6.78929 11.9609 6.41421 11.5858C6.03914 11.2107 5.53043 11 5 11ZM12 11C11.4696 11 10.9609 11.2107 10.5858 11.5858C10.2107 11.9609 10 12.4696 10 13C10 13.5304 10.2107 14.0391 10.5858 14.4142C10.9609 14.7893 11.4696 15 12 15C12.5304 15 13.0391 14.7893 13.4142 14.4142C13.7893 14.0391 14 13.5304 14 13C14 12.4696 13.7893 11.9609 13.4142 11.5858C13.0391 11.2107 12.5304 11 12 11ZM5 12C5.26522 12 5.51957 12.1054 5.70711 12.2929C5.89464 12.4804 6 12.7348 6 13C6 13.2652 5.89464 13.5196 5.70711 13.7071C5.51957 13.8946 5.26522 14 5 14C4.73478 14 4.48043 13.8946 4.29289 13.7071C4.10536 13.5196 4 13.2652 4 13C4 12.7348 4.10536 12.4804 4.29289 12.2929C4.48043 12.1054 4.73478 12 5 12ZM12 12C12.2652 12 12.5196 12.1054 12.7071 12.2929C12.8946 12.4804 13 12.7348 13 13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13C11 12.7348 11.1054 12.4804 11.2929 12.2929C11.4804 12.1054 11.7348 12 12 12Z"
													fill="black" />
											</svg> Comprar</button>
  <button type="button" class="btn btn-light btn-favoritos" producto_id="${item.id}">	<svg width="15" height="14" viewBox="0 0 15 14" fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M7.5 13.7625L6.4125 12.7725C2.55 9.27 0 6.9525 0 4.125C0 1.8075 1.815 0 4.125 0C5.43 0 6.6825 0.6075 7.5 1.56C8.3175 0.6075 9.57 0 10.875 0C13.185 0 15 1.8075 15 4.125C15 6.9525 12.45 9.27 8.5875 12.7725L7.5 13.7625Z"
													fill="red" />
											</svg> Favorito</button>
</div>
										
                                       

									
									
									</div>

								</div>
							</div>
						</div>


        `
    }
    $('#listaProductosNovedades').append(html)


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



function loadProductosDestacados (data) {

    // debugger

    let html = ` `
    for (let item of data) {

        let artenia_anviar_carrito = {
            artesano_id: item.artesano_id,
            id: item.id,
            categoria_id: item.categoria_id,
            artesano: item.datos_artesano.nombres + ' ' + item.datos_artesano.apellidos,
            datos: {
                imagen_principal: item.imagen_principal,
                descripcion_es: item.nombres_es,
                cualidades_es: item.descripcion_es,
                precio: parseFloat(item.precio)
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
                nombres: item.datos_artesano.nombres + ' ' + item.datos_artesano.apellidos,
                foto1: item.datos_artesano.foto1,
            }
        }


        //alert(item.imagen)
        html = html + `
       <div class="item wow fadeIn card " data-wow-duration="0.75s">
						<div class="img-contenedor-destacados">
                          <a href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}" style="color:#000">
							<img class="img-destacados"
								src="${item?.imagen_principal || "https://via.placeholder.com/400x200"}" />
                                   </a>
						</div>
						
						<div class="line-dec"></div>

						<div class="card-body">
							<!-- <div class="d-flex justify-content-between align-items-center mb-2">
								<span class="badge badge-danger" style="color: #fff;">-15%</span>
								<span class="text-muted"><s>S/. 1770.00</s></span>
							</div> -->
                            <a href="producto.html?producto=${encodeURIComponent(JSON.stringify(artenia_deseados))}" style="color:#000">
							<h5 title="${item?.nombres_es || ""}" class="card-title font-weight-bold product-description">${item.nombres_es || "-"}</h5>
                            </a>
							<p class="h4 text-danger font-weight-bold">S/.${formatearNumero(item?.precio) || ""}</p>
							<p class="card-text text-muted">Categoría: ${item?.categoria_producto?.denominacion}</p>


							<div class="author-rate">
								
								<h4><a style: "color:#dedede!important" href="artesano.html?id=${item?.artesano_id}"> ${item?.artesano || ""}</a></h4>
								<div class="line-dec2"></div>
								
                                <a href="carrito-de-compra.html?producto=${encodeURIComponent(JSON.stringify(artenia_anviar_carrito))}" title="Ir a carrito de compras">Comprar <i class="fa fa-shopping-cart"></i></a>
							</div>
						</div>
					</div>


        `
    }
    $('#owl-testimonials').append(html)


    $('#owl-testimonials').owlCarousel({
        pagination: true,
        paginationNumbers: false,
        autoplay: true,
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    })
}


