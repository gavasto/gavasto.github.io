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
        const canvas = $('#reflay').get(0)
        var context = canvas.getContext("2d")
        faceapi.matchDimensions(canvas, video)

        faceDescriptions = faceapi.resizeResults(faceDescriptions, video)
        faceapi.draw.drawDetections(context, faceDescriptions)
        faceapi.draw.drawFaceLandmarks(context, faceDescriptions)
        faceapi.draw.drawFaceExpressions(context, faceDescriptions)

    }
    
    face()
})