/**
 * RecorridoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  create: async function (req, res){
    const recorridoRecv = req.body;

    const conductor = await Conductor.findOne({id: Math.floor((Math.random() * 4) + 1)});

    recorridoRecv.conductorId = conductor.id;

    const recorridoInsertado = await Recorrido.create(recorridoRecv).fetch();
    recorridoInsertado.conductorId = undefined;
    recorridoInsertado.conductor = conductor;

    console.log(recorridoInsertado);


    res.ok(recorridoInsertado);
  }

};

