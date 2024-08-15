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

document.addEventListener('DOMContentLoaded', () => {
    modificarNavbarSegunRol();
});