import { baseUrl} from '../utils/config';
export async function obtenerPedido(id) {
    try {
        const response = await fetch(baseUrl+ `/pedido/${id}`, { method: 'GET' });
        const result = await response.json();
        
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function actualizarPedido(id, data) {
    try {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${baseUrl}/pedido/${id}`, requestOptions);

        if (!response.ok) {
            throw new Error(`Error al actualizar la categoría: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Relanzar el error para manejo posterior
    }
}