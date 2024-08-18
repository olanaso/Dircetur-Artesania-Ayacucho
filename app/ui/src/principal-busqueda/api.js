import {baseUrl} from '../utils/config'

export async function listarProductos(filtro) {
    try {
        const params = new URLSearchParams(filtro);
        const response = await fetch(`${baseUrl}/prductosFiltrados?${params}`, { method: 'GET' });
        const result = await response.json();
        console.log("productos: ", typeof result);
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function filtrarproductosporcategoria(categoriaId) {
    try {
        const response = await fetch(`${baseUrl}/v1/productos/categoria/${categoriaId}`, { method: 'GET' });
        const result = await response.json();
        console.log("productos: ", result);
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}



