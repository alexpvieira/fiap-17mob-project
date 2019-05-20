$(document).ready(function() {

    inicilizarComponentes()

});



function inicilizarComponentes(){

    $('#inputName').focus();

    $("#btCadastrar").click(function() {

        var email = $('#inputEmail').val();
        var password = $('#inputPassword').val();
        var name = $('#inputName').val();
        var lastName = $('#inputLastName').val();
        cadastrarUsuario(name, lastName,email,password)
    
    });

}

function autenticar(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function() {
            window.location = "inicio.html";
        })
        .catch(function(error) {
            console.error(error);
            alert("Anderson " + error);
        });
}