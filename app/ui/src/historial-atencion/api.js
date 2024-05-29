const baseUrl = 'http://localhost:3001';
export async function obtenerPedido(id) {
    try {
        const response = await fetch(baseUrl+ `/api/pedido/${id}`, { method: 'GET' });
        const result = await response.json();
        
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}