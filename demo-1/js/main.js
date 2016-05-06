/*
Histogram adapted from https://bl.ocks.org/mbostock/3048450
*/
var settings = {
	scale:'quantize',
	orientation: 'latitude',
	colorClass:'RdYlBu',
	colorBreaks:4
};

var update = function() {
	$('#num-colors').text('Number of Colors: ' + settings.colorBreaks)
	drawHistogram(settings);
	drawMap(settings);
};


$(function() {
	// Read in prepped_data file
	d3.json('data/shape.json', function(error, shape){
		settings.data = shape;
		drawHistogram(settings)
		drawMap(settings)
	});
	$("input").on('change', function() {
			// Get value, determine if it is the sex or type controller
			var setting = $(this).hasClass('orientation') ? 'orientation' : 'scale'
			var val = $(this).val();
			settings[setting] = val;
			update()
	});
	$('#slider').slider({
		width:'200px',
		min:3,
		max:10,
		value:settings.colorBreaks,
		change:function(event, ui) {
			settings.colorBreaks = ui.value;
			update()
		}
	});
});
