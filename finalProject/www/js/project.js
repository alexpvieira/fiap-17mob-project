var db;
var realTime;
var storage;
var storageRef;
$(document).ready(function() {


    const firebaseConfig = {
        apiKey: "AIzaSyA14Ib8uFziobwod2eCQhZ_Tk5Rq8bGEAc",
        authDomain: "projetofiap-36b95.firebaseapp.com",
        databaseURL: "https://projetofiap-36b95.firebaseio.com",
        projectId: "projetofiap-36b95",
        storageBucket: "projetofiap-36b95.appspot.com",
        messagingSenderId: "5882206993",
        appId: "1:5882206993:web:47ca6c381d5d5378"
    };

    var app = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore(app);
    storage = firebase.storage();
    storageRef = storage.ref();
    realTime = firebase.database();

});


function cadastrarUsuario(name, lastName, email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function() {

            firebase.database().ref('Usuario/' + firebase.auth().currentUser.uid).set({
                nome: name,
                email: email,
                sobrenome : lastName
              },function(error) {
                if (error) {
                  alert("erro: " + error);
                } else {
                    window.location = "inicio.html";
                }
              });

        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(error);
            // ...
        });
}
