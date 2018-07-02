const request = require('request');

module.exports = {


  friendlyName: 'Create person',


  description: '',


  inputs: {
    personGroupId: {
      type: 'string',
      description: 'Id del grupo al que se añade la persona',
      required: true
    },
    username: {
      type: 'string',
      description: 'Nombre del usuario que se añade al grupo',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    const subscriptionKey = '0a0e3983b7c646e59fa021fe8b396f0c';
    const uriBase = `https://southcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/${inputs.personGroupId}/persons`;
    let jsonResponse = "";
    const options = {
      uri: uriBase,
      body: `{"name": "${inputs.username}"}`,
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
      return exits.success(jsonResponse);
    });
    // All done.

  }


};

