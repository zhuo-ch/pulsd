const functions = require('firebase-functions');
const request = require('request');
const config = require('./config.js');

module.exports = {
  genEventfulToken: () => {
    const { url, method } = config.eventful.requestToken;
    const { oauth_callback, oauth_consumer_key, oauth_signature } = config.eventful;

    return ({
      url,
      method,
      oauth_callback,
      oauth_consumer_key,
      oauth_signature,
    });
  },

  parseEventful: event => {
    return ({
    });
  },
}

// {
//   oauth_callback: 'https://us-central1-pulsd-89f87.cloudfunctions.net/eventful',
//   oauth_consumer_key: '616b9953a2426aecca01',
//   oauth_signature: '62214d03a7101a2c5f35',
// }

// url: 'http://eventful.com/oauth/request_token',
// method: 'POST',
