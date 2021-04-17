const { createCanvas, loadImage } = require('canvas');
const weather = require('./weatherdata');
const canvas = createCanvas(240, 416); //w and h must be factors of 4 
const ctx = canvas.getContext('2d');
const chunksize = 6240;

let symbolmap;

//--------- init draw -------------------------
ctx.translate(0, 416);
ctx.rotate(-Math.PI / 2);

//load image(s) -------------------------------
loadImage("graphics/symbols_white_backgr_2bit.png").then((image) => {
    symbolmap = image;            
});

//export --------------------------------------
let bitmap = {   
    
    getImageChunk: function(chunkNum, weatherData, grey = false, error = false) {

        if (error) {
            drawErrorMsg();
        }
        else {
            drawData(weatherData);
        }        

        let buf = canvas.toBuffer('raw');
        let grey8 = to8bitGrey(buf);
        let grey2 = to2bitGrey(grey8);
        let b_w_1 = to1bit_b_w(grey8);
        let chunk;
        
        if (grey) chunk = getChunk(grey2, chunkNum);
        else chunk = getChunk(b_w_1, chunkNum);
                          
        return chunk;        
        //return '<img src="' + canvas.toDataURL() + '" />';        
    }
};

//---------------------------------------------
function drawData(weatherdata) {

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 416, 240);

    let x1 = weatherdata[0].symbol.u; let y1 = weatherdata[0].symbol.v; //tid 1
    let x2 = weatherdata[1].symbol.u; let y2 = weatherdata[1].symbol.v; //tid 2
    let x3 = weatherdata[2].symbol.u; let y3 = weatherdata[2].symbol.v; //tid 3
    
    let w_h = 170; //total bredde/høyde på hvert symbol
    let w_h_clip = 130; //bredde/høyde tegnet i canvas (klippet)

    //skillelinjer
    ctx.moveTo(139, 20); ctx.lineTo(139, 220); //416 / 3 = 139
    ctx.moveTo(277, 20); ctx.lineTo(277, 220);
    ctx.stroke(); 
    
    //symbols
    ctx.drawImage(symbolmap, w_h * x1 + 30, w_h * y1 + 35, w_h_clip, w_h_clip,   5, 15, w_h_clip, w_h_clip);
    ctx.drawImage(symbolmap, w_h * x2 + 30, w_h * y2 + 35, w_h_clip, w_h_clip, 145, 15, w_h_clip, w_h_clip);
    ctx.drawImage(symbolmap, w_h * x3 + 30, w_h * y3 + 35, w_h_clip, w_h_clip, 285, 15, w_h_clip, w_h_clip);
        
    let mid1 = 70; let mid2 = 209; let mid3 = 348;

    //text - time - nedbør
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "black";

    let txt1 = weatherdata[0].time + "h - " + weatherdata[0].precipt + " mm/h";
    let txt2 = weatherdata[1].time + "h - " + weatherdata[1].precipt + " mm/h";
    let txt3 = weatherdata[2].time + "h - " + weatherdata[2].precipt + " mm/h";

    ctx.fillText(txt1, mid1 - ctx.measureText(txt1).width / 2 , 28);
    ctx.fillText(txt2, mid2 - ctx.measureText(txt2).width / 2 , 28);
    ctx.fillText(txt3, mid3 - ctx.measureText(txt3).width / 2 , 28);

    //text - temperature
    ctx.font = "32px sans-serif";
    txt1 = weatherdata[0].temp + " °C";
    txt2 = weatherdata[1].temp + " °C";
    txt3 = weatherdata[2].temp + " °C";

    ctx.fillText(txt1, mid1 - ctx.measureText(txt1).width / 2 , 165);
    ctx.fillText(txt2, mid2 - ctx.measureText(txt2).width / 2 , 165);
    ctx.fillText(txt3, mid3 - ctx.measureText(txt3).width / 2 , 165);

    //text - wind
    ctx.font = "16px sans-serif";
    txt1 = weatherdata[0].winddir + " " + weatherdata[0].windspeed + " m/s";
    txt2 = weatherdata[1].winddir + " " + weatherdata[1].windspeed + " m/s";
    txt3 = weatherdata[2].winddir + " " + weatherdata[2].windspeed + " m/s";

    ctx.fillText(txt1, mid1 - ctx.measureText(txt1).width / 2 , 200);
    ctx.fillText(txt2, mid2 - ctx.measureText(txt2).width / 2 , 200);
    ctx.fillText(txt3, mid3 - ctx.measureText(txt3).width / 2 , 200);
    
    //text - humidity
    txt1 = weatherdata[0].hum + " %";
    txt2 = weatherdata[1].hum + " %";
    txt3 = weatherdata[2].hum + " %";

    ctx.fillText(txt1, mid1 - ctx.measureText(txt1).width / 2 , 220);
    ctx.fillText(txt2, mid2 - ctx.measureText(txt2).width / 2 , 220);
    ctx.fillText(txt3, mid3 - ctx.measureText(txt3).width / 2 , 220);
}

//------------------------------------------------
function drawErrorMsg() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 416, 240);
    let txt = "No weather data!";
    ctx.fillStyle = "white";
    ctx.font = "28px sans-serif";
    ctx.fillText(txt, 208 - ctx.measureText(txt).width / 2 , 130);
}

//------------------------------------------------
function getChunk(arr, n) {
    let start = chunksize * n;
    let end = start + chunksize;
    return arr.slice(start, end);
}

//------------------------------------------------
function to2bitGrey(arr) {  
    
    let grey2bit = [];
    let val;
    
    for (let i = 4; i <= arr.length; i++) {                

        if (i % 4 == 0) {

            let byte = 0;

            val = from8to2bit(arr[i-4]);
            byte = byte | val;
            byte = byte << 2;

            val = from8to2bit(arr[i-3]);
            byte = byte | val;
            byte = byte << 2;

            val = from8to2bit(arr[i-2]);
            byte = byte | val;
            byte = byte << 2;

            val = from8to2bit(arr[i-1]);
            byte = byte | val;
            
            grey2bit.push(byte);
        }
    }

    return grey2bit;
}

//------------------------------------------------
function to1bit_b_w(arr) {  
    
    let b_w_2bit = [];
    let val;
    
    for (let i = 8; i <= arr.length; i++) {                

        if (i % 8 == 0) {

            let byte = 0;

            val = from8to1bit(arr[i-8]);
            byte = byte | val;
            byte = byte << 1;

            val = from8to1bit(arr[i-7]);
            byte = byte | val;
            byte = byte << 1;

            val = from8to1bit(arr[i-6]);
            byte = byte | val;
            byte = byte << 1;

            val = from8to1bit(arr[i-5]);
            byte = byte | val;
            byte = byte << 1;

            val = from8to1bit(arr[i-4]);
            byte = byte | val;
            byte = byte << 1;

            val = from8to1bit(arr[i-3]);
            byte = byte | val;
            byte = byte << 1;

            val = from8to1bit(arr[i-2]);
            byte = byte | val;
            byte = byte << 1;

            val = from8to1bit(arr[i-1]);
            byte = byte | val;
            
            b_w_2bit.push(byte);
        }
    }

    return b_w_2bit;
}

//-------------------------------------------------
function from8to2bit(val) {
    if (val < 64) return 0;  //00
    if (val < 128) return 1; //01
    if (val < 192) return 2; //10
    return 3;                //11
}

//-------------------------------------------------
function from8to1bit(val) {
    if (val < 128) return 0;  //0    
    return 1;                 //1
}

//------------------------------------------------
function to8bitGrey(buf) {

    let i = 0;
    let sum = 0;

    let grey8bit = [];
    
    for (let i = 4; i <= buf.byteLength; i++) {            
        
        if (i % 4 == 0) { 
            
            sum += buf[i - 4];
            sum += buf[i - 3];
            sum += buf[i - 2];

            grey8bit.push(Math.round(sum / 3));
            sum = 0;       
            
        }        
    }

    return grey8bit;
}

//------------------------------------------------



module.exports = bitmap;