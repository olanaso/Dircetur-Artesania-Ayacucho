import { baseUrl} from '../utils/config';

export async function listarPedidos(page, limit, artesanoId) {
    try {
        const response = await fetch(`${baseUrl}/ventapedido?page=${page}&limit=${limit}&idartesano=${artesanoId}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error al encontrar las categorías:", error);
        throw error; // Propagar el error para manejarlo en el front-end si es necesario
    }
}

export async function filtrarPedidos(filtro) {
    try {
        // Construir la URL con los parámetros de filtro
        const params = new URLSearchParams(filtro);
        const response = await fetch(`${baseUrl}/ventapedidos?${params}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error al buscar las categorias:", error);
        throw error; // Propagar el error para manejarlo en el front-end si es necesario
    }
}
