import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import eventBus from './eventBus';

class LogIn extends React.Component {
  state = { showModal: false };

  componentDidMount() {
    // appending to the body is easier than managing the z-index of everything on the page
    this.modalTarget = document.createElement('div');
    document.body.appendChild(this.modalTarget);
    ReactDOM.render(this.renderModal(), this.modalTarget);

    // listener for displaying modal
    eventBus.addListener('show-modal', this.handleClick);
  }

  componentDidUpdate() {
    ReactDOM.render(this.renderModal(), this.modalTarget);
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    return document.body.removeChild(this.modalTarget);
  }

  handleClick = () => {
    // eslint-disable-next-line arrow-body-style
    this.setState((prevState) => {
      return { showModal: !prevState.showModal };
    });
  }

  renderModal = () => {
    if (!this.state.showModal) {
      return <span className="login-buttons-target" />;
    }
    return (
      <Modal onRequestClose={this.handleClick}>
        <nav className="login-nav">
          <a href="/auth/facebook" className="login-button login-facebook flag">
            <img src="../images/icon-facebook.svg" className="flag-image" alt="Facebook logo" />
            <span className="flag-body">
              Sign in with <strong>Facebook </strong>
            </span>
          </a>
          <a href="/auth/twitter" className="login-button login-twitter flag">
            <img src="../images/icon-twitter.svg" className="flag-image" alt="Twitter logo" />
            <span className="flag-body">
              Sign in with <strong>Twitter</strong>
            </span>
          </a>
          <a href="/auth/google" className="login-button login-google flag">
            <img src="../images/icon-google.svg" className="flag-image" alt="Google logo" />
            <span className="flag-body">
              Sign in with <strong>Google</strong>
            </span>
          </a>
        </nav>
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
