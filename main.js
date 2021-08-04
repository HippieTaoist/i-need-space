let apiKey = document.getElementById('api-key');
let address = document.getElementById('address');
let norad = document.getElementById('norad');
let searchButton = document.getElementById('search');
let satLat = 0;
let satLon = 0;



async function getMapboxLocate() {
    console.log('getMapboxLocate Runs');
    let request = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + address.value + '.json?access_token=' + apiKey.value);
    let requestData = await request.json();

    console.log('requestData', requestData)
    setAddressLonLog(requestData)
        .then(function () {
            console.log(satLat);
            console.log(satLon);
        })
    return requestData
}



async function getSatelliteLocate(lon, lat, passes, days, visibility) {


}

async function setAddressLonLog(dataObj) {
    // // Get the address of the input
    // let request = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + address.value + '.json?access_token=' + apiKey.value);
    // let requestData = await request.json();
    console.log(dataObj);
    // requestData now has arrays and information attached to it
    satLon = dataObj.features[0].center[0]
    satLat = dataObj.features[0].center[1];
    console.log(satLat);
    console.log(satLon);
}

getMapboxLocate()

searchButton.addEventListener('click', function () {
    getMapboxLocate()
    console.log(satLat);
    console.log(satLon);
})