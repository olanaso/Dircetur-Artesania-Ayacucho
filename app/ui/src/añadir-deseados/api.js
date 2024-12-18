import { baseUrl } from '../utils/config';
import { updateDeseadosCount } from '../Shared/navbar.js';
import {showToast} from "../utils/toast.js";

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
            if (response.status === 400) {
                const errorData = await response.json();
                const errorMessage = errorData.errors[0].msg; // Extract the first error message
                showToast(errorMessage);
                return null;
            }
            throw new Error('Network response was not ok');
        }
        showToast('Producto agregado correctamente');

        const result = await response.json();
        console.log('Product added to wishlist:', result);

        // Actualizar el contador de deseados
        const updatedWishlist = await listarDeseados(clientId);
        updateDeseadosCount(updatedWishlist.data.length);

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