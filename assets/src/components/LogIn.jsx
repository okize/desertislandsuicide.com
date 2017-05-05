import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal.jsx';
import OauthButtons from './OauthButtons.jsx';
import eventBus from './eventBus.js';

class LogInLink extends React.Component {
  static displayName = 'LogInLink';
  state = { modalShown: false };

  componentWillUnmount() {
    this._unrenderLayer();
    return document.body.removeChild(this._target);
  }

  componentDidUpdate() {
    return this._renderLayer();
  }

  componentDidMount() {
    // Appending to the body is easier than managing the z-index of everything on the page.
    // It's also better for accessibility and makes stacking a snap (since components will stack
    // in mount order).
    this._target = document.createElement('div');
    document.body.appendChild(this._target);
    this._renderLayer();

    // listener for displaying modal
    eventBus.addListener('show-modal', this.handleClick);
  }

  _renderLayer = () =>
    // By calling this method in componentDidMount() and componentDidUpdate(), you're effectively
    // creating a "wormhole" that funnels React's hierarchical updates through to a DOM node on an
    // entirely different part of the page.
     ReactDOM.render(this.renderLayer(), this._target);

  _unrenderLayer = () => React.unmountComponentAtNode(this._target);

  _getLayerNode = () => ReactDOM.findDOMNode(this._target);

  handleClick = () => this.setState({ modalShown: !this.state.modalShown });

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
