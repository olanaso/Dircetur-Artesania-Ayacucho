

import { baseUrl } from '../../utils/config';


export async function getPortada () {
    try {

        const myHeaders = new Headers();
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(baseUrl + "/portada/", requestOptions);
        const result = await response.json();

        return result;
    } catch (error) {
        console.log('error', error);
    }
}

export const postIndicadores = async (data) => {
    try {
        const response = await fetch(`${baseUrl}/acceso`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            console.error('Error en la solicitud:', response.statusText);
        }
    } catch (error) {
        console.error('Error en la conexión con el servidor:', error);
    }
}