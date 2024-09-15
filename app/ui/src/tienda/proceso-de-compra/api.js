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
