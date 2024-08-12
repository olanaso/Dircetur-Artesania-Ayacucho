import { validarHTML5 } from '../utils/validateForm';
import {saveDataToLocalStorage} from '../utils/config'
import {hideLoading} from '../utils/init'
import {obtenerParametrosURL} from '../utils/path'
import {obtenerProducto, obtenerArtesano} from './api'

let cantidadMaxima
//  href = /clientes-detalle.html?id=${data.id}
document.addEventListener('DOMContentLoaded', () => {
    //cargarSliders()
    infoProd();
});

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}



async function infoProd() {
    const producto = await obtenerProducto(getQueryParameter('id'));
    const artesano = await obtenerArtesano(producto.artesano_id)
    cantidadMaxima = producto.cantidad
    /*Carga de imágene sy videos*/
     const imagenesProd = JSON.parse(JSON.parse(producto.lst_imagenes))
     const listVideos = JSON.parse(JSON.parse(producto.lst_videos))
     const listVideosEnlace = JSON.parse(JSON.parse(producto.lst_videoenlace))
     let S1 = `<div class="sp-slide" data-index="0">
                    <div class="sp-image-container">
                        <img class="sp-image" src="${producto.imagen_principal}" alt="">
                    </div>
                </div>`
     let S2 = `<div class="sp-thumbnail-container">
                    <img class="sp-thumbnail" src="${producto.imagen_principal}" alt="">
                </div>`
    
    
    let index = 1
    for(let imagen of imagenesProd){
        S1 += `<div class="sp-slide" data-index="${index}">
                    <div class="sp-image-container">
                        <img class="sp-image" src="${imagen.src}" alt="">
                    </div>
                </div>`
        S2 += `<div class="sp-thumbnail-container">
                    <img class="sp-thumbnail" src="${imagen.src}" alt="">
                </div>`
        index++
    }
    /*
    $('#slider1').empty()
    $('#slider1').append(S1)
    $('#slider2').empty()
    $('#slider2').append(S2)
    */

    /*carga de datos sobre producto y artesano*/
    const listColores = JSON.parse(JSON.parse(producto.lst_colores))
    const listTallas = JSON.parse(JSON.parse(producto.lst_talla))
    const listOfertas = JSON.parse(JSON.parse(producto.lst_ofertas))
    const listOtrosCostos = JSON.parse(JSON.parse(producto.lst_otros_costos))
    const listMediosPago = JSON.parse(JSON.parse(artesano.lst_mediospago))

    console.log('coloes: ', listMediosPago);
    if (listColores.length > 0) {
        for(let color of listColores){
            $('#Colores').append(
                `<button id="sizeButton-6-US" type="button" class="size-button selected rebranded red-text" style="background: ${color.color};width: 30px;height: 30px;"> </button>`
            )
        }
    }else{
        $('#Colores').append(
            `<p>No hay colores disponibles</p>`
        )
    }
    if (listTallas.length > 0) {
        for(let talla of listTallas){
            $('#tallas').append(
                `<button id="sizeButton-6-US" type="button" class="size-button selected rebranded red-text" >${talla.talla} </button>`
            )
        }
    }else{
        $('#tallas').append(
            `<p>No hay tallas disponibles</p>`
        )
    }

    if (listOtrosCostos.length > 0) {
        for(let costos of listOtrosCostos){
            $('#otrosCostos').append(
                `<option value="${costos.id}">${costos.nombre} (S/ ${costos.precio})</option>`
            )
        }
    }
    //cantidad
    if (producto.cantidad > 10) {
        $('.stock-info').append(
            `<p id="cantidadProd" style="margin-bottom: 0;margin-top: 0px !important;">${producto.cantidad} disponibles 
                <span id="disponible" style="display: inline-block; background-color: rgb(40 167 69 / 58%); color: white; padding: 3px 8px; border-radius: 5px; margin-left: 5px; cursor: pointer;">
                    En stock
                </span>
            </p>`
        )
    } else if (producto.cantidad >5) {
        $('.stock-info').append(
            `<p id="cantidadProd" style="margin-bottom: 0;margin-top: 0px !important;">${producto.cantidad} disponibles 
                <span id="disponible" style="display: inline-block; background-color: rgb(0 0 255 / 58%); color: white; padding: 3px 8px; border-radius: 5px; margin-left: 5px; cursor: pointer;">
                    Bajo stock
                </span>
            </p>`
        )
    } else {
        $('.stock-info').append(
            `<p id="cantidadProd" style="margin-bottom: 0;margin-top: 0px !important;">${producto.cantidad} disponibles 
                <span id="disponible" style="display: inline-block; background-color: rgb(255 0 0 / 58%); color: white; padding: 3px 8px; border-radius: 5px; margin-left: 5px; cursor: pointer;">
                    Sin stock
                </span>
            </p>`
        )
    }

    //precios y descuentos
    if (listOfertas.length > 0) {
        const descuentoReciente = listOfertas.reduce((a, b) => new Date(a.fechaInicio) > new Date(b.fechaInicio) ? a : b);

        const fechaActual = new Date();
        const fechaInicio = new Date(descuentoReciente.fechaInicio);
        const fechaFin = new Date(descuentoReciente.fechaFin);

        // Verificar si la fecha actual está dentro del rango de fechas
        if (fechaActual >= fechaInicio && fechaActual <= fechaFin) {
            console.log('La fecha actual está dentro del rango.');
            $('#GralProd').append(
                `<span id="precioProd" style="white-space: nowrap;">S/.${descuentoReciente.precioOfertado} <s style="color: #999;">S/.${producto.precio}</s></span>`
            )
            $('#oferta').append(
                `<p style="color: red; margin-top: 0;">En oferta hasta el: ${descuentoReciente.fechaFin}.</p>`
            )
        } else {
            console.log('La fecha actual no está dentro del rango.');
            $('#GralProd').append(
                `<span id="precioProd" style="white-space: nowrap;">S/. ${producto.precio}</span> 
				`
            )
        }
    } else {
        $('#GralProd').append(
            `<span id="precioProd" style="white-space: nowrap;">S/. ${producto.precio}</span> 
            `
        )
    }

    //inclusión de igv
    if (producto.igv == 1) {
        $('#GralProd').append(
            `<p  id="igvProd" style="color: red; margin-top: 0;">El precio incluye IGV.</p>`
        )
    }

    $('#nombreProd').text(producto.nombres_es)
    $('#resumenProd').text(producto.resumen_es)
    $('#descripcionProd').text(producto.descripcion_es)
    $('#cualidadesProd').text(producto.cualidades_es)
    $('#palabrasClave').text(producto.palabra_clave_es)
    $('#cantPiezas').text(producto.numero_piezas_es)
    $('#medidasProd').text(`Alto: ${producto.alto} Ancho: ${producto.ancho}`)
    $('#materialesProd').text(producto.materiales_es)
    $('#pesoProd').text(`${producto.peso} Kg.`)
    $('#tecnicasProd').text(producto.tecnicas_es)
    $('#tiempoElaboracion').text(`${producto.tiempo_elaboracion} días`)


    $('#datosArtesano').append(`
        <div style=" width: 100px; heigth:100px;">
            <img class="sp-image" src="${artesano.foto1}" alt="" style="width: 100%; border-radius: 50%;">
        </div>
        
        <p id="nombreArtesano" class="m-2">${artesano.nombres} ${artesano.apellidos}
            <br>
            <a style="color: red;" href="principal-artesano.html?id=${artesano.id}">Ver mas... <i class="fas fa-plus-circle"></i></a>
            
        </p>
        

        `)
    $('#telArtesano').text(artesano.celular)
    $('#correoArtesano').text(artesano.correo)

    if (producto.precios_envio == 1) {
        $('#preciosEnv').append(`
            <p>Precio local: ${producto.precio_local}</p>
            <p>Precio nacional: ${producto.precio_nacional}</p>
            <p>Precio extranjero: ${producto.precio_extranjero}</p>
        `)
    } else {
        $('#preciosEnv').append(`
            <p>Coordinar con el artesano sobre el envío</p>
        `)
    }

    if (listMediosPago.length > 0) {
        for (let pago of listMediosPago){
            $('#mediosPago').append(`
                <div style="border:solid 1px #f4c23d; text-align: center;">${pago.Pago}</div>
            `)
        }
    } else {
        $('#mediosPago').append(`
            <p>Coordinar con el artesano el medio de pago</p>
        `)
    }
    
}


//funcionalidad para elegir cantidad:
/*
$('#increment-btn').on('click', function() {
    console.log('aaa', cantidadMaxima);
    let currentValue = parseInt($('#counter-value').val());
    if (currentValue < cantidadMaxima) {
        currentValue++;
        
        $('#counter-value').val(currentValue.toString());
        $('#decrement-btn').prop('disabled', false); // Habilitar botón de decremento
    }
    if (currentValue === cantidadMaxima) {
        $('#increment-btn').prop('disabled', true); // Deshabilitar botón de incremento
    }
});
*/
var cantidadProd = 0
$('#increment-btn').on('click', function() {
    if (cantidadProd < cantidadMaxima) {
        cantidadProd++;
    } else if (cantidadProd = cantidadProd++){
        cantidadProd = 0
    }
    $('#counter-value').val(cantidadProd);
});

// Decrementar el valor del contador
/*
$('#decrement-btn').on('click', function() {
    let currentValue = parseInt($('#counter-value').val());
    if (currentValue > 1) {
        currentValue--;
        $('#counter-value').val(currentValue);
        $('#increment-btn').prop('disabled', false); // Habilitar botón de incremento
    }
    if (currentValue === 0) {
        $('#decrement-btn').prop('disabled', true); // Deshabilitar botón de decremento
    }
});
*/
$('#decrement-btn').on('click', function() {
    if (cantidadProd > 0) { --cantidadProd }
    $('#counter-value').val(cantidadProd);
});