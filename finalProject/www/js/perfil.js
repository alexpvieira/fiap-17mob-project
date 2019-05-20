var dataUser;
$(document).ready(function() {
    buscarIdUsuario()
    inicializarComponents()
});


function inicializarComponents(){
    $("#btAlterar").click(function() {
        uploadFirebase();
    });
}

function buscarIdUsuario(){

    waitingDialog.show('Loading...');
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            buscandoDadosUsuario(user.uid);
        } else {
            waitingDialog.hide();
        }
    });

}

function buscandoDadosUsuario(userId) {

    firebase.database().ref('Usuario/' + userId).once('value').then(function(snapshot) {
        if (snapshot.val() !== null) {
            dataUser = snapshot.val()
            inserirDados(dataUser)
            waitingDialog.hide();
        } else {
            waitingDialog.hide();
            alert("erro ao buscar usuario");
        }
    });
}

function inserirDados(user) {
    $('#inputName').val(user.nome);
    $('#inputLastName').val(user.sobrenome);
}

function uploadFirebase() {
    
    waitingDialog.show('Salvando aguarde...', {
        dialogSize: 'm',
        progressType: 'success'
    });
    setTimeout(function() {
        waitingDialog.hide();
    }, 2000);

    var image = document.getElementById("image").src;

    if (image.indexOf('base64') !== -1) {
        var teste = image.indexOf('base64');
        var filename = firebase.auth().currentUser.uid + "_avatar.jpg";
        var file = dataURLtoFile(image, filename);

        var metadata = {
            contentType: file.type
        };

        var uploadTask = storageRef.child('images/' + filename).put(file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            function(error) {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            function() {
                // Upload completed successfully, now we can get the download URL
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {

                    console.log('File available at', downloadURL);

                    saveBaseFirebase(downloadURL);

                });
            });
    } else {
        saveBaseFirebase();
    }
}

function saveBaseFirebase(downloadURL) {
    
    var name = $('#inputName').val();
    var lastName = $('#inputLastName').val();

    var email = dataUser.email;
    var avatar = "";

    if (dataUser && dataUser.avatar) {
        avatar = dataUser.avatar;
    }

    if (downloadURL) {
        avatar = downloadURL;
    }

   
            firebase.database().ref('Usuario/' + firebase.auth().currentUser.uid).set({
                nome: name,
                email: email,
                sobrenome : lastName,
                avatar:avatar
              },function(error) {
                if (error) {
                  alert("erro: " + error);
                } else {
                    alert("alterou com sucesso")
                }
              });

}

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[0],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
        type: mime
    });
}