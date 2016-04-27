var shade_plot = function(yrange, xrange, wts, scale, group) {
    // xscale
    var x = d3.scale.linear()
        .range([xrange[0], xrange[1]]);
    // yscale
    var y = d3.scale.linear()
        .range([yrange[1], yrange[0]]);

    x.domain([-scale,scale]).nice();
    y.domain([-scale,scale]).nice();

    var area = d3.svg.area()
      .x(function(d) {return x(d[0]);})
      .y0(height2)
      .y1(function(d) {return y(d[1]);});

    // shade the area above the true dividing line
    var x1_range = d3.range(-scale,scale+1)

    var x2_vals = []
    x1_range.forEach(function(x1) { x2_vals.push(-x1*(wts[0]/wts[1])) })

    var shading_pts = x1_range.map(function (e, i) {
        return [x1_range[i], x2_vals[i]];
    });
    group.append("path")
        .datum(shading_pts)
        .attr("class", "area")
        .attr("d", area);
} // end shade plot
