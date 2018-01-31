import React from 'react';
import firebase from './firebase';
import { merge } from 'lodash';
import EventList from './event_list';
import { eventForm } from './event_form';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      start: '',
      start_time_zone: '',
      end: '',
      end_time_zone: '',
      currency: 'USD',
      listed: false,
      events: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.setData = this.setData.bind(this);
  }

  componentDidMount() {
    this.setFirebase();
    this.firebase.on('value', snapshot => this.setData(snapshot.val()));
    this.dateString = new Date().toTimeString();
    const dateISO = new Date().toISOString().slice(0, 16);
    const timeZone = this.dateString.split(' ')[1].slice(0, 3);

    this.setState({
      start_time_zone: timeZone,
      end_time_zone: timeZone,
      start: dateISO,
    });
  }

  setFirebase() {
    this.firebase = firebase.database().ref('events');
  }

  setData(snapshot) {
    this.setState({ events: snapshot });
  }

  handleChange(e) {
    e.preventDefault();
    const item = e.currentTarget;

    this.setState({ [item.name]: item.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const event = this.getEventObject();

    this.firebase.push(event);
  }

  handleShow(e) {
    e.preventDefault();
    const events = merge({}, this.state.events);
    events[e.currentTarget.id].show = events[e.currentTarget.id].show ? false : true;
    this.setState({ events });
  }

  getEventObject() {
    const event = merge({}, this.state);
    delete event.events;

    return event;
  }

  genForm() {
    return eventForm({
      state: this.state,
      change: this.handleChange,
      submit: this.handleSubmit,
    });
  }

  render() {
    const form = this.genForm();

    return (
      <div className='admin-container'>
        { form }
        <EventList list={ this.state.events } click={ this.handleShow } />
      </div>
    );
  }
}

export default Admin;
