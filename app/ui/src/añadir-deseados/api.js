import { baseUrl } from '../utils/config';

export async function addToWishlist(productId, clientId) {
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
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}