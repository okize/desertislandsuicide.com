import React from 'react';

class Notification extends React.Component {
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
    if (this._timer !== null) {
      clearTimeout(this._timer);
    } else {
      null;
    }

    // dismiss after delay
    return this._timer = setTimeout(
      () => {
        this.dismiss();
        return this._timer = null;
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
