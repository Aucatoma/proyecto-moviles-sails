const jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'Verify token',


  description: '',


  inputs: {
    token: {
      type: 'string',
      description: 'Token a verificar',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const secreto = 'FindCab';
    const verificacion = jwt.verify(inputs.token, secreto);

    // All done.
    return exits.success(verificacion);

  }


};

