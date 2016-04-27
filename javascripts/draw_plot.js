var draw_plot = function(yrange, xrange, data, group, dot_class) {
    // xscale
    var x = d3.scale.linear()
        .range([xrange[0], xrange[1]]);
    // yscale
    var y = d3.scale.linear()
        .range([yrange[1], yrange[0]]);

    // color scale
    var color = d3.scale.category10();
    // xAxis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    // yAxis
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");
    x.domain([-scale,scale]).nice();
    y.domain([-scale,scale]).nice();

    // draw x axis
    group.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(" + xrange[0] + "," + yrange[1] + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", xrange[1])
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("x1");

    // draw y axis
    group.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("x2")

    // add data points
    group.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", dot_class)
        .attr("r", 3.5)
        .attr("cx", function(d) { return x(d.x1); })
        .attr("cy", function(d) { return y(d.x2); })
        .style("fill", function(d) { return color(d.class); });

    // add legend
    var legend = group.selectAll(".legend")
        .data(color.domain())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", xrange[1] - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", xrange[1] - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });
}; // end draw_plot
