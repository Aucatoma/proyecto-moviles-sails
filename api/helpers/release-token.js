const jwtPaquete = require('jsonwebtoken');

module.exports = {


  friendlyName: 'Verify token',


  description: 'Verificador de token',


  inputs: {
    payload: {
      type: 'string',
      description: 'Payload del web token',
      required: true,
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const secreto = 'FindCab';
    const jwt = jwtPaquete;
    const tiempoVidaToken = '30 days';
    const token = jwt.sign({
      data: inputs.payload
    }, secreto, { expiresIn: tiempoVidaToken });
    // All done.
    return exits.success(token);

  }


};

