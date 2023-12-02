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

// Obtener una referencia a la colección "datos" en Firestore
const db = firebase.firestore();
const datosRef = db.collection("datos");
const notificacionesRef = db.collection("notificaciones");

// Función para obtener los últimos documentos y calcular la suma de totalventas
function obtenerDatosParaGrafico() {
    // Obtener los últimos 8 documentos de la colección "datos" para el gráfico
    return datosRef.orderBy("fecha", "asc").limit(8).get();
}

// Función para calcular el acumulativo intermensual
function calcularAcumulativoIntermensual(querySnapshot) {
    let acumulativoIntermensual = 0;

    querySnapshot.forEach((doc) => {
        const ventaTotal = Number(doc.data().totalventas);
        acumulativoIntermensual += isNaN(ventaTotal) ? 0 : ventaTotal;
    });

    // Mostrar el resultado en el elemento con ID "acumulativoIntermensual"
    const acumulativoIntermensualElement = document.getElementById("acumulativoIntermensual");
    acumulativoIntermensualElement.innerHTML = `
        <p class="m-0">Acumulativo intermensual</p>
        <p class="valor_gerencia">$ ${acumulativoIntermensual}</p>
    `;
}

// Función para crear el gráfico
function crearGrafico(labels, data) {
    // Crear el gráfico de barras
    const ctx = document.getElementById('miGrafico').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Ventas Totales',
                data: data,
                backgroundColor: 'orange'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Función principal para obtener y mostrar datos
function obtenerYMostrarDatos() {
    // Obtener datos para el gráfico
    obtenerDatosParaGrafico()
        .then((querySnapshot) => {
            const labels = [];
            const data = [];

            querySnapshot.forEach((doc) => {
                const fecha = doc.data().fecha;
                const ventaTotal = Number(doc.data().totalventas);

                if (!isNaN(ventaTotal)) {
                    // Cambio: Extraer solo el día de la fecha
                    const fechaCorta = new Date(fecha).toLocaleDateString('es-ES', { day: 'numeric' });
                    labels.push(fechaCorta);
                    data.push(ventaTotal);
                } else {
                    console.warn(`El documento con fecha ${fecha} tiene un valor no válido para totalventas.`);
                }
            });

            // Crear el gráfico con los últimos 8 documentos
            crearGrafico(labels, data);
        })
        .catch((error) => {
            console.error("Error al obtener datos para el gráfico: ", error);
        });

    // Obtener los últimos 30 documentos de la colección "datos" para calcular acumulativoIntermensual
    datosRef.orderBy("fecha", "asc").limit(30).get().then((querySnapshot) => {
        // Calcular el acumulativo intermensual
        calcularAcumulativoIntermensual(querySnapshot);
    }).catch((error) => {
        console.error("Error al obtener datos para acumulativoIntermensual: ", error);
    });

    // Mostrar notificaciones
    mostrarNotificaciones(notificacionesRef);
}

// Función para mostrar notificaciones
function mostrarNotificaciones(notificacionesRef) {
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
            const docId = doc.id;  // Obtenemos el ID del documento
            notificacionDiv.innerHTML = `
                <div class="linea_titulo mb-3">
                    <p class="m-0">${motivo}</p>
                    <img class="img_notificaciones" src="img/eliminar.svg" alt="" id="eliminar" data-doc-id="${docId}">
                    <img class="img_notificaciones" src="img/notificacion.svg">
                </div>
                <p>${titulo}</p>
                <p><strong>Observación:</strong> ${observacion}</p>`;

            notificacionesDiv.appendChild(notificacionDiv);
        });
    })
    .catch((error) => {
        console.error("Error al obtener notificaciones: ", error);
    });
}

// Llamamos a la función cuando la página se carga
document.addEventListener('DOMContentLoaded', () => {
    obtenerYMostrarDatos();

    // Agregamos un evento de clic al documento para capturar clics en el botón eliminar
    document.addEventListener('click', async (event) => {
        // Verificamos si el clic ocurrió en un elemento con id "eliminar"
        if (event.target.id === 'eliminar') {
            // Obtenemos el id del documento que queremos eliminar (puedes ajustar esto según tu estructura HTML)
            const docId = event.target.dataset.docId;

            // Preguntamos al usuario antes de eliminar
            const confirmarEliminar = window.confirm("¿Quieres eliminar esta notificación?");

            if (confirmarEliminar) {
                // Eliminamos el documento de la colección "notificaciones"
                await notificacionesRef.doc(docId).delete();
                console.log("Documento eliminado correctamente");

                // Actualizamos la página después de la eliminación
                obtenerYMostrarDatos();
            }
        }
    });
});
