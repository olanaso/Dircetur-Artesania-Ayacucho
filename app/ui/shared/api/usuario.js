import {baseUrl, saveDataToLocalStorage} from "../../src/utils/config.js";

export async function guardarUsuario(usuario) {
    if (usuario.usuarioid !== 0) {
        usuario.id = usuario.usuarioid;
    }

    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Cambiado a JSON
        },
        body: JSON.stringify(usuario), // Convertir objeto a JSON
    };

    try {
        const response = await fetch(baseUrl + "/usuario_save/", settings);
        const data = await response.json();
        if(data && data.data.token){
            saveDataToLocalStorage('accessToken', data.data.token)
            saveDataToLocalStorage('rol', data.data.rolid)
        }
        return data; // Ahora data contiene el ID del objeto creado y otros datos
    } catch (error) {
        console.error("Error:", error);
    }
}
