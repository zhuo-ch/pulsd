const functions = require('firebase-functions');
const request = require('request');
const config = require('./config.js');

module.exports = {
  genEventfulRequest: event => {
    const { url, method } = config.eventful.requestToken;

    return ({
      url,
      method,
      oauth_callback: `${config.keys.databaseURL}/eventful`,
      oauth_consumer_key: config.eventful.consumer,
      oauth_signature: config.eventful.secret,
    });
  },

  parseEventful: event => {
    return ({
    });
  },
}
