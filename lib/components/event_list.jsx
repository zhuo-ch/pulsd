import React from 'react';
import { merge } from 'lodash';

const EventList = ({ list, click }) => {
  const eventList = Object.keys(list).map(item => {
    const show = showEvent(list[item]) || '';

    return (
      <li className='event-item' key={ item } id={ item } onClick={ click }>
        { list[item].name }
        { show }
      </li>
    )
  });

  return (
    <ul className='events-list'>
      { eventList }
    </ul>
  );
}

const showEvent = event => {
  if (event.show) {
    return getEventDetails(event);
  }
}

const getEventDetails = event => {
  const details = Object.keys(event).map(key => {
    return (
      <li className='detail' key={ key }>
        { key }: { event[key] }
      </li>
    );
  });

  return (
    <ul className='details-list'>
      { details }
    </ul>
  );
}

export default EventList;
