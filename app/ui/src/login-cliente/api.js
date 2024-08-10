import{baseUrl, saveDataToLocalStorage} from "../utils/config";
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
        console.log('Token:', data.token)
        if(data && data.token){
            saveDataToLocalStorage('accessToken', data.token)
            saveDataToLocalStorage('rol', data.usuario.rolid)
        }
        return data
    } catch(e){
        console.error('Error:', error)
    }
}


