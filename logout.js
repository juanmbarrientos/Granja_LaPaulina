// logout.js

// Función para realizar el logout
function logout() {
    // Borra los datos almacenados en localStorage
    localStorage.clear();

    // Redirige a index.html
    window.location.href = 'index.html';
}

// Evento click del botón de logout
document.querySelector('.navbar img').addEventListener('click', logout);
