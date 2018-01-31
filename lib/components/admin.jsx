import React from 'react';
import EventList from './event_list';

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
      currency: '',
      listed: false,
    }
  }

  componentDidMount() {
    const time = new Date();
    const timeZone = time.split(' ')[4].slice(0, 3);

    this.setState({ start_time_zone: timeZone, end_time_zone: timeZone });
  }

  render() {
    return (
      <h1>Hello World</h1>
    );
  }
}

export default Admin;
