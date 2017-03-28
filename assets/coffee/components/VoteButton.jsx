import React from "react";
import LogInLink from "./LogInLink";
import EventEmitterMixin from "../mixins/EventEmitterMixin";

let VoteButton = React.createClass({
  displayName: "VoteButton",
  mixins: [EventEmitterMixin],
  voteForBand(e) {
    e.preventDefault();

    // pass bandId along with event
    return this.emit("Voting", "vote-for-band", {
      id: this.props.bandId,
      name: this.props.bandName
    });
  },
  showLoginButtons(e) {
    e.preventDefault();

    // display login buttons when unauthenticated user votes
    return this.emit("LogInLink", "show-modal");
  },
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
      } else {
        return <div />;
      }
    } else {
      return (
        <div className="sign-in-to-vote float-right">
          <button onClick={this.showLoginButtons}>
            Vote!
          </button>
        </div>
      );
    }
  }
});

export default VoteButton;
