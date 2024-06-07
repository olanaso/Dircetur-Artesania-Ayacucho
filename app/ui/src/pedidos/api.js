import { baseUrl} from '../utils/config';

export async function listarPedidos() {
    try {
 const response = await fetch(`${baseUrl}/pedido?page=${page}&limit=${limit}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error al encontrar las categorias:", error);
    }
}

export async function filtrarPedidos(filtro) {
    try {
        const params = new URLSearchParams(filtro);
        const response = await fetch(`${baseUrl}/pedidos?${params}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error al buscar las categorias:", error);
    }
}