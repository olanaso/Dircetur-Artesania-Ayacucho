import { obtenerPedido } from '../historial-atencion/api';


// Tab Información
const numPedido = document.getElementById('num-pedido');
const fechaPedido = document.getElementById('fecha-pedido');
const imagenCompra = document.getElementById('imagen-compra');
const btnImagenCompra = document.getElementById('button-imagen-compra');

const nombreArtesano = document.getElementById('nombre-artesano');

const nombreCliente = document.getElementById('nombre-cliente');
const tipoDocumentoCliente = document.getElementById('tipo-doc-cliente');
const numeroDocumentoCliente = document.getElementById('numDocum-cliente');
const correoCliente = document.getElementById('correo-cliente');
const telefonoCliente = document.getElementById('telefono-cliente');
const wspCliente = document.getElementById('wsp-cliente');


const paisRecepcion = document.getElementById('pais-recepcion');
const regionRecepcion = document.getElementById('region-recepcion');
const ciudadRecepcion = document.getElementById('ciudad-recepcion');
const direccionRecepcion = document.getElementById('direccion-recepcion');

const montoTotal = document.getElementById('total-pedido');
// Tab Atención


// Tab Reclamo


async function cargarCampos(idPedido) {
    const pedido = await obtenerPedido(idPedido);
    cargarTabla(pedido);
    // Tab Información
    numPedido.value = pedido.num_pedido;
    fechaPedido.value = formatearFecha(pedido.fecha_pedido);
    nombreArtesano.value = pedido.artesano['nombres'] + ' ' + pedido.artesano['apellidos'];
    nombreCliente.value = pedido.cliente['nombres'] + ' ' + pedido.cliente['apellidos'];
    tipoDocumentoCliente.innerHTML = pedido.cliente['tipo_documento'];
    numeroDocumentoCliente.value = pedido.cliente['numero_documento'];
    correoCliente.value = pedido.cliente['correo'];
    telefonoCliente.value = pedido.cliente['telefono'];
    paisRecepcion.value = pedido.cliente['pais'];
    regionRecepcion.value = pedido.cliente['region'];
    ciudadRecepcion.value = pedido.cliente['ciudad'];
    direccionRecepcion.value = pedido.cliente['direccion'];
    wspCliente.setAttribute('href', `https://wa.me/${pedido.cliente['telefono']}`);

}
function cargarTabla(pedidos) {
    var sumaSubtotal = 0;
    const tablaDatosPedidoBody = document.getElementById('tablaDatosPedido').getElementsByTagName('tbody')[0];

    const listaPedidos = JSON.parse(pedidos.list_productos);
    // Limpiar el contenido existente del tbody
    tablaDatosPedidoBody.innerHTML = '';
    listaPedidos.forEach(pedido => {
        const row = tablaDatosPedidoBody.insertRow();

        const cellCantidad = row.insertCell(0);
        const cellProducto = row.insertCell(1);
        const cellDescripcionCompra = row.insertCell(2);
        const cellValorUnitario = row.insertCell(3);
        const cellPrecio = row.insertCell(4);

        cellCantidad.textContent = pedido.cantidad;
        cellProducto.textContent = pedido.nombre;
        cellDescripcionCompra.textContent = pedido.descripcion;
        cellValorUnitario.textContent = pedido.precio_unitario;
        cellPrecio.textContent = pedido.subtotal;

        sumaSubtotal += pedido.subtotal;
    });
    montoTotal.innerHTML = `<strong>Total: S/ ${sumaSubtotal}</strong>`; 
}
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function formatearFecha(fecha) {
    const date = new Date(fecha);

    const anio = date.getUTCFullYear(); // Obtener el año (ej. 2024)
    const mes = ('0' + (date.getUTCMonth() + 1)).slice(-2); // Obtener el mes (ej. 05)
    const dia = ('0' + date.getUTCDate()).slice(-2); // Obtener el día (ej. 27)

    // Formar la fecha en el formato deseado (YYYY-MM-DD)
    return `${dia}/${mes}/${anio}`;
}
document.addEventListener('DOMContentLoaded', ()=> {
    const pedidoId = getQueryParameter('id');
    cargarCampos(pedidoId);
    
});