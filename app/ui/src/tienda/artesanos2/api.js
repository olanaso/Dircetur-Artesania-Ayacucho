import { baseUrl } from '../../utils/config';

export async function listarArtesanos () {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch(`${baseUrl}/v1/artesanos/categorias`, requestOptions);

        if (!response.ok) {
            throw new Error('Error:', response.statusText);
        }

        const data = await response.json()

        const artesanos = data.flatMap(categoria =>
            categoria.artesanos.map(artesano => ({
                ...artesano,
            }))
        );

        return artesanos;
    } catch (error) {
        console.error('Error:', error);
    }
}
