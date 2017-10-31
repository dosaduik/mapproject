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
				
//var src = 'https://www.digitari.ca/kml/2016HalloweenOliver.kmz';
var src = 'https://www.digitari.ca/kml/HalloweenMap2017.kmz';

var currentLatLng = null;
var heroMarker = null;

var heroIcon = 'https://www.digitari.ca/mapproject/assets/jack/png/Jack%20Walk%20Icon.png';
var heroDeadIcon = 'https://www.digitari.ca/mapproject/assets/jack/png/Jack%20Dead%20Icon.png';

//var completedLevelIcon = 'https://www.digitari.ca/mapproject/assets/gifs/Pumpkin-icon.png';
var completedLevelIcon = 'https://www.digitari.ca/mapproject/assets/gifs/accept-icon.png';

//var backgroundSound = new Howl({
        //src: ['./sound/difficult_desicions.mp3'],
        //src: ['./sound/music_zapsplat_trick_or_treat.mp3'],
        //src: ['./sound/SpookyScarySkeletons.mp3'],
        //src: ['./sound/music_zapsplat_disco_streets.mp3'],
//        src: ['./sound/Deadmau5 - Creep.mp3'],
//       loop: true,
//        preload: true,
//        html5: true
//    });
	
var backgroundStarted = false;

var selectTone = new Howl({
        src: ['./sound/dustyroom_multimedia_select_tone.mp3'],
        preload: true
    });

var bonus = new Howl({
        src: ['./sound/dustyroom_multimedia_correct_complete_bonus.mp3'],
        preload: true
    });

var gameOverSound = new Howl({
      src: ['./sound/cartoon_fail_strings_trumpet.mp3'],
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

var cheers = new Howl({
        src: ['./sound/human_crowd_25_people_cheer_shout_yay.mp3'],
        preload: true
    });

var completedAllAreas = new Howl({
        src: ['./sound/multimedia_game_musical_success_complete_orchestral_horns_002.mp3'],
        preload: true,
        onend: function(e){
            cheers.play();
        }
    });

var scaryZones = [];
var searchRadius = 20;

//function enableSound(){
//  backgroundSound.play();
//}

function showPosition(position) {

    currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    
    var gameData = getGameData();

    if (gameData.playerHitPoints <= 0) {
        heroMarker = new google.maps.Marker({
          position: currentLatLng,
          map: map,
          icon: heroDeadIcon,
          zIndex: google.maps.Marker.MAX_ZINDEX + 1
      });

      heroMarker.setMap(map);
      
      heroMarker.setPosition(currentLatLng);   

      gameOverSound.play();

      $('.center-div').css('color', 'red').html('Game Over<br/>Click here to Play Again?').fadeIn('slow');
      $('.center-div').click(function(e){
            window.location.replace('index.html');
        });
    }
    else{
      if (heroMarker === null){
          heroMarker = new google.maps.Marker({
              position: currentLatLng,
              map: map,
              icon: heroIcon,
              zIndex: google.maps.Marker.MAX_ZINDEX + 1
          });
      }

      heroMarker.setMap(map);
      
      heroMarker.setPosition(currentLatLng);   
      
      checkIfWithinScaryZone(currentLatLng);
    }
}

function initMap() {


    //JSZipUtils.getBinaryContent('./2016HalloweenOliver.kmz', function(err, data) {
        //if(err) {
            //throw err; // or handle err
        //}

        // JSZip.loadAsync(data).then(function (results) {
        //     var decompressed = results;

        //     return decompressed.file("doc.kml").async("string");
            
        // }).then(function (xml) {
        //     //console.log(xml);

        //     var xmlDoc = $.parseXML( xml ),
        //     $xml = $( xmlDoc ),
        //     mapLink = $xml.find( "href" );
        //     var url = mapLink[0].textContent
            
        //     $.get( url, function( data ) {
        //         var kmlDoc = $.parseXML(data);   
        //     });
        // });
    //});

    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(53.542746304851434, -113.52584484874876),
        zoom: 18,
        mapTypeId: 'terrain',
        styles: scaryMapStyle,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: true        
    });

      //Resize Function
		google.maps.event.addDomListener(window, "resize", function() {
			google.maps.event.trigger(map, "resize");
			map.setCenter(currentLatLng);
		});
    
    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

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
        
    readPoints();

}

function CenterControl(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'darkgrey';
    controlUI.style.backgroundImage = './assets/mooning.png';
    controlUI.style.border = '10px solid grey';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.style.width = '300px';
    //controlUI.style.height = '100px';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'gold';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';

    var gameData = getGameData();

    controlText.innerHTML = 'Score: ' + gameData.score + ' Areas Cleared: ' + gameData.level +'<br><span style="color: red;">Hit Points: ' + gameData.playerHitPoints + '</span>';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function() {

      map.setCenter(currentLatLng);

    });

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
    map = new google.maps.Map(mapDiv, {
        center: {lat: 53.5333, lng: -113.5000},
        zoom: 13
    });   
}

function readPoints(){
    $.ajax({
        type: "GET",
        //url: "2016HalloweenOliver\\doc.kml",		
        url: "2017Map\\doc.kml",
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

function locationAlreadyCompleted(coords){
  var gameData = getGameData();

  for(var i = 0; i < gameData.completedLocations.length; i++){
      
    var completedLocation = JSON.parse(gameData.completedLocations[i].coords);
    if (coords.lat() === completedLocation.lat 
        && coords.lng() === completedLocation.lng){

      var completedLatLng = new google.maps.LatLng(completedLocation.lat, completedLocation.lng);

      var completedAreaMarker = new google.maps.Marker({
          position: completedLatLng,
          map: map,
          icon: completedLevelIcon,
		  zIndex: google.maps.Marker.MAX_ZINDEX 
      });

      completedAreaMarker.setMap(map);

      return true;
    }
  }

  return false;
}

function gameFinished(){
    completedAllAreas.play();
    
    $('.center-div').css('color', 'gold').html('You did it!!<br>You saved our neighbourhood!!<br/>Click here to return to Main Menu?').fadeIn('slow');
    $('.center-div').click(function(e){
        window.location.replace('index.html');
    });
}

var completedCount = 0;
function checkIfWithinScaryZone(currentLocation){
    for (var i = 0; i < scaryZones.length; i++) {
        var inZone = google.maps.geometry.spherical.computeDistanceBetween(
            scaryZones[i], 
            currentLocation) <= searchRadius; 
  
        var completed = locationAlreadyCompleted(scaryZones[i]);
        
        if (completed){
            completedCount++;
        }

        if (completedCount < scaryZones.length){
            if (inZone && !completed) {
                console.log('=> is in searchArea');

                inScaryZone(scaryZones[i]);
            } else {
                console.log('=> is NOT in searchArea');
            }
        }else{
            gameFinished();
        }
    }
}

var scaryZoneCoords = null;
function inScaryZone(coords){
    if (!playingScaryZoneSounds){
        scaryZoneCoords = coords;
        scaryZoneSounds.play();
    }    
    
    setTimeout(function(){
        window.location.replace('monsters.html' + '?coords=' + JSON.stringify(scaryZoneCoords));
    }, 5000)
}


