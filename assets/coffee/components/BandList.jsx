import React from "react";
import BandItem from "./BandItem";

let BandList = React.createClass({
  displayName: "BandList",
  render() {
    if (this.props.data.length <= 0) {
      return (
        <h1>
          No bands have been nominated yet!
        </h1>
      );
    } else {
      return (
        <ul className="band-list">
          {this.props.data.map(band => {
            return (
              <BandItem
                key={band._id}
                data={band}
                votes={band.vote_count}
                loggedIn={this.props.loggedIn}
              />
            );
          })}
        </ul>
      );
    }
  }
});

export default BandList;
