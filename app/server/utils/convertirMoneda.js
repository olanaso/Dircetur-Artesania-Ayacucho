
// Parámetros de la API
const endpoint = 'convert';
const access_key = '8eca22afee324782bd672fbd28e15bf0'; // Reemplázalo con tu clave de API

// Función para realizar la conversión de moneda
const convertirMoneda = async (from, to, amount) => {
    try {
        // Construir la URL de la API
        const url = `https://api.exchangerate.host/${endpoint}?access_key=${access_key}&from=${from}&to=${to}&amount=${amount}`;
        
        // Hacer la petición GET usando fetch
        const response = await fetch(url);
        
        // Comprobar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        // Convertir la respuesta a JSON
        const data = await response.json();

        // Verificar si la API devolvió un error
        if (data.success === false) {
            throw new Error(data.error.type);
        }

        // Obtener el resultado de la conversión
        const conversionResult = data.result;
        console.log(`Resultado de la conversión: ${amount} ${from} = ${conversionResult} ${to}`);
        
        return conversionResult;
    } catch (error) {
        console.error('Error al realizar la conversión:', error.message);
    }
}

module.exports = { convertirMoneda };

