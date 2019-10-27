var map;
var markers = [];
var polylines = [];
var heatmap;

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

function initMap(){
	//TODO - set global map
}
function clearMap(){
	//TODO - clear all map data (setMap(null) + empty globals)
}
function showData(data){
	clearMap();
	//TODO - show data on map
}

function doDeviceQuery(from, to, species){
	console.log(from, to, species);
	
	//TODO - handle species
	/*showSpinner();
	$.ajax({
		type: "POST",
		url: '/search/structured',
		data:{
			from: from,
			to: to
		},
		success: function(resp, status, jqXHR){
			hideSpinner;()
			if(resp.success && Object.keys(resp.data).length > 0){
				showData(resp.data);
			}
		}
	});*/

function onSearchClick(){
	var datePickerStart = document.getElementById("datepicker1");
	var datePickerEnd = document.getElementById("datepicker2");
	if(datePickerStart.value !== "" && datePickerEnd.value !== ""){
		var selectedSpecies = [];
		//TODO - get selectedSpecies
		var timestampStart = Math.round(new Date(datePickerStart.value) / 1000);
		var timestampEnd = Math.round(new Date(datePickerEnd.value) / 1000);
		doDeviceQuery(timestampStart,timstampEnd, selectedSpecies);
	}
}



