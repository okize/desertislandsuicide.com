import React, { PropTypes } from 'react';
import VoteButton from './VoteButton';

class BandList extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    data: PropTypes.shape({
      length: PropTypes.number,
      map: PropTypes.array,
    }).isRequired,
  };

  renderBandItem(band) {
    return (
      <li className="band-item" key={band._id}>
        <div className="band-vote-count">
          {band.vote_count}
        </div>
        <div className="band-name">
          {band.name}
        </div>
        <VoteButton
          bandId={band._id}
          bandName={band.name}
          userHasVotedFor={band.userHasVotedFor}
          loggedIn={this.props.loggedIn}
        />
      </li>
    );
  }

  render() {
    if (this.props.data.length <= 0) {
      return <h1>No bands have been nominated yet!</h1>;
    }

    return (
      <ul className="band-list">
        {this.props.data.map(band => this.renderBandItem(band))}
      </ul>
    );
  }
}

export default BandList;
