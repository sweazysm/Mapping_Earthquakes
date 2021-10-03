console.log("working");

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey
});

let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: apiKey
});

let baseMaps = {
    Streets : streets,
    "Satellite Streets" : satellite
};
//Create map object with a center and zoom level
let map = L.map('mapid', {
    center : [39.5, -98.5],
    zoom : 3,
    layers : [streets]
});

L.control.layers(baseMaps).addTo(map);

let earthQuakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

let myStyle = {
    color : "blue",
    weight : 1,
    fillColor : "yellow"
}

d3.json(earthQuakeData).then(data => {
    console.log(data);
    // Creating a GeoJson Layer with data
    L.geoJson(data, {
        style: myStyle,
        onEachFeature : function(feature, layer) {
            layer.bindPopup();
        }
    }).addTo(map);

});