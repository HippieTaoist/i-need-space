let apiKey = document.getElementById('api-key');
let address = document.getElementById('address');
let norad = document.getElementById('norad');
let searchButton = document.getElementById('search');
let myLocationButton = document.getElementById('my-location');

// Satelitte API Variables
let satLat = 0;
let satLon = 0;
let passes = 1;
let days = 10;
let visibilityOnly = false;

// Post to screen Variables
let satRiseTime = '';
let satSetTime = '';
let satCulmTime = '';
let satTravelledTime = 0;
let isSunOut = false;

// function to get coordinates of inputted location
async function getMapboxLocate() {
    console.log('getMapboxLocate Runs');
    let request = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + address.value + '.json?access_token=' +
        apiKey.value);
    let requestData = await request.json();
    setAddressLonLog('getMapboxLocate', requestData)
        .then(function () {
            getSatelliteLocate(norad.value, satLat, satLon, passes, days, visibilityOnly)
        })

}

// function to use current position
function fromMyCoords() {
    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        let crd = pos.coords;
        console.log(pos)
        console.log(`Latitude : ${crd.latitude}`);
        satLat = crd.latitude
        console.log(`Longitude: ${crd.longitude}`);
        satLon = crd.longitude
        console.log(`More or less ${crd.accuracy} meters.`);
        setAddressLonLog('fromMyCoords', crd)
            .then(function () {
                getSatelliteLocate(norad.value, satLat, satLon, passes, days, visibilityOnly)
            })
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}

// set the rise and fall values of satellites based on input from user
async function getSatelliteLocate(satID, lat, lon, passes, days, visibility) {
    console.log('getSatelliteLocate Runs')

    // call data from server with parameters and user input
    let request = await fetch('https://satellites.fly.dev/passes/' + satID + '?lat=' + lat + '&lon=' + lon + '&limit=' +
        passes + '&days=' + days + '&visible_only=' + visibility)
    let requestData = await request.json();
    console.log(requestData)

    // set variables to match incoming data
    satRiseTime = requestData[0].rise.utc_datetime
    satSetTime = requestData[0].set.utc_datetime;
    satCulmTime = requestData[0].culmination.utc_datetime;
    satTravelledTime = requestData[0].set.utc_timestamp - requestData[0].rise.utc_timestamp;
    isSunOut = requestData[0].rise.visible;

    let isSunoutText = sunnySide(isSunOut)

    // present data broken down to user
    alert('Satelitte Events / Times for Satelitte ' + satID + '\n' +
        'Satelitte Rise Time: ' + satRiseTime.slice(0, 16) + '\n' +
        'Satelitte Culmination/Zenith Time: ' + satCulmTime.slice(0, 16) + '\n' +
        'Satelitte Set Time: ' + satSetTime.slice(0, 16) + '\n' +
        'Is Occuring ' + isSunoutText + '\n' +
        'Viewable Time In Sky: ' + Math.ceil(satTravelledTime / 60) + ' mins');


}

async function setAddressLonLog(caller, dataObj) {

    if (caller === 'getMapboxLocate') {

        // Get the address of the input
        let request = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + address.value +
            '.json?access_token=' + apiKey.value);
        // let requestData = await request.json();
        console.log(dataObj);
        // requestData now has arrays and information attached to it
        satLon = dataObj.features[0].center[0];
        satLat = dataObj.features[0].center[1];
        console.log(satLat);
        console.log(satLon);
    }
    if (caller === 'fromMyCoords') {
        satLat = dataObj.latitude
        satLon = dataObj.longitude
        console.log(satLat);
        console.log(satLon);
    }
}

function sunnySide(truth) {
    if (truth === true) {
        return "While Sun Is Up"
    } else {
        return "While Sun Is Down"
    }
}

searchButton.addEventListener('click', function () {
    getMapboxLocate()
    console.log(satLat);
    console.log(satLon);
})


myLocationButton.addEventListener('click', function () {
    fromMyCoords()
})

// $('.alert').alert()
// $().alert('close')

// Jusdt plaaying around

let issImgButton = document.getElementById('space-station-button')
let issNum = document.getElementById('ISS#');

issImgButton.addEventListener('click', function () {
    norad.value = Number(issNum.innerText)
    fromMyCoords();
})






let hubImgButton = document.getElementById('hubble-space-telescope-button')
let hubNum = document.getElementById('hubble#');

hubImgButton.addEventListener('click', function () {
    norad.value = Number(hubNum.innerText)
    fromMyCoords();
})

let spaceDragonImgButton = document.getElementById('space-x-dragon')
let spaceDragonNum = document.getElementById('spaceDragon#');

spaceDragonImgButton.addEventListener('click', function () {
    norad.value = Number(spaceDragonNum.innerText)
    fromMyCoords();
})