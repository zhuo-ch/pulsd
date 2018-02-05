const functions = require('firebase-functions');
const request = require('request');
const rp = require('request-promise');
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
    const callback = (data, functions) => {
      console.log(functions.database.ref('/submissions'));
      console.log(data);
      return event.data.ref.child('submissions').set(data);
    }

    return rp(sendEventbrite(event))
      .then(data => callback(data, functions))
      .catch(err => console.log(err.error));
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

  return options;
}

const sendEventbrite = event => {
  return ({
    url: 'https://www.eventbriteapi.com/v3/events/',
    method: 'POST',
    headers: { "Authorization": `Bearer ${keys.eventbrite}` },
    data: event,
    json: true
  });
}
