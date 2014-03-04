var app = app || {};

app.StoreView = Backbone.View.extend({
    initialize: function() {
      var map;
      var bounds = new google.maps.LatLngBounds();
      var mapOptions = {
          mapTypeId: 'roadmap',
          disableDefaultUI: true,
          zoomControl: true,
          zoomControlOptions: {
              position: google.maps.ControlPosition.LEFT_BOTTOM
          }
    };
                        
    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
      
    // Multiple Markers
    var markers = [['<h3>ITShop &rightarrow; Noosa</h3><address><b>Noosa Civic</b><br>t040/28, Eenie Creek Rd, Noosaville, QLD, 4566<br><b>Phone:</b> 07 5455 5466<br></address>', -26.413975, 153.047836],
      ['<h3>ITShop &rightarrow; Caloundra</h3><address><b>Stockland Caloundra</b><br>47, Bowman Rd, Caloundra, QLD, 4551<br><b>Phone:</b> 07 5309 5943<br></address>', -26.802513, 153.125107],
      ['<h3>ITShop &rightarrow; Strathpine</h3><address><b>Westfield Strathpine</b><br>295, Gympie Rd, Strathpine, QLD, 4500<br><b>Phone:</b> 07 3205 6050<br></address>', -27.306915, 152.992477],
      ['<h3>ITShop &rightarrow; Carindale</h3><address><b>Westfield Carindale</b><br>1151, Creek Rd, Carindale, QLD, 4152<br><b>Phone:</b> 07 3398 8386<br></address>', -27.502998, 153.101624],
      ['<h3>ITShop &rightarrow; Garden City</h3><address><b>Westfield Garden City</b><br>1, Kessels Rd, Upper Mt Gravatt, QLD, 4122<br><b>Phone:</b> 07 3343 3596<br></address>', -27.563034, 153.082489]];

    // Display multiple markers on a map
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
      this.setZoom(9);
      google.maps.event.removeListener(boundsListener);
    });
        
    // Loop through our array of markers & place each one on the map  
    var contentString = "";
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    for( i = 0; i < markers.length; i++ ) {
      var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
      bounds.extend(position);

      var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: markers[i][0]
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.open(map, marker);
          infowindow.setContent(markers[i][0]);
        }
      })(marker, i));
    }
    map.fitBounds(bounds);
  },
  events: {
      'click .nav a': 'initialize'
  }
});