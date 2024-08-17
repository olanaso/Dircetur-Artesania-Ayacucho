// File: app/ui/src/lista-artesanos/api.js
import { baseUrl } from '../utils/config';

export async function listarArtesanoById(idArtesano) {
    try {
        const response = await fetch(`${baseUrl}/artesano/${idArtesano}`, {
            method: 'GET',
        });
        const result = await response.json();
        return result.data; // Return the data property from the response
    } catch (error) {
        console.error('Error:', error);
    }
}
export async function obtenerProducByArtesano(idArtesano) {
    try {
        const response = await fetch(`${baseUrl}/v1/productos/artesanos/${idArtesano}`, {
            method: 'GET',
        });
        const result = await response.json();
        return result.data; // Return the data property from the response
    } catch (error) {
        console.error('Error:', error);
    }
}