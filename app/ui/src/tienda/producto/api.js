
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

export const  obtenerPuntuacion = async (productoid) => {
    if (!productoid) {
        console.error('No se encontró el parámetro productoid en la URL');
        return;
    }

    const apiUrl = `http://localhost:3002/api/puntuacioPromedio?productoid=${productoid}`;  // Construimos la URL de la API

    try {
        const response = await fetch(apiUrl);  // Hacemos la solicitud a la API
        if (!response.ok) {
            throw new Error('Error al obtener la puntuación');
        }
        const data = await response.json();  // Parseamos el JSON
        const puntuacion = data.puntuacion;  // Obtenemos la puntuación
        
        return puntuacion;
    } catch (error) {
        console.error('Error al obtener la puntuación:', error);
    }
}

export const enviarPuntuacion = async (data) => {
    try {
        const response = await fetch('http://localhost:3002/api/valoracion', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log('Calificación enviada correctamente:', jsonResponse);
            return jsonResponse;
        } else {
            console.error('Error en la solicitud:', response.statusText);
        }
    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
    }
}