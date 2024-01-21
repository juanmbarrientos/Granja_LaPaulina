// Conexión a Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA6pgV-xQmE8rAtzlDXtQ4FcOwPGaUwJUk",
    authDomain: "dblp-e56db.firebaseapp.com",
    projectId: "dblp-e56db",
    storageBucket: "dblp-e56db.appspot.com",
    messagingSenderId: "661617459106",
    appId: "1:661617459106:web:c2f4a57e89327af327bcfb"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Función para agregar el símbolo "$" a los campos de importe
function agregarSimboloDolar(input) {
    const valor = input.value;
    if (valor !== "" && !valor.startsWith("$")) {
        input.value = "$" + valor;
    }
}

// Función para guardar los datos en Firebase
function guardarDatos() {
    // Obtener valores de los campos
    const fecha = document.getElementById('fecha').value;
    const detalle = document.getElementById('detalle').value;
    const categoria = document.getElementById('egresos_').value;
    const importe = parseFloat(document.getElementById('importe').value.replace("$", "")) || 0;

    // Validar que todos los campos estén completos
    if (fecha && detalle && categoria && importe) {
        // Crear un objeto con los datos
        const data = {
            fecha: fecha,
            detalle: detalle,
            categoria: categoria,
            importe: importe
        };

        // Generar un título para el documento usando la categoría e importe
        const tituloDocumento = `${categoria}_${fecha}_${importe}`;

        // Guardar los datos en la colección "gastos" con el título personalizado
        db.collection('gastos').doc(tituloDocumento).set(data)
            .then(function () {
                console.log("Datos guardados correctamente en el documento:", tituloDocumento);
                // Puedes agregar aquí cualquier lógica adicional después de guardar
                mostrarDatosGuardados()
            })
            .catch(function (error) {
                console.error("Error al guardar los datos: ", error);
            });
    } else {
        alert("Por favor, complete todos los campos antes de guardar.");
    }
}

// Asignar la función guardarDatos al evento click del botón "Agregar"
document.getElementById('agregar').addEventListener('click', guardarDatos);

function mostrarDatosGuardados() {
    const notificacionDiv = document.getElementById('cardOperacionExitosa');
        notificacionDiv.innerHTML = `
            <div class="linea_titulo">
                <p class="tituloCards espacio_notif1">Notificación</p>
                <img class="img_notificaciones" src="../img/check.svg">
            </div>
            <p class="mensajeNotificacion espacio_notif2">El egreso se guardó correctamente.</p>
        `;
}
