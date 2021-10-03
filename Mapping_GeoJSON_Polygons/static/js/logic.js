console.log("working");

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let baseMaps = {
    Streets : streets,
    "Satellite Streets" : satellite
};
//Create map object with a center and zoom level
let map = L.map('mapid', {
    center : [43.7,-79.3],
    zoom : 11,
    layers : [streets]
});

L.control.layers(baseMaps).addTo(map);

let torontoHoods = "https://raw.githubusercontent.com/freddie784/Mapping-Earthquakes/main/torontoNeighborhoods.json";

let myStyle = {
    color : "blue",
    weight : 1,
    fillColor : "yellow"
}

d3.json(torontoHoods).then(data => {
    console.log(data);
    // Creating a GeoJson Layer with data
    L.geoJson(data, {
        style: myStyle,
        onEachFeature : function(feature, layer) {
            layer.bindPopup("<h2> Neighborhood: " + feature.properties.AREA_NAME + "</h2>");
        }
    }).addTo(map);

});
