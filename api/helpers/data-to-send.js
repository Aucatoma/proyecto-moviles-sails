module.exports = {


  friendlyName: 'Data to sent',


  description: '',


  inputs: {
    cliente: {
      type: 'ref',
      required: true
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    const cliente = inputs.cliente;
    const jwt = await sails.helpers.releaseToken.with({payload: cliente.nombreUsuario});
    const foto = await Foto.findOne({ id: cliente.foto });
    const tarjetasDeCredito = await TarjetaCredito.find({ clienteId: cliente.id});
    const tarjetas = await Promise.all(tarjetasDeCredito.map( async (tarjetaCredito) => {
      tarjetaCredito['recorridos'] = await Recorrido.find({tarjetaCreditoId:tarjetaCredito.id});
      return tarjetaCredito;
    }));
    const tarjetasConConductor = await Promise.all(tarjetas.recorridos.map(async (recorrido) => {
      recorrido.conductorId = await Conductor.find({id: recorrido.conductorId});
      return recorrido;
    }));

    tarjetas.recorridos = tarjetasConConductor;
    cliente.foto = foto;
    cliente.tarjetasDeCredito = tarjetas;
    cliente.jwt = jwt;

    return exits.success(inputs.cliente);

  }


};

