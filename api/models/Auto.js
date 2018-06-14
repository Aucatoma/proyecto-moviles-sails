/**
 * Auto.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    marcaAuto: {type: 'string', required: true },
    modeloAuto: { type: 'string', required: true },
    placaAuto: { type: 'string', required: true },
    conductorId:{
      model:'Conductor',
    }


  },

};

