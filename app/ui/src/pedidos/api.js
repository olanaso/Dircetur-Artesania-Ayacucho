// const baseUrl = 'http://localhost:3001';

// export async function listarPedidos() {
//     try {
//         const response = await fetch(baseUrl + "/api/pedido");
//         const result = await response.json();
//         return result;
//     } catch (error) {
//         console.error("Error al encontrar las categorias:", error);
//     }
// }

// export async function filtrarPedidos(filtro) {
//     try {
//         const params = new URLSearchParams(filtro);
//         const response = await fetch(baseUrl + `/api/pedidos?${params}`);
//         const result = await response.json();
//         return result;
//     } catch (error) {
//         console.error("Error al buscar las categorias:", error);
//     }
// }

const baseUrl = 'http://localhost:3001';

export async function listarPedidos(page = 1, limit = 10) {
    try {
        const response = await fetch(`${baseUrl}/api/pedido?page=${page}&limit=${limit}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error al encontrar las categorias:", error);
    }
}

export async function filtrarPedidos(filtro) {
    try {
        const params = new URLSearchParams(filtro);
        const response = await fetch(`${baseUrl}/api/pedidos?${params}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error al buscar las categorias:", error);
    }
}
