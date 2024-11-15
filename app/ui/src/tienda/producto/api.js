
import { baseUrl } from '../../utils/config';


export async function getPortadaBusqueda () {
    try {

        const myHeaders = new Headers();
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(baseUrl + "/portada-init-busqueda", requestOptions);
        const result = await response.json();

        return result;
    } catch (error) {
        console.log('error', error);
    }

}

export async function busquedaProductos (obj) {
    try {
        const params = new URLSearchParams(obj).toString();
        const myHeaders = new Headers();
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(baseUrl + "/buscar-producto?limit=10&" + params, requestOptions);
        const result = await response.json();

        return result;
    } catch (error) {
        console.log('error', error);
    }

}

export async function obtenerProducto(idprod) {
    try {
        const response = await fetch(`${baseUrl}/producto/${idprod}`, { method: 'GET' });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function listarComentarios(idprod) {
    try {
        const response = await fetch(`${baseUrl}/listaComentarios?productoid=${idprod}`, { method: 'GET' });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function nuevoComentario(objComentario) {
    try {
        const response = await fetch(`${baseUrl}/nuevoComentario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(objComentario),
        });

        if (!response.ok) {
            throw new Error('Error al enviar el comentario.');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}