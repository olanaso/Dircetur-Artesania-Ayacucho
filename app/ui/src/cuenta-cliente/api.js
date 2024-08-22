import {baseUrl} from '../utils/config'
import {getDataFromLocalStorage} from "../utils/config.js";

/**
 * Funcion que hace peticion a la API para obtener los datos del cliente y usuario
 * y almacena los valores necesarios en un objecto
 * @returns {Promise<{tipoDocumento: (HTMLElement|*), fotoPerfil: (string|{field: string, defaultValue: null, allowNull: boolean, type: *}|null|*), ciudad: (HTMLElement|*), correo, direccion: (HTMLElement|*), numeroDocumento: (HTMLElement|*), telefono: (HTMLElement|*), region: (HTMLElement|VTTRegion|string|*), nombres: (string|*), pais: (HTMLElement|*)}>}
 */
export async function listarDatosCliente(){
    const idUsuario = getDataFromLocalStorage('id')
    const idCliente = getDataFromLocalStorage('idCliente')
    console.log("LOS REALES DATOS", idUsuario, idCliente)
    try{
        const responseCliente = await fetch(baseUrl + `/cliente/${idCliente}`)

        return responseCliente
    }catch(e){
        console.error("Error al listar los datos del cliente:", e)

    }
}


export async function actualizarCliente(data){
    const idUsuario = getDataFromLocalStorage('id')
    const idCliente = getDataFromLocalStorage('idCliente')
    //asignando el idUsuario al json de data
    data.idUsuario = getDataFromLocalStorage('id')

    //Settings para actualizar la tabla de usuarios
    const settingsUsuario = {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data)
    };

    //Settings para actualizar la tabla de clientes
    const settingsCliente = {
        method: "PUT",
        headers:{
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data) //Vuelvo la data en json y la envio
    }


    try{
        const responseActualizarUsuario = await fetch(baseUrl + `/usuario/${idUsuario}`, settingsUsuario)
        const responseActualizarCliente = await fetch(baseUrl + `/cliente/${idCliente}`, settingsCliente)
    }catch(e){
        console.error("Error al actualizar el cliente", e)
    }
}
