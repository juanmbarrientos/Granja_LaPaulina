// Configura la conexión a tu proyecto de Firebase
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

// Obtén una referencia a la base de datos de Firestore
const db = firebase.firestore();

// Obtén una referencia al elemento HTML donde deseas insertar los datos
const contenedorVentas = document.querySelector('.contenedor_ventas');

// Consulta los datos en Firebase
db.collection('datos').orderBy('fecha', 'desc').get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Obtiene los datos de cada documento
            const fecha = doc.data().fecha;
            const turno = doc.data().turno;
            const totalventas = doc.data().totalventas;
            const efectivo = doc.data().efectivo; // Asumiendo que existe un campo efectivo en tu documento
            const mercadopago = doc.data().mercadopago; // Asumiendo que existe un campo mercadopago en tu documento
            const pedidosya = doc.data().pedidosya; // Asumiendo que existe un campo pedidosya en tu documento

            // Crea una nueva card_ventas por cada registro
            const nuevaCard = document.createElement('div');
            nuevaCard.classList.add('card_ventas');

            // Inserta los datos en los elementos HTML correspondientes de la nueva card_ventas
            nuevaCard.innerHTML = `
                <h2 class="titulo_cards">${fecha} ${turno}</h2>
                <h2 class="valor_venta">$ ${totalventas}</h2>
            `;

            // Agrega un evento de clic a cada card_ventas
            nuevaCard.addEventListener('click', () => {
                // Almacena los datos en localStorage al hacer clic
                localStorage.setItem('fecha', fecha);
                localStorage.setItem('turno', turno);
                localStorage.setItem('totalventas', totalventas);
                localStorage.setItem('efectivo', efectivo);
                localStorage.setItem('mercadopago', mercadopago);
                localStorage.setItem('pedidosya', pedidosya);

                // Redirige a la página venta_seleccionada.html
                window.location.href = 'venta_seleccionada.html';
            });

            // Agrega la nueva card_ventas al contenedor
            contenedorVentas.appendChild(nuevaCard);
        });
    })
    .catch((error) => {
        console.error("Error al obtener datos: ", error);
    });
