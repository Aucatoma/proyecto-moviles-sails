/**
 * Cliente.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre: { type: 'string', required: true },
    apellido: { type: 'string', required: true },
    telefono: { type: 'string', required: true },
    nombreUsuario: { type: 'string', required: true, unique: true },
    contraseniaUsuario: { type: 'string', required: true },
    correoUsuario: { type: 'string', required: true },
    personId: { type: 'string' },

    tarjetasDeCredito:{
      collection:'TarjetaCredito',
      via:'clienteId',
    },

    foto:{
      model:'Foto',
    }


  },

};

