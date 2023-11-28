// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA6pgV-xQmE8rAtzlDXtQ4FcOwPGaUwJUk",
    authDomain: "dblp-e56db.firebaseapp.com",
    projectId: "dblp-e56db",
    storageBucket: "dblp-e56db.appspot.com",
    messagingSenderId: "661617459106",
    appId: "1:661617459106:web:c2f4a57e89327af327bcfb"
};
  
firebase.initializeApp(firebaseConfig);
  
// Referencia a la colección de productos
const productosCollection = firebase.firestore().collection('productos');

document.addEventListener('DOMContentLoaded', () => {
    // Obtén la referencia al contenedor donde mostrarás las cards
    const cardsContainer = document.getElementById('cards-container', 'col', 'col-6');
    cardsContainer.classList.add('d-flex');    // cardsContainer.classList.add('my.');
    // cardsContainer.classList.add('bg-warning');
  
    // Obtén los datos de la colección de productos
    productosCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const producto = doc.data();
  
            // Crea una card para cada producto
            const card = document.createElement('div');
            card.classList.add('card-cuerpo', 'card-body','m-4', 'col-md-2');
  
            // Agrega el nombre del producto
            const nombreProducto = document.createElement('h2');
            nombreProducto.textContent = producto.producto;
            nombreProducto.classList.add('titulo_card');
            card.appendChild(nombreProducto);
  
            // Agrega el stock inicial
            const stockInicial = document.createElement('p');
            stockInicial.classList.add('stock_card');
            stockInicial.textContent = `Stock inicial: ${producto.stockInicial}`;
            card.appendChild(stockInicial);
  
            // Agrega el botón de vender
            const venderButton = document.createElement('button');
            venderButton.classList.add('btn', 'btn-primary');
            venderButton.textContent = 'Vender';
            venderButton.addEventListener('click', () => {
                // Agrega tu lógica para vender el producto aquí
                console.log(`Vendiendo ${producto.nombre}`);
            });
            card.appendChild(venderButton);
  
            // Agrega la card al contenedor
            cardsContainer.appendChild(card);
        });
    });
});
