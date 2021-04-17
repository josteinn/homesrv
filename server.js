const express = require('express');
const cors = require('cors'); //when the clients aren't on the server
const bitmap = require('./bitmapdata.js');
const weather = require('./weatherdata.js');
const app = express(); //server-app

// middleware ------------------------------------
app.use(cors()); //allow all CORS requests
app.use(express.json()); //for extracting json in the request-body
app.use('/', express.static('client')); //for serving client files

// endpoint GET ----------------------------------
app.get('/chunk/:num', async function (req, res) {    
    
    console.log("request: " + new Date().toLocaleTimeString());
    
    chunkNum = req.params["num"];
    let weatherData = await weather.getData();
    let chunk;
    if (weatherData != 0) {  
        chunk = bitmap.getImageChunk(chunkNum, weatherData, false, false); //false = b/w, true = 2bit grey, error = false        
    }
    else {
        chunk = bitmap.getImageChunk(chunkNum, weatherData, false, true); //error = true
    }

    res.status(200).send(chunk.toString() + ","); //send response
    //res.status(200).send(chunk); //send response   
});

// start server -----------------------------------
var port = process.env.PORT || 80;
app.listen(port, '192.168.0.121', function () {
    console.log('Server listening on port 80!');
});
