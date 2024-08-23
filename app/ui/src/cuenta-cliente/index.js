import './flaticon.css'
import './main.css'
import './font-awesome.min.css'

import {actualizarCliente, listarDatosCliente} from './api.js';
import {getDataFromLocalStorage} from "../utils/config.js";
import {showToast} from "../utils/toast.js";

// Ejecutar la función cuando se carga la página
$(document).ready(function () {
    //ocurre al ingresar a la pagina
    cargarDatos()
    //funcion que ocurre si se le da click
    $('#btnSaveChanges').click(async function (e) {
        e.preventDefault();
        actualizarCuentaCliente()
    })
});



/**
 * Funcion que obtiene los datos del endpoint y llama a la funcion necesaria para
 * mostrar los datos en el formulario
 *
 * @returns {Promise<void>}
 */
async function cargarDatos() {
    try {
        console.log("Inicio")
        const datosCliente = await listarDatosCliente()
        const resultCliente = await datosCliente.json()
        console.log("DATOS CLIENTE", resultCliente)
        cargarFormulario(resultCliente);
    } catch (error) {
        console.error(error);
    }
}

/**
 *
 * Funcion que carga los datos del cliente en el formulario
 * @param resultCliente
 */
function cargarFormulario(resultCliente) {
    $('#name').val(resultCliente.clienteData.nombres);
    $('#lastName').val(resultCliente.clienteData.apellidos);
    $('#phone').val(resultCliente.clienteData.telefono);
    $('#country').val(resultCliente.clienteData.pais);
    $('#city').val(resultCliente.clienteData.ciudad);
    $('#email').val(resultCliente.clienteData.correo);
    $('#document-type').val(resultCliente.clienteData.tipo_documento);
    $('#document-number').val(resultCliente.clienteData.numero_documento);
    $('#address').val(resultCliente.clienteData.direccion);

    // Si deseas mostrar la imagen de perfil
    $('.profile-img').attr('src', datosCliente.fotoPerfil || 'default-image-path.jpg');
}


async function actualizarCuentaCliente() {
    $('#btnSaveChanges').prop('disabled', true).text('Guardando...')
    const idUsuario = getDataFromLocalStorage('id').toString()
    console.log("TIPO", typeof idUsuario)

    const data = {
        nombres: $('#name').val(),
        apellidos: $('#lastName').val(),
        telefono: $('#phone').val(),
        correo: $('#email').val(),
        pais: $('#country').val(),
        ciudad: $('#city').val(),
        tipo_documento: $('#document-type').val(),
        numero_documento: $('#document-number').val(),
        direccion: $('#address').val(),
    }
    try{
        // const jsonData = JSON.stringify(data)
        const actualizarUsuarioResponse = await actualizarCliente(data)
        const actualizarUsuarioData = await actualizarUsuarioResponse.json()

        if(actualizarUsuarioResponse.status === 200){
            console.log("La data",actualizarUsuarioData.message)
            showToast(actualizarUsuarioData.message)
        }
        else{
            throw new Error(actualizarUsuarioData.error)
        }
    }catch(e){
        showToast(e)
        console.error("Hubo un error actualizando el cliente", e)
    } finally{
        $('#btnSaveChanges').prop('disabled', false).text('Guardar Cambios')
    }


}


