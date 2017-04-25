import React from 'react';
import key from 'keymaster';

class Modal extends React.Component {
  componentDidMount() {
    // add keybinding to 'esc' to close modal when shown
    return key('esc', () => this.props.onRequestClose());
  }

  componentWillUnmount() {
    return key.unbind('esc');
  }

  // prevent clicks on modal content from closing modal
  killClick = event => event.stopPropagation();

  // click on the modal overlay requests that modal be closed
  handleOverlayClick = () => this.props.onRequestClose();

  render() {
    return (
      <div className="modal-overlay" onClick={this.handleOverlayClick} onTouchStart={this.handleOverlayClick}>
        <div className="modal-content" onClick={this.killClick} onTouchStart={this.killClick}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
