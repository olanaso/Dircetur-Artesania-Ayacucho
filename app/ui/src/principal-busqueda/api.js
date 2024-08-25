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

export async function filtrarproductosporcategoria(categoriaId) {
    try {
        const response = await fetch(`${baseUrl}/v1/productos/categoria/${categoriaId}`, { method: 'GET' });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Update obtenerArtesano function
// Modificar la función obtenerArtesanos para obtener todos los artesanos
export async function obtenerTodosLosArtesanos() {
    try {
        const response = await fetch(`${baseUrl}/artesanos`, { method: 'GET' });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}


