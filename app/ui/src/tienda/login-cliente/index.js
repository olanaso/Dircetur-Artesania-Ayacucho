

import { loadPartials } from "../../utils/viewpartials.js";
import { custom, menuselec } from '../utils/common.js';
import { loginCliente, recuperarCuenta, registerCliente } from "./api.js";

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
    login();
    recovery();
    register();
}

const login = () => {
    // Obtener los elementos del formulario
    const emailInput = document.getElementById('correo');
    const passwordInput = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');

    const loader = document.getElementById("loader");

    // Agregar un event listener al formulario
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevenir el envío del formulario

        const isValid = validateLoginForm();

        if (!isValid) {
            return;
        }

        loader.style.display = "block";

        // Obtener los valores de los campos de entrada
        const email = emailInput.value;
        const password = passwordInput.value;

        const resp = await loginCliente(email, password)

        // console.log(resp);

        if (resp.data) {
            loader.style.display = "none";
            localStorage.setItem('token', resp.token);
            localStorage.setItem('usuario', resp.usuario);
            localStorage.setItem('rol', resp.rol);
            window.location.href = '/tienda/index.html';
        } else {
            loader.style.display = "none";
            alert(resp.error);
        }

    });
}

const register = () => {
    const emailInput = document.getElementById('correoRegistro');
    const loaderRegistro = document.querySelector('#loaderRegistro');
    const emailError = document.getElementById('emailErrorRegistro');

    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const isValid = validateRegisterForm();

        if (!isValid) {
            return;
        }

        loaderRegistro.style.display = 'block';

        const email = emailInput.value;

        const data = await registerCliente({ email });

        loaderRegistro.style.display = 'none';

        if (data.success) {
            // Redirigir o realizar alguna acción adicional
            window.location.href = '/tienda/index.html';
        } else {
            emailError.textContent = data.message || 'Error en el registro';
        }
    });
}

const recovery = () => {
    const recoveryForm = document.getElementById("recoveryForm");

    const emailInput = document.getElementById("correoRecuperar");
    const emailError = document.getElementById("emailErrorRecuperar");
    const loaderRecuperar = document.querySelector("#loaderRecuperar");

    recoveryForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        

        const isValid = validateRecoveryForm();

        if (!isValid) {
            return;
        }

        loaderRecuperar.style.display = "block";

        const email = emailInput.value;


        const result = await recuperarCuenta(email);
        loaderRecuperar.style.display = "none";

        if (response.ok) {
            alert("Se ha enviado un correo para recuperar su contraseña.");
        } else {
            emailError.textContent = result.message || "Error al recuperar la contraseña.";
        }

    });
}


function validateLoginForm() {
    console.log("Validating login form");
    const email = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    if (!emailPattern.test(email)) {
        emailError.textContent =
            "Por favor, ingrese un correo electrónico válido.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    if (password.length < 6) {
        passwordError.textContent =
            "La contraseña debe tener al menos 6 caracteres.";
        isValid = false;
    } else {
        passwordError.textContent = "";
    }

    return isValid;
}

function validateRegisterForm() {
    console.log("Validating register form");
    const email = document.getElementById("correoRegistro").value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    const emailError = document.getElementById("emailErrorRegistro");

    if (!emailPattern.test(email)) {
        emailError.textContent =
            "Por favor, ingrese un correo electrónico válido.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    return isValid;
}

function validateRecoveryForm() {
    console.log("Validating recovery form");
    const email = document.getElementById("correoRecuperar").value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    const emailError = document.getElementById("emailErrorRecuperar");

    if (!emailPattern.test(email)) {
        emailError.textContent =
            "Por favor, ingrese un correo electrónico válido.";
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    return isValid;
}
