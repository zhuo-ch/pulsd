import React from 'react';
import { merge } from 'lodash';

const EventList = ({ list }) => {
  return (
    <ul className='events-list'>
      { list }
    </ul>
  );
}

export default EventList;
