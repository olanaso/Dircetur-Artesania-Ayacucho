// src/a%C3%B1adir-deseados/api.js
import { baseUrl } from '../utils/config';

export async function listarDeseados(clientId) {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch(`${baseUrl}/v1/productos-favoritos/clientes/${clientId}`, requestOptions);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function addProductToWishlist(productId, clientId) {
    const url = `${baseUrl}/v1/productos-favoritos`;
    const data = {
        id_producto: productId,
        id_cliente: clientId
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Product added to wishlist:', result);
        return result;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}
export async function deleteProductoDeseado({ productId, clientId }) {
    const settings = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    try {
        const response = await fetch(`${baseUrl}/v1/productos-favoritos/${productId}/${clientId}`, settings);
        return response.ok;
    } catch (error) {
        console.error("Error al eliminar el producto deseado:", error);
        return false;
    }
}