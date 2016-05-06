// Histogram adapted from https://bl.ocks.org/mbostock/3048450

// On load, append chart element
$(function() {

  // Select SVG to work with, setting width and height (the vis <div> is defined in the index.html file)
  var svg = d3.select('#vis')
    .append('svg')
    .attr('height', 350)
    .attr('width', 900);

  // Append a 'g' element in which to place the rects, shifted down and right from the top left corner
  var g = svg.append('g')
      .attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')')
      .attr('height', height)
      .attr('width', width);

  // Append an xaxis label to your SVG, specifying the 'transform' attribute to position it (don't call the axis function yet)
  var xAxisLabel = svg.append('g')
                      .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
                      .attr('class', 'axis')

  // Append a yaxis label to your SVG, specifying the 'transform' attribute to position it (don't call the axis function yet)
  var yAxisLabel = svg.append('g')
                  .attr('class', 'axis')
                  .attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')

  // Append text to label the y axis (don't specify the text yet)
  var xAxisText = svg.append('text')
                     .attr('transform', 'translate(' + (margin.left + width/2) + ',' + (height + margin.top + 40) + ')')
                     .attr('class', 'title')

  // Append text to label the y axis (don't specify the text yet)
  var yAxisText = svg.append('text')
                     .attr('transform', 'translate(' + (margin.left - 40) + ',' + (margin.top + height/2) + ') rotate(-90)')
                     .attr('class', 'title')


  // Function for setting axes
  var setAxes = function() {
    // Define x axis using d3.svg.axis(), assigning the scale as the xScale
    var xAxis = d3.svg.axis()
          .scale(xScale)
          .orient('bottom')

    // Define y axis using d3.svg.axis(), assigning the scale as the yScale
    var yAxis = d3.svg.axis()
          .scale(yScale)
          .orient('left')
          .tickFormat(d3.format('.2s'));

    // Call xAxis
    xAxisLabel.transition().duration(1500).call(xAxis);

    // Call yAxis
    yAxisLabel.transition().duration(1500).call(yAxis);

    // Update labels
    xAxisText.text('Value')
    yAxisText.text('Count')
  }



  // Store the data-join in a function: make sure to set the scales and update the axes in your function.
  drawHistogram = function() {
    // Set axes
    setAxes()

    // Select all rects and bind data
    var bars = g.selectAll('rect').data(data);
    // Use the .enter() method to get your entering elements, and assign initial positions
    bars.enter().append('rect')
      .attr('x', function(d){return xScale(d.x)})
      .attr('y', height)
      .attr('height', 0)
      .attr('width', xScale(data[1].x) - 1)
      .attr('class', 'bar');

    // Use the .exit() and .remove() methods to remove elements that are no longer in the data
    bars.exit().remove();

    // // Transition properties of the update selection
    bars.transition()
      .delay(function(d, i){return i*50})
      .duration(1000)
      .attr('x', function(d){return xScale(d.x)})
      .attr('y', function(d){return yScale(d.y)})
      .attr('height', function(d) {return height - yScale(d.y)})
      .attr('width', xScale(data[1].x) - 1)
      .style('fill', function(d){
        return settings.scale == 'quantize' ? quantizeScale(d.x) : quantileScale(d.x);
      });

    // Enter and append lines for quantile breaks
    var lineData = settings.scale == 'quantize' ? quantizeScale.range().filter(function(d,i){return i!=0}) : quantileScale.quantiles();
    if(settings.scale == 'quantize') {
      // lineData.shift()
    }
    var lines = g.selectAll('.break').data(lineData, function(d,i){console.log(d); return i})

    lines.enter().append('line').attr('y2', height).attr('class', 'break');

    lines.transition().duration(1000).delay(function(d,i){return + 100*i })
         .attr('x1', function(d) {
            if (settings.scale == 'quantize') {
              val = quantizeScale.invertExtent(d)[0];
            }
            else {
              val = d
            }
            return xScale(val)
          })
          .attr('x2', function(d) {
             if (settings.scale == 'quantize') {
               val = quantizeScale.invertExtent(d)[0];
             }
             else {
               val = d
             }
             return xScale(val)
           })
         .attr('y1', height)
         .attr('y2', 0)
    lines.exit().remove();

  }

});
