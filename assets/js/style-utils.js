const styleUtils = {

    styleTime: function(time) {
        const zeros = '.00';
        const realTime = 'Närmaste timmen';

        if(typeof time === 'string' || time instanceof String) {
            return time = realTime;
        }

        if(String(time).length < 2) {
            time = zeros.slice(-1) + time + zeros;
        } else {
            time += zeros;
        }
        return time;
    },

    styleTemp: function(temp) {
        return temp = round(temp, '°C');
    },

    styleWindDirection: function(windDirection, path, imageElement) {
        const noWind = 'Vindstilla';
        const elements = [];
        let altWindDirection;
        let pointOfCompass;
        let file;

        if(windDirection === 0) {
            return noWind;
        }

        if(between(windDirection, 338, 360) || windDirection <= 23) {
            file = 'north.svg';
            altWindDirection = 'Nordlig';
            pointOfCompass = 'N';
        } else if(between(windDirection, 24, 68)) {
            file = 'north-east.svg';
            altWindDirection = 'Nordvästlig';
            pointOfCompass = 'NV';
        } else if(between(windDirection, 69, 113)) {
            file = 'east.svg';
            altWindDirection = 'Östlig';
            pointOfCompass = 'Ö';
        } else if(between(windDirection, 114, 158)) {
            file = 'south-east.svg';
            altWindDirection = 'Sydöstlig';
            pointOfCompass = 'SÖ';
        } else if(between(windDirection, 159, 203)) {
            file = 'south.svg';
            altWindDirection = 'Sydlig';
            pointOfCompass = 'S';
        } else if(between(windDirection, 204, 248)) {
            file = 'south-west.svg';
            altWindDirection = 'Sydvästlig';
            pointOfCompass = 'SV';
        } else if(between(windDirection, 249, 293)) {
            file = 'west.svg';
            altWindDirection = 'Västlig';
            pointOfCompass = 'V';
        } else if(between(windDirection, 294, 338)) {
            file = 'north-west.svg';
            altWindDirection = 'Nordvästlig';
            pointOfCompass = 'NV';
        }

        imageElement.src = path + file;
        imageElement.alt = altWindDirection + ' vind.';
        elements.push(imageElement, pointOfCompass);
        return elements;
    },

    styleWindGust: function(gust) {
        return gust = round(gust, 'm/s');
    },

    translateWeatherCode: function(weatherCode) {
        //Fraser i array 1-27 motsvarar väderkoderna som kommer i parameter weatherCode. Element 0 används
        //vid fel på väderkod.
        const weatherPhrases = ["Okänt väder", "Klart", "Mestadels klart", "Växlande molnighet", "Stackmoln", 
                "Molningt", "Täckande moln", "Dimma", "Lätta regnskurar", "Regnskurar", "Kraftiga regnskurar",
                "Åskväder", "Lätta regnskurar, snöblandade", "Snöblandade regnskurar", "Kraftiga regnskurar, snöblandade",
                "Milda snöbyar", "Snöbyar", "Kraftiga snöbyar", "Lätt regn", "Regn", "Skyfall", "Åska", "Lätt regn, snöblandat",
                "Snöblandat regn", "Kraftigt regn, snöblandat", "Lätt snöfall", "Snöfall", "Kraftigt snöfall"]

        let phrase = "";
        if(Number.isNaN(weatherCode) || weatherCode <= 0 || weatherCode > weatherPhrases.length - 1) {
            phrase = weatherPhrases[0];
        } else {
            phrase = weatherPhrases[weatherCode];
        }
        return phrase;
    }
};


function between(x, min, max) {
    return ((x-min)*(x-max) <= 0);
}


function round(value, unit) {
    value = Math.round(value);
    return String(value + ' ' + unit);
}



export { styleUtils as su };
