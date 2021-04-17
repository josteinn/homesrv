
const got = require('got');

let weather = {     
    
    getData: async function() {

        let rnd1 = Math.floor(Math.random() * 10);
        let rnd2 = Math.floor(Math.random() * 10);
        nocacheURL = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=58.34' + rnd1 + '&lon=8.52' + rnd2 + '&altitude=6';

        try {
            const response = await got(nocacheURL, {responseType: "json"}); //landvik målestasjon

            if (response.statusCode == 200) {
                return parse(response.body);
            }
            else return 0;             

        } catch (error) {
            return 0;
        }

                
    }    
};

function parse(data) {    

    let t1 = data.properties.timeseries[2]; // + 2 timer
    let t2 = data.properties.timeseries[6]; // + 6 timer
    let t3 = data.properties.timeseries[10]; // + 10 timer

    return [
        {
            time: new Date(t1.time).toTimeString().substr(0, 2), 
            symbol: getSymbol(t1.data.next_1_hours.summary.symbol_code),
            precipt: t1.data.next_1_hours.details.precipitation_amount,
            temp: t1.data.instant.details.air_temperature,
            hum: t1.data.instant.details.relative_humidity,
            winddir: toTextWindDir(t1.data.instant.details.wind_from_direction),
            windspeed: t1.data.instant.details.wind_speed
        },
        {
            time: new Date(t2.time).toTimeString().substr(0, 2), 
            symbol: getSymbol(t2.data.next_1_hours.summary.symbol_code),
            precipt: t2.data.next_1_hours.details.precipitation_amount,
            temp: t2.data.instant.details.air_temperature,
            hum: t2.data.instant.details.relative_humidity,
            winddir: toTextWindDir(t2.data.instant.details.wind_from_direction),
            windspeed: t2.data.instant.details.wind_speed
        },
        {
            time: new Date(t3.time).toTimeString().substr(0, 2), 
            symbol: getSymbol(t3.data.next_1_hours.summary.symbol_code),
            precipt: t3.data.next_1_hours.details.precipitation_amount,
            temp: t3.data.instant.details.air_temperature,
            hum: t3.data.instant.details.relative_humidity,
            winddir: toTextWindDir(t3.data.instant.details.wind_from_direction),
            windspeed: t3.data.instant.details.wind_speed
        }
    ];
}

function toTextWindDir(angle) {
    if (typeof angle == "number") {
        if (angle >= 337.5 || angle < 22.5) return "N";
        if (angle >= 22.5 && angle < 67.5) return "NE";
        if (angle >= 67.5 && angle < 112.5) return "E";
        if (angle >= 112.5 && angle < 157.5) return "SE";
        if (angle >= 157.5 && angle < 202.5) return "S";
        if (angle >= 202.5 && angle < 247.5) return "SW";
        if (angle >= 247.5 && angle < 292.5) return "W";
        if (angle >= 292.5 && angle < 337.5) return "NW";
    }
    else return "-";
}

// symbols ---------------------------------------
function getSymbol(code) {
    if (code === "clearsky_day")                    return getImage(0, 0);
    if (code === "cloudy")                          return getImage(0, 4);    
    if (code === "fair_day")                        return getImage(1, 0);    
    if (code === "fog")                             return getImage(15, 3);
    if (code === "heavyrain")                       return getImage(3, 4);
    if (code === "heavyrainandthunder")             return getImage(12, 4);
    if (code === "heavyrainshowers_day")            return getImage(5, 0);
    if (code === "heavyrainshowersandthunder_day")  return getImage(14, 0);
    if (code === "heavysleet")                      return getImage(6, 4);
    if (code === "heavysleetandthunder")            return getImage(15, 4);
    if (code === "heavysleetshowers_day")           return getImage(8, 0);    
    if (code === "heavysleetshowersandthunder_day") return getImage(1, 1);
    if (code === "heavysnow")                       return getImage(9, 4);
    if (code === "heavysnowandthunder")             return getImage(2, 5);
    if (code === "heavysnowshowers_day")            return getImage(11, 0);
    if (code === "heavysnowshowersandthunder_day")  return getImage(4, 1);
    if (code === "lightrain")                       return getImage(1, 4);
    if (code === "lightrainandthunder")             return getImage(10, 4);
    if (code === "lightrainshowers_day")            return getImage(3, 0);
    if (code === "lightrainshowersandthunder_day")  return getImage(12, 0);
    if (code === "lightsleet")                      return getImage(4, 4);
    if (code === "lightsleetandthunder")            return getImage(13, 4);
    if (code === "lightsleetshowers_day")           return getImage(6, 0);
    if (code === "lightsnow")                       return getImage(7, 4);
    if (code === "lightsnowandthunder")             return getImage(0, 5);
    if (code === "lightsnowshowers_day")            return getImage(9, 0);
    if (code === "lightssleetshowersandthunder_day") return getImage(15, 0);
    if (code === "lightssnowshowersandthunder_day") return getImage(2, 1);
    if (code === "partlycloudy_day")                return getImage(2, 0);
    if (code === "rain")                            return getImage(2, 4);
    if (code === "rainandthunder")                  return getImage(11, 4);
    if (code === "rainshowers_day")                 return getImage(4, 0);
    if (code === "rainshowersandthunder_day")       return getImage(13, 0);
    if (code === "sleet")                           return getImage(5, 4);
    if (code === "sleetandthunder")                 return getImage(14, 4);
    if (code === "sleetshowers_day")                return getImage(7, 0);
    if (code === "sleetshowersandthunder_day")      return getImage(0, 1);
    if (code === "snow")                            return getImage(8, 4);
    if (code === "snowandthunder")                  return getImage(1, 5);
    if (code === "snowshowers_day")                 return getImage(10, 0);
    if (code === "snowshowersandthunder_day")       return getImage(3, 1);    
    //********    
    if (code === "clearsky_night")                  return getImage(10, 2);
    if (code === "fair_night")                      return getImage(11, 2);
    if (code === "heavyrainshowers_night")          return getImage(15, 2);
    if (code === "heavyrainshowersandthunder_night") return getImage(8, 3);
    if (code === "heavysleetshowers_night")         return getImage(2, 3);
    if (code === "heavysleetshowersandthunder_night") return getImage(11, 3);
    if (code === "heavysnowshowers_night")          return getImage(5, 3);
    if (code === "heavysnowshowersandthunder_night") return getImage(14, 3);
    if (code === "lightrainshowers_night")          return getImage(13, 2);
    if (code === "lightrainshowersandthunder_night") return getImage(6, 3);
    if (code === "lightsleetshowers_night")         return getImage(0, 3);
    if (code === "lightsnowshowers_night")          return getImage(3, 3);
    if (code === "lightssleetshowersandthunder_night") return getImage(9, 3);
    if (code === "lightssnowshowersandthunder_night") return getImage(12, 3);
    if (code === "partlycloudy_night")              return getImage(12, 2);
    if (code === "rainshowers_night")               return getImage(14, 2);
    if (code === "rainshowersandthunder_night")     return getImage(7, 3);
    if (code === "sleetshowers_night")              return getImage(1, 3);
    if (code === "sleetshowersandthunder_night")    return getImage(10, 3);
    if (code === "snowshowers_night")               return getImage(4, 3);
    if (code === "snowshowersandthunder_night")     return getImage(13, 3);
    return getImage(3, 5);
    
}
  //----------------------------------------------
  function getImage(x, y) {
    
    let uv = {
        u: x,
        v: y
    };

      return uv;
  }

//------------------------------------------------

module.exports = weather;