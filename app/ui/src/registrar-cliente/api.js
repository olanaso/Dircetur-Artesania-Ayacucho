import {baseUrl, saveDataToLocalStorage} from "../utils/config.js";

export async function guardarCliente(cliente){
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente)
    }
    try{
        const response = await fetch(baseUrl + '/cliente/save',settings)
        const data = await response.json()
        console.log("Token:", data.data.token)
        if(data && data.data.token){
            saveDataToLocalStorage('accessToken', data.token)
            saveDataToLocalStorage('rol', data.rolid)
        }
        return data
    }catch(error){
        console.log('error', error)
    }
}
