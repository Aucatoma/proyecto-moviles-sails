/**
 * Recorrido.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    origenLatitud:{
      type:'string',
      required:true,
    },
    origenLongitud:{
      type:'string',
      required:true,
    },

    destinoLatitud:{
      type:'string',
      required:true,
    },

    destinoLongitud:{
      type:'stirng',
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

