const functions = require('firebase-functions');
const request = require('request');
const rp = require('request-promise');
const keys = require('./config.js');
const eventful = require('./eventful.js');
const eventbrite = require('./eventbrite.js');

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
      console.log(data);
      return event.data.ref.child('submissions/eventbrite').set(data);
    }
    const formData = event.data.val();
    const req = eventbrite.genRequest(eventbrite.format(formData));

    return rp.post(req)
      .then(data => callback(data, functions))
      .catch(err => console.log(err.error));
  });

// exports.eventful = functions.https
//   .onRequest((request, response) => {
//     console.log(request, response);
//     response.send();
//   });
//
// const sendXing = event => {
//   const data = {
//     title: event.title,
//     description: event.description,
//     country: 'USA',
//     selectedDate: event.start,
//     hostId: keys.xing.xingId
//   }
//
//   return ({
//     url: 'https://www.xing-events.com/api/event/create',
//     method: 'POST',
//     data: data
//   });
// }

// const sendEventbrite = event => {
//   return ({
//     url: 'https://www.eventbriteapi.com/v3/events/',
//     headers: { "Authorization": `Bearer ${keys.eventbrite.key}` },
//     data:  event ,
//   });
// }
//
// const formatEventbrite = event => {
//   return JSON.stringify({
//     name: { html: event.name },
//     description: event.description,
//     start: { timezone: event.start_time_zone, utc: event.start },
//     end: { timezone: event.end_time_zone, utc: event.end },
//     currency: event.currency,
//     listed: false,
//   });
// }
