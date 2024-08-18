// File: app/ui/src/lista-artesanos/api.js
import { baseUrl } from '../utils/config';

export async function listarArtesanoById(idArtesano) {
    try {
        const requestOptions ={
            method: 'GET'
        }
        const response = await fetch(`${baseUrl}/v1/artesanos/categorias}`, requestOptions);
        const result = await response.json();
        console.log("DATAAA", result)
        return result.data; // Return the data property from the response
    } catch (error) {
        console.error('Error:', error);
    }
}