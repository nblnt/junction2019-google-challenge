// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);


var infoWindowVisible = false;
// A térképen a vonalak kordinátáit meghatározó tömb
var flightPlanCoordinates = [];
var contentOnMapOn =false;
var flightPath;
var markers = [];
var map; // init soránn adunk neki értéket
// Új mapstyleket lehet találni a Snazzy mapsen
var mapstyle = [
    {
        "featureType": "landscape",
        "stylers": [
            {
                "hue": "#FFA800"
            },
            {
                "saturation": 0
            },
            {
                "lightness": 0
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.highway",
        "stylers": [
            {
                "hue": "#53FF00"
            },
            {
                "saturation": -73
            },
            {
                "lightness": 40
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "stylers": [
            {
                "hue": "#FBFF00"
            },
            {
                "saturation": 0
            },
            {
                "lightness": 0
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "hue": "#00FFFD"
            },
            {
                "saturation": 0
            },
            {
                "lightness": 30
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "hue": "#00BFFF"
            },
            {
                "saturation": 6
            },
            {
                "lightness": 8
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "hue": "#679714"
            },
            {
                "saturation": 33.4
            },
            {
                "lightness": -25.4
            },
            {
                "gamma": 1
            }
        ]
    }
]
// A végleges adatsémána megfelelő adatokat tartalmaz
var mytestArray = [
    {"id":"48158452","timestamp":1564801230,"lat":47.72959488759143,"lon":19.02776977281001},{"id":"48158452","timestamp":1564804830,"lat":47.739659386165115,"lon":19.030907661510987},{"id":"48158452","timestamp":1564808430,"lat":47.74175587546106,"lon":19.032953734928607},{"id":"48158452","timestamp":1564812030,"lat":47.742667966288586,"lon":19.045513275290773},{"id":"48158452","timestamp":1564815630,"lat":47.73869201465132,"lon":19.04492168103377},{"id":"48158452","timestamp":1564819230,"lat":47.73694036539414,"lon":19.042296152494515},{"id":"48158452","timestamp":1564822830,"lat":47.73373216273866,"lon":19.027099369156225},{"id":"48158452","timestamp":1564826430,"lat":47.72071562740161,"lon":19.025512204221566},{"id":"48158452","timestamp":1564830030,"lat":47.728779879043294,"lon":19.036978227908935},{"id":"48158452","timestamp":1564833630,"lat":47.72782532074745,"lon":19.034409854050757},{"id":"48158452","timestamp":1564837230,"lat":47.7236334969239,"lon":19.040222981611023},{"id":"48158452","timestamp":1564840830,"lat":47.730228583411936,"lon":19.0440517271767},{"id":"48158452","timestamp":1564844430,"lat":47.73765487441754,"lon":19.042105476205542},{"id":"48158452","timestamp":1564848030,"lat":47.730070152428105,"lon":19.05022981797199},{"id":"48158452","timestamp":1564851630,"lat":47.72752124990383,"lon":19.060605356523652},{"id":"48158452","timestamp":1564855230,"lat":47.72870980925277,"lon":19.068413332679718},{"id":"48158452","timestamp":1564858830,"lat":47.72711078688009,"lon":19.070642692866965},{"id":"48158452","timestamp":1564862430,"lat":47.72028357930515,"lon":19.07751174888201},{"id":"48158452","timestamp":1564866030,"lat":47.72016976949044,"lon":19.06691294754601},{"id":"48158452","timestamp":1564869630,"lat":47.72908650666125,"lon":19.07229949104032},{"id":"48158452","timestamp":1564873230,"lat":47.72330555318579,"lon":19.066007632128023},

    // {"id":"15646632","timestamp":1565276430,"lat":-4.46515325552255,"lan":-49.41055113212618},{"id":"15646632","timestamp":1565280030,"lat":-4.474553333653485,"lan":-49.41980963808415},{"id":"15646632","timestamp":1565283630,"lat":-4.471230354078427,"lan":-49.40792730375819},{"id":"15646632","timestamp":1565287230,"lat":-4.4741933142518775,"lan":-49.41685353273307},{"id":"15646632","timestamp":1565290830,"lat":-4.479808571465266,"lan":-49.407458453404615},{"id":"15646632","timestamp":1565294430,"lat":-4.488720557214608,"lan":-49.39185291746216},{"id":"15646632","timestamp":1565298030,"lat":-4.472442473089166,"lan":-49.383509394202704},{"id":"15646632","timestamp":1565301630,"lat":-4.483187130284019,"lan":-49.368323163043236},{"id":"15646632","timestamp":1565305230,"lat":-4.492890092752227,"lan":-49.37804198494527},{"id":"15646632","timestamp":1565222430,"lat":-4.485226829662452,"lan":-49.37966960028894},{"id":"15646632","timestamp":1565312430,"lat":-4.491072274878023,"lan":-49.366487492057175},{"id":"15646632","timestamp":1565316030,"lat":-4.482483005500676,"lan":-49.36570975941046},{"id":"15646632","timestamp":1565319630,"lat":-4.487818368367437,"lan":-49.36142432872902},{"id":"15646632","timestamp":1565323230,"lat":-4.492489069219292,"lan":-49.37371659706051},{"id":"15646632","timestamp":1565326830,"lat":-4.493173782514032,"lan":-49.364838385576874},{"id":"15646632","timestamp":1565330430,"lat":-4.47718485562366,"lan":-49.35514275540678},{"id":"15646632","timestamp":1565334030,"lat":-4.4772991760870875,"lan":-49.357370284290845},{"id":"15646632","timestamp":1565337630,"lat":-4.47178576754125,"lan":-49.37538543864535},{"id":"15646632","timestamp":1565341230,"lat":-4.478566777718639,"lan":-49.37867568122006},{"id":"15646632","timestamp":1565344830,"lat":-4.466034372964161,"lan":-49.38845458015853},{"id":"15646632","timestamp":1565348430,"lat":-4.477186149853665,"lan":-49.405277540242075},{"id":"15646632","timestamp":1565352030,"lat":-4.46207346582561,"lan":-49.41284236260508},{"id":"15646632","timestamp":1565355630,"lat":-4.46194695531084,"lan":-49.41080219867698},{"id":"15646632","timestamp":1565359230,"lat":-4.478754934266869,"lan":-49.406862762739195},{"id":"15646632","timestamp":1565362830,"lat":-4.464569976251663,"lan":-49.412117418928325},{"id":"15646632","timestamp":1565366430,"lat":-4.471979280888269,"lan":-49.42306010649386},
]

// Függvény ami inicializálja a térképet az oldalon
function init() {
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
    };
    var mapElement = document.getElementById('map');
    map = new google.maps.Map(mapElement, mapOptions);
    
}


// ---------------------------------------
//FÜGGVÉNY DEFÍNÍCIÓK
// ---------------------------------------

//Legenerál a térképre a myLat, mylong kordinátákkal. A felugró infoWindow tartalma a myContent lesz. A myMap pedig a map
function generateMarker(myLat, myLng, myContent, myMap, myPic){

    var marker = new google.maps.Marker({
    position: {lat:myLat, lng:myLng},
    map: myMap,
    icon: myPic,
    });

    markers.push(marker);

    var infoWindow = new google.maps.InfoWindow({
    content: myContent
    });

    marker.addListener('mouseover', function(){
        infoWindow.open(myMap,marker);
});

    marker.addListener('mouseout', function(){
    if (infoWindowVisible == false)
        {
            infoWindow.close(myMap,marker);
        }
});
}

//Legenerálja a mi adatsémánk felépítése szerint érkező adatokat
function setAllMarkers(props){
    for (var i = 0; i < props.length; i++) {

      

        switch(i) {
            case 0:
                generateMarker(props[0].lat, props[0].lon, 'DeviceID: ' + props[0].id, map, "Images/map/moose_start.png")
              break;
            case (props.length-1):
                last = props.length-1
                generateMarker(props[last].lat, props[last].lon,'DeviceID: ' +  props[last].id, map, "Images/map/moose_end.png")
              break;
            default:
                var date = new Date(props[i].timestamp*1000);
                var year = date.getFullYear();
                var month = date.getMonth()+1;
                if (month<10) {
                  month = "0" + month;
                }
                var day = date.getDay();
                if (day<10) {
                  day = "0" + day;
                }
                var hour = date.getHours();
                if (hour<10) {
                  hour = "0" + hour;
                }
                var minute = date.getMinutes();
                if (minute<10) {
                  minute = "0" + minute;
                }
                var second = date.getSeconds();
                if (second<10) {
                  second = "0" + second;
                }

              //  var year =  date.getFullYear();
              //   var month = date.getMonth()+1;
              //   var day = date.getDate();
              //   var hour = date.getHours();
              //   var minute = date.getMinutes();
              //   var second = date.getSeconds();
                

                actTimeStamp = year + "." + month + "." + day + " " + hour + ":" + minute + ":" + second;
              
                generateMarker(props[i].lat, props[i].lon, 'Registry time: ' + actTimeStamp, map, "Images/map/infoPoint.png");
          }
    }
    


}

//Az alábbi KÉT függvény törli ki az összes markert a térképről
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

function clearMarkers() {
    setMapOnAll(null);
  }

  // Az alábbi függvény rajzolja ki a térképre a markerek összekötését
  function drawLine(props){
    flightPlanCoordinates = [];
      for (var i = 0; i < props.length; i++) {
        flightPlanCoordinates.push(
            {"lat": props[i].lat, "lng":props[i].lon}
        )
          
      }

      flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#898989',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });


      flightPath.setMap(map);


  }

  //Az alábbi függvény tünteti el a vonalakat a térképről
  function removeLine() {
    flightPath.setMap(null);
    
  }

  // A markerek és útvonal felhelyezése a térképre
  function addMapItems(props, zoomFrom, zoomTo){
      if (!contentOnMapOn) {
        setAllMarkers(props);
        drawLine(props);
        contentOnMapOn = true;

        var newCenter = calculateCenter(props);
        centerAndZoom(newCenter.lat,newCenter.lng, zoomFrom, zoomTo);


      }

  }

// A markerek és útvonal levétele a térképről
function removeMapItems(){
    if (contentOnMapOn) {
        clearMarkers();
        removeLine();
        contentOnMapOn = false;
    }

}

// Ez a függvény a szükséges helyhez viszi a térkép középpontját és belezoomol
//zoom értékei min: 1-től, max:14-ig mehetnek 
function centerAndZoom(myLat,myLng, zoomFrom, zoomTo){
  map.setCenter({lat:myLat, lng:myLng});
  map.setZoom(zoomFrom);
  
  setTimeout(function(){
    var i = zoomFrom;
    var interval = setInterval(function(){ 
      if (i == zoomTo) clearInterval(interval);
      map.setZoom(i);
      i++;
  }, 
  100);
    }, 200);
}

// Az általunk megadott adatséma szerint megadott JSON objectben lévő pozicíókból számol pozíciós számtani közepet.
function calculateCenter(props){

  var sumLat=0;
  var sumLng=0;
  for (var i = 0; i < props.length; i++) {

    sumLat += props[i].lat;
    sumLng += props[i].lon;
    
    if (i == props.length-1) {
      return {"lat": (sumLat/(i+1)), "lng": (sumLng/(i+1))};
    }
  }
}

// ---------------------------------------
//FÜGGVÉNY HÍVÁSOK
// ---------------------------------------

var styledMapType = new google.maps.StyledMapType(
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

function myTest(){
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
}





