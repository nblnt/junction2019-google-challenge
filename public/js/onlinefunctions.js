var map;
var markers = [];
var polylines = [];
var lastData = {};
var intervals = [];
var infoWindowVisible = false;
var infoWindowContent;

var styledMapType;

function createMarker(position, infoWindowContent, markerImg){
	var marker = new google.maps.Marker({
		position: position,
		map: map,
		icon: markerImg,
		});

	markers.push(marker);

	var infoWindow = new google.maps.InfoWindow({
		content: infoWindowContent
		});

	marker.addListener('mouseover', function(){
		infoWindow.open(map,marker);
	});

	marker.addListener('mouseout', function(){
	if (infoWindowVisible == false)
		{
			infoWindow.close(map,marker);
		}
	});
}


function initMap(){
			var mapOptions = {
			zoom: 8,
			center: new google.maps.LatLng(47.72959488759143, 19.02776977281001),
			// Ez szedi ki a menüelemeket a honlapról
			disableDefaultUI: true,
			// styles: mapstyle
			mapTypeControlOptions: {
			mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
					'styled_map']
			}
        }

		var mapElement = document.getElementById('map');
		map = new google.maps.Map(mapElement, mapOptions);
		styledMapType = new google.maps.StyledMapType(
			[
				{
					"featureType": "all",
					"elementType": "labels",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						},
						{
							"color": "#efebe2"
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "all",
					"stylers": [
						{
							"color": "#efebe2"
						}
					]
				},
				{
					"featureType": "poi",
					"elementType": "all",
					"stylers": [
						{
							"color": "#efebe2"
						}
					]
				},
				{
					"featureType": "poi.attraction",
					"elementType": "all",
					"stylers": [
						{
							"color": "#efebe2"
						}
					]
				},
				{
					"featureType": "poi.business",
					"elementType": "all",
					"stylers": [
						{
							"color": "#efebe2"
						}
					]
				},
				{
					"featureType": "poi.government",
					"elementType": "all",
					"stylers": [
						{
							"color": "#dfdcd5"
						}
					]
				},
				{
					"featureType": "poi.medical",
					"elementType": "all",
					"stylers": [
						{
							"color": "#dfdcd5"
						}
					]
				},
				{
					"featureType": "poi.park",
					"elementType": "all",
					"stylers": [
						{
							"color": "#bad294"
						}
					]
				},
				{
					"featureType": "poi.place_of_worship",
					"elementType": "all",
					"stylers": [
						{
							"color": "#efebe2"
						}
					]
				},
				{
					"featureType": "poi.school",
					"elementType": "all",
					"stylers": [
						{
							"color": "#efebe2"
						}
					]
				},
				{
					"featureType": "poi.sports_complex",
					"elementType": "all",
					"stylers": [
						{
							"color": "#efebe2"
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#ffffff"
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "road.arterial",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#ffffff"
						}
					]
				},
				{
					"featureType": "road.arterial",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "road.local",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#fbfbfb"
						}
					]
				},
				{
					"featureType": "road.local",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "transit",
					"elementType": "all",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "all",
					"stylers": [
						{
							"color": "#a5d7e0"
						}
					]
				}
			],
		{name: 'Nature'});

		map.mapTypes.set('styled_map', styledMapType);
		map.setMapTypeId('styled_map');


}

function showPath(){
	polylines.forEach(function(item){
		item.setMap(map);
	});
	markers.forEach(function(item){
		item.setMap(map);
	});
}
function hidePath(){
	polylines.forEach(function(item){
		item.setMap(null);
	});
	markers.forEach(function(item){
		item.setMap(null);
	});
}

function clearMap(){
		if (markers.length > 0) {
			markers.forEach(function(item){
			item.setMap(null);
		});
		}
		if (polylines.length > 0) {
				polylines.forEach(function(item){
				item.setMap(null);
			});
		}

		markers = [];
		polylines = [];
}


function showOnlineData(data) {
	if(map){

		var center = {lat: 0, lon: 0};
		var heatmapData = [];

		var bounds = new google.maps.LatLngBounds();

		for(var i of data){
			let path = [];
			center.lat += i.lat;
			center.lon += i.lon;
			var latLng = new google.maps.LatLng(i.lat, i.lon);
			path.push(latLng);
			heatmapData.push(latLng);
			bounds.extend(latLng);
			// data[devId].positions.forEach(function(pos){
			// 	center.lat += pos.lat;
			// 	center.lon += pos.lon;
			// 	var latLng = new google.maps.LatLng(pos.lat, pos.lon);
			// 	path.push(latLng);
			// 	heatmapData.push(latLng);
			// 	bounds.extend(latLng);
			// });



			// polylines.push(new google.maps.Polyline({
			// 	path: path,
			// 	geodesic: true,
			// 	strokeColor: '#000000',
			// 	strokeOpacity: 1.0,
			// 	strokeWeight: 2
			// }));
			infoWindowContent = 'Device ID: ' + i.id;

			createMarker(path[path.length-1], infoWindowContent, 'images/map/marker-1.png');
		}

		//map.fitBounds(bounds);

		//TODO - if path enabled
		showPath();

		center.lat = center.lat/ heatmapData.length;
		center.lon = center.lon / heatmapData.length;

	}
}

function doOnlineDeviceQuery(from, to) {
	console.log(from, to);

	//TODO - handle species
	var onSuccess = function(resp, status, jqXHR){
		if(resp.success){
			clearMap();
			lastData = resp.data;
			//initTimelineIntervals(from, to);
			if(Object.keys(resp.data).length > 0){
				showOnlineData(resp.data);
			}
		}
	};
	$.ajax({
		type: "POST",
		url: '/summary/currentdevices',
		dataType: 'json',
		contentType: 'application/json',
		// data:JSON.stringify({
		// 	from: from,
		// 	to: to
		// }),
		success: onSuccess
	});
}

$(document).ready(function () {
    const animFunc = function (i) {
        //console.log($('#counter' + i + '>.counter-value'));
        $('#counter' + i + '>.counter-value').each(function () {
            $(this).prop('Counter', 0).animate({
                Counter: $(this).text()
            }, {
                duration: 1000,
                easing: 'swing',
                step: function (now) {
                    $(this).text(Math.ceil(now));
                }
            });
        })
    };

    const tickFunc = function () {
    	// map start
		let intervalEnd = Math.round(Date.now() / 1000);
		let intervalStart = /*intervalEnd - 60000;*/1500000000;
		doOnlineDeviceQuery(intervalStart, intervalEnd);
		// map end

        $.ajax({
            url: '/summary/countDevices',
            success: (resp) => {
                $('#counter1>.counter-value').text(resp.data.toString());
                animFunc(1);
            }
        });
        $.ajax({
            url: '/summary/countData',
            success: (resp) => {
                $('#counter2>.counter-value').text(resp.data.toString());
                animFunc(2);
            }
        });
        $.ajax({
            url: '/summary/currentDevices',
            success: (resp) => {
                $('#counter3>.counter-value').text(resp.data.length);
                animFunc(3);
            }
        });
    };
    tickFunc();
    setInterval(tickFunc, 10000);
});
