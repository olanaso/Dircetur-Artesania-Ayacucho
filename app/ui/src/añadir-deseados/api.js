import { baseUrl } from '../utils/config';
export async function addToWishlist(productId, clientId) {
    try {
        const response = await fetch(`${baseUrl}/api/v1/productos-favoritos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_producto: productId,
                id_cliente: clientId
            })
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

document.querySelector('.add-to-wishlist a').addEventListener('click', async function(event) {
    event.preventDefault();

    const productId = 1; // Replace with the actual product ID
    const clientId = 2; // Replace with the actual client ID

    const result = await addToWishlist(productId, clientId);
    if (result && result.success) {
        alert('Producto añadido a deseados');
    } else {
        alert('Error al añadir producto a deseados');
    }
});