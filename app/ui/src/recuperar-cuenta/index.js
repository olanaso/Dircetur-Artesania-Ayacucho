
import { validarHTML5 } from '../utils/validateForm';
import {hideLoading} from '../utils/init'
import {recuperarCuenta} from './api'
import { showToast } from '../utils/toast'

hideLoading()   


$('#btnsubmit').on('click', function (event) {
    validarHTML5('form', function () {
        recuperar_cuenta($('#txtemail').val())
    })

});

async function recuperar_cuenta(email){

    try{
        $("#btnsubmit").prop("disabled", true).text("Recuperando...");
        let result = await recuperarCuenta(email)
        console.log(result)
        if(result.err){
            $('#error_msj').show()
            setTimeout(() => {
                $('#error_msj').hide()
            }, 4000);
        }else{
            showToast('El usuario y la clave fue enviada al correo: '+email)
        }
        $("#btnsubmit").prop("disabled", false).text("Enviar");

    }
    catch(e){
        $("#btnsubmit").prop("disabled", false).text("Enviar");
      
    }
    

}
