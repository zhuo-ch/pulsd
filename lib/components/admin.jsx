import React from 'react';
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
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.dateString = new Date().toTimeString();
    const dateISO = new Date().toISOString().slice(0, 16);
    const timeZone = this.dateString.split(' ')[1].slice(0, 3);

    this.setState({
      start_time_zone: timeZone,
      end_time_zone: timeZone,
      start: dateISO,
    });
  }

  handleChange(e) {
    e.preventDefault();
    const item = e.currentTarget;

    this.setState({ [item.name]: item.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    debugger
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
debugger
    return form;
  }
}

export default Admin;
