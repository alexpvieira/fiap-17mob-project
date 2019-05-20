$(document).ready(function() {

    inicilizarComponentes()

});



function inicilizarComponentes(){

    $('#inputEmail').focus();

    $("#btLogin").click(function() {

        var email = $('#inputEmail').val();
        var password = $('#inputPassword').val();
    
        autenticar(email, password);
    
    });

    $("#btCadastrese").click(function() {

        window.location = "cadastro.html"
    
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