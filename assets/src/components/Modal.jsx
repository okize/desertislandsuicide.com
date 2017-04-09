import React from 'react';
import key from 'keymaster';

const Modal = React.createClass({
  displayName: 'Modal',
  componentDidMount() {
    // add keybinding to 'esc' to close modal when shown
    return key('esc', () => this.props.onRequestClose());
  },
  componentWillUnmount() {
    return key.unbind('esc');
  },
  killClick(e) {
    // prevent clicks on modal content from closing modal
    return e.stopPropagation();
  },
  handleOverlayClick() {
    // click on the modal overlay requests that modal be closed
    return this.props.onRequestClose();
  },
  render() {
    return (
      <div
        className="modal-overlay"
        onClick={this.handleOverlayClick}
        onTouchStart={this.handleOverlayClick}
      >
        <div
          className="modal-content"
          onClick={this.killClick}
          onTouchStart={this.killClick}
        >
          {this.props.children}
        </div>
      </div>
    );
  },
});

export default Modal;
