// Function to make legend: taken from https://bl.ocks.org/mbostock/5577023
// Colorbrewer pallets
var drawLegend = function() {
  d3.select("#color-picker")
    .selectAll(".palette")
    .data(d3.entries(colorbrewer))
    .enter().append("span")
    .attr("class", "palette")
    .attr("title", function(d) { return d.key; })
    .on("click", function(d) {
      // Reset slider
      var max = d3.max(d3.keys(d.value), function(d) {return +d});
      $('#slider').slider({max:max});
      if(settings.colorBreaks > max) settings.colorBreaks = max;
      settings.colorClass = d.key;
      update()
     })
     .selectAll(".swatch")
    .data(function(d) { return d.value[d3.keys(d.value).map(Number).sort(d3.descending)[0]]; })
    .enter().append("span")
    .attr("class", "swatch")
    .style("background-color", function(d) { return d; });
};
