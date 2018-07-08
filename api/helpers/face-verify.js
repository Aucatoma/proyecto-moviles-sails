const request = require('request');

module.exports = {


  friendlyName: 'Face verify',


  description: '',


  inputs: {

    faceId: {
      type: 'string',
      description: 'Id de la imagen a comparar',
      required: true
    },
    personGroupId: {
      type: 'string',
      description: 'Id del grupo al que pertenece el cliente',
      required: true
    },
    personId: {
      type: 'string',
      description: 'Id de la persona para comprar',
      required: true
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const subscriptionKey = '0a0e3983b7c646e59fa021fe8b396f0c';
    const uriBase = 'https://southcentralus.api.cognitive.microsoft.com/face/v1.0/verify';
    let jsonResponse = "";
    const options = {
      uri: uriBase,
      body: `{"faceId": "${inputs.faceId}", "personId": "${inputs.personId}", "personGroupId": "${inputs.personGroupId}"}`,
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey
      },
    };

    request.post(options, (error, response, body) => {
      if(error){
        console.log(error);
        return;
      }
      jsonResponse = JSON.stringify(JSON.parse(body), null, ' ');
      console.log(jsonResponse);
      return exits.success(jsonResponse);
    });
    // All done.

  }


};

