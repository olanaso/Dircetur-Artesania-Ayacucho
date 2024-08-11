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
        if(data && data.token){
            saveDataToLocalStorage('rol', data.usuario.rolid)
            saveDataToLocalStorage('token', data.token)
            saveDataToLocalStorage('id', data.usuario.id)
        }
        return data
    } catch(e){
        console.error('Error:', e)
    }
}


