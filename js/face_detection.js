const MODEL_URL = '/weights'

Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)]).then(face);

function face(){
    const video= document.getElementById('demo')
    video.onplay = function() {
        const canvas = faceapi.createCanvasFromMedia(video);
        //document.body.insertAdjacentElement("afterbegin", canvas);
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize)
        setInterval(async () => {
            let faceDescriptions = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            faceDescriptions = faceapi.resizeResults(faceDescriptions, displaySize)
            faceapi.draw.drawDetections(canvas, faceDescriptions)
        }, 100);
    }
}
