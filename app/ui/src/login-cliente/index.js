import './flaticon.css'
import './main.css'
import './font-awesome.min.css'
import {hideLoading} from "../utils/init.js";
import {obtenerParametrosURL} from "../utils/path.js";
import {validarHTML5} from "../utils/validateForm.js";
import {loginCliente} from "./api.js";
import {saveDataToLocalStorage} from "../utils/config.js";
import {showToast} from "../utils/toast.js";

$(document).ready(function(){
    $('#btnloginc').click(async function(e){
        e.preventDefault()
        await loginDeCliente()
    })
})

async function loginDeCliente(){
    $('#btnloginc').prop('disabled', true).text('Ingresando...')
    const usuario = $('#txtusuario').val()
    const clave = $('#txtclave').val()
    try{
        const result = await loginCliente(usuario, clave)
        if(result){
            // Guardar el rol del usuario en localStorage
            showToast('success', 'Cliente logueado correctamente')
            window.location.href = '/principal.html';
        }
    }catch(e){
        showToast('error', 'Error al loguear el cliente')
        console.error(e)
    } finally {
        $('#btnloginc').prop('disabled', false).text('Ingresar');
    }
}