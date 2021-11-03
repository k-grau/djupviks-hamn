const forecastUtils = {

    getForecastTimes: function (timeNow) {
        const dates = getDates();
        let today = "";
        const tomorrow = dates.dateTomorrow;
        const defaultTimes = ['T05:00:00Z', 'T11:00:00Z', 'T17:00:00Z'];
        const daylightSavingTimes = ['T04:00:00Z', 'T10:00:00Z', 'T16:00:00Z'];
        let timeStamps = defaultTimes;
        let forecastTimes = [];
        let timeDifference = 1;

        if(dates.localDay <= dates.utcDay) {
            today = dates.dateToday;
        } else {
            today = dates.utcYesterDay;
        }

        if(dates.currentTimezoneoffset < dates.defaultTimezoneOffset) {
            timeDifference = 2;
            timeStamps = daylightSavingTimes;
        }

        forecastTimes = createForecastTimes(timeStamps, today, tomorrow);
        forecastTimes.unshift(timeDifference, timeNow);
        return forecastTimes;
    }
};


function createForecastTimes(timeStamps, today, tomorrow) {
    let forecastArray = []
    for(let i = 0; i < timeStamps.length*2; i++) {
        if(i < timeStamps.length) {
            forecastArray.push(today + timeStamps[i]);
        } else {
            forecastArray.push(tomorrow + timeStamps[i-timeStamps.length]);
        }
    }
    return forecastArray;
}


function getDates() {
    const dates = {};
    const dateToday = new Date();
    const dateTomorrow = new Date();
    const dateYesterday = new Date();

    dateTomorrow.setDate(dateTomorrow.getDate() +1);
    dateYesterday.setDate(dateYesterday.getDate() -1);

    dates.localDay = parseInt(dateToday.toLocaleString('sv-SE').split(' ')[0].split('-').join(''));
    dates.utcDay = parseInt(dateToday.toISOString().split('T')[0].split('-').join(''));
    dates.defaultTimezoneOffset = -60;
    dates.currentTimezoneoffset = dateToday.getTimezoneOffset();
    dates.dateToday = dateToday.toLocaleString('sv-SE').split(' ')[0];
    dates.dateTomorrow = dateTomorrow.toLocaleString('sv-SE').split(' ')[0];
    dates.utcYesterDay = dateYesterday.toISOString().split('T')[0];

    return dates;
}


export { forecastUtils as fu };
