import { baseUrl, getDataFromLocalStorage } from '../utils/config';
//const baseUrl = 'http://localhost:3001';

export async function listarClientes() {
    try {
        const response = await fetch(baseUrl + "/cliente");
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error al encontrar las clientes:", error);
    }
}

export async function filtrarClientes(filtro) {
    try {
        const params = new URLSearchParams(filtro);
        const response = await fetch(baseUrl + `/clientes?${params}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error al buscar las clientes:", error);
    }
}

export async function borrarCliente(id) {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        };

        const response = await fetch(baseUrl+'/cliente', requestOptions);
        const result = await response.json();

        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function actualizarCliente(id, data) {
    try {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        const response = await fetch(`${baseUrl}/cliente/${id}`, requestOptions);

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


export async function guardarcliente(data) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        const response = await fetch(baseUrl + '/cliente', requestOptions);
        const result = await response.json();

        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function obtenerCliente(id) {
    try {
        const response = await fetch(baseUrl+ `/cliente/${id}`, { method: 'GET' });
        const result = await response.json();
        
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}