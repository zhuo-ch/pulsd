import React from 'react';
import firebase from './firebase';
import { merge } from 'lodash';
import EventList from './event_list';
import { eventForm } from './event_form';

const _nullState = {
  name: '',
  description: '',
  start: '',
  start_time_zone: 'America/New_York',
  end: '',
  end_time_zone: 'America/New_York',
  currency: 'USD',
  listed: false,
  events: [],
  submissions: {},
  submit: true,
}

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = _nullState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.toggle = this.toggle.bind(this);
    this.reset = this.reset.bind(this);
    this.setData = this.setData.bind(this);
    this.logSnap = this.logSnap.bind(this);
  }

  componentDidMount() {
    this.setFirebase();
    this.firebase.on('value', snapshot => this.setData(snapshot.val()));
    const dateISO = new Date().toISOString().slice(0, 16);

    this.setState({ start: dateISO });
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

    this.firebase
      .push(event)
      .then(() => this.toggle());
      // .then(snap => this.logSnap(snap));
      // // .then(() => {
      // //   const newState = merge({}, _nullState, { events: this.state.events });
      // //   this.setState(newState);
      // // });
  }

  handleShow(e) {
    e.preventDefault();
    const events = merge({}, this.state.events);
    events[e.currentTarget.id].show = events[e.currentTarget.id].show ? false : true;
    this.setState({ events });
  }

  reset() {
    const state = merge({}, _nullState, { events: this.state.events });
    this.setState(state);
  }

  toggle() {
    this.setState({ submit: this.state.submit ? false : true });
  }

  logSnap(key) {
    this.setState({ submissions: { key } });
  }

  getEventObject() {
    const start = this.toISO(this.state.start);
    const end = this.toISO(this.state.end);
    const event = merge({}, this.state, { start, end });
    delete event.events;
    delete event.submissions;

    return event;
  }

  toISO(string) {
    return string + ':00Z';
  }

  genForm() {
    return eventForm({
      state: this.state,
      change: this.handleChange,
      submit: this.handleSubmit,
      reset: this.reset,
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
