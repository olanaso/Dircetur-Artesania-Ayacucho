import {baseUrl, saveDataToLocalStorage} from "../utils/config.js";

export async function guardarCliente(cliente){
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
        credentials: 'include'
    }
    try{
        const response = await fetch(baseUrl + '/cliente/save',settings)
        const data = await response.json()
        console.log("funcionaa")
        if(data && data.data.rolid){
            saveDataToLocalStorage('rol', data.data.rolid)
        }
        return data
    }catch(error){
        console.log('error', error)
    }
}
