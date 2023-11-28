// Configura tu aplicación de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA6pgV-xQmE8rAtzlDXtQ4FcOwPGaUwJUk",
    authDomain: "dblp-e56db.firebaseapp.com",
    projectId: "dblp-e56db",
    storageBucket: "dblp-e56db.appspot.com",
    messagingSenderId: "661617459106",
    appId: "1:661617459106:web:c2f4a57e89327af327bcfb"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Obtiene una referencia a la colección 'datos'
const db = firebase.firestore();
const datosCollection = db.collection('datos');

// Obtiene el último documento de la colección 'datos'
datosCollection.orderBy('timestamp', 'desc').limit(1).get()
    .then(snapshot => {
        if (snapshot.empty) {
            console.log('No hay documentos en la colección');
            return;
        }

        // Obtiene el primer documento (el último por fecha)
        const ultimoDocumento = snapshot.docs[0].data();

        // Inserta los campos en el div con id 'ultimo_cierre'
        const ultimoCierreDiv = document.getElementById('ultimo_cierre');
        ultimoCierreDiv.innerHTML = `
            <p>Total Ventas: ${ultimoDocumento.totalventas}</p>
            <p>Efectivo: ${ultimoDocumento.efectivo}</p>
            <p>MercadoPago: ${ultimoDocumento.mercadopago}</p>
            <p>PedidosYa: ${ultimoDocumento.pedidosya}</p>
        `;
    })
    .catch(error => {
        console.error('Error al obtener el último documento:', error);
    });
