import {baseUrl, getDataFromLocalStorage, saveDataToLocalStorage} from "../utils/config";
export async function loginCliente(usuario,clave){

    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body:  new URLSearchParams({
                usuario: usuario,
                clave: clave,
        }),
    }
    try{
        const response = await fetch(baseUrl + "/v1/login-clientes", settings)
        return response //devuelvo la respuesta (status, body, headers, etc)
    } catch(e){
        console.error('Error:', e)
    }
}


