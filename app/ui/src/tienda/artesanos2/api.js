import { baseUrl } from '../../utils/config';

export async function listarArtesanos () {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(`${baseUrl}/artesanosweb`, requestOptions);

        if (!response.ok) {
            return [];
        }

        const data = await response.json()

        return data;
    } catch (error) {
        return [];
    }
}

export async function listarFiltros () {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(`${baseUrl}/filtroartesanosweb`, requestOptions);

        if (!response.ok) {
            return [];
        }

        const data = await response.json()

        return data;
    } catch (error) {
        return [];
    }
}
