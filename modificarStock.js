// Configura tu objeto de configuración de Firebase aquí
var firebaseConfig = {
    apiKey: "AIzaSyA6pgV-xQmE8rAtzlDXtQ4FcOwPGaUwJUk",
    authDomain: "dblp-e56db.firebaseapp.com",
    projectId: "dblp-e56db",
    storageBucket: "dblp-e56db.appspot.com",
    messagingSenderId: "661617459106",
    appId: "1:661617459106:web:c2f4a57e89327af327bcfb"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Obtiene una referencia a la colección "productos"
var db = firebase.firestore();


// ...

// Evento para cargar opciones del selector cuando la página se carga
document.addEventListener("DOMContentLoaded", function() {
    var selectorProducto = document.getElementById("seleccionarProducto");

    // Consulta la colección de productos
    db.collection("productos").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var option = document.createElement("option");
            option.value = doc.id;
            option.text = doc.data().nombre || doc.id; // Use el ID si no hay nombre
            selectorProducto.appendChild(option);
        });
    }).catch(function(error) {
        console.log("Error al cargar productos:", error);
    });

    // Evento para mostrar el stockInicial cuando se seleccione un producto
    selectorProducto.addEventListener("change", function() {
        var selectedProduct = this.value;
        mostrarStockInicial(selectedProduct);
    });
});







// Función para cargar y mostrar el stockInicial
function mostrarStockInicial(productoId) {
    var productoRef = db.collection("productos").doc(productoId);

    productoRef.get().then(function(doc) {
        if (doc.exists) {
            var stockInicial = doc.data().stockInicial;
            // Muestra el stockInicial en tu página HTML como desees
            document.getElementById("stockInicial").innerHTML = "Stock Inicial: " + stockInicial;
        } else {
            console.log("No se encontró el producto con el ID proporcionado.");
        }
    }).catch(function(error) {
        console.log("Error al obtener el documento:", error);
    });
}

// Evento para cargar opciones del selector cuando la página se carga
document.addEventListener("DOMContentLoaded", function() {
    var selectorProducto = document.getElementById("seleccionarProducto");

    // Consulta la colección de productos
    db.collection("productos").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var option = document.createElement("option");
            option.value = doc.id;
            option.text = doc.data().nombre; // Suponiendo que el campo de nombre existe
            selectorProducto.appendChild(option);
        });
    }).catch(function(error) {
        console.log("Error al cargar productos:", error);
    });

    // Evento para mostrar el stockInicial cuando se seleccione un producto
    selectorProducto.addEventListener("change", function() {
        var selectedProduct = this.value;
        mostrarStockInicial(selectedProduct);
        // ...
        
        // Evento para mostrar el stockInicial cuando se seleccione un producto
        // selectorProducto.addEventListener("change", function() {
        //     var selectedProduct = this.value;
        //     mostrarStockInicial(selectedProduct);
        // });
        
        // Evento para guardar la modificación
        var guardarBoton = document.getElementById("guardarModificacion");
        guardarBoton.addEventListener("click", function() {
            var cantidadModificada = parseInt(document.getElementById("cantidadModificada").value, 10);
            if (isNaN(cantidadModificada)) {
                console.log("Ingresa una cantidad válida.");
                return;
            }
        
            var productoId = selectorProducto.value;
            var productoRef = db.collection("productos").doc(productoId);
        
            productoRef.get().then(function(doc) {
                if (doc.exists) {
                    var stockActual = doc.data().stockInicial;
                    var nuevoStock = stockActual + cantidadModificada;
        
                    // Actualiza el campo stockInicial en Firebase
                    return productoRef.update({
                        stockInicial: nuevoStock
                    }).then(function() {
                        console.log("Stock actualizado exitosamente.");
                        mostrarStockInicial(productoId);
                    }).catch(function(error) {
                        console.error("Error al actualizar el stock:", error);
                    });
                } else {
                    console.log("No se encontró el producto con el ID proporcionado.");
                }
            }).catch(function(error) {
                console.log("Error al obtener el documento:", error);
            });
        });






    });    
});    

