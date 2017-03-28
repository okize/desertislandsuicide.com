import React from "react";
import Modal from "./Modal";
import LogInButtons from "./LogInButtons";
import ReactLayeredComponentMixin from "../mixins/ReactLayeredComponentMixin";
import EventEmitterMixin from "../mixins/EventEmitterMixin";

let LogInLink = React.createClass({
  displayName: "LogInLink",
  mixins: [ReactLayeredComponentMixin, EventEmitterMixin],
  componentDidMount() {
    // listener for displaying modal
    return this.addListener("LogInLink", "show-modal", this.handleClick);
  },
  handleClick() {
    return this.setState({ modalShown: !this.state.modalShown });
  },
  getInitialState() {
    return { modalShown: false };
  },
  renderLayer() {
    if (!this.state.modalShown) {
      return <span className="login-buttons-target" />;
    } else {
      return (
        <Modal onRequestClose={this.handleClick}>
          <LogInButtons />
        </Modal>
      );
    }
  },
  render() {
    return (
      <button className="button-link" onClick={this.handleClick}>
        Sign in to vote!
      </button>
    );
  }
});

export default LogInLink;
