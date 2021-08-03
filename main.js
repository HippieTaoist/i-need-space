let api = document.getElementById('api-key');
let address = document.getElementById('address');
let norad = document.getElementById('norad');
let searchButton = document.getElementById('search')




async function getMapboxLocate() {
    let request = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/-73.989,40.733.json?access_token=pk.eyJ1IjoiaGlwcGlldGFvaXN0IiwiYSI6ImNrcndlaTVpbDAyZngydXBrOTVhNGh0enUifQ.797HJKCR1juYl6NueiTKGw&print=pretty");
    let requestData = await request.json();
    console.log(requestData);
}

getMapboxLocate()

async function getSatelliteLocate(lon, lat, passes, days, visibility) {


}

// function getAddress(address) {
//     console.log(address.innerText)
// }

searchButton.addEventListener('click', function () {
    console.log(address.value)

    getAddress()
})