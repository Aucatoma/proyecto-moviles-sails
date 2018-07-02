/**
 * ConductorController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

  _config :{
    actions: false,
    rest: false,
  },

  login: async function(req, res){
      var resultado = await sails.helpers.fooBar('Daniel');
      var conductor = await Cliente.find();
      res.send(conductor)
  }

};

