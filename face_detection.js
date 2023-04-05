import * as faceapi from 'face-api.js';
    
    async function face(){
        
        const MODEL_URL = '/weights'

        await faceapi.loadTinyFaceDetectorModel(MODEL_URL)
        //await faceapi.loadFaceLandmarkModel(MODEL_URL)
        //await faceapi.loadFaceRecognitionModel(MODEL_URL)
        //await faceapi.loadFaceExpressionModel(MODEL_URL)

        const video = document.getElementById('demo')
        video.onplay = function() {
            const canvas = faceapi.createCanvasFromMedia(video);
            //const canvas = document.getElementById("myCanvas")
            setInterval(async () => {
                let faceDescriptions = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
                //var context = canvas.getContext("2d")
                faceapi.matchDimensions(canvas, video)
    
                faceDescriptions = faceapi.resizeResults(faceDescriptions, video)
                faceapi.draw.drawDetections(canvas, faceDescriptions)
                //faceapi.draw.drawFaceLandmarks(canvas, faceDescriptions)
                //faceapi.draw.drawFaceExpressions(canvas, faceDescriptions)
            }, 100);
        }
    }
    face()
