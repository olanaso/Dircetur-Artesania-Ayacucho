import { baseUrl,getDataFromLocalStorage } from './config';
import {saveDataToLocalStorage} from '../utils/config'

export async function validateToken (usuario, clave) {
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            token: getDataFromLocalStorage('accessToken')
        }),
    };

    try {
        const response = await fetch(baseUrl + "/api/protegido", settings);
        const data = await response.json();
        saveDataToLocalStorage('session',data)
        return data
    } catch (error) {
        console.error("Error:", error);
    }
}

export function hideLoading(){
    $(function() {
        $(".loading-wrapper").fadeOut(2000);
    });
}

export function showLoading(){
    $(function() {
        $(".loading-wrapper").show();
    });
}


export function obtenerIESTP(){
    $(function() {
        $(".loading-wrapper").fadeOut(2000);
    });
}

export async function checkSession(){
    const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          token: getDataFromLocalStorage('accessToken')
        }),
      };
    
      try {
        const response = await fetch(baseUrl+"/api/protegido", settings);
        const data = await response.json();
        saveDataToLocalStorage('session',data)
        if(!data.isvalid){
            location.href = "sinacceso.html"
        }
        return data
      } catch (error) {
        console.error("Error:", error);
      }
}


export function llenarinformacionIESTPProg () {

    let usuario=getDataFromLocalStorage('session').usuario;
    $('#user-name').text(usuario.nombres+' '+usuario.apellidos)
    //$('#logoiestpheader').attr('src',usuario.iestp.logourl)
    //$('#mlbliestp').text(usuario.iestp.nombre)
    $('#mlbliestp').text(usuario.nombres+' '+usuario.apellidos)
    //$('#m_programas').empty();
    //let nro = 1
   // for (let prog of usuario.programas) {
     // $('#m_programas').append(`
      //    <li>${nro}.- ${prog.denominacion}</li> 
      //  `)

       // nro++
    //}
  
  }