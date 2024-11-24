
// Parámetros de la API
const access_key = 'ad3f75eb3ea982e01dcfcffa'; // Reemplázalo con tu clave de API

// Función para realizar la conversión de moneda
const convertirMoneda = async (from, to, amount) => {
    try {
        // Construir la URL de la API
        // const url = `https://api.exchangerate.host/${endpoint}?access_key=${access_key}&from=${from}&to=${to}&amount=${amount}`;
        const url = `https://v6.exchangerate-api.com/v6/${access_key}/latest/${from}`;
        
        // Hacer la petición GET usando fetch
        const response = await fetch(url);
        
        // Comprobar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        // Convertir la respuesta a JSON
        const data = await response.json();

        // Verificar si la API devolvió un error
        if (data.result === "error") {
            throw new Error(data["error-type"]);
        }

        const conversionRate = data.conversion_rates[to];

        // Obtener el resultado de la conversión
        const conversionResult = (amount * conversionRate).toFixed(2);
        console.log(`Resultado de la conversión: ${amount} ${from} = ${conversionResult} ${to}`);
        
        return conversionResult;
    } catch (error) {
        console.error('Error al realizar la conversión:', error.message);
    }
}

module.exports = { convertirMoneda };

