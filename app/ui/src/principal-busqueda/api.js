import {baseUrl} from '../utils/config'

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

export async function listarCategorias(page, limit) {
    try {
        const response = await fetch(`${baseUrl}/categoria`, { method: 'GET' });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}
