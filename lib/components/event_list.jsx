import React from 'react';
import { merge } from 'lodash';

const EventList = ({ list, click }) => {
  const eventList = list.map(el => getEvent(el));
  return (
    <ul className='events-list'>
      { eventList }
    </ul>
  );
}

const getEvent = ev => {
  debugger
}

export default EventList;
