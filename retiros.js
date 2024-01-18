// Configura la conexión a Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA6pgV-xQmE8rAtzlDXtQ4FcOwPGaUwJUk",
    authDomain: "dblp-e56db.firebaseapp.com",
    projectId: "dblp-e56db",
    storageBucket: "dblp-e56db.appspot.com",
    messagingSenderId: "661617459106",
    appId: "1:661617459106:web:c2f4a57e89327af327bcfb"
};

firebase.initializeApp(firebaseConfig);

// Obtén una referencia a la base de datos Firestore
const db = firebase.firestore();

// Función para agregar el evento de clic al botón de guardar
document.querySelector('.agregar').addEventListener('click', function () {
    // Obtiene los valores de los campos de entrada
    const fechaRetiro = document.getElementById('fechaRetiro');
    const turnoRetiro = document.getElementById('turnoRetiro');
    const responsableRetiro = document.getElementById('responsableRetiro');
    const importeRetiro = document.getElementById('importeRetiro');
    const observacionesRetiro = document.getElementById('observacionesRetiro');

    // Combina fecha, turno y responsable para formar el nombre del documento
    const nombreDocumento = `${fechaRetiro.value}_${turnoRetiro.value}_${responsableRetiro.value}`;

    // Guarda los datos en la colección "retiros" en Firestore con el nombre de documento personalizado
    db.collection('retiros').doc(nombreDocumento).set({
        fecha: fechaRetiro.value,
        turno: turnoRetiro.value,
        responsable: responsableRetiro.value,
        importe: importeRetiro.value,
        observaciones: observacionesRetiro.value
    })
    .then(function() {
        console.log("Documento guardado con nombre: ", nombreDocumento);
        
        // Limpiar los campos después de guardar exitosamente
        fechaRetiro.value = '';
        turnoRetiro.value = '';
        responsableRetiro.value = '';
        importeRetiro.value = '';
        observacionesRetiro.value = '';

        // Agrega el código HTML después de guardar exitosamente
        const notificacionDiv = document.getElementById('cardOperacionExitosa');
        notificacionDiv.innerHTML = `
            <div class="linea_titulo">
                <p class="tituloCards espacio_notif1">Notificación</p>
                <img class="img_notificaciones" src="img/check.svg">
            </div>
            <p class="mensajeNotificacion espacio_notif2">El retiro se guardó correctamente.</p>
        `;
        // Puedes realizar acciones adicionales después de insertar el código
    })
    .catch(function(error) {
        console.error("Error al guardar el documento: ", error);
    });
});
