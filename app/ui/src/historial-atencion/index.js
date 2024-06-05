import { obtenerPedido, actualizarPedido } from '../historial-atencion/api';
import { FileUploader } from '../utils/upload.js';

let ruta_archivo = "";

const ordenTitle = document.getElementById('id-orden-pedido');
const numPedido = document.getElementById('num-pedido');
const fechaPedido = document.getElementById('fecha-pedido');
const comprobateSolicitado = document.getElementById('comprobante-solicitado');
const imagenCompra = document.getElementById('imagenCompra');

const nombreArtesano = document.getElementById('nombre-artesano');

const nombreCliente = document.getElementById('nombre-cliente');
const tipoDocumentoCliente = document.getElementById('tipo-doc-cliente');
const numeroDocumentoCliente = document.getElementById('numDocum-cliente');
const correoCliente = document.getElementById('correo-cliente');
const telefonoCliente = document.getElementById('telefono-cliente');
const wspCliente = document.getElementById('wsp-cliente');
const wspClienteReclamos = document.getElementById('wsp-reclamos');


const paisRecepcion = document.getElementById('pais-recepcion');
const regionRecepcion = document.getElementById('region-recepcion');
const ciudadRecepcion = document.getElementById('ciudad-recepcion');
const direccionRecepcion = document.getElementById('direccion-recepcion');

const montoTotal = document.getElementById('total-pedido');

async function cargarCampos(idPedido) {
    const pedido = await obtenerPedido(idPedido);

    cargarTablaProductos(pedido);
    cargarTablaHistoriaPedido(pedido);
    cargarTablaHistoriaReclamos(pedido);
    // Tab Información
    ordenTitle.innerHTML = `Orden # ${pedido.num_pedido}`;
    numPedido.value = pedido.num_pedido;
    fechaPedido.value = formatearFecha(pedido.fecha_pedido);
    comprobateSolicitado.value = pedido.comprobante_solic;
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
    wspClienteReclamos.setAttribute('href', `https://wa.me/${pedido.cliente['telefono']}`);
    imagenCompra.setAttribute('src', pedido.imagen_pago);
}
function cargarTablaProductos(pedidos) {
    var sumaSubtotal = 0;
    const tablaDatosPedido = document.getElementById('tablaDatosPedido');
    const tablaDatosPedidoBody = tablaDatosPedido.getElementsByTagName('tbody')[0];
    const listaPedidos = JSON.parse(pedidos.list_productos);

    tablaDatosPedidoBody.innerHTML = '';

    listaPedidos.forEach(pedido => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${pedido.cantidad}</td>
            <td>${pedido.nombre}</td>
            <td>${pedido.descripcion}</td>
            <td>${pedido.precio_unitario}</td>
            <td>${pedido.subtotal}</td>
        `;

        tablaDatosPedidoBody.appendChild(row);
        sumaSubtotal += pedido.subtotal;
    });
    montoTotal.innerHTML = `Total: S/ ${sumaSubtotal}`;
}
function cargarTablaHistoriaPedido(pedidos) {
    const tablaDatosPedido = document.getElementById('tablaHistoriaPedidos');
    const tablaHistoriaPedido = tablaDatosPedido.getElementsByTagName('tbody')[0];
    if (pedidos.list_atencion == null) {
        return "No hay historial de pedidos";
    }
    const listaAtencion = JSON.parse(pedidos.list_atencion);

    tablaHistoriaPedido.innerHTML = '';

    // Agregar clase badge dependiendo del estado del pedido
    let estadoClass = '';
    switch (pedidos.estado) {
        case 'pendiente':
            estadoClass = 'badge badge-pill badge-warning text-white'; 
            break;
        case 'pagado':
            estadoClass = 'badge badge-pill badge-success'; 
            break;
        case 'envio':
            estadoClass = 'badge badge-pill badge-info'; 
            break;
        case 'finalizado':
            estadoClass = 'badge badge-pill badge-primary'; 
            break;
        case 'anulado':
            estadoClass = 'badge badge-pill badge-danger';
            break;
        default:
            estadoClass = ''; 
    }
    listaAtencion.forEach(pedido => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${formatearFecha(pedido.fecha_atencion)}</td>
            <td>${pedido.comentario}</td>
            <td><span class="${estadoClass}">${pedido.estado}</span></td>
            <td>${pedido.enlaceSeguimiento == '' ? '' : ` <a href="${pedido.enlaceSeguimiento}"  class="font-italic text-info" target="_blank">Ver enlace</a>`}</td>
            <td>${pedido.medioPrueba == '' ? '' : ` <a href="${pedido.medioPrueba}"  class="font-italic text-info" target="_blank">Ver prueba</a>`}</td>
            <td>
				<button class="btn btn-primary btn-notificar-email btn-sm">Notificar email</button>
				<button class="btn btn-success btn-notificar-wsp btn-sm">Notificar WhatsApp</button>
			</td>
        `;
        const btnNotificarEmail = row.querySelector('.btn-notificar-email');
        btnNotificarEmail.addEventListener('click', () => notificarEmail(pedido.id));

        const btnNotificarWsp = row.querySelector('.btn-notificar-wsp');
        btnNotificarWsp.addEventListener('click', () => notificarWsp(pedido.id));
        tablaHistoriaPedido.appendChild(row);
    });

}

function cargarTablaHistoriaReclamos(pedidos) {
    const tablaHistoriaReclamos = document.getElementById('tablaHistoriaReclamos');
    const tablaDatosHistoria = tablaHistoriaReclamos.getElementsByTagName('tbody')[0];
    
    // Limpiar el contenido actual de la tabla
    tablaDatosHistoria.innerHTML = '';

    if (pedidos.list_reclamo == null) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="2">No hay historial de reclamos</td>`;
        tablaDatosHistoria.appendChild(row);
        return;
    }

    const listaReclamos = JSON.parse(pedidos.list_reclamo);

    listaReclamos.forEach(reclamo => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatearFecha(reclamo.fecha)}</td>
            <td>${reclamo.reclamo}</td>
        `;
        tablaDatosHistoria.appendChild(row);
    });
}


function notificarEmail(id) {
    console.log("notificar email");
}

function notificarWsp(id) {
    console.log("notificar wsp");
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

    return `${dia}/${mes}/${anio}`;
}

function generarID() {
    let id = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
        const aleatorio = Math.floor(Math.random() * caracteres.length);
        id += caracteres.charAt(aleatorio);
    }

    return id;
}

async function actualizarHistorialPedido(numPedido) {
    const form = document.getElementById('form-actualizar-historia');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();


        // Verificar si el formulario es válido antes de continuar
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        try {
            const pedidoActual = await obtenerPedido(numPedido);

            let listAtencion = pedidoActual.list_atencion ? JSON.parse(pedidoActual.list_atencion) : [];
            const nuevaAtencion = {
                id: generarID(),
                estado: form.estado.value,
                notificarCliente: form.notificarCliente.checked,
                enlaceSeguimiento: form.enlaceSeguimiento.value,
                comentario: form.comentario.value,
                medioPrueba: ruta_archivo,
                fecha_atencion: new Date().toISOString()
            };
            
            listAtencion.push(nuevaAtencion);

            const data = {
                list_atencion: listAtencion,
                estado: form.estado.value
            };

            const result = await actualizarPedido(numPedido, data);
            await cargarCampos(numPedido);
            form.reset();
            console.log('Pedido actualizado:', result);
        } catch (error) {
            console.error('Error al actualizar el pedido:', error);
        }
    });
}



document.addEventListener('DOMContentLoaded', () => {
    const pedidoId = getQueryParameter('id');
    cargarCampos(pedidoId);
    actualizarHistorialPedido(pedidoId);

    initializeFileUploader({
        fileInputId: 'myfile',
        progressBarId: 'progressBar',
        statusElementId: 'status',
        uploadUrl: 'http://localhost:3001/api/fileupload2',
        callback: handleUploadResponse
    });
});

function initializeFileUploader({ fileInputId, progressBarId, statusElementId, uploadUrl, callback }) {

    const fileInput = document.getElementById(fileInputId);
    const inputName = fileInput.name;
    const progressBar = document.getElementById(progressBarId);
    const statusElement = document.getElementById(statusElementId);

    if (fileInput && progressBar && statusElement) {
        const uploader = new FileUploader(uploadUrl, progressBar, statusElement, callback, inputName);
        uploader.attachToFileInput(fileInput);
    } else {
        console.error('Initialization failed: One or more elements not found.');
    }
}

function handleUploadResponse(response) {
    alert('registro del archivo correctamente')
    ruta_archivo = 'http://localhost:3001/' + response.ruta;
}