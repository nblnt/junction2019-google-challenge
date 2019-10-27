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
    }
    else{
        datePickerStart.style.backgroundImage = "linear-gradient(to top right, #a2d240, #1b8b00 )";
        datePickerStart.style.border = "1px solid #1b8b00";
    }
	
	var datePickerEnd = document.getElementById("datepicker2");
    if (datePickerEnd.value == "") {
        datePickerEnd.style.backgroundImage = "none";
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
			// disableDefaultUI: true,
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
	  {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
	  {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
	  {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
	  {
		featureType: 'administrative',
		elementType: 'geometry.stroke',
		stylers: [{color: '#c9b2a6'}]
	  },
	  {
		featureType: 'administrative.land_parcel',
		elementType: 'geometry.stroke',
		stylers: [{color: '#dcd2be'}]
	  },
	  {
		featureType: 'administrative.land_parcel',
		elementType: 'labels.text.fill',
		stylers: [{color: '#ae9e90'}]
	  },
	  {
		featureType: 'landscape.natural',
		elementType: 'geometry',
		stylers: [{color: '#dfd2ae'}]
	  },
	  {
		featureType: 'poi',
		elementType: 'geometry',
		stylers: [{color: '#dfd2ae'}]
	  },
	  {
		featureType: 'poi',
		elementType: 'labels.text.fill',
		stylers: [{color: '#93817c'}]
	  },
	  {
		featureType: 'poi.park',
		elementType: 'geometry.fill',
		stylers: [{color: '#a5b076'}]
	  },
	  {
		featureType: 'poi.park',
		elementType: 'labels.text.fill',
		stylers: [{color: '#447530'}]
	  },
	  {
		featureType: 'road',
		elementType: 'geometry',
		stylers: [{color: '#f5f1e6'}]
	  },
	  {
		featureType: 'road.arterial',
		elementType: 'geometry',
		stylers: [{color: '#fdfcf8'}]
	  },
	  {
		featureType: 'road.highway',
		elementType: 'geometry',
		stylers: [{color: '#f8c967'}]
	  },
	  {
		featureType: 'road.highway',
		elementType: 'geometry.stroke',
		stylers: [{color: '#e9bc62'}]
	  },
	  {
		featureType: 'road.highway.controlled_access',
		elementType: 'geometry',
		stylers: [{color: '#e98d58'}]
	  },
	  {
		featureType: 'road.highway.controlled_access',
		elementType: 'geometry.stroke',
		stylers: [{color: '#db8555'}]
	  },
	  {
		featureType: 'road.local',
		elementType: 'labels.text.fill',
		stylers: [{color: '#806b63'}]
	  },
	  {
		featureType: 'transit.line',
		elementType: 'geometry',
		stylers: [{color: '#dfd2ae'}]
	  },
	  {
		featureType: 'transit.line',
		elementType: 'labels.text.fill',
		stylers: [{color: '#8f7d77'}]
	  },
	  {
		featureType: 'transit.line',
		elementType: 'labels.text.stroke',
		stylers: [{color: '#ebe3cd'}]
	  },
	  {
		featureType: 'transit.station',
		elementType: 'geometry',
		stylers: [{color: '#dfd2ae'}]
	  },
	  {
		featureType: 'water',
		elementType: 'geometry.fill',
		stylers: [{color: '#b9d3c2'}]
	  },
	  {
		featureType: 'water',
		elementType: 'labels.text.fill',
		stylers: [{color: '#92998d'}]
	  }
	],
	{name: 'Styled Map'});
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
