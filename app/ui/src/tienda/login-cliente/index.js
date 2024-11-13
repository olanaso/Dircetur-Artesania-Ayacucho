

import { loadPartials } from "../../utils/viewpartials.js";
import { custom, menuselec } from '../utils/common.js';
import { loginCliente } from "./api.js";

(async function () {
    let partials = [
        { path: '../partials/tienda/header.html', container: 'header' },
        { path: '../partials/tienda/footer.html', container: 'footer' },
    ];
    try {

        await loadPartials(partials);

        custom()
        menuselec()

        console.log('Las vistas parciales se han cargado correctamente!');

        startApp();
    } catch (e) {
        console.error(e);
    }
})();


function startApp () {
    // Obtener los elementos del formulario
    const emailInput = document.getElementById('correo');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');

    const loader = document.getElementById("loader");

    // Agregar un event listener al formulario
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevenir el envío del formulario

        loader.style.display = "block";


        // Obtener los valores de los campos de entrada
        const email = emailInput.value;
        const password = passwordInput.value;

        console.log('Email:', email);
        console.log('Password:', password);

        const resp = await loginCliente(email, password)

        console.log(resp)

        if (resp.status === 200) {
            loader.style.display = "none";
            localStorage.setItem('token', resp.token);
            localStorage.setItem('usuario', resp.usuario);
            localStorage.setItem('rol', resp.rol);
            window.location.href = '/tienda/index.html';
        } else {
            loader.style.display = "none";
            alert('Usuario o contraseña incorrecta');
        }

    });

    console.log('Iniciando la aplicación...');

}
