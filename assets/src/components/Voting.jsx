import React from 'react';
import request from 'superagent';

import { getCsrfToken } from '../helpers';
import BandList from './BandList.jsx';
import NewBandForm from './NewBandForm.jsx';
import eventBus from './eventBus.js';

const Voting = React.createClass({
  displayName: 'Voting',
  refreshRate: 500000,
  getApiUrl() {
    if (this.props.loggedIn) {
      return '/api/bands';
    }
    return /bandsNoAuth/;
  },
  getBandList() {
    const url = `${this.getApiUrl()}?cacheBuster=${Date.now().toString()}`;

    // get a list of bands and vote counts
    return request.get(url).end((error, res) => {
      if (error != null) {
        console.error(error);
        return eventBus.emit('display-notification', {
          msg: 'Error getting band list, please refresh page.',
          type: 'error',
          delay: 5,
        });
      }

      // update state with bands
      if (this.isMounted()) {
        return this.setState({
          data: res.body,
        });
      }
    });
  },
  getInitialState() {
    return { data: [] };
  },
  handleVoteForBand(band) {
    // post new vote to the server
    return request
      .post(`/api/bands/${band.id}/vote`)
      .set('X-CSRF-Token', getCsrfToken())
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (error != null || res.status !== 200) {
          console.error(error);
          return eventBus.emit('display-notification', {
            msg: 'Sorry, your vote was not recorded, please try again.',
            type: 'error',
            delay: 5,
          });
        }

        eventBus.emit('display-notification', {
          msg: `You voted for ${band.name}!`,
          type: 'info',
          delay: 3,
        });

        // update band list
        return this.getBandList();
      });
  },
  handleNewBandSubmit(formData) {
    // post new band to the server
    return request
      .post('/api/bands/')
      .send(formData)
      .set('X-CSRF-Token', getCsrfToken())
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (error != null || res.status !== 200) {
          console.error(error);
          return eventBus.emit('display-notification', {
            msg: 'Sorry, your band was not saved, try again.',
            type: 'error',
            delay: 5,
          });
        }

        eventBus.emit('display-notification', {
          msg: `${formData.name} has been nominated!`,
          type: 'info',
          delay: 3,
        });

        // update band list
        return this.getBandList();
      });
  },
  componentDidMount() {
    // load band list
    this.getBandList();

    // periodically update list with new entries
    setInterval(this.getBandList, this.refreshRate);

    // listener for band votes
    eventBus.addListener('vote-for-band', this.handleVoteForBand);
  },
  render() {
    return (
      <div className="voting-wrapper">
        {this.props.loggedIn && <NewBandForm onNewBandSubmit={this.handleNewBandSubmit} else={true} null={true} />}
        <BandList data={this.state.data} loggedIn={this.props.loggedIn} />
      </div>
    );
  },
});

export default Voting;
