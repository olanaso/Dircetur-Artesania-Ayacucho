import {baseUrl} from '../utils/config'
export async function obtenerArtesano(idprod) {
    try {
        const response = await fetch(`${baseUrl}/artesano/${idprod}`, { method: 'GET' });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function obtenerProductos(idprod) {
    try {
        const response = await fetch(`${baseUrl}/artesano/${idprod}`, { method: 'GET' });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}