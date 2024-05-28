import { obtenerPedido } from '../historial-atencion/api';

// Tab Información
const numPedido = document.getElementById('num-pedido');
const fechaPedido = document.getElementById('fecha-pedido');
const imagenCompra = document.getElementById('imagen-compra');
const btnImagenCompra = document.getElementById('button-imagen-compra');

const nombreArtesano = document.getElementById('nombre-artesano');

const nombreCliente = document.getElementById('nombre-cliente');
const dniCliente = document.getElementById('dni-cliente');
const correoCliente = document.getElementById('correo-cliente');
const telefonoCliente = document.getElementById('telefono-cliente');
const wspCliente = document.getElementById('wsp-cliente');

const paisRecepcion = document.getElementById('pais-recepcion');
const regionRecepcion = document.getElementById('region-recepcion');
const ciudadRecepcion = document.getElementById('ciudad-recepcion');
const direccionRecepcion = document.getElementById('direccion-recepcion');
// Tab Atención


// Tab Reclamo

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

document.addEventListener('DOMContentLoaded', ()=> {
    const PedidoId = getQueryParameter('id');
    console.log(PedidoId);
    
});