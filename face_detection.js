import * as faceapi from 'face-api.js';

$(document).ready(function(){    
    async function face(){
        
        const MODEL_URL = '/weights'

        await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
        await faceapi.loadFaceLandmarkModel(MODEL_URL)
        await faceapi.loadFaceRecognitionModel(MODEL_URL)
        await faceapi.loadFaceExpressionModel(MODEL_URL)

        const video= document.getElementById('demo')
        let faceDescriptions = await faceapi.detectAllFaces(video)
        const canvas = document.getElementById("mycanvas")
        var context = canvas.getContext("2d")
        faceapi.matchDimensions(canvas, video)

        faceDescriptions = faceapi.resizeResults(faceDescriptions, video)
        faceapi.draw.drawDetections(canvas, faceDescriptions)
        faceapi.draw.drawFaceLandmarks(canvas, faceDescriptions)
        faceapi.draw.drawFaceExpressions(canvas, faceDescriptions)

    }
    
    face()
})