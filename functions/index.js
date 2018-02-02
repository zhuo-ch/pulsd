const functions = require('firebase-functions');
const request = require('request');
const keys = require('./config.js');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.syndicate = functions.database
  .ref('/events/{eventId}')
  .onCreate(event => {
    return sendEventbrite(event, callback.apply(this));
  });

const sendXing = event => {
  const data = {
    title: event.title,
    description: event.description,
    country: 'USA',
    selectedDate: event.start,
    hostId: keys.xingId
  }

  const options = {
    url: 'https://www.xing-events.com/api/event/create',
    method: 'POST',
    data: data
  }

  return request(options, callback);
}

const sendEventbrite = event => {
  event.token = keys.eventbrite;
  const options = {
    url: 'https://www.eventbriteapi.com/v3/posts/',
    method: 'POST',
    data: event
  }

  return request(options, callback);
}

const callback = (err, res, body) => {
  let data = err ? err : res;
  functions.database.ref('/responses').set(response);
}
