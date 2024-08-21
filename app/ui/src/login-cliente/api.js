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
        const data = await response.json()
        // console.log("La dataaa", typeof data)
        // console.log("La dataaa", data)
        // console.log("La dataaa", data.data.token)
        // console.log("La dataaa", data.data.id)
        // console.log("La dataaa", data.data.idCliente)
        //almaceno la data importante en local storage
        if(data && data.data.token){
            saveDataToLocalStorage('rol', 3)
            saveDataToLocalStorage('token', data.data.token)
            saveDataToLocalStorage('id', data.data.id)
            saveDataToLocalStorage('idCliente', data.data.idCliente)

        }
        return data
    } catch(e){
        console.error('Error:', e)
    }
}


