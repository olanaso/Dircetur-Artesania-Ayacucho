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
        const response = await fetch(baseUrl + "/login", settings)
        const data = await response.json()
        //almaceno la data importante en local storage
        if(data && data.token){
            saveDataToLocalStorage('rol', 3)
            saveDataToLocalStorage('token', data.token)
            saveDataToLocalStorage('id', id)
            saveDataToLocalStorage('idCliente', data.idCliente)
        }
        return data
    } catch(e){
        console.error('Error:', e)
    }
}


