import { validarHTML5 } from '../utils/validateForm';
import {saveDataToLocalStorage} from '../utils/config'
import {hideLoading} from '../utils/init'
import {obtenerParametrosURL} from '../utils/path'
import {obtenerProducto} from './api'

//  href = /clientes-detalle.html?id=${data.id}
document.addEventListener('DOMContentLoaded', () => {
    //cargarSliders()
    infoProd()
});

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function infoProd() {
    const producto = await obtenerProducto(getQueryParameter('id'));
    console.log("producto: ", producto);
    $('#nombreProd').text(producto.nombres_es)
    $('#precioProd').text(producto.precio)
    $('#cantidadProd').text(producto.cantidad)
    $('#resumenProd').text(producto.resumen_es)
    $('#descripcionProd').text(producto.descripcion_es)
    $('#cualidadesProd').text(producto.cualidades_es)
    $('#palabrasClave').text(producto.palabra_clave_es)
    $('#cantPiezas').text(producto.numero_piezas_es)
    $('#medidasProd').text(`Alto: ${producto.alto} Ancho: ${producto.ancho}`)
    $('#materialesProd').text(producto.materiales_es)
    $('#pesoProd').text(`${producto.peso} Kg.`)
    $('#tecnicasProd').text(producto.tecnicas_es)

    
    
}