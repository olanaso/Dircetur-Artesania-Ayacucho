import { actualizarCliente, obtenerCliente } from '../Clientes/api';
import { enviarCorreo } from './api.js';
import {loadData, handleCountryChange, handleStateChange} from '../utils/ubicaciones';
import { FileUploader } from '../utils/uploadVictor.js';
import { AlertDialog } from "../utils/alert";
const alertDialog = new AlertDialog();


import { loadPartials } from '../utils/viewpartials';   
import { hideLoading, llenarinformacionIESTPProg,marcarSubMenuSeleccionado } from '../utils/init'; 

 
hideLoading();
// Uso de la función
(async function () {
  let partials = [
    { path: 'partials/shared/header.html', container: 'app-header' },
    { path: 'partials/shared/menu.html', container: 'app-side' },


  ]; 
  try {
    await loadPartials(partials);
    import ('../utils/common')

   
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
  setTimeout(function() {
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



let imagen_principal = null;
//tab informacion
const nombreC = document.getElementById('nombreC');
const apellidosC = document.getElementById('apellidosC');
const correoC = document.getElementById('correoC');
const telefonoC = document.getElementById('telefonoC');
const direccionC = document.getElementById('direccionC');
const paisC = document.getElementById('pais');
const regionC = document.getElementById('region');
const ciudadC = document.getElementById('ciudad');
const tipodocC = document.getElementById('tipo_documento');
const numerodocC = document.getElementById('inputDocumentoTipo');
const dirEnvioC = document.getElementById('dirEnvio');
//tab cuenta
const usuarioC = document.getElementById('usuarioC');
const contraseñaC = document.getElementById('contraseñaC');
const rcontraseñaC = document.getElementById('rContraseñaC');


//tab estado cuenta
const estado = document.getElementById('estado')

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

async function llenarCampos(idCliente) {
    
    const cliente = await obtenerCliente(idCliente);
    console.log("cliente: ", cliente)
    //tab información
    nombreC.value = cliente.nombres;
    apellidosC.value = cliente.apellidos;
    correoC.value = cliente.correo;
    telefonoC.value = cliente.telefono;
    direccionC.value = cliente.direccion;
    tipodocC.value = cliente.tipo_documento;
    numerodocC.value = cliente.numero_documento;
    dirEnvioC.value = cliente.direccion_envio
    console.log("longitud pais: ", paisC.options.length)

    cargarYSeleccionarUbicaciones(cliente)

    if (cliente.foto_perfil == "") {
        $('#imagenPrincipal').attr('src', imagen_principal);
    }else{
        let cleanUrl = cliente.foto_perfil.replace(/"/g, '');
        $('#imagenPrincipal').attr('src', cleanUrl);
    }
    
    
    //tab cuenta

    //tab reclamo cliente
    llenar_tablaReclamos(cliente.list_reclamos);

    //tab activa / desactiva
    estado.checked = !cliente.estado;
}

function llenar_tablaReclamos(lista){
    const list_reclamos = JSON.parse(lista);
    if (list_reclamos != null) {
        $('#listReclamos').empty()
        let filas = ''
        for (let data of list_reclamos) {
            console.log("data: ", data)
            filas += `
                <tr>
                    <td class="border-b border-gray-200 bg-white text-sm">
                        ${data.reclamo_id}
                    </td>
                    <td class="border-b border-gray-200 bg-white text-sm">
                        ${data.descripcion}
                    </td>
                    <td class="border-b border-gray-200 bg-white text-sm">
                        <button type="button" class="btn btn-light btn-sm btn-verR" data-toggle="modal" data-target="#modalverReclamo" data-id="${data.reclamo_id}""><i class="icon icon-eye2"></i></button>
                    </td>
                </tr>`
        }
        let tabla_result = `
            <table class="table m-0" id="tablaReclamos">
                <thead class="thead-default">
                    <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>`+ filas + `
                    
                </tbody>
            </table>`
        $('#listReclamos').append(tabla_result)
    }
   
}
async function cargarYSeleccionarUbicaciones(cliente) {
    // Cargar datos iniciales (paises)
    await loadData();

    // Seleccionar el país
    for (let i = 0; i < paisC.options.length; i++) {
        if (paisC.options[i].textContent === cliente.pais) {
            paisC.selectedIndex = i;
            handleCountryChange({ target: paisC });
            break;
        }
    }
    await waitForOptions(regionC);
    // Seleccionar la región
    for (let i = 0; i < regionC.options.length; i++) {
        console.log(regionC.options.length)
        if (regionC.options[i].textContent === cliente.region) {
            regionC.selectedIndex = i;
            await handleStateChange({ target: regionC });
            break;
        }
    }
    await waitForOptions(ciudadC);
    // Seleccionar la ciudad
    for (let i = 0; i < ciudadC.options.length; i++) {
        if (ciudadC.options[i].textContent === cliente.ciudad) {
            ciudadC.selectedIndex = i;
            break;
        }
    }
}

function waitForOptions(selectElement) {
    return new Promise((resolve) => {
        const checkOptions = () => {
            if (selectElement.options.length > 1) {
                resolve();
            } else {
                setTimeout(checkOptions, 100);
            }
        };
        checkOptions();
    });
}
$(document).on('click', '#actualizar-informacion', async function (e) {
    e.preventDefault();
    try {

        alertDialog.createAlertDialog(
            'confirm',
            'Confirmar',
            '¿Estás seguro que quieres actualizar?',
            'Cancelar',
            'Continuar',
            async () => {
              try {
                const result = await actualizarCliente(getQueryParameter('id'), {
                    nombres: nombreC.value,
                    apellidos: apellidosC.value,
                    correo: correoC.value,
                    telefono: telefonoC.value,
                    direccion: direccionC.value,
                    pais: paisC.selectedOptions[0].text,
                    region: regionC.selectedOptions[0].text,
                    ciudad: ciudadC.selectedOptions[0].text,
                    tipo_documento: tipodocC.value,
                    numero_documento: numerodocC.value,
                    direccion_envio: dirEnvioC.value,
                });
        
                console.log('Cliente actualizada:', result);
              } catch (error) {
                console.error('Error:', error);
              }
            }
          );
 


    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
    }
});



$(document).on('click', '.btn-editarF', async function (e) {
    $('#ClienteImagePreview').attr('src', $('#imagenPrincipal').attr('src')).show()
});

$(document).on('click', '#btn-actualizarFoto', async function (e){
    e.preventDefault();
    try {
        const result = await actualizarCliente(getQueryParameter('id'), {
            foto_perfil: imagen_principal
        });
        console.log('Foto perfil actualizada:', result);
        $('#imagenPrincipalModal').modal('hide');
        llenarCampos(getQueryParameter('id'))
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
    }
})

$(document).on('click', '.btn-eliminarF', async function (e){
    e.preventDefault();
    alertDialog.createAlertDialog(
        'confirm',
        'Confirmar Alerta',
        '¿Estás seguro de que deseas eliminar el slider?',
        'Cancelar',
        'Continuar',
        async() => {
            try {
                const result = await actualizarCliente(getQueryParameter('id'), {
                    foto_perfil: ""
                });
                console.log('Foto perfil eliminada:', result);
                llenarCampos(getQueryParameter('id'))
            } catch (error) {
                console.error('Error al eliminar la foto de perfil:', error);
            }
        }
    );  
})

$(document).on('click', '#actualizar-cuenta', async function (e) {
    // Actualizar los datos de la categoría en tu estructura de datos

});






//ver reclamo
async function mostrarDataModal(clienteID) {
    $(document).on('click', '.btn-verR', async function (e) {
        
        const id = $(this).data('id');
        try {
            const cliente = await obtenerCliente(clienteID);
            

            for (let data of JSON.parse(cliente.list_reclamos)) {
                console.log(data)
                if (data.reclamo_id == id) {
                    $('#modalverReclamo #codVenta').val(data.codigo_venta)
                    $('#modalverReclamo #fechaReclamo').val(data.fecha_reclamo)
                    $('#modalverReclamo #descripcionR').val(data.descripcion)
                    $('#modalverReclamo #estadoR').val(data.estado)
                }   
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}


//correos
async function enviarCorreoCliente(correoCliente, mensaje) {
    try {
        const emailData = {
            from: 'tineo.max.clever@cidie.edu.pe',
            to: 'victorheli2101@gmail.com',
            subject: "Mensaje de activación de cuenta",
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
                            <h1>Información de cuenta</h1>
                        </div>
                        <div class="content">
                            <p>${mensaje}.</p>
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


$(document).on('click', '#notificaEstado', async function (e) {
    e.preventDefault();
    const msg = document.getElementById('mensajeEstado');
    enviarCorreoCliente('correoCliente', msg.value);
    $('#mensajeEstado').val('');

});

//carga de imagen de perfil de cliente
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

document.getElementById('myfile').addEventListener('change', function() {
    var file = this.files[0];
    var fileType = file.type;
    var allowedTypes = ['image/png', 'image/jpeg'];

    if (!allowedTypes.includes(fileType)) {
        alert('Solo se permiten archivos PNG o JPG');
        this.value = '';
    }
});

function handleUploadResponse(response) {
    alert('registro correcto')
    alert(response.ruta)

    let file = $('#myfile').prop('files')[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
        $('#ClienteImagePreview').attr('src', 'http://localhost:3001/' + response.ruta).show();
        $('#principalImageName').val(file.name);
        }
        reader.readAsDataURL(file);

        imagen_principal = 'http://localhost:3001/' + response.ruta;
    } else {
        alert("Por favor, seleccione un archivo para visualizar.");
    }
}


document.addEventListener('DOMContentLoaded', (event)=> {
    event.preventDefault();
    loadData().then(() => {
        const clienteId = getQueryParameter('id');
        llenarCampos(clienteId);
        mostrarDataModal(clienteId);

        const estadoCheckbox = document.getElementById('estado');
        estadoCheckbox.addEventListener('change', async function () {
            const estadoC = estadoCheckbox.checked ? true : false;
            try {
                const result = await actualizarCliente(getQueryParameter('id'), { estado: !estadoC });
                console.log('Estado actualizado:', result);
            } catch (error) {
                console.error('Error al actualizar el estado:', error);
            }
        });

        initializeFileUploader({
            fileInputId: 'myfile',
            progressBarId: 'progressBar',
            statusElementId: 'status',
            uploadUrl: 'http://localhost:3001/api/fileupload4',
            folder: '/cliente/img/',
            callback: handleUploadResponse
        });
    });
    
});
