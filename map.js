var map;

var src = 'https://www.digitari.ca/kml/2016HalloweenOliver.kmz';
var heroIcon = 'https://www.digitari.ca/mapproject/icons/knight-icon.png';
var currentLatLng = null;
var heroMarker = null;
var backgroundSound = null;

var bonus = new Howl({
        src: ['./sound/dustyroom_multimedia_select_tone.mp3'],
        preload: true
    });

function showPosition(position) {

    currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
    heroMarker = new google.maps.Marker({
        position: currentLatLng,
        map: map,
        icon: heroIcon
    });
    
    heroMarker.setMap(map);
    
    heroMarker.setPosition(currentLatLng);   
}

function updatePosition(){
    currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    heroMarker.setPosition(currentLatLng);
}

function initMap() {
    backgroundSound = new Howl({
        src: ['./sound/difficult_desicions.mp3'],
        //src: ['http://127.0.0.1:61159/sound/music_zapsplat_trick_or_treat.mp3'],
        //src: ['http://127.0.0.1:61159/sound/music_zapsplat_disco_streets.mp3'],
         loop: true,
         preload: true,
         html5: true,
         autoplay: true
    });

    backgroundSound.play();
    //sound.stop();
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(53.542746304851434, -113.52584484874876),
        zoom: 16,
        mapTypeId: 'terrain',
        styles: [
                  {
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#1d2c4d"
                      }
                    ]
                  },
                  {
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#8ec3b9"
                      }
                    ]
                  },
                  {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                      {
                        "color": "#1a3646"
                      }
                    ]
                  },
                  {
                    "featureType": "administrative.country",
                    "elementType": "geometry.stroke",
                    "stylers": [
                      {
                        "color": "#4b6878"
                      }
                    ]
                  },
                  {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#64779e"
                      }
                    ]
                  },
                  {
                    "featureType": "administrative.province",
                    "elementType": "geometry.stroke",
                    "stylers": [
                      {
                        "color": "#4b6878"
                      }
                    ]
                  },
                  {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.stroke",
                    "stylers": [
                      {
                        "color": "#334e87"
                      }
                    ]
                  },
                  {
                    "featureType": "landscape.natural",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#023e58"
                      }
                    ]
                  },
                  {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#283d6a"
                      }
                    ]
                  },
                  {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#6f9ba5"
                      }
                    ]
                  },
                  {
                    "featureType": "poi",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                      {
                        "color": "#1d2c4d"
                      }
                    ]
                  },
                  {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [
                      {
                        "color": "#023e58"
                      }
                    ]
                  },
                  {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#3C7680"
                      }
                    ]
                  },
                  {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#304a7d"
                      }
                    ]
                  },
                  {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#98a5be"
                      }
                    ]
                  },
                  {
                    "featureType": "road",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                      {
                        "color": "#1d2c4d"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#2c6675"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                      {
                        "color": "#255763"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#b0d5ce"
                      }
                    ]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                      {
                        "color": "#023e58"
                      }
                    ]
                  },
                  {
                    "featureType": "transit",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#98a5be"
                      }
                    ]
                  },
                  {
                    "featureType": "transit",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                      {
                        "color": "#1d2c4d"
                      }
                    ]
                  },
                  {
                    "featureType": "transit.line",
                    "elementType": "geometry.fill",
                    "stylers": [
                      {
                        "color": "#283d6a"
                      }
                    ]
                  },
                  {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#3a4762"
                      }
                    ]
                  },
                  {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                      {
                        "color": "#0e1626"
                      }
                    ]
                  },
                  {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      {
                        "color": "#4e6d70"
                      }
                    ]
                  }
                ]
    });

    var kmlLayer = new google.maps.KmlLayer(src, {
      suppressInfoWindows: true,
      preserveViewport: false,
      map: map
    });

    kmlLayer.addListener('click', function(event) {
        bonus.play();
        var content = event.featureData.infoWindowHtml;
        var testimonial = document.getElementById('capture');
        testimonial.innerHTML = content;
    });
    
    getLocation();
    
    setTimeout(function(){
        getLocation();
    }, 1000);

}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("Geolocation is not supported by this browser.");
        centerMapOnEdmonton();
    }
}

function showError(error) {  
    switch(error.code) {
        case error.PERMISSION_DENIED:
            console.log("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.log("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            console.log("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.log("An unknown error occurred.");
            break;
    }
    
    //    Show Head office if we are not permitted to use location
    centerMapOnEdmonton();
}

function centerMapOnEdmonton()
{
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
        center: {lat: 53.5333, lng: -113.5000},
        zoom: 13
    });   
}


