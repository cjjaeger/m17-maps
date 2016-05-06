$(function() {
  // Create a new leaflet map in the "container" div
  // syntax: var MAP_VARIABLE = L.map('CONTAINER_NAME')
  var map = L.map('container')

  // Use the setView method to set the lat/long and zoom of your map
  // syntax: VARIABLE.setView([LATITUDE, LONGITUDE], ZOOM)
  map.setView([47.6097,-122.3331],10)

  // Create an OpenStreetMap tile layer variable using their url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
  // syntax: var LAYER_VARIABLE = L.tileLayer('URL')
  var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')

  // Add the layer to your map
  // Syntax: LAYER_VARIABLE.addTo(MAP_VARIABLE)
  layer.addTo(map)

  // Get the data using an ajax request
  // URL: 'https://data.seattle.gov/resource/7ais-f98f.json?year=2015&$limit=500'
  var data;
  $.ajax({
      url:'https://data.seattle.gov/resource/7ais-f98f.json?year=2015&$limit=500',
      type: "get",
      success:function(dat) {
         data = dat
         // Loop through your data array and create a new circle for each element in your data array
        data.map(function(d){
           var circle = new L.circle([d.latitude, d.longitude], 200, {color:'red', opacity:.5}).addTo(map)

           // Get the text that you want here
           var text =  d.offense_type

           // Bind the text to your circle
           circle.bindPopup(text)
        })
      },
     dataType:"json"
  })
});
