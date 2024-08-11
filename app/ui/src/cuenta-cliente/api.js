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

    try{
        const responseCliente = await fetch(baseUrl + `/cliente/${idCliente}`)
        const responseUsuario = await fetch(baseUrl + `/usuario/${idUsuario}`)

        const resultCliente = await responseCliente.json()
        const resultUsuario = await responseUsuario.json()
        console.log(resultCliente, resultUsuario)
            const result = {
            // ...resultUsuario, resultCliente
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
        return result
        console.log("EL RESULT ES:",result)
    }catch(e){
        console.error("Error al listar los datos del cliente:", e)

    }
}