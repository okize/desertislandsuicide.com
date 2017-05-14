/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes } from 'react';

class Notification extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    delay: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  };

  state = { visible: true };

  componentDidMount() {
    return this.setTimer();
  }

  componentWillReceiveProps(nextProps) {
    // reset the timer if children are changed
    if (nextProps.children !== this.props.children) {
      this.setTimer();
      return this.show();
    }
  }

  setTimer = () => {
    // clear any existing timer
    if (this.timer !== null) {
      clearTimeout(this.timer);
    }

    // dismiss after delay
    return this.timer = setTimeout(
      () => {
        this.dismiss();
        return this.timer = null;
      },
      this.props.delay * 1000,
    );
  };

  show = () => this.setState({ visible: true });

  dismiss = () => this.setState({ visible: false });

  render() {
    if (this.state.visible) {
      const className = `notification notification--${this.props.type}`;
      return (
        <div
          className={className}
          onClick={this.dismiss}
          onTouchStart={this.dismiss}
        >
          {this.props.children}
        </div>
      );
    }
    return null;
  }
}

export default Notification;
