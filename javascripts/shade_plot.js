var shade_plot = function(yrange, xrange, wts, scale, group) {
    // xscale
    var x = d3.scale.linear()
        .range([xrange[0], xrange[1]]);
    // yscale
    var y = d3.scale.linear()
        .range([yrange[1], yrange[0]]);

    x.domain([-scale,scale]).nice();
    y.domain([-scale,scale]).nice();

    // NOT SUPER HAPPY ABOUT THIS, BUT THERE IS SOME BUGS IN THE AREA-CREATING CODE BELOW
    // WHICH CAUSES THE SHADED REGION TO GO CRAZY
    var height = yrange[1]-yrange[0]
    var clip = svg.append("svg:clipPath")
      .attr("id", "clip")
    .append("svg:rect")
      .attr('width', height)
      .attr('height', height)
      .attr('x', xrange[0])
      .attr('y', yrange[0]);

    var area = d3.svg.area()
      .x(function(d) {return x(d[0]);})
      .y0(yrange[1])
      .y1(function(d) {
        yval = y(d[1])
        return yval;
      });

    var w = wts
    if (w[0] * w[1] > 0) {
        if (w[0] > w[1]) {
            x1_vals = [-scale, -scale*w[1]/w[0], scale*w[1]/w[0], scale]
            x2_vals = [scale, scale, -scale, -scale]
        } else {
            x1_vals = [-scale, -scale, scale, scale]
            x2_vals = [scale, scale*w[0]/w[1], -scale*w[0]/w[1], -scale]
        }
    } else {
        if (Math.abs(w[0]) < Math.abs(w[1])) {
            x1_vals = [-scale, -scale, scale, scale]
            x2_vals = [scale, scale*w[0]/w[1], -scale*w[0]/w[1], -scale]
        } else {
            x1_vals = [scale*w[1]/w[0], -scale*w[1]/w[0], scale, scale]
            x2_vals = [-scale, scale, scale, -scale]
        }
    }
    var shading_pts = x1_vals.map(function (e, i) {
        return [x1_vals[i], x2_vals[i]];
    });

    group.append("path")
        .datum(shading_pts)
        .attr("class", "area")
        .attr("d", area)
        .attr('clip-path', "url(#clip)");
} // end shade plot
