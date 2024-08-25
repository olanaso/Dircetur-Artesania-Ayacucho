import { obtenerPedido, actualizarPedido, enviarCorreo } from '../historial-atencion/api';
import { FileUploader } from '../utils/upload.js';
import { AlertDialog } from "../utils/alert";
import { baseUrl, baseUrldni, getDataFromLocalStorage, getBaseUrl } from '../utils/config.js';
const alertDialog = new AlertDialog();


import { loadPartials } from '../utils/viewpartials';
import { hideLoading, llenarinformacionIESTPProg, marcarSubMenuSeleccionado } from '../utils/init';


hideLoading();
// Uso de la función
(async function () {
    let partials = [
        { path: 'partials/shared/header.html', container: 'app-header' },
        { path: 'partials/shared/menu.html', container: 'app-side' },


    ];
    try {
        await loadPartials(partials);
        import('../utils/common')


        // Aquí coloca el código que deseas ejecutar después de que todas las vistas parciales se hayan cargado.
        console.log('Las vistas parciales se han cargado correctamente!');
        // Por ejemplo, podrías iniciar tu aplicación aquí.

        startApp();
    } catch (e) {
        console.error(e);
    }
})();

function startApp () {
    //checkadminsession(); 
    setTimeout(function () {
        llenarinformacionIESTPProg();
        // marcarSubMenuSeleccionado();
    }, 500);

}
/*async function checkadminsession () {
  let result = await checkSession()
  if (result.usuario.rolid != 1) {
    location.href = "sinacceso.html"
  }
}*/










let ruta_archivo = "";

const ordenTitle = document.getElementById('id-orden-pedido');
const numPedido = document.getElementById('num-pedido');
const fechaPedido = document.getElementById('fecha-pedido');
const comprobateSolicitado = document.getElementById('comprobante-solicitado');
const imagenCompra = document.getElementById('imagen-Compra');

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


async function cargarCampos (idPedido) {
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

    $('#imagen-Compra').attr('src', pedido.imagen_pago);
}
function cargarTablaProductos (pedidos) {
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
function cargarTablaHistoriaPedido (pedidos) {
    const tablaDatosPedido = document.getElementById('tablaHistoriaPedidos');
    const tablaHistoriaPedido = tablaDatosPedido.getElementsByTagName('tbody')[0];
    if (pedidos.list_atencion == null) {
        return "No hay historial de pedidos";
    }
    const listaAtencion = JSON.parse(pedidos.list_atencion);

    tablaHistoriaPedido.innerHTML = '';

    listaAtencion.forEach(pedido => {
        const row = document.createElement('tr');
        // Agregar clase badge dependiendo del estado del pedido
        let estadoClass = '';
        switch (pedido.estado) {
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
        row.innerHTML = `
            <td>${formatearFecha(pedido.fecha_atencion)}</td>
            <td>${pedido.comentario}</td>
            <td><span class="${estadoClass}">${pedido.estado}</span></td>
            <td>${pedido.enlaceSeguimiento == '' ? '' : ` <a href="${pedido.enlaceSeguimiento}"  class="font-italic text-info" target="_blank">Ver enlace</a>`}</td>
            <td>${pedido.medioPrueba == '' ? '' : ` <a href="${pedido.medioPrueba}"  class="font-italic text-info" target="_blank">Ver prueba</a>`}</td>
            <td>
				<button class="btn btn-primary btn-notificar-email btn-sm">Email</button>
				<button class="btn btn-success btn-notificar-wsp btn-sm">WhatsApp</button>
			</td>
        `;
        const btnNotificarEmail = row.querySelector('.btn-notificar-email');
        btnNotificarEmail.addEventListener('click', async () => await enviarCorreoCliente(pedidos.cliente.correo, pedido));

        const btnNotificarWsp = row.querySelector('.btn-notificar-wsp');
        btnNotificarWsp.addEventListener('click', () => enviarMensajeCliente(pedidos.cliente.telefono, pedido));
        tablaHistoriaPedido.appendChild(row);
    });

}

function cargarTablaHistoriaReclamos (pedidos) {
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


function getQueryParameter (name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function formatearFecha (fecha) {
    const date = new Date(fecha);

    const anio = date.getUTCFullYear(); // Obtener el año (ej. 2024)
    const mes = ('0' + (date.getUTCMonth() + 1)).slice(-2); // Obtener el mes (ej. 05)
    const dia = ('0' + date.getUTCDate()).slice(-2); // Obtener el día (ej. 27)

    return `${dia}/${mes}/${anio}`;
}

function generarID () {
    let id = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
        const aleatorio = Math.floor(Math.random() * caracteres.length);
        id += caracteres.charAt(aleatorio);
    }

    return id;
}

async function actualizarHistorialPedido (numPedido) {
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

            listAtencion.unshift(nuevaAtencion);

            const data = {
                list_atencion: listAtencion,
                estado: form.estado.value
            };

            alertDialog.createAlertDialog(
                'confirm',
                'Confirmar',
                '¿Estás seguro que quieres actualizar el pedido?',
                'Cancelar',
                'Continuar',
                async () => {
                    await actualizarPedido(numPedido, data);
                    if (nuevaAtencion.notificarCliente) {
                        await enviarCorreoCliente(pedidoActual.cliente.correo, nuevaAtencion);
                        enviarMensajeCliente(pedidoActual.cliente.telefono, nuevaAtencion);
                    }
                    form.reset();
                    await cargarCampos(numPedido);
                }
            );

        } catch (error) {
            console.error('Error al actualizar el pedido:', error);
        }
    });
}


async function enviarCorreoCliente (correoCliente, nuevaAtencion) {
    alertDialog.createAlertDialog(
        'confirm',
        'Confirmar',
        '¿Estás seguro que quieres enviar notificación al correo del cliente?',
        'Cancelar',
        'Continuar',
        async () => {
            try {
                const emailData = {
                    from: 'tineo.max.clever@cidie.edu.pe',
                    to: 'clever.max159@gmail.com',
                    subject: `Pedido #${nuevaAtencion.id}`,
                    email_html: `
                        <!DOCTYPE html>
                        <html lang="es">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    margin: 0;
                                    padding: 0;
                                }
                                .container {
                                    max-width: 600px;
                                    margin: 20px auto;
                                    background-color: #fff;
                                    padding: 20px;
                                    border-radius: 10px;
                                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                }
                                .header {
                                    text-align: center;
                                    border-bottom: 1px solid #ddd;
                                    padding-bottom: 10px;
                                    margin-bottom: 20px;
                                }
                                .header h1 {
                                    margin: 0;
                                    font-size: 24px;
                                    color: #333;
                                }
                                .content {
                                    line-height: 1.6;
                                    color: #555;
                                }
                                .content p {
                                    margin: 0 0 10px;
                                }
                                .footer {
                                    text-align: center;
                                    border-top: 1px solid #ddd;
                                    padding-top: 10px;
                                    margin-top: 20px;
                                    color: #888;
                                    font-size: 12px;
                                }
                                .highlight {
                                    font-weight: bold;
                                    color: #333;
                                }
                                .link {
                                    color: #1a73e8;
                                    text-decoration: none;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h1>Información de tu Pedido</h1>
                                </div>
                                <div class="content">
                                    <p>Tu pedido está siendo atendido.</p>
                                    <p><span class="highlight">Estado:</span> ${nuevaAtencion.estado}</p>
                                    <p><span class="highlight">Comentario:</span> ${nuevaAtencion.comentario}</p>
                                    <p><span class="highlight">Fecha de atención:</span> ${formatearFecha(nuevaAtencion.fecha_atencion)}</p>
                                    ${nuevaAtencion.enlaceSeguimiento ? `<p><span class="highlight">Enlace de seguimiento:</span> <a class="link" href="${nuevaAtencion.enlaceSeguimiento}" target="_blank">Ver</a></p>` : ''}
                                    ${nuevaAtencion.medioPrueba ? `<p><span class="highlight">Medio de prueba:</span> <a class=link href="${nuevaAtencion.medioPrueba}" target="_blank">Ver</a></p>` : ''}
                                </div>
                                <div class="footer">
                                    <p>Gracias por tu preferencia.</p>
                                </div>
                            </div>
                        </body>
                        </html>
                    `
                };

                const result = await enviarCorreo(emailData);
                return result;
            } catch (error) {
                console.error('Error al enviar el correo:', error);
            }
        }
    );

}

function enviarMensajeCliente (telefonoCliente, nuevaAtencion) {
    var numeroCliente = encodeURIComponent(telefonoCliente);
    var estado = encodeURIComponent(nuevaAtencion.estado || "");
    var enlaceSeguimiento = encodeURIComponent(nuevaAtencion.enlaceSeguimiento || "");
    var comentario = encodeURIComponent(nuevaAtencion.comentario || "");
    var medioPrueba = encodeURIComponent(nuevaAtencion.medioPrueba || "");
    var fecha_atencion = encodeURIComponent(formatearFecha(nuevaAtencion.fecha_atencion) || "");

    var url = "https://wa.me/" + numeroCliente + "?text=";

    var mensaje = "*Estimado/a,*%0A%0A";
    mensaje += "*Le informamos sobre el estado de su atención:*%0A%0A";

    mensaje += "*==============================*%0A";

    if (estado !== "") {
        mensaje += "*Estado:* " + estado + "%0A";
    }
    if (enlaceSeguimiento !== "") {
        mensaje += "*Enlace de seguimiento:* " + enlaceSeguimiento + "%0A";
    }
    if (comentario !== "") {
        mensaje += "*Comentario:* " + comentario + "%0A";
    }
    if (medioPrueba !== "") {
        mensaje += "*Medio de prueba:* " + medioPrueba + "%0A";
    }
    if (fecha_atencion !== "") {
        mensaje += "*Fecha de atención:* " + fecha_atencion + "%0A";
    }

    mensaje += "*==============================*%0A";
    mensaje += "%0A";
    mensaje += "Si tiene alguna pregunta o necesita más información, no dude en contactarnos.%0A%0A";
    mensaje += "¡Gracias por su preferencia!.%0A";
    url += mensaje;

    window.open(url, '_blank').focus();
}



document.addEventListener('DOMContentLoaded', () => {
    const pedidoId = getQueryParameter('id');
    cargarCampos(pedidoId);
    actualizarHistorialPedido(pedidoId);

    initializeFileUploader({
        fileInputId: 'myfile',
        progressBarId: 'progressBar',
        statusElementId: 'status',
        uploadUrl: baseUrl + '/pedido/fileupload',
        folder: '/pedidos/',
        callback: handleUploadResponse
    });
});

function initializeFileUploader ({ fileInputId, progressBarId, statusElementId, uploadUrl, folder, callback }) {

    const fileInput = document.getElementById(fileInputId);
    const inputName = fileInput.name;
    const progressBar = document.getElementById(progressBarId);
    const statusElement = document.getElementById(statusElementId);

    if (fileInput && progressBar && statusElement) {
        const uploader = new FileUploader(uploadUrl, progressBar, statusElement, callback, inputName, folder);
        uploader.attachToFileInput(fileInput);
    } else {
        console.error('Initialization failed: One or more elements not found.');
    }
}

function handleUploadResponse (response) {
    alert('registro del archivo correctamente')
    ruta_archivo = getBaseUrl(baseUrl) + '/' + response.ruta;
}