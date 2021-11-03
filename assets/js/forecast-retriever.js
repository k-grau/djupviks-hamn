import { fu } from './forecast-utils.js';

 const forecastRetriever = {
     getForecast: function(url) {
         return new Promise ((resolve) => {
             fetch(url)
             .then((response) => {
                 return response.json();
             })
             .then(data => {
                 resolve(parseData(data));
             })
             .catch((error) => {
                 alert('Kunde inte hämta väderdata. Fel: ' + error);
             });
         });
     }
 };


 function parseData(data) {
        let date = 0;
        const now = 'now';
        let period = now;
        const times = fu.getForecastTimes(data.timeSeries[0].validTime);
        const parsedData = {now: [], today: [], tomorrow: []};

        for(let i = 1; i < times.length; i++) {
            const currentDate = parseInt(times[i].split('T')[0].split('-').join(''));
            const forecastObj = {time: "", temp: "", windDirection: "", windGust: "", conditions: ""};

            if(date === 0 && i > 1){
                date = currentDate;
                period = 'today';
            } else if (date != 0 && currentDate > date) {
                date = currentDate;
                period = 'tomorrow';
            }

            forecastObj.time = times[0] + parseInt(times[i].split('T')[1]
                        .split(':').join('').slice(0, -5));

             data.timeSeries.map(ts => {
                    if(ts.validTime === times[i]) {
                        ts.parameters.map(param => {
                            if(param.name === 't') {
                                forecastObj.temp = param.values[0];
                            }

                            if(param.name === 'wd') {
                                forecastObj.windDirection = param.values[0];
                            }

                            if(param.name === 'gust') {
                                forecastObj.windGust = param.values[0];
                            }

                            if(param.name === 'Wsymb2') {
                                forecastObj.conditions = param.values[0];
                            }
                        });
                    }
                });

                if(period === 'now') {
                    parsedData.now.push(forecastObj);
                } else if(period === "today"){
                    parsedData.today.push(forecastObj);
                } else {
                    parsedData.tomorrow.push(forecastObj);
                }
            parsedData.now[0].time = now;
        }
        return parsedData;
 }

export { forecastRetriever as fr }
