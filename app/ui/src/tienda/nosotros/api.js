

import { baseUrl, getDataFromLocalStorage } from '../../utils/config';


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