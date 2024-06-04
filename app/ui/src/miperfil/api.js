import { baseUrl, getDataFromLocalStorage } from '../utils/config';

export async function saveUser (usuario) {
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(usuario),
    };

    try {
        const response = await fetch(baseUrl + "/api/usuario_save", settings);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function changepassword (usuario) {
    const settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(usuario),
    };

    try {
        const response = await fetch(baseUrl + "/api/cambiar_contrasenia", settings);
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error:", error);
    }
}

