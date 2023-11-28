// Configurar la aplicación Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA6pgV-xQmE8rAtzlDXtQ4FcOwPGaUwJUk",
    authDomain: "dblp-e56db.firebaseapp.com",
    projectId: "dblp-e56db",
    storageBucket: "dblp-e56db.appspot.com",
    messagingSenderId: "661617459106",
    appId: "1:661617459106:web:c2f4a57e89327af327bcfb"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Obtener una referencia a la colección "notificaciones" en Firestore
const db = firebase.firestore();
const notificacionesRef = db.collection("notificaciones");

// Función para obtener los documentos y mostrar notificaciones
function obtenerYMostrarNotificaciones() {
    notificacionesRef.get().then((querySnapshot) => {
        const notificacionesDiv = document.getElementById('notificaciones');

        // Limpiamos el contenido actual del div
        notificacionesDiv.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const motivo = doc.data().motivo;
            const titulo = doc.data().titulo;
            const observacion = doc.data().observacion;

            // Creamos un elemento div para mostrar la información y lo agregamos al div con id "notificaciones"
            const notificacionDiv = document.createElement('div');
            notificacionDiv.innerHTML = `<p><strong>Motivo:</strong> ${motivo}</p>
                                          <p><strong>Título:</strong> ${titulo}</p>
                                          <p><strong>Observación:</strong> ${observacion}</p>
                                          <hr>`;
            notificacionesDiv.appendChild(notificacionDiv);
        });
    })
    .catch((error) => {
        console.error("Error al obtener notificaciones: ", error);
    });
}

// Llamamos a la función cuando la página se carga
document.addEventListener('DOMContentLoaded', obtenerYMostrarNotificaciones);
