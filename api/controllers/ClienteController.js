/**
 * ClienteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fs = require('fs');

module.exports = {


  login: async function(req, res){


    const datosRecibidos = JSON.parse(JSON.stringify(req.body));
    const username = datosRecibidos.username;
    const foto = datosRecibidos.foto;
    console.log(username);

    const faceIdResponse = await sails.helpers.faceDetect.with({ data: foto, returnFaceId: 'true', returnFaceLandmarks: 'false'});
    const faceIdText = JSON.parse(faceIdResponse)[0].faceId;
    console.log(faceIdText);

    const clientText = await Cliente.find({nombreUsuario: username});
    const personIdVerify = JSON.parse(JSON.stringify(clientText))[0].personId;
    console.log(personIdVerify);
    const respuestaVerify = await sails.helpers.faceVerify.with({ faceId: faceIdText, personGroupId: 'clientes', personId: personIdVerify });
    console.log(respuestaVerify);

    res.send(respuestaVerify);
  },

  registrar: async function(req, res){



    const datosRecibidos = JSON.parse(JSON.stringify(req.body));
    const cliente =  datosRecibidos.cliente;
    const foto = datosRecibidos.foto;

    const respuestaCliente = await Cliente.create(cliente).fetch();

    const respuestaFoto = await Foto.create(foto).fetch();

    const updateCliente = await Cliente.update({id: respuestaCliente.id}).set({foto: respuestaFoto.id}).fetch();


    const respuestaPersonId = await sails.helpers.createPerson.with({ personGroupId:'clientes', username:respuestaCliente.nombreUsuario });

    const personIdRes = JSON.parse(respuestaPersonId).personId;

    const respuestaUpdate = await Cliente.update({id: respuestaCliente.id}).set({personId: personIdRes}).fetch();
    console.log(respuestaUpdate.id);


    const addFace = await sails.helpers.addPersonFace.with({ personGroupId: 'clientes', personId: personIdRes, data: respuestaFoto.datos});
    res.ok(addFace);

  }

};

