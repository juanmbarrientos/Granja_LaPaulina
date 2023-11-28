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

// Función guardar el registro
function guardarRegistro() {
    // Obtiene los valores de los campos del formulario
    const fecha = document.getElementById("fecha_").value;
    const turno = document.getElementById("turno_").value;
    const efectivo = parseFloat(document.getElementById("efectivo_").value.replace("$", "")) || 0;
    const mercadopago = parseFloat(document.getElementById("mercadopago_").value.replace("$", "")) || 0;
    const pedidosya = parseFloat(document.getElementById("pedidosya_").value.replace("$", "")) || 0;
    const totalVentas = parseFloat(document.getElementById("totalVentas_").value.replace("$", "")) || 0;
    const nombreDocumento = `${fecha}_${turno}`;

    // Guardar datos en Firebase con el nombre del documento como el valor de la fecha
    db.collection("datos").doc(nombreDocumento).set({
        fecha: fecha,
        turno: turno,
        efectivo: efectivo,
        mercadopago: mercadopago,
        pedidosya: pedidosya,
        totalventas: totalVentas,
    })
    .then(() => {
        alert("Datos guardados con éxito");
        // Llama a la función para mostrar los datos
        mostrarDatosGuardados(); 
    })
    .catch((error) => {
        alert("Hubo un error al guardar los datos");
    });
}

// Limpiar los campos del formulario después de guardar
function limpiarCampos() {
    document.getElementById("fecha_").value = "";
    document.getElementById("turno_").value = "Seleccione su turno";
    document.getElementById("efectivo_").value = "";
    document.getElementById("mercadopago_").value = "";
    document.getElementById("pedidosya_").value = "";
    document.getElementById("totalVentas_").value = "";
}

// Agrega el signo $ a los campos correspondientes
function agregarSimboloDolar(input) {
    const valor = input.value;
    if (valor !== "" && !valor.startsWith("$")) {
        input.value = "$" + valor;
    }
}

// Función para sumar los valores y mostrar el resultado en el campo "Total Ventas"
function sumarYMostrarTotal() {
    // Obtener los valores de los campos
    const efectivo = parseFloat(document.getElementById("efectivo_").value.replace("$", "")) || 0;
    const mercadopago = parseFloat(document.getElementById("mercadopago_").value.replace("$", "")) || 0;
    const pedidosya = parseFloat(document.getElementById("pedidosya_").value.replace("$", "")) || 0;

    // Sumar los valores
    const totalVentas = efectivo + mercadopago + pedidosya;

    // Mostrar el resultado en el campo "Total Ventas" con el símbolo "$"
    document.getElementById("totalVentas_").value = "$" + totalVentas.toFixed(2);
}

// Llama a la función al cargar la página y cada vez que se cambia un valor en los campos de entrada
window.onload = function () {
    sumarYMostrarTotal();

    const camposMonto = document.querySelectorAll(".form-control");
    camposMonto.forEach(function (campo) {
        campo.addEventListener("input", sumarYMostrarTotal);
    });
};

// MOSTRAR LOS DATOS QUE SE GUARDARON
function mostrarDatosGuardados() {
    const datosGuardadosDiv = document.getElementById("datosGuardados");
    const resultadoDiv = document.getElementById("resultado");

    // Recupera los datos guardados, puedes cambiar esto según cómo estés almacenando los datos.
    const fecha = document.getElementById("fecha_").value;
    const turno = document.getElementById("turno_").value;
    const efectivo = document.getElementById("efectivo_").value;
    const mercadopago = document.getElementById("mercadopago_").value;
    const pedidosya = document.getElementById("pedidosya_").value;
    const totalVentas = document.getElementById("totalVentas_").value;

    // Construye un mensaje con los datos y muestre en el div.
    const mensaje = `
    <h2>Datos guardados con éxito</h2>
        Fecha: ${fecha}<br>
        Turno: ${turno}<br>
        Efectivo: ${efectivo}<br>
        MercadoPago: ${mercadopago}<br>
        Pedidos Ya: ${pedidosya}<br>
        Total Ventas: ${totalVentas}<br>
    `;
    resultadoDiv.innerHTML = mensaje;

    // Muestra el div de datos guardados.
    datosGuardadosDiv.style.display = "block";

    // Limpia los campos después de mostrar los datos guardados
    limpiarCampos();
}
