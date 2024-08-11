import {baseUrl} from '../utils?config'
import {getData} from "mapbox-gl/src/util/ajax.js";
import {getDataFromLocalStorage} from "../utils/config.js";

export async function listarDatosCliente(){
    const idUsuario = getDataFromLocalStorage('id')
    const idCliente = getDataFromLocalStorage('idCliente')
    try{
        const responseCliente = await fetch(baseUrl + `/cliente/${idCliente}`)
        const responseUsuario = await fetch(baseUrl + `/usuario/${idUsuario}`)

        const resultCliente = await responseCliente.json()
        const resultUsuario = await responseUsuario.json()

        return result = {
            nombres: resultUsuario.nombre_completo,
            telefono: resultCliente.telefono,
            pais: resultCliente.pais,
            ciudad: resultCliente.ciudad,
            correo: resultCliente.correo,
            tipoDocumento: resultCliente.tipo_documento,
            numeroDocumento: resultCliente.numero_documento,
            region: resultCliente.region,
            direccion: resultCliente.direccion,
            fotoPerfil: resultCliente.foto_perfil
        }
    }catch(e){
        console.error("Error al listar los datos del cliente:", e)

    }
}