// File: app/ui/src/lista-artesanos/api.js
import { baseUrl } from '../../utils/config';

export async function listarArtesanosPorCategoriaArtesania () {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(`${baseUrl}/v1/artesanos/categorias`, requestOptions);
        const result = await response.json()
        return result; // Return the data property from the response
    } catch (error) {
        console.error('Error:', error);
    }
}
