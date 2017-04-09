import React from 'react';
import BandItem from './BandItem.jsx';

const BandList = React.createClass({
  displayName: 'BandList',
  render() {
    if (this.props.data.length <= 0) {
      return (
        <h1>
          No bands have been nominated yet!
        </h1>
      );
    }
    return (
      <ul className="band-list">
        {this.props.data.map(band => (
          <BandItem
            key={band._id}
            data={band}
            votes={band.vote_count}
            loggedIn={this.props.loggedIn}
          />
            ))}
      </ul>
    );
  },
});

export default BandList;
