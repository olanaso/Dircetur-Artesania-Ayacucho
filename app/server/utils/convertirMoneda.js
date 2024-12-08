
// Parámetros de la API
const access_key = 'a5fb231caad198f0601087f7'; // Reemplázalo con tu clave de API

// Función para realizar la conversión de moneda
const convertirMonedaKambista = async (from, to, amount) => {
    try {
        // Construir la URL de la API
        const url = `https://api.kambista.com/v1/exchange/calculates?originCurrency=${from}&destinationCurrency=${to}&amount=${amount}&active=S`
        
        // Hacer la petición GET usando fetch
        const response = await fetch(url);

        // Comprobar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        // Convertir la respuesta a JSON
        const data = await response.json();

        // Verificar si la API devolvió un error
        if (!data) {
            throw new Error(data["error-type"]);
        }

        // Obtener el resultado de la conversión
        const conversionResult = data.exchange.toFixed(2);

        return conversionResult;
    } catch (error) {
        console.error('Error al realizar la conversión convertirMonedaKambista:', error.message);
    }
}

const convertirMonedaExchangerate = async (from, to, amount) => {
    try {
        // Construir la URL de la API
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

        return conversionResult;
    } catch (error) {
        console.error('Error al realizar la conversión convertirMonedaExchangerate:', error.message);
    }
}

const convertirMoneda = async (from, to, amount) => {
    const exchanges = [convertirMonedaKambista, convertirMonedaExchangerate];

    for (let exchange of exchanges) {
        const result = await exchange(from, to, amount);
        if (result) {
            return result;
        }
    }

    return null;
}


module.exports = { convertirMoneda };

