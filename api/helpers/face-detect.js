const request = require('request');
const fs = require('fs');

module.exports = {


  friendlyName: 'Face detect',


  description: '',


  inputs: {
    data:{
      type: 'string',
      description: 'Imagen a detectar',
      required: true
    },
    returnFaceId: {
      type: 'string',
      description: 'Retorna faceId o no',
    },
    returnFaceLandmarks: {
      type: 'string',
      description: 'Retorna faceLandmarks o no',
    },
    returnFaceAttributes: {
      type: 'string',
      description: 'Atributos a retornar',
      defaultsTo: ''
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    const subscriptionKey = '0a0e3983b7c646e59fa021fe8b396f0c';
    const uriBase = 'https://southcentralus.api.cognitive.microsoft.com/face/v1.0/detect';
    let jsonResponse = "";
    const buffer = Buffer.from(inputs.data, 'base64');
    fs.writeFile("assets/images/imageDetected.jpg", buffer, (err) => {
      if(err){

      }else{
        console.log("File written")
      }
    });
    const params = {
      'returnFaceId': `${inputs.returnFaceId}`
      //'returnFaceLandmarks': `${inputs.returnFaceLandmarks}`,
      //'returnFaceAttributes': `${inputs.returnFaceAttributes}`
    };

    const options = {
      uri: uriBase,
      qs: params,
      body: buffer,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': subscriptionKey
      },
    };

    request.post(options, (error, response, body) => {
      if(error){
        console.log(error);
        return;
      }
      jsonResponse = JSON.stringify(JSON.parse(body), null, ' ');
      return exits.success(jsonResponse);
    });
    // All done.

  }


};

