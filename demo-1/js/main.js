// Main file for controlling data, passing updates

// Global namespace variables
var drawHistogram, xScale, yScale, qScale, data, values;

// Settings driven by controls
var settings = {
	scale:'quantize',
	orientation: 'latitude',
	colorClass:'RdYlBu',
	colorBreaks:4
};

// Margin: how much space to put in the SVG for axes/titles
var margin = {
	left:70,
	bottom:100,
	top:50,
	right:50,
};

// Height/width of the drawing area for data symbols
var height = 350 - margin.bottom - margin.top;
var width = 900 - margin.left - margin.right;

// Write a function for setting scales.
var setScales = function() {

	// Define an ordinal xScale using rangeBands
	var min = d3.min(values);
	var max = d3.max(values);
	xScale  = d3.scale.linear()
							.domain([min, max])
							.range([0, width]);

	// Define a quantile scale
	var range = colorbrewer[settings.colorClass][settings.colorBreaks];
	quantileScale = d3.scale.quantile().domain(values).range(range);

	// d3.range(d3.min(values), d3.max(values), numBreaks)
	var step = Math.floor((max - min)/settings.colorBreaks);
	var domain = d3.range(min, max, step);
	quantizeScale = d3.scale.quantize().domain(domain).range(range);

	// Define the yScale: remember to draw from top to bottom!
	yScale = d3.scale.linear()
		.domain([0, d3.max(data, function(d) { return d.y; })])
		.range([height, 0]);
}

// Make data values based on county longitude / latitudes
var makeData = function(shape) {
	// Set values as longitude
	values = topojson.feature(shape, shape.objects.counties).features.map(function(d){
		var index = settings.orientation == 'latitude' ? 0 : 1;
		return(pathGen.centroid(d)[index])
	})

	// Histogram layout
	var histogram = d3.layout.histogram()
							.bins(30);

	// Set data as a histogram layout of the values
	data = histogram(values);
}

// Function to update the charts / text
var update = function() {
	$('#num-colors').text('Number of Colors: ' + settings.colorBreaks)
	makeData(settings.data);// Generate data
	setScales(); // Set scales
	drawHistogram();
	drawMap();
};

// On load, build charts
$(function() {
	// Read in shapefile, then draw the charts
	d3.json('data/shape.json', function(error, shape){
		settings.data = shape;
		drawLegend();// Draw Legend
		update();
	});

	// Event listener on the input elements
	$("input").on('change', function() {
			// Get value, determine if it is the orientation (lat/long) scale type
			var setting = $(this).hasClass('orientation') ? 'orientation' : 'scale'
			var val = $(this).val();
			settings[setting] = val;
			update()
	});

	// Event listener on the slider
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
