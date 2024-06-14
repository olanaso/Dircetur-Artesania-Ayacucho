
import { validarHTML5 } from '../utils/validateForm';
import {saveDataToLocalStorage} from '../utils/config'
import {hideLoading} from '../utils/init'
import {obtenerParametrosURL} from '../utils/path'
import {login, getIESTP} from './api'
import './login.css'

//ocultando el loading 
hideLoading()
limpiarDatos();

//obteniendo los datos del IESTP
let {iestp}=obtenerParametrosURL()
obtenerIESTP(iestp)

async function obtenerIESTP(nombre){
    let result =await getIESTP(nombre);
    if(result) {
        $('#logoiestp').attr('src', result.logourl)
        $('#imgbanner').attr('src', result.banner)
    }
}

$('#btnlogin').on('click', function (event) {
    validarHTML5('form', function () {
        loguear($('#txtusuario').val(),$('#txtclave').val())
    })

});

async function loguear(usuario,clave){
    $("#btnlogin").prop("disabled", true).text("Logueado...");
   let result = await login(usuario,clave)
   console.log(result)
   if(result.islogueado){
    saveDataToLocalStorage('usuario',result.usuario);
    saveDataToLocalStorage('accessToken',result.token);
    window.location.href='inicio.html'
   }else{

    $('#error_msj').show()

    setTimeout(() => {
        $('#error_msj').hide()
    }, 4000);
   }

   $("#btnlogin").prop("disabled", false).text("Login");
   
}


function limpiarDatos(){
    localStorage.removeItem('session');
    localStorage.removeItem('usuario');
    localStorage.removeItem('accessToken');
  }