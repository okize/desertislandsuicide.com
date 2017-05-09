import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal.jsx';
import OauthButtons from './OauthButtons.jsx';
import eventBus from './eventBus.js';

class LogIn extends React.Component {
  state = { showModal: false };

  componentDidMount() {
    // appending to the body is easier than managing the z-index of everything on the page
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
    this.unRenderLayer();
    return document.body.removeChild(this.modalTarget);
  }

  handleClick = () => {
    // eslint-disable-next-line arrow-body-style
    this.setState((prevState) => {
      return { showModal: !prevState.showModal };
    });
  }

  unRenderLayer = () => ReactDOM.unmountComponentAtNode(this.modalTarget);

  renderLayer = () => ReactDOM.render(this.renderModal(), this.modalTarget);

  renderModal = () => {
    if (!this.state.showModal) {
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

export default LogIn;
