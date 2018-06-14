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
      requiered:true,
    },

    destinoRecorrido:{
      type:'string',
      requiered:true,
    },

    distanciaRecorrido:{
      type:'number',
      requiered: true,
    },

    estadoRecorrido:{
      type:'boolean',
      requiered:true,
    },

    fechaRecorrido:{
      type:'string',
      requiered:true
    },
    valorRecorrido:{
      type:'number',
      requiered:true
    },
    recorridoId:{
      model:'Recorrido',
    }








  },

};

