/**
 * Recorrido.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    origenLatitud:{
      type:'number',
      required:true,
    },

    origenLongitud:{
      type:'number',
      required:true,
    },
    destinoLatitud:{
      type: 'number',
      required: true
    },
    destinoLongitud:{
      type: 'number',
      required: true
    },
    distanciaRecorrido:{
      type:'number',
      required: true,
    },

    estadoRecorrido:{
      type:'string',
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

