import { baseUrl, baseUrldni } from "../../utils/config";



export async function obtenerArtesanoById (idArtesano) {
    try {
        const response = await fetch(`${baseUrl}/artesano/${idArtesano}`, {
            method: "GET",
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error:", error);
    }
}


export async function buscarDNI (dni) {
    try {

        const myHeaders = new Headers();
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(baseUrldni + "/dni/" + dni, requestOptions);
        const result = await response.json();

        return result;
    } catch (error) {
        console.log('error', error);
    }

}


export async function registrarPedidoCompra (artesano, usuario) {

    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // Cambiado a JSON
        },
        body: JSON.stringify({ artesano, usuario }), // Convertir objeto a JSON
    };

    try {

        const response = await fetch(baseUrl + "/artesano/saveusuarioartesano/", settings);
        const data = await response.json();
        return data; // Ahora data contiene el ID del objeto creado y otros datos

    } catch (error) {
        alert('Ocurrio un error en el registro, verifica si el usuario esta registrado')
        console.error("Error:", error);
        location.reload();

    }
}