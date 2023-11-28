// Configura tu proyecto de Firebase
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

// Obtiene una referencia a la colección de productos en Firestore
const db = firebase.firestore();
const productsCollection = db.collection("productos");

// Obtén los elementos del formulario
const form = document.getElementById("product-form");
const productoInput = document.getElementById("producto");
const categoriaInput = document.getElementById("categoria");
const unidadMedidaInput = document.getElementById("unidad-medida");
const stockInicialInput = document.getElementById("stock-inicial");
const observacionesInput = document.getElementById("observaciones");

// Agrega un evento click al botón "Guardar"
document.getElementById("guardar").addEventListener("click", () => {
    // Obtén los valores de los campos del formulario
    const producto = productoInput.value;
    const categoria = categoriaInput.value;
    const unidadMedida = unidadMedidaInput.value;
    const stockInicial = parseInt(stockInicialInput.value);
    const observaciones = observacionesInput.value;

    // Utiliza el nombre del producto como el ID del documento
    productsCollection.doc(producto).set({
        producto,
        categoria,
        unidadMedida,
        stockInicial,
        observaciones
    })
    .then(() => {
        console.log("Documento agregado con ID: ", producto);
        // Limpia el formulario después de guardar los datos
        form.reset();
    })
    .catch((error) => {
        console.error("Error al agregar documento: ", error);
    });
});



