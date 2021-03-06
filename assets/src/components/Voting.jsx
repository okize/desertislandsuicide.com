import React, { PropTypes } from 'react';
import request from 'superagent';

import { getCsrfToken } from '../helpers';
import BandList from './BandList';
import NewBandForm from './NewBandForm';
import eventBus from './eventBus';

const REFRESH_RATE = 500000;

class Voting extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
  };

  state = { data: [] };

  componentDidMount() {
    // load band list
    this.getBandList();

    // periodically update list with new entries
    setInterval(this.getBandList, REFRESH_RATE);

    // listener for band votes
    eventBus.addListener('vote-for-band', this.handleVoteForBand);
  }

  getApiUrl = () => {
    if (this.props.loggedIn) {
      return '/api/bands';
    }
    return /bandsNoAuth/;
  };

  // get a list of bands and vote counts
  getBandList = () => {
    const url = `${this.getApiUrl()}?cacheBuster=${Date.now().toString()}`;

    return request.get(url).end((error, res) => {
      if (error != null) {
        return eventBus.emit('display-notification', {
          msg: 'Error getting band list, please refresh page.',
          type: 'error',
          delay: 5,
        });
      }

      // update state with bands
      return this.setState({
        data: res.body,
      });
    });
  };

  // post new vote
  handleVoteForBand = band =>
     request
      .post(`/api/bands/${band.id}/vote`)
      .set('X-CSRF-Token', getCsrfToken())
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (error != null || res.status !== 200) {
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

  // post new band
  handleNewBandSubmit = formData =>
     request
      .post('/api/bands/')
      .send(formData)
      .set('X-CSRF-Token', getCsrfToken())
      .set('Accept', 'application/json')
      .end((error, res) => {
        if (error != null || res.status !== 200) {
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

  render() {
    return (
      <div className="voting-wrapper">
        {this.props.loggedIn && <NewBandForm onNewBandSubmit={this.handleNewBandSubmit} />}
        <BandList data={this.state.data} loggedIn={this.props.loggedIn} />
      </div>
    );
  }
}

export default Voting;
