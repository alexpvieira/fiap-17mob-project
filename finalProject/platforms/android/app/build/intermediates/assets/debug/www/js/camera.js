var app = {
    initialize: function() {
        document.addEventListener('deviceready', () => {
            console.log(navigator.camera);
        }, false);
    }
};

document.getElementById('gallery').addEventListener('click', () => {
    let options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        targetWidth: 720,
        correctOrientation: true,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    }

    takePicture(options)
})

document.getElementById('image').addEventListener('click', () => {
    let options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        targetWidth: 720,
        correctOrientation: true
    }

    takePicture(options)
})

var takePicture = (options) => {
    navigator.camera.getPicture((image_data) => {

            var image = document.getElementById('image');
            image.src = "data:image/jpeg;base64," + image_data;
        },
        (error) => {
            console.log(error)
        }, options)
}

app.initialize();