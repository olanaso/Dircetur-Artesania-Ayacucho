import { baseUrl, getDataFromLocalStorage } from '../utils/config';


export async function enviarCorreo(emailData) {
    try {
        const response = await fetch(`${baseUrl}/web/sendemail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Correo enviado correctamente:', result);
        } else {
            console.error('Error al enviar el correo:', result.error);
        }
        return result;
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw error;
    }
}