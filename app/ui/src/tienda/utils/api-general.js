
import { baseUrl } from '../../utils/config';


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