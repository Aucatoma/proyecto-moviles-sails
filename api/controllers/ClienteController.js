/**
 * ClienteController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const fs = require('fs');

module.exports = {


  authentication: async function(req, res){

    /* Conversión de datos de http body a JSON */
    const datosRecv = JSON.parse(JSON.stringify(req.body));

    /* Se obtiene usuario y foto/password por separado */
    const usernameRecv = datosRecv.username;
    const fotoRecv = datosRecv.foto;
    const passwordRecv = datosRecv.password;

    if(passwordRecv === undefined){
      console.log("Login con cara");

      /* Face detect de la foto enviada, se obtiene el faceId */
      const faceIdResponse = await sails.helpers.faceDetect.with({ data: fotoRecv, returnFaceId: 'true', returnFaceLandmarks: 'false'});
      const faceIdRecv = JSON.parse(faceIdResponse)[0].faceId;


      /* Query del cliente que contiene el usuario recibido para obtener personId */
      const clientQueryRes = await Cliente.findOne({nombreUsuario: usernameRecv});
      const personIdQueryRes = clientQueryRes.personId;

      /* Verificación del usuario con los datos enviados realizando faceVerify */
      const respuestaVerify = await sails.helpers.faceVerify.with({ faceId: faceIdRecv, personGroupId: 'clientes', personId: personIdQueryRes });
      const isIdentical = JSON.parse(respuestaVerify).isIdentical;
      console.log(respuestaVerify);

      if(isIdentical){
        const data2Send = await sails.helpers.dataToSend.with({cliente: clientQueryRes});
        res.ok(data2Send);
      }else{
        res.notFound();
      }
    }else{
      console.log("Login con pw");
      const passwordQueryRes = await Cliente.findOne({ contraseniaUsuario: passwordRecv, nombreUsuario: usernameRecv});
      if(!passwordQueryRes){
        res.notFound();
      }else{
        const data2Send = await sails.helpers.dataToSend.with({cliente: passwordQueryRes});
        res.ok(data2Send);
      }
    }

  },

  verify: async function(req, res){
    const usernameRec = JSON.parse(JSON.stringify(req.body)).username;
    const userVerification = await Cliente.findOne({nombreUsuario: usernameRec});
    console.log(userVerification);
    if(!userVerification){
      res.notFound();
    }
    else{
      res.ok();
    }
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


    const addFace = await sails.helpers.addPersonFace.with({ personGroupId: 'clientes', personId: personIdRes, data: respuestaFoto.datos});



    console.log(addFace);

    res.ok();

  }

};

