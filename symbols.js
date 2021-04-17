
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
  //--------------------------------
  function getImage(x, y) {


      return 0;
  }