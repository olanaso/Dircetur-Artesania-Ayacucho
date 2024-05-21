import {baseUrl} from '../utils/config'

export async function recuperarCuenta(correo){
    const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          correo: correo
        }),
      };
    
      try {
        const response = await fetch(baseUrl+"/api/recuperarcuenta", settings);
        const data = await response.json();
        return data
      } catch (error) {

        console.error("Error:", error);
      }
}