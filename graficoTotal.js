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

// Inicializa Firestore
const db = firebase.firestore();

// Obtén una referencia al elemento select y al canvas
const selectMes = document.getElementById('mes');
const canvas = document.getElementById('graficoVentas');
const ctx = canvas.getContext('2d');

// Función para llenar el select con opciones de meses
async function fillMonthsSelect() {
    try {
        // Consulta Firestore para obtener los meses disponibles
        const querySnapshot = await db.collection('datos').get();

        const meses = new Set();

        querySnapshot.forEach(doc => {
            const data = doc.data();
            const fechaString = data.fecha;
            const fecha = fechaString ? new Date(fechaString) : null;

            // Verifica si fecha es un objeto Date válido
            if (fecha instanceof Date && !isNaN(fecha)) {
                const mes = fecha.getMonth() + 1; // Los meses comienzan desde 0 en JavaScript
                meses.add(mes);
            } else {
                console.error('Fecha no es un objeto Date válido:', fechaString);
            }
        });

        // Ordena los meses de forma ascendente
        const sortedMeses = Array.from(meses).sort((a, b) => a - b);

        sortedMeses.forEach(mes => {
            const option = document.createElement('option');
            option.value = mes;
            option.text = getNombreMes(mes);
            selectMes.appendChild(option);
        });
    } catch (error) {
        console.error('Error al consultar Firestore:', error);
    }
}

// Función para obtener el nombre del mes
function getNombreMes(numeroMes) {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[numeroMes - 1];
}

// Función para actualizar el gráfico
function updateChart(labels, ventasData) {
    // Destruye el gráfico existente si existe
    if (window.myChart) {
        window.myChart.destroy();
    }

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Ventas por fecha',
                data: ventasData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    // Asigna el gráfico a la variable global
    window.myChart = myChart;
}

// Llama a la función para llenar el select al cargar la página
window.onload = async function () {
    await fillMonthsSelect();
};

// Escucha el evento de cambio en el select
selectMes.addEventListener('change', async () => {
    const selectedMonth = parseInt(selectMes.value, 10); // Parsea el valor como entero

    try {
        // Consulta Firestore para obtener los datos filtrados
        const querySnapshot = await db.collection('datos')
            .where('fecha', '>=', new Date(2023, selectedMonth - 1, 1)) // Resta 1 al mes para ajustar
            .where('fecha', '<', new Date(2023, selectedMonth, 1))    // Resta 1 al mes para ajustar
            .get();

        // Procesa los datos para el gráfico
        const labels = [];
        const ventasData = [];

        querySnapshot.forEach(doc => {
            const data = doc.data();
            const fechaString = data.fecha;
            const fecha = fechaString ? new Date(fechaString) : null;

            // Verifica si fecha es un objeto Date válido
            if (fecha instanceof Date && !isNaN(fecha)) {
                labels.push(fecha.toLocaleDateString());

                // Accede al campo totalventas correctamente
                const totalVentas = typeof data.totalventas === 'number' ? data.totalventas : 0;
                ventasData.push(totalVentas);
            } else {
                console.error('Fecha no es un objeto Date válido:', fechaString);
            }
        });

        // Actualiza el gráfico utilizando Chart.js
        updateChart(labels, ventasData);
    } catch (error) {
        console.error('Error al consultar Firestore:', error);
    }
});
