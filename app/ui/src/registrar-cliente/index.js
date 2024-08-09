import './flaticon.css'
import './main.css'
import './font-awesome.min.css'
import './style.css'
import { showToast } from "../utils/toast.js";
import { guardarCliente } from './api.js'



$(document).ready(function () {


    $('#btnregistrar').click(async function (e) {
        e.preventDefault()
        if (validarCamposRegistro()) {
            registrarCliente()
            window.location.href = '#'; 
        }
    })
})

function validarCamposRegistro() {
    let isValid = true;
    $('#registerForm input[required]').each(function () {
        if ($(this).val() === '') {
            isValid = false;
            $(this).css('border', '1px solid red');
        } else {
            $(this).css('border', '');
        }
    });

    if (!isValid) {
        showToast('Por favor, complete todos los campos requeridos.');
    }
    return isValid;
}
async function registrarCliente() {

    let nombres = $('#nombres').val()
    let apellidos = $('#apellidos').val()
    let correo = $('#correo').val()
    let contraseña = $('#contraseña').val()
    let telefono = $('#telefono').val()

    //usando api
    try {
        const registroCliente = await guardarCliente({ nombres, apellidos, correo, contraseña, telefono })
        if (registroCliente) {
            showToast('success', 'Cliente registrado correctamente')
        }
    } catch (e) {
        showToast('error', 'Error al registrar el cliente') //por cambiar, debe responder de acuerdo al api
        console.log(e)
    }

}

