var update_shaded = function(weights, iter) {
    shade_plot([0,height2], [0,height2], weights, scale, second_plot_group, iter == 1 ? false : true)
}

var update_loss = function(regrets, loss, delay_offset) {
    regrets.push(loss);
    d3.selectAll('path.regrets')
      .attr("d", loss_line_function(regrets))
      .attr("transform", null)
      .transition()
      .duration(step_duration)
      .attr("transform", "translate(" + loss_xscale(-1) + ")");
    regrets.shift();
}

var step_update = function(iter, short_term_regrets, all_weights, long_term_regrets) {
    current_iter = iter
    var points = d3.selectAll('#second_plot_group .dot')[0]
    iter_weights = all_weights[iter]
    iter_loss = long_term_regrets[iter]
    update_shaded(iter_weights, iter)
    update_loss(short_term_regrets, iter_loss, iter)
    // highlight new point for first n iters
    if (iter<n) { d3.select(points[iter]).transition().attr('class', 'dot dot-active') }
}
