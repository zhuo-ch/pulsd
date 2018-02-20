const functions = require('firebase-functions');
const keys = require('./config.js');

module.exports = {
  genRequest: event => {
    const headers = {
      'Authorization': `Bearer ${ keys.eventbrite.token }`,
      'Content-Type': 'application/json',
    }

    return ({
      url: 'https://www.eventbriteapi.com/v3/events/',
      headers,
      body: { event },
      json: true,
    });
  },

  format: event => {
    return ({
      name: { html: event.name },
      description: { html: event.description },
      start: { timezone: event.start_time_zone, utc: event.start },
      end: { timezone: event.end_time_zone, utc: event.end },
      currency: event.currency,
      listed: false,
    });
  },
}
