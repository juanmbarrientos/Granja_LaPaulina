const firebaseConfig = {
    apiKey: "AIzaSyA6pgV-xQmE8rAtzlDXtQ4FcOwPGaUwJUk",
    authDomain: "dblp-e56db.firebaseapp.com",
    projectId: "dblp-e56db",
    storageBucket: "dblp-e56db.appspot.com",
    messagingSenderId: "661617459106",
    appId: "1:661617459106:web:c2f4a57e89327af327bcfb"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var usuariosRef = db.collection("usuarios");

document.getElementById("ingresar").addEventListener("click", function() {
    var usuario = document.getElementById("user").value;
    var password = document.getElementById("password").value;

    usuariosRef.where("user", "==", usuario).where("password", "==", password)
        .get()
        .then(function(querySnapshot) {
            if (!querySnapshot.empty) {
                var rol = querySnapshot.docs[0].data().rol;

                switch (rol) {
                    case "empleado":
                        window.location.href = "indexEmpleado.html";
                        break;
                    case "gerencia":
                        window.location.href = "indexGerencia.html";
                        break;
                    case "admin":
                        window.location.href = "indexAdmin.html";
                        break;
                    default:
                        window.location.href = "pagina_por_defecto.html";
                }
            } else {
                document.getElementById("mensaje").innerHTML = "Usuario o contraseña incorrectos.";
            }
        })
        .catch(function(error) {
            console.error("Error al buscar en la base de datos: ", error);
        });
});
