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

    console.log(tarjetas);


    const tarjetasConConductor = await Promise.all(tarjetas.map( async (tarjetaDeCredito) => {
      tarjetaDeCredito.recorridos = await Promise.all(tarjetaDeCredito.recorridos.map(async (recorrido)=> {
        recorrido.conductor = await Conductor.findOne({ id: recorrido.conductorId });
        return recorrido;
      }));
      return tarjetaDeCredito;
    }));

    cliente.foto = foto;
    cliente.tarjetasDeCredito = tarjetasConConductor;
    cliente.jwt = jwt;

    return exits.success(inputs.cliente);

  }


};

