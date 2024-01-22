// logout.js
// Evento click del botón de logout
document.querySelector('.navbar img').addEventListener('click', logout);

// Función para realizar el logout
function logout() {
    // Borra los datos almacenados en localStorage
    localStorage.clear();
}

