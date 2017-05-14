import React, { PropTypes } from 'react';

import eventBus from './eventBus';

class VoteButton extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    bandId: PropTypes.string.isRequired,
    bandName: PropTypes.string.isRequired,
    userHasVotedFor: PropTypes.bool.isRequired,
  };

  voteForBand = (event) => {
    event.preventDefault();

    // pass bandId along with event
    return eventBus.emit('vote-for-band', {
      id: this.props.bandId,
      name: this.props.bandName,
    });
  };

  showOauthButtons = (event) => {
    event.preventDefault();

    // display login buttons when unauthenticated user votes
    return eventBus.emit('show-modal');
  };

  render() {
    if (this.props.loggedIn) {
      if (!this.props.userHasVotedFor) {
        return (
          <div className="band-vote-for float-right">
            <button onClick={this.voteForBand}>
              Vote!
            </button>
          </div>
        );
      }
      return <div />;
    }
    return (
      <div className="sign-in-to-vote float-right">
        <button onClick={this.showOauthButtons}>Vote!</button>
      </div>
    );
  }
}

export default VoteButton;
