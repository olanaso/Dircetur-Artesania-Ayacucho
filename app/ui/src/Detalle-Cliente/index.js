import { actualizarCliente, obtenerCliente } from '../Clientes/api';
import {loadData, handleCountryChange, handleStateChange} from '../utils/ubicaciones';
import { FileUploader } from '../utils/upload.js';
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
    await loadData();
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
    
    for (let i = 0; i < paisC.options.length; i++) {
        if (paisC.options[i].value === cliente.pais) {
            paisC.options[i].selected = true;
            handleCountryChange({ target: paisC.options[i]})
            break;
        }
    }
    for (let i = 0; i < regionC.options.length; i++) {
        if (regionC.options[i].value === cliente.region) {
            regionC.options[i].selected = true;
            handleStateChange({ target: regionC.options[i]});
            break;
        }
    }
    for (let i = 0; i < ciudadC.options.length; i++) {
        if (ciudadC.options[i].value === cliente.ciudad) {
            ciudadC.options[i].selected = true;
            break;
        }
    }

    if (cliente.foto_perfil == "") {
        $('#imagenPrincipal').attr('src', imagen_principal);
    }else{
        $('#imagenPrincipal').attr('src', cliente.foto_perfil);
    }
    
    
    //tab cuenta

    //tab reclamo cliente
    llenar_tablaReclamos(cliente.list_reclamos);

    //tab activa / desactiva
    estado.checked = !cliente.estado;
}

function llenar_tablaReclamos(lista){
    const list_reclamos = JSON.parse(lista);
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

$(document).on('click', '#actualizar-informacion', async function (e) {
    e.preventDefault();
    try {
        const result = await actualizarCliente(getQueryParameter('id'), {
            nombres: nombreC.value,
            apellidos: apellidosC.value,
            correo: correoC.value,
            telefono: telefonoC.value,
            direccion: direccionC.value,
            pais: paisC.value,
            region: regionC.value,
            ciudad: ciudadC.value,
            tipo_documento: tipodocC.value,
            numero_documento: numerodocC.value,
            direccion_envio: dirEnvioC.value,
            // agregar después el campo para actualizar la imagen

        });

        console.log('Cliente actualizada:', result);

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
    var respuesta = confirm("¿Estás seguro de que deseas eliminar la foto de perfil?");
    if (respuesta) {
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
    const clienteId = getQueryParameter('id');
    llenarCampos(clienteId);
    
    mostrarDataModal(clienteId)

    const estadoCheckbox = document.getElementById('estado');
    estadoCheckbox.addEventListener('change', async function (e) {
        const estadoC = estadoCheckbox.checked ? true : false;
        try {
            const result = await actualizarCliente(getQueryParameter('id'), {
                estado: !estadoC
            });
            console.log('estado actualizado:', result);
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

