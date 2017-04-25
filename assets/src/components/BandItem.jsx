import React from 'react';
import VoteButton from './VoteButton.jsx';

class BandItem extends React.Component {
  render() {
    return (
      <li className="band-item">
        <div className="band-vote-count">
          {this.props.votes}
        </div>
        <div className="band-name">
          {this.props.data.name}
        </div>
        <VoteButton
          bandId={this.props.data._id}
          bandName={this.props.data.name}
          userHasVotedFor={this.props.data.userHasVotedFor}
          loggedIn={this.props.loggedIn}
        />
      </li>
    );
  }
}

export default BandItem;
