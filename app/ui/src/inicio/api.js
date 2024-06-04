import {baseUrl,getDataFromLocalStorage} from '../utils/config'
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
        return data
      } catch (error) {
        console.error("Error:", error);
      }
}


export async function obtenerLibrosLeidosGuardados(usuario){
    try {
        
        const myHeaders = new Headers();
       
    
        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
    
        const response = await fetch(baseUrl+"/api/libro-inicio?usuarioid="+usuario.id, requestOptions);
        const result = await response.json();
        return result;
      } catch (error) {
        console.log('error', error);
      }



}


