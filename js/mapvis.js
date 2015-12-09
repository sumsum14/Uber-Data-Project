/* 

To Do:

- Use actual surge data/estimates
- On mouseover for markers, include something??? Would require more api calls though

Optional features:

- 

*/

function initialize() {
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
          center: new google.maps.LatLng(42.371610, -71.120318),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDoubleClickZoom: true,
          draggable: false,
          scrollwheel: false,
          panControl: false
        }
        var map = new google.maps.Map(mapCanvas, mapOptions)
        var allowedBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(24.042452, -124.992017),
          new google.maps.LatLng(49.550875, -65.402177)
        );
        map.fitBounds(allowedBounds)



        var Atlanta = new google.maps.Marker({
          position: new google.maps.LatLng(33.7488933,-84.3903931),
          animation: google.maps.Animation.DROP,
          map: map,
          // Need to get surge info when date/time
          title: '1.9',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 6
          }
        });
        var Boston = new google.maps.Marker({
          position: new google.maps.LatLng(42.3605229,-71.0579748),
          animation: google.maps.Animation.DROP,
          map: map,
          title: '1.6',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 6
          }
        });
        var NewYork = new google.maps.Marker({
          position: new google.maps.LatLng(40.7127744,-74.006059),
          animation: google.maps.Animation.DROP,
          map: map,
          title: '1.2',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 6
          }
        });
        var SanFran = new google.maps.Marker({
          position: new google.maps.LatLng(37.779272,-122.4193494),
          animation: google.maps.Animation.DROP,
          map: map,
          title: '1.5',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 6
          }
        });
        var WashDC = new google.maps.Marker({
          position: new google.maps.LatLng(38.8899389,-77.0090505),
          animation: google.maps.Animation.DROP,
          map: map,
          title: 'No Surge',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 6
          }
        });

        Atlanta.addListener('click', function() {
          c=$("#nowCity").val();
          if (c!="Atlanta") {
            $("#nowCity").val('Atlanta');
            onChange();
          }
          // if we wanted to zoom on click
          //map.setZoom(8);
          //map.setCenter(Atlanta.getPosition());
        });
        Boston.addListener('click', function() {
          c=$("#nowCity").val();
          if (c!="Boston") {
            $("#nowCity").val('Boston');
            onChange();
          }
        });
        NewYork.addListener('click', function() {
          c=$("#nowCity").val();
          if (c!="New York") {
            $("#nowCity").val('New York');
            onChange();
          }
        });
        SanFran.addListener('click', function() {
          c=$("#nowCity").val();
          if (c!="San Francisco") {
            $("#nowCity").val('San Francisco');
            onChange();
          }
        });
        WashDC.addListener('click', function() {
          c=$("#nowCity").val();
          if (c!="Washington DC") {
            $("#nowCity").val('Washington DC');
            onChange();
          }
        });

        /* Write on the map
        var myTitle = document.createElement('h1');
        myTitle.style.color = 'white';
        myTitle.innerHTML = 'Hello World';
        var myTextDiv = document.createElement('div');
        myTextDiv.appendChild(myTitle);
        map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(myTextDiv);
        */

      }

google.maps.event.addDomListener(window, 'load', initialize);