function face(){
    const MODEL_URL = '/weights'

    Promise(faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL))
    //await faceapi.loadFaceLandmarkModel(MODEL_URL)
    //await faceapi.loadFaceRecognitionModel(MODEL_URL)
    //await faceapi.loadFaceExpressionModel(MODEL_URL)

    const video= document.getElementById('demo')
    video.onplay = function() {
        const canvas = faceapi.createCanvasFromMedia(video);
        //const canvas = faceapi.createCanvas({width: 640, height: 360});
        let container = document.querySelector(".container");
        container.append(canvas);
        //const canvas = document.getElementById("myCanvas")
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize)
        setInterval(async () => {
            let faceDescriptions = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

            faceDescriptions = faceapi.resizeResults(faceDescriptions, displaySize)
            faceapi.draw.drawDetections(canvas, faceDescriptions)
            //faceapi.draw.drawFaceLandmarks(canvas, faceDescriptions)
            //faceapi.draw.drawFaceExpressions(canvas, faceDescriptions)
        }, 100);
    }
}
face()
