/**
 * TarjetaCredito.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    companiaTarjeta: {type: 'string'},
    numeroTarjeta: { type: 'string', required: true },
    codigoSeguridad: { type: 'string', required: true},
    mesTarjeta: { type: 'number', required: true },
    anioTarjeta: { type: 'number', required: true },


    recorridos:{
      collection:'Recorrido',
      via:'tarjetaCreditoId',
    },


    clienteId:{
      model:'Cliente',
    }



  },

};

