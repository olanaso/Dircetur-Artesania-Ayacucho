import {baseUrl, saveDataToLocalStorage} from '../utils/config'
export async function login(usuario,clave){
    const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",

        },
        body: new URLSearchParams({
          usuario: usuario,
          clave: clave,
        }),
      };
    
      try {
        const response = await fetch(baseUrl+"/login", settings);
        const data = await response.json();
        console.log('Token:', data.token)
        if(data && data.token){
            saveDataToLocalStorage('accessToken', data.token)
            saveDataToLocalStorage('rol', data.usuario.rolid)
        }
        return data
      } catch (error) {
        console.error("Error:", error);
      }
}


/*export async function getIESTP(nombre){
    const settings = {
        method: "GET",
        headers: {
        }
      };
    
      try {
        const response = await fetch(baseUrl+"/api/iestp?nombre="+nombre, settings);
        const data = await response.json();
        return data
      } catch (error) {
        console.error("Error:", error);
      }
}*/