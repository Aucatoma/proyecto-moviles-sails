const request = require('request');
const fs = require('fs');

module.exports = {


  friendlyName: 'Add person face',


  description: '',


  inputs: {
    personGroupId: {
      type: 'string',
      description: 'Id del grupo al que pertenece la persona',
      required: true
    },
    personId: {
      type: 'string',
      description: 'Id de la persona a la que se añadirá la cara',
      required: true
    },
    data: {
      type: 'string',
      description: 'Imagen para añadir a la persona en codificación base64',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const subscriptionKey = '0a0e3983b7c646e59fa021fe8b396f0c';
    const uriBase = `https://southcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/${inputs.personGroupId}/persons/${inputs.personId}/persistedFaces`;
    const buffer = Buffer.from(inputs.data, 'base64');

    fs.writeFile("assets/images/imageAdded.jpg", buffer, (err) => {
      if(err){

      }else{
        console.log("File written")
      }
    });

    const options = {
      uri: uriBase,
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
      let jsonResponse = JSON.stringify(JSON.parse(body), null, ' ');
      return exits.success(jsonResponse)
    });

  }


};

