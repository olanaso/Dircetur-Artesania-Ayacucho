const baseUrl = 'http://localhost:3001'

//post
export async function guardarSlider(data) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        const response = await fetch(baseUrl+'/api/slider', requestOptions);
        const result = await response.json();

        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

//put
export async function actualizarSlider(id, data) {
    try {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        const response = await fetch(baseUrl+`/api/slider/${id}`, requestOptions);
        const result = await response.json();

        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

//delete
export async function eliminarSlider(id) {
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        };

        const response = await fetch(baseUrl+'/api/slider', requestOptions);
        const result = await response.json();

        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

//obtenerbyid
export async function obtenerSlider(id) {
    try {
        const response = await fetch(baseUrl+`/api/slider/${id}`, { method: 'GET' });
        const result = await response.json();

        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

//listar
export async function listarSliders() {
    try {
        const response = await fetch(baseUrl+'/api/sliders', { method: 'GET' });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}

//save
export async function saveSlider(data) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        const response = await fetch(baseUrl+'/api/slider/save/', requestOptions);
        const result = await response.json();

        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}