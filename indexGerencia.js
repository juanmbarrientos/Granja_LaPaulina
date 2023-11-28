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

// Función para obtener los últimos documentos y mostrar notificaciones
function obtenerYMostrarDatos() {
    // Obtener los últimos 30 documentos de la colección "datos" y calcular la suma de totalventas
    datosRef.orderBy("fecha", "asc").limit(30).get().then((querySnapshot) => {
        let acumulativoIntermensual = 0;
        const labels = [];
        const data = [];

        querySnapshot.forEach((doc) => {
            const fecha = doc.data().fecha;
            const ventaTotal = Number(doc.data().totalventas);

            if (!isNaN(ventaTotal)) {
                labels.push(fecha);
                data.push(ventaTotal);
            } else {
                console.warn(`El documento con fecha ${fecha} tiene un valor no válido para totalventas.`);
            }

            acumulativoIntermensual += isNaN(ventaTotal) ? 0 : ventaTotal;
        });

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

        // Mostrar el resultado en el elemento con ID "acumulativoIntermensual"
        const acumulativoIntermensualElement = document.getElementById("acumulativoIntermensual");
        acumulativoIntermensualElement.innerHTML = `
            <p class="m-0">Acumulativo intermensual</p>
            <p class="valor_gerencia">$ ${acumulativoIntermensual}</p>
        `;

        // Mostrar notificaciones
        mostrarNotificaciones(notificacionesRef);

        // Mostrar el resultado en el elemento con ID "resultado_ultimaVenta"
        const resultadosUltimaVenta = document.getElementById("resultado_ultimaVenta");

        querySnapshot.forEach((doc) => {
            const totalVentas = doc.data().totalventas;
            const fecha = doc.data().fecha;
            const turno = doc.data().turno;

            // Mostrar los valores en el div "resultados_ultimaVenta"
            resultadosUltimaVenta.innerHTML = `
                <p class="m-0">Última venta ${fecha} ${turno}</p>
                <p class="valor_gerencia">$ ${totalVentas}</p>
            `;
        });
    })
    .catch((error) => {
        console.error("Error al obtener datos: ", error);
    });
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
