import {listarDatosCliente} from './api.js';

// async function  cargarCategoria() {
//     console.log("Inicio")
//     listarDatosCliente().then(datosCliente => {
//         cargarFormulario(datosCliente);
//     }).catch(error => {
//         console.error(error);
//     });
// }

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
        console.log("DATOS CLIENTE", datosCliente)
        cargarFormulario(datosCliente);
    } catch (error) {
        console.error(error);
    }
}

/**
 *
 * Funcion que carga los datos del cliente en el formulario
 * @param datosCliente
 */
function cargarFormulario(datosCliente) {
    $('#name').val(datosCliente.nombres);
    $('#phone').val(datosCliente.telefono);
    $('#country').val(datosCliente.pais);
    $('#city').val(datosCliente.ciudad);
    $('#email').val(datosCliente.correo);
    $('#document-type').val(datosCliente.tipoDocumento);
    $('#document-number').val(datosCliente.numeroDocumento);
    $('#region').val(datosCliente.region);
    $('#address').val(datosCliente.direccion);

    // Si deseas mostrar la imagen de perfil
    $('.profile-img').attr('src', datosCliente.fotoPerfil || 'default-image-path.jpg');
}

// Ejecutar la función cuando se carga la página
$(document).ready(function () {
    //ocurre al ingresar a la pagina
    cargarDatos()
    //funcion que ocurre si se le da click
    $('#btnSaveChanges').click(async function (e) {
        e.preventDefault();
        actualizarCliente()
    })

});

async function actualizarUsuariom() {
    const data = {
        nombre_completo: $('#name').val(),
        telefono: $('#phone').val(),
        pais: $('#country').val(),
        ciudad: $('#city').val(),
        numero_documento: $('#document-number').val(),
        region: $('#region').val(),
        direccion: $('#address').val()

    }
    const jsonData = JSON.stringify(data)
    try{
        const actualizarUsuario = actualizarCliente()
    }catch(e){
        console.error("Hubo un error actualizando el cliente", e)
    }


}


