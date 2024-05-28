import { actualizarCliente, obtenerCliente } from '../Clientes/api';

//tab informacion
const nombreC = document.getElementById('nombreC');
const apellidosC = document.getElementById('apellidosC');
const correoC = document.getElementById('correoC');
const telefonoC = document.getElementById('telefonoC');
const direccionC = document.getElementById('direccionC');
const paisC = document.getElementById('direccionC');
const regionC = document.getElementById('direccionC');
const ciudadC = document.getElementById('direccionC');
const tipodocC = document.getElementById('direccionC');
const numerodocC = document.getElementById('inputDocumentoTipo');
const dirEnvioC = document.getElementById('dirEnvio');
const imgPerfil = document.getElementById('ImgPerfilC')
//tab cuenta
const usuarioC = document.getElementById('usuarioC');
const contraseñaC = document.getElementById('contraseñaC');
const rcontraseñaC = document.getElementById('rContraseñaC');

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
    numerodocC.value = cliente.numero_documento;
    dirEnvioC.value = cliente.direccion_envio

    //tab cuenta

    //tab reclamo cliente
    //tab activa / desactiva
}

$(document).on('click', '#actualizar-informacion', async function (e) {
    // Actualizar los datos de la categoría en tu estructura de datos

    try {
        const result = await actualizarCliente(getQueryParameter('id'), {
            nombres: nombreC.value,
            apellidos: apellidosC.value,
            correo: correoC.value,
            telefono: telefonoC.value,
            direccion: direccionC.value,
           /* pais: categoria.descripcion,
            region: categoria.descripcion,
            ciudad: categoria.descripcion,
            tipo_documento: categoria.descripcion,*/
            numero_documento: numerodocC.value,
            direccion_envio: dirEnvioC.value,
            //foto_perfil: categoria.descripcion,
            // agregar después el campo para actualizar la imagen
        });

        console.log('Clienteactualizada:', result);

    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
    }
});

$(document).on('click', '#actualizar-cuenta', async function (e) {
    // Actualizar los datos de la categoría en tu estructura de datos

});

document.addEventListener('DOMContentLoaded', ()=> {
    const clienteId = getQueryParameter('id');
    llenarCampos(clienteId);
});

