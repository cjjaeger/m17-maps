$(function() {
  // Create a new leaflet map in the "container" div
  // syntax: var MAP_VARIABLE = L.map('CONTAINER_NAME')


  // Use the setView method to set the lat/long and zoom of your map
  // syntax: VARIABLE.setView([LATITUDE, LONGITUDE], ZOOM)


  // Create an OpenStreetMap tile layer variable using their url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
  // syntax: var LAYER_VARIABLE = L.tileLayer('URL')


  // Add the layer to your map
  // Syntax: LAYER_VARIABLE.addTo(MAP_VARIABLE)


  // Get the data using an ajax request
  // URL: 'https://data.seattle.gov/resource/7ais-f98f.json?year=2015&$limit=500'

        // On success, loop through your data array and create a new circle for each element in your data array

           // Get the text that to appear on click


           // Bind the text to your circle

});
