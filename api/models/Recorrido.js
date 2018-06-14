/**
 * Recorrido.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    origenRecorrido:{
      type:'string',
      required:true,
    },

    destinoRecorrido:{
      type:'string',
      required:true,
    },

    distanciaRecorrido:{
      type:'number',
      required: true,
    },

    estadoRecorrido:{
      type:'boolean',
      required:true,
    },

    fechaRecorrido:{
      type:'string',
      required:true
    },
    valorRecorrido:{
      type:'number',
      required:true
    },
    tarjetaCreditoId:{
      model:'TarjetaCredito',
    },
    conductorId:{
      model:'Conductor',
    }








  },

};

