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
        return data
    }catch(error){
        console.log('error', error)
    }
}
