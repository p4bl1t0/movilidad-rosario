var reference = [];
fetch('densidad_santafe.geojson') // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json())
    .then(function (geojsonFeature) {
        console.log(geojsonFeature);
        var myLayer = L.geoJSON(geojsonFeature, {
            style: function (feature) {
                return {
                    color: feature.properties.color,
                    fill: feature.properties.color,
                    'fill-opacity': 0.9
                }
            }
        }).addTo(map);
    })
    .catch(function () {
        // This is where you run code if the server returns any errors
    });

fetch('paradas_tup.geojson') // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json())
    .then(function (geojsonFeature) {
        console.log(geojsonFeature);

        var markers = L.markerClusterGroup({
            maxClusterRadius: 50,
            iconCreateFunction: function (cluster) {
                var childCount = cluster.getChildCount();

                var c = ' marker-cluster-';
                if (childCount < 10) {
                    c += 'small';
                } else if (childCount < 100) {
                    c += 'medium';
                } else {
                    c += 'large';
                }

                return new L.DivIcon({
                    html: '<div><span>' + childCount + '</span></div>',
                    className: 'marker-cluster paradas_tup' + c,
                    iconSize: new L.Point(25, 25)
                });
            },
            spiderfyOnMaxZoom: false,
            showCoverageOnHover: true,
            zoomToBoundsOnClick: false,
            singleMarkerMode: true
        });

        var myLayer = L.geoJSON(geojsonFeature);

        markers.addLayer(myLayer);
        map.addLayer(markers);
    })
    .catch(function () {
        // This is where you run code if the server returns any errors
    });


fetch('ventas_tup.geojson') // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json())
    .then(function (geojsonFeature) {
        console.log(geojsonFeature);

        var markers = L.markerClusterGroup({
            maxClusterRadius: 50,
            iconCreateFunction: function (cluster) {
                var childCount = cluster.getChildCount();

                var c = ' marker-cluster-';
                if (childCount < 20) {
                    c += 'small';
                } else if (childCount < 50) {
                    c += 'medium';
                } else {
                    c += 'large';
                }

                return new L.DivIcon({
                    html: '<div><span>' + childCount + '</span></div>',
                    className: 'marker-cluster ventas_tup' + c,
                    iconSize: new L.Point(25, 25)
                });
            },
            spiderfyOnMaxZoom: false,
            showCoverageOnHover: true,
            zoomToBoundsOnClick: false,
            singleMarkerMode: true
        });

        var myLayer = L.geoJSON(geojsonFeature);

        markers.addLayer(myLayer);
        map.addLayer(markers);
    })
    .catch(function () {
        // This is where you run code if the server returns any errors
    });

var map = L.map('mapid').setView([-32.945946, -60.651812], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);