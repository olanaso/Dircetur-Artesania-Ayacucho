import {baseUrl} from '../utils/config'
export async function obtenerProducto(idprod) {
    try {
        const response = await fetch(`${baseUrl}/producto/${idprod}`, { method: 'GET' });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function obtenerArtesano(idartesano) {
    try {
        const response = await fetch(`${baseUrl}/artesano/${idartesano}`, { method: 'GET' });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function listarProductos(filtro) {
    try {
        const params = new URLSearchParams(filtro);
        const response = await fetch(`${baseUrl}/prductosFiltrados?${params}`, { method: 'GET' });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}