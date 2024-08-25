import { validarHTML5 } from '../utils/validateForm';
import { saveDataToLocalStorage } from '../utils/config';
import { hideLoading } from '../utils/init';
import { obtenerParametrosURL } from '../utils/path';
import { obtenerProducto, obtenerArtesano, listarProductos, listarProductosPorCategoria } from './api';
import {addProductToWishlist} from '../añadir-deseados/api.js';
import { getDataFromLocalStorage } from '../utils/config';

function getClientId() {
    return getDataFromLocalStorage('idCliente');
}

document.querySelector('.add-to-wishlist a').addEventListener('click', (event) => {
    event.preventDefault();
    const productId = getQueryParameter('id');
    const clientId = getClientId();
    console.log(`Adding product ${productId} to wishlist for client ${clientId}`);
    addProductToWishlist(productId, clientId);
});


let cantidadMaxima;

document.addEventListener('DOMContentLoaded', async () => {
    infoProd();
    setupQuantityControls();
});

async function infoProd() {
    const productoId = getQueryParameter('id');
    const producto = await obtenerProducto(productoId);
    const artesano = await obtenerArtesano(producto.artesano_id);

    let categoriaMap = {
        101: 'TE',
        108: 'CER',
        113: 'PT',
        131: 'RET',
        132: 'OH'
    };

    let categoriaId = categoriaMap[producto.categoria_id] || producto.categoria_id.toString();
    let productosRecomendadosPorCategoria = await listarProductosPorCategoria(categoriaId);

    let productosRecomendados = productosRecomendadosPorCategoria.data.filter(p => p.id !== parseInt(productoId));
    let recommendedProductsHtml = '';

    for (let i = 0; i < productosRecomendados.length; i++) {
        let productos = productosRecomendados[i];

        recommendedProductsHtml += `
        <a href="principal-detalle.html?id=${productos.id}">
        <div class="recommended-product">
        <div class="recommended-product-card">
            <img src="${productos.imagen_principal}" alt="${productos.nombres_es}">
            <p class="text-limited">${productos.nombres_es}</p>
            <p class="text-limited">${productos.resumen_es}</p>
            <p class="price-design">S/. ${productos.precio}</p>
        </div>
        </div>
        </a>`;
    }

    document.getElementById('recommended-products').innerHTML = recommendedProductsHtml;

    // Initialize Slick Carousel
    $('#recommended-products').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: $('.left-arrow'),
        nextArrow: $('.right-arrow'),
        touchMove: true,
        swipe: true,
        draggable: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false
                }
            }
        ]
    });

    const imagenesProd = JSON.parse(JSON.parse(producto.lst_imagenes.replace(/\/\//g, '/')));
    console.log('imagenesProd: ', imagenesProd);

    let S1 = `<div class="sp-slide" data-index="0">
            <div class="sp-image-container">
                <img class="sp-image" src="${producto.imagen_principal}" alt="Imagen Principal">
            </div>
         </div>`;
    let S2 = `<div class="sp-thumbnail-container">
            <img class="sp-thumbnail" src="${producto.imagen_principal}" alt="Imagen Principal">
          </div>`;

    let index = 1;
    for (let imagen of imagenesProd) {
        if (imagen.src.startsWith('http:/') && !imagen.src.startsWith('http://')) {
            imagen.src = imagen.src.replace('http:/', 'http://');
        }
        S1 += `<div class="sp-slide" data-index="${index}">
            <div class="sp-image-container">
                <img class="sp-image" src="${imagen.src}" alt="Imagen ${producto.nombres_es}">
            </div>
           </div>`;
        S2 += `<div class="sp-thumbnail-container">
            <img class="sp-thumbnail" src="${imagen.src}" alt="Imagen ${producto.nombres_es}">
           </div>`;
        index++;
    }

    $('#slider1').empty().append(S1);
    $('#slider2').empty().append(S2);

    $('#slider1').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '#slider2',
        prevArrow: $('.sp-arrow.sp-previous-arrow'),
        nextArrow: $('.sp-arrow.sp-next-arrow'),
        initialSlide: 0,
        touchMove: false,
        swipe: false,
        draggable: false
    });
    $('#slider2').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '#slider1',
        dots: true,
        centerMode: true,
        focusOnSelect: true,
        prevArrow: $('.sp-arrow.sp-previous-arrow'),
        nextArrow: $('.sp-arrow.sp-next-arrow'),
        initialSlide: 0,
        touchMove: true,
        swipe: true,
        draggable: true
    });

    $('#slider1').slick('slickGoTo', 0, true);
    $('#slider2').slick('slickGoTo', 0, true);

    $('.sp-arrow.sp-next-arrow').click();
    setTimeout(() => {
        $('.sp-arrow.sp-previous-arrow').click();
    }, 500);

    /*carga de datos sobre producto y artesano*/
    const listColores = JSON.parse(JSON.parse(producto.lst_colores));
    const listTallas = JSON.parse(JSON.parse(producto.lst_talla));
    const listOfertas = JSON.parse(JSON.parse(producto.lst_ofertas));
    const listOtrosCostos = JSON.parse(JSON.parse(producto.lst_otros_costos));
    const listMediosPago = JSON.parse(JSON.parse(artesano.lst_mediospago));

    console.log('coloes: ', listMediosPago);
    if (listColores.length > 0) {
        for (let color of listColores) {
            $('#Colores').append(
                `<button id="sizeButton-6-US" type="button" class="size-button selected rebranded red-text" style="background: ${color.color};width: 30px;height: 30px;"> </button>`
            );
        }
    } else {
        $('#Colores').append(
            `<p>No hay colores disponibles</p>`
        );
    }
    if (listTallas.length > 0) {
        for (let talla of listTallas) {
            $('#tallas').append(
                `<button id="sizeButton-6-US" type="button" class="size-button selected rebranded red-text" >${talla.talla} </button>`
            );
        }
    } else {
        $('#tallas').append(
            `<p>No hay tallas disponibles</p>`
        );
    }

    if (listOtrosCostos.length > 0) {
        for (let costos of listOtrosCostos) {
            $('#otrosCostos').append(
                `<option value="${costos.id}">${costos.nombre} (S/ ${costos.precio})</option>`
            );
        }
    }

    if (producto.cantidad > 10) {
        $('.stock-info').append(
            `<p id="cantidadProd" style="margin-bottom: 0;margin-top: 0px !important;">${producto.cantidad} disponibles 
                <span id="disponible" style="display: inline-block; background-color: rgb(40 167 69 / 58%); color: white; padding: 3px 8px; border-radius: 5px; margin-left: 5px; cursor: pointer;">
                    En stock
                </span>
            </p>`
        );
    } else if (producto.cantidad > 5) {
        $('.stock-info').append(
            `<p id="cantidadProd" style="margin-bottom: 0;margin-top: 0px !important;">${producto.cantidad} disponibles 
                <span id="disponible" style="display: inline-block; background-color: rgb(0 0 255 / 58%); color: white; padding: 3px 8px; border-radius: 5px; margin-left: 5px; cursor: pointer;">
                    Bajo stock
                </span>
            </p>`
        );
    } else {
        $('.stock-info').append(
            `<p id="cantidadProd" style="margin-bottom: 0;margin-top: 0px !important;">${producto.cantidad} disponibles 
                <span id="disponible" style="display: inline-block; background-color: rgb(255 0 0 / 58%); color: white; padding: 3px 8px; border-radius: 5px; margin-left: 5px; cursor: pointer;">
                    Sin stock
                </span>
            </p>`
        );
    }

    if (listOfertas.length > 0) {
        const descuentoReciente = listOfertas.reduce((a, b) => new Date(a.fechaInicio) > new Date(b.fechaInicio) ? a : b);

        const fechaActual = new Date();
        const fechaInicio = new Date(descuentoReciente.fechaInicio);
        const fechaFin = new Date(descuentoReciente.fechaFin);

        if (fechaActual >= fechaInicio && fechaActual <= fechaFin) {
            console.log('La fecha actual está dentro del rango.');
            $('#GralProd').append(
                `<span id="precioProd" style="white-space: nowrap;">S/.${descuentoReciente.precioOfertado} <s style="color: #999;">S/.${producto.precio}</s></span>`
            );
            $('#oferta').append(
                `<p style="color: red; margin-top: 0;">En oferta hasta el: ${descuentoReciente.fechaFin}.</p>`
            );
        } else {
            console.log('La fecha actual no está dentro del rango.');
            $('#GralProd').append(
                `<span id="precioProd" style="white-space: nowrap;">S/. ${producto.precio}</span> 
                `
            );
        }
    } else {
        $('#GralProd').append(
            `<span id="precioProd" style="white-space: nowrap;">S/. ${producto.precio}</span> 
            `
        );
    }

    if (producto.igv == 1) {
        $('#GralProd').append(
            `<p  id="igvProd" style="color: red; margin-top: 0;">El precio incluye IGV.</p>`
        );
    }

    $('#nombreProd').text(producto.nombres_es);
    $('#resumenProd').text(producto.resumen_es);
    $('#descripcionProd').text(producto.descripcion_es);
    $('#cualidadesProd').text(producto.cualidades_es);
    $('#palabrasClave').text(producto.palabra_clave_es);
    $('#cantPiezas').text(producto.numero_piezas_es);
    $('#medidasProd').text(`Alto: ${producto.alto} Ancho: ${producto.ancho}`);
    $('#materialesProd').text(producto.materiales_es);
    $('#pesoProd').text(`${producto.peso} Kg.`);
    $('#tecnicasProd').text(producto.tecnicas_es);
    $('#tiempoElaboracion').text(`${producto.tiempo_elaboracion} días`);

    $('#datosArtesano').append(`
    <div style="width: 120px; height: 120px;">
        <img class="artesano-image" src="${artesano.foto1}" alt="${artesano.nombres}" >
    </div>
    <p id="nombreArtesano" class="m-2" style="font-size: 20px; font-weight: 600;" data-artesano-id="${artesano.id}">
        ${artesano.nombres} ${artesano.apellidos}
        <br>
        <a class="ver-mas-btn" href="principal-artesano.html?id=${artesano.id}" >
            Ver más... <i class="fas fa-plus-circle"></i>
        </a>
    </p>
`);
    $('#telArtesano').text(artesano.celular);
    $('#correoArtesano').text(artesano.correo);

    if (producto.precios_envio == 1) {
        $('#preciosEnv').append(`
            <p>Precio local: ${producto.precio_local}</p>
            <p>Precio nacional: ${producto.precio_nacional}</p>
            <p>Precio extranjero: ${producto.precio_extranjero}</p>
        `);
    } else {
        $('#preciosEnv').append(`
            <p>Coordinar con el artesano sobre el envío</p>
        `);
    }

    if (listMediosPago.length > 0) {
        for (let pago of listMediosPago) {
            $('#mediosPago').append(`
                <div style="border:solid 1px #f4c23d; text-align: center;">${pago.Pago}</div>
            `);
        }
    } else {
        $('#mediosPago').append(`
            <p>Coordinar con el artesano el medio de pago</p>
        `);
    }
}

const acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        for (let j = 0; j < acc.length; j++) {
            if (acc[j] !== this) {
                acc[j].classList.remove("active");
                acc[j].nextElementSibling.style.maxHeight = null;
                acc[j].querySelector('.icon').classList.remove('rotate');
                acc[j].querySelector('.icon').textContent = "+";
            }
        }

        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        const icon = this.querySelector('.icon');
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            icon.classList.remove('rotate');
            icon.textContent = "+";
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            icon.classList.add('rotate');
            icon.textContent = "-";
        }
    });
}

function setupQuantityControls() {
    const cantidadMaxima = 10;
    let cantidadProd = 0;

    document.getElementById('increment-btn').addEventListener('click', function () {
        if (cantidadProd < cantidadMaxima) {
            cantidadProd++;
            document.getElementById('counter-value').value = cantidadProd;
            document.getElementById('decrement-btn').disabled = false;
        }
        if (cantidadProd === cantidadMaxima) {
            this.disabled = true;
        }
    });

    document.getElementById('decrement-btn').addEventListener('click', function () {
        if (cantidadProd > 0) {
            cantidadProd--;
            document.getElementById('counter-value').value = cantidadProd;
            document.getElementById('increment-btn').disabled = false;
        }
        if (cantidadProd === 0) {
            this.disabled = true;
        }
    });
}

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}