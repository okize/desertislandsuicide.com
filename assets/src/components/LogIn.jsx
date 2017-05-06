import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal.jsx';
import OauthButtons from './OauthButtons.jsx';
import eventBus from './eventBus.js';

class LogInLink extends React.Component {
  state = { modalShown: false };

  componentDidMount() {
    // Appending to the body is easier than managing the z-index of everything on the page.
    // It's also better for accessibility and makes stacking a snap (since components will stack
    // in mount order).
    this.modalTarget = document.createElement('div');
    document.body.appendChild(this.modalTarget);
    this.renderLayer();

    // listener for displaying modal
    eventBus.addListener('show-modal', this.handleClick);
  }

  componentDidUpdate() {
    return this.renderLayer();
  }

  componentWillUnmount() {
    this.unrenderLayer();
    return document.body.removeChild(this.modalTarget);
  }

  // By calling this method in componentDidMount() and componentDidUpdate(), you're effectively
  // creating a "wormhole" that funnels React's hierarchical updates through to a DOM node on an
  // entirely different part of the page.
  getLayerNode = () => ReactDOM.findDOMNode(this.modalTarget);

  unrenderLayer = () => React.unmountComponentAtNode(this.modalTarget);

  handleClick = () => this.setState({ modalShown: !this.state.modalShown });
  // renderLayer = () => ReactDOM.render(this.renderLayer(), this.modalTarget);

  renderLayer = () => {
    if (!this.state.modalShown) {
      return <span className="login-buttons-target" />;
    }
    return (
      <Modal onRequestClose={this.handleClick}>
        <OauthButtons />
      </Modal>
    );
  };

  render() {
    return (
      <div className="logged-out">
        <button className="button-link" onClick={this.handleClick}>Sign in to vote!</button>
      </div>
    );
  }
}

export default LogInLink;
