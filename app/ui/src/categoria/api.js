import { baseUrl} from '../utils/config';

export async function listarCategorias() {
    try {
        const response = await fetch(baseUrl + "/categoria");
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error al encontrar las categorias:", error);
    }
}

export async function filtrarCategorias(filtro) {
    try {
        const params = new URLSearchParams(filtro);
        const response = await fetch(baseUrl + `/categorias?${params}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error al buscar las categorias:", error);
    }
}

export async function borrarCategoria(id) {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        };

        const response = await fetch(baseUrl+'/categoria', requestOptions);
        const result = await response.json();

        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function actualizarCategoria(id, data) {
    try {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${baseUrl}/categoria/${id}`, requestOptions);

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


export async function guardarCategoria(data) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        const response = await fetch(baseUrl + '/categoria', requestOptions);
        const result = await response.json();

        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}