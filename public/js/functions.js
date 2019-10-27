var map;
var markers = [];
var polylines = [];
var heatmap;
var zoomFrom = 8;
var zoomTo = 14;

var styledMapType;

function checkDatepicker(){
	var datePickerStart = document.getElementById("datepicker1");
    if (datePickerStart.value == "") {
		datePickerStart.style.backgroundImage = "none";
		datePickerStart.style.border = "1px solid #bebebe";
    }
    else{
        datePickerStart.style.backgroundImage = "linear-gradient(to top right, #a2d240, #1b8b00 )";
        datePickerStart.style.border = "1px solid #1b8b00";
    }
	
	var datePickerEnd = document.getElementById("datepicker2");
    if (datePickerEnd.value == "") {
		datePickerEnd.style.backgroundImage = "none";
		datePickerEnd.style.border = "1px solid #bebebe";
    }
    else{
        datePickerEnd.style.backgroundImage = "linear-gradient(to top right, #a2d240, #1b8b00 )";
        datePickerEnd.style.border = "1px solid #1b8b00";
    }
}
function showSpinner(){
	//TODO
}
function hideSpinner(){
	//TODO
}

function showHeatMap(){
	heatmap.setMap(map);
}
function hideHeatMap(){
	heatmap.setMap(null);
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
		if (heatmap) {
			//Ennen a működése kérdőjeles
			heatmap.setMap(null);
		}

		markers = [];
		polylines = [];
		heatmap = null;
}
function showData(data){
	if(map){
		var center = {lat: 0, lon: 0};
		var heatmapData = [];

		var bounds = new google.maps.LatLngBounds();

		for(var devId in data){
			let path = [];
			data[devId].positions.forEach(function(pos){
				center.lat += pos.lat;
				center.lon += pos.lon;
				var latLng = new google.maps.LatLng(pos.lat, pos.lon);
				path.push(latLng);
				heatmapData.push(latLng);
				bounds.extend(latLng);
			});

			
			
			polylines.push(new google.maps.Polyline({
				path: path,
				geodesic: true,
				strokeColor: '#000000',
				strokeOpacity: 1.0,
				strokeWeight: 2
			}));
			markers.push(new google.maps.Marker({
				position: path[path.length-1],
				title: devId + '-' + data[devId].group + '-'+ data[devId].species
				}));
		}
		
		map.fitBounds(bounds);
		
		//TODO - if path enabled
		showPath();
				
		center.lat = center.lat/ heatmapData.length;
		center.lon = center.lon / heatmapData.length;
				
			

		heatmap = new google.maps.visualization.HeatmapLayer({
			data: heatmapData
		});
			
		//TODO - if heatmap enabled
		showHeatMap();
				
	}
}

function doDeviceQuery(from, to, species){
	console.log(from, to, species);
	
	//TODO - handle species
	showSpinner();
	
	if(!species ||species.length === 0){
		$.ajax({
			type: "POST",
			url: '/search/structured',
			dataType: 'json',
			contentType: 'application/json',
			data:JSON.stringify({
				from: from,
				to: to
			}),
			success: function(resp, status, jqXHR){
				hideSpinner();
				if(resp.success){
					clearMap();
					if(Object.keys(resp.data).length > 0){
						showData(resp.data);	
					}
				}
			}
		});
	}
	else {
	
		$.ajax({
			type: "POST",
			url: '/search/byspecies',
			dataType: 'json',
			contentType: 'application/json',
			data:JSON.stringify({
				from: from,
				to: to,
				species: species
			}),
			success: function(resp, status, jqXHR){
				hideSpinner();
				if(resp.success){
					clearMap();
					if(Object.keys(resp.data).length > 0){
						showData(resp.data);	
					}
				}
			}
		});
	}
}

function onSearchClick(){
	var datePickerStart = document.getElementById("datepicker1");
	var datePickerEnd = document.getElementById("datepicker2");
	if(datePickerStart.value !== "" && datePickerEnd.value !== ""){
		var selectedSpecies = [];
		//TODO - get selectedSpecies
		if(document.getElementById("checkboxOne").checked){
			selectedSpecies.push("dog");
		}
		if(document.getElementById("checkboxTwo").checked){
			selectedSpecies.push("duck");
		}
		if(document.getElementById("checkboxThree").checked){
			selectedSpecies.push("peacock");
		}
		if(document.getElementById("checkboxFour").checked){
			selectedSpecies.push("unicorn");
		}
		var timestampStart = Math.round(new Date(datePickerStart.value) / 1000);
		var timestampEnd = Math.round(new Date(datePickerEnd.value) / 1000);
		doDeviceQuery(timestampStart,timestampEnd, selectedSpecies);
	}
}
