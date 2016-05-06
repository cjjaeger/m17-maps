// Map code
var drawMap, pathGen;
$(function() {
  // Path Generator
  pathGen = d3.geo.path();

  var svg = d3.select("#vis").append("svg")
      .attr("width", 850)
      .attr("height", 500);

  drawMap = function() {
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
});
