import React from 'react';
import firebase from '../firebase';
import { merge } from 'lodash';

class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = [];
  }

  componentDidMount() {
    const dbItem = firebase.database().ref('events');

    dbItem.on('value', snapshot => {
      const events = snapshot.val();
      this.setState( events );
    })
  }

  render() {
    return (
      <ul className='events-list'>
        { this.state }
      </ul>
    )
  }
}

export default EventList;
