var map;

var scaryMapStyle = [
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
                ];
var src = 'https://www.digitari.ca/kml/2016HalloweenOliver.kmz';
var heroIcon = 'https://www.digitari.ca/mapproject/icons/knight-icon.png';
var currentLatLng = null;
var heroMarker = null;
var backgroundSound = new Howl({
        //src: ['./sound/difficult_desicions.mp3'],
        src: ['./sound/music_zapsplat_trick_or_treat.mp3'],
        //src: ['./sound/SpookyScarySkeletons.mp3'],
        //src: ['./sound/music_zapsplat_disco_streets.mp3'],
        loop: true,
        preload: true
    });
var backgroundStarted = false;

var selectTone = new Howl({
        src: ['./sound/dustyroom_multimedia_select_tone.mp3'],
        preload: true
    });

var bonus = new Howl({
        src: ['./sound/dustyroom_multimedia_correct_complete_bonus.mp3'],
        preload: true
    });

var playingScaryZoneSounds = false;
var scaryZoneSounds = new Howl({
        src: ['./sound/bottlerocket_Whoosh_Twisted Vocal_04.mp3', './sound/zapsplat_horror_cinematic_hit_wooden_dark_scary_hard.mp3'],
        preload: true,
        onplay: function(e){
            playingScaryZoneSounds = true;
        },
        onend: function(e){
            playingScaryZoneSounds = false;
        }
    });

var scaryZones = [];
var searchRadius = 20;

function enableSound(){
    bonus.play();
}

function showPosition(position) {

    currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
    if (heroMarker === null){
        heroMarker = new google.maps.Marker({
            position: currentLatLng,
            map: map,
            icon: heroIcon
        });
    }
    
    heroMarker.setMap(map);
    
    heroMarker.setPosition(currentLatLng);   
    map.setCenter(currentLatLng);
    
    checkIfWithinScaryZone(currentLatLng);
}

function initMap() {
    
    JSZipUtils.getBinaryContent('./2016HalloweenOliver.kmz', function(err, data) {
        if(err) {
            throw err; // or handle err
        }

        JSZip.loadAsync(data).then(function (results) {
            var decompressed = results;

            return decompressed.file("doc.kml").async("string");
            
        }).then(function (xml) {
            //console.log(xml);

            var xmlDoc = $.parseXML( xml ),
            $xml = $( xmlDoc ),
            mapLink = $xml.find( "href" );
            var url = mapLink[0].textContent
            
            $.get( url, function( data ) {
                var kmlDoc = $.parseXML(data);   
            });
        });
    });


    
    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(53.542746304851434, -113.52584484874876),
        zoom: 16,
        mapTypeId: 'terrain',
        styles: scaryMapStyle
    });

    var kmlLayer = new google.maps.KmlLayer(src, {
      suppressInfoWindows: true,
      preserveViewport: false,
      map: map
    });

    kmlLayer.addListener('click', function(event) {
        selectTone.play();
        var content = event.featureData.infoWindowHtml;
        var testimonial = document.getElementById('capture');
        testimonial.innerHTML = content;
    });
    
    monitorLocation();
    
    //backgroundSound.play();
    
    readPoints();

}


function monitorLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition, showError, {enableHighAccuracy: true});
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

function readPoints(){
    $.ajax({
        type: "GET",
        url: "2016HalloweenOliver\\doc.kml",
        dataType: "xml",
        success: function(xml) {
            $(xml).find('Point').each(function(){

                var coord = $(this).find('coordinates').text();
                //console.log(coord)
                var coordParts = coord.split(',');
                var lat = parseFloat(coordParts[1]);
                var lng = parseFloat(coordParts[0]);
                var latlng = new google.maps.LatLng(lat, lng);
                
                scaryZones.push(latlng);
            });
        }
    });
    
}

function checkIfWithinScaryZone(currentLocation){
    for (var i = 0; i < scaryZones.length; i++) {
        var inZone = google.maps.geometry.spherical.computeDistanceBetween(
            scaryZones[i], 
            currentLocation) <= searchRadius; 
        
        if (inZone) {
            console.log('=> is in searchArea');
            if (!playingScaryZoneSounds){
                scaryZoneSounds.play();
            }
        } else {
            console.log('=> is NOT in searchArea');
        }
    }
}


