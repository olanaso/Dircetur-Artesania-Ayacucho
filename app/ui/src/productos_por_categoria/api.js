
// app/ui/src/api.js
import { baseUrl } from '../utils/config';

export async function filtrarproductoscategoria(categoriaId) {
    try {
        const response = await fetch(`${baseUrl}/v1/productos/categoria/${categoriaId}`, { method: 'GET' });
        const result = await response.json();
        console.log("productos: ", result);
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}
