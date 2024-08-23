import { listarDeseados } from '../añadir-deseados/api.js';

export function modificarNavbarSegunRol() {
    console.log('modificarNavbarSegunRol function called');
    try {
        const userRole = localStorage.getItem('rol');
        if (!userRole) {
            throw new Error('User role not found in localStorage user');
        }

        if (userRole === '3') {
            const userIcon = document.getElementById('user-icon');
            if (userIcon) {
                userIcon.style.display = 'block';
            }

            const iniciarSesionOption = document.querySelector('li:has(a[href="login-cliente.html"])');
            if (iniciarSesionOption) {
                iniciarSesionOption.style.display = 'none';
            }
        }
    } catch (error) {
        console.error('Error in modificarNavbarSegunRol:', error);
    }
}

export function cerrarSesion() {
    localStorage.removeItem('rol');
    window.location.href = '/login-cliente.html';
}

export function updateDeseadosCount(count) {
    const countElement = document.getElementById('deseados-count');
    if (countElement) {
        if (count === 0) {
            countElement.style.display = 'none';
        } else {
            countElement.style.display = 'block';
            countElement.textContent = count;
        }
    }
}

async function initDeseadosCount() {
    const clientId = localStorage.getItem('idCliente');
    if (clientId) {
        const response = await listarDeseados(clientId);
        if (response && response.data) {
            updateDeseadosCount(response.data.length);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    modificarNavbarSegunRol();
    initDeseadosCount();
});