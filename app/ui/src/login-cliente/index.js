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
        //convierto el response a json
        const data = await result.json()
        console.log("La data", data)
        console.log("El result en index", result)

        if(result.status ===200){
            saveDataToLocalStorage('rol', 3)
            saveDataToLocalStorage('token', data.data.token)
            saveDataToLocalStorage('id', data.data.id)
            saveDataToLocalStorage('idCliente', data.data.idCliente)
            window.location.href = '/principal.html'
        }
        else {
            //si el status es diferente de 200, muestro el error
            throw new Error(data.error)
        }

    }catch(e){
        showToast(e)
        console.error(e)
    } finally {
        $('#btnloginc').prop('disabled', false).text('Ingresar');
    }
}