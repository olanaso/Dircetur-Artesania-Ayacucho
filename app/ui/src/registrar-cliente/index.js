import './flaticon.css'
import './main.css'
import './font-awesome.min.css'
import './style.css'
import { showToast } from "../utils/toast.js";
import { guardarCliente } from './api.js'
import { guardarUsuario } from '../../shared/api/usuario.js'
import { saveDataToLocalStorage } from "../utils/config.js";

$(document).ready(function () {
    $('#btnregistrar').click(async function (e) {
        e.preventDefault();
        if (validarCamposRegistro()) {
            registrarCliente();
        }
    });
});

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
        showToast('Por favor, complete todos los campos requeridos.', 'aaa');
    }

    return isValid;
}

async function registrarCliente() {
    let nombres = $('#nombre').val();
    let apellidos = $('#apellidos').val();
    let correo = $('#correo').val();
    let clave = $('#contraseña').val();
    let telefono = $('#telefono').val();

    try {
        const registroCliente = await guardarCliente({ nombres, apellidos, correo, clave, telefono });
        const registroUsuario = await guardarUsuario({ usuario: correo, nombre_completo: `${nombres} ${apellidos}`,correo, clave, rolid: 3, tipousuario: 3, estado: 1 });
        if (registroCliente && registroUsuario) {
            showToast('success', 'Cliente registrado correctamente');
            window.location.href = '/principal.html';
        }
    } catch (e) {
        showToast('error', 'Error al registrar el cliente');
        console.error(e);
    }
}