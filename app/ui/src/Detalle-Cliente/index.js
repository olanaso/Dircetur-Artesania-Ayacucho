import { actualizarCliente, obtenerCliente } from '../Clientes/api';
import {loadData, handleCountryChange, handleStateChange} from '../utils/ubicaciones';

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
            //foto_perfil: categoria.descripcion,
            // agregar después el campo para actualizar la imagen

        });

        console.log('Cliente actualizada:', result);

    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
    }
});

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
});

