import React from "react";
import request from "superagent";
import help from "../helpers";
import BandList from "./BandList";
import NewBandForm from "./NewBandForm";
import EventEmitterMixin from "../mixins/EventEmitterMixin";

let Voting = React.createClass({
  displayName: "Voting",
  refreshRate: 500000,
  mixins: [EventEmitterMixin],
  getApiUrl() {
    if (this.props.loggedIn) {
      return "/api/bands";
    } else {
      return /bandsNoAuth/;
    }
  },
  getBandList() {
    let url = `${this.getApiUrl()}?cacheBuster=${Date.now().toString()}`;

    // get a list of bands and vote counts
    return request.get(url).end((error, res) => {
      if (error != null) {
        console.error(error);
        return this.emit("App", "notification", {
          msg: "Error getting band list, please refresh page.",
          type: "error",
          delay: 5
        });
      }

      // update state with bands
      if (this.isMounted()) {
        return this.setState({
          data: res.body
        });
      }
    });
  },
  getInitialState() {
    return { data: [] };
  },
  handleBandVote(band) {
    // post new vote to the server
    return request
      .post(`/api/bands/${band.id}/vote`)
      .set("X-CSRF-Token", help.getCsrfToken())
      .set("Accept", "application/json")
      .end((error, res) => {
        if (error != null || res.status !== 200) {
          console.error(error);
          return this.emit("App", "notification", {
            msg: "Sorry, your vote was not recorded, please try again.",
            type: "error",
            delay: 5
          });
        }

        this.emit("App", "notification", {
          msg: `You voted for ${band.name}!`,
          type: "info",
          delay: 3
        });

        // update band list
        return this.getBandList();
      });
  },
  handleNewBandSubmit(formData) {
    // post new band to the server
    return request
      .post("/api/bands/")
      .send(formData)
      .set("X-CSRF-Token", help.getCsrfToken())
      .set("Accept", "application/json")
      .end((error, res) => {
        if (error != null || res.status !== 200) {
          console.error(error);
          return this.emit("App", "notification", {
            msg: "Sorry, your band was not saved, try again.",
            type: "error",
            delay: 5
          });
        }

        this.emit("App", "notification", {
          msg: `${formData.name} has been nominated!`,
          type: "info",
          delay: 3
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
    return this.addListener("Voting", "vote-for-band", this.handleBandVote);
  },
  render() {
    return (
      <div className="voting-wrapper">
        {this.props.loggedIn
          ? <NewBandForm
              onNewBandSubmit={this.handleNewBandSubmit}
              else={true}
              null={true}
            />
          : undefined}
        <BandList data={this.state.data} loggedIn={this.props.loggedIn} />
      </div>
    );
  }
});

export default Voting;
