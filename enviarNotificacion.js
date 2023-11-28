// cierreTurno.js

// Inicializa Firebase y obtén una referencia a la colección "notificaciones"
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
  const notificacionesCollection = db.collection('notificaciones');
  
  // Función para enviar notificación
  function enviarNotificacion() {
    // Obtiene los valores de los campos con los IDs correspondientes
    const motivo = document.getElementById('motivo').value;
    const titulo = document.getElementById('titulo_notificacion').value;
    const observacion = document.getElementById('observacion').value;
  
    // Guarda los datos en la colección "notificaciones" como un nuevo documento
    notificacionesCollection.add({
      motivo: motivo,
      titulo: titulo,
      observacion: observacion
    })
    .then((docRef) => {
      console.log("Notificación guardada con ID: ", docRef.id);
      // Puedes agregar aquí código adicional para mostrar un mensaje de éxito o limpiar los campos del formulario.
    })
    .catch((error) => {
      console.error("Error al guardar la notificación: ", error);
      // Puedes agregar aquí código adicional para mostrar un mensaje de error.
    });
  }
  