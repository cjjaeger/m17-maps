// Map code
var drawMap, pathGen;
$(function() {
  // Path Generator
  pathGen = d3.geo.path();

  var svg = d3.select("#vis").append("svg")
      .attr("width", 850)
      .attr("height", 500);

  drawMap = function(settings) {
    // Paths -- one each
    var paths = svg.selectAll("path")
        .data(topojson.feature(settings.data, settings.data.objects.counties).features);

    paths.enter().append('path')
        .attr("class", "border border--state")
        .attr("d", pathGen)

    paths.transition().duration(1000).delay(function(d, i) {
      return xScale(pathGen.centroid(d)[0])*1.5
    }).style('fill', function(d, i){
          return settings.scale == 'quantize' ? quantizeScale(values[i]) : quantileScale(values[i])
        })
  };

  // Colorbrewer pallets
  d3.select("#color-picker")
  .selectAll(".palette")
    .data(d3.entries(colorbrewer))
  .enter().append("span")
    .attr("class", "palette")
    .attr("title", function(d) { return d.key; })
    .on("click", function(d) {
      //  console.log(d3.values(d.value).map(JSON.stringify).join("\n"));
      console.log()
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

});
