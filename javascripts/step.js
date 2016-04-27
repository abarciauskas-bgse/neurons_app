// function to update weights using a data point
var step = function(data_point, init_weights) {
    // transfer function
    input_neuron1 = dotproduct([data_point.x1, data_point.x2], init_weights) 
    // calculate activation function
    // sigmoid in this case
    f_neuron1 = 1/(1+Math.exp(-input_neuron1))
    // this is the ouptput of the neuron
    // if y = 1, f_neuron is the correct predicted probability
    // if y = 0, 1-f_neuron1 is the correct predicted probability
    loss_neuron1 = (data_point.class == 1) ? (1 - f_neuron1) : f_neuron1

    dLdF = (data_point.class == 1) ? -1 : 1
    dL = loss_neuron1 * dLdF
    // the gradient for this neuron and this input
    dW = dL * f_neuron1 * (1 - f_neuron1)

    //weights_neuron1 += np.dot(obs, dW)
    new_weights = [init_weights[0] + data_point.x1 * dW, init_weights[1] + data_point.x2 * dW]
    return {'weights': new_weights, 'loss': loss_neuron1}
}

// losses = []
// init_weights = runifo(2,3)
// weights = init_weights
// for (var i = 0; i<1000; i++) {
//     res = step(data_point, weights)
//     weights = res.weights
//     losses.push(res.loss)
// }
// console.log(losses)
