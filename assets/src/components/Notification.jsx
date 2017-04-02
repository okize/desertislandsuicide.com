import React from "react";

let Notification = React.createClass({
  displayName: "Notification",
  getInitialState() {
    return { visible: true };
  },
  show() {
    return this.setState({ visible: true });
  },
  dismiss() {
    return this.setState({ visible: false });
  },
  componentWillReceiveProps(nextProps) {
    // reset the timer if children are changed
    if (nextProps.children !== this.props.children) {
      this.setTimer();
      return this.show();
    }
  },
  componentDidMount() {
    return this.setTimer();
  },
  setTimer() {
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
      this.props.delay * 1000
    );
  },
  render() {
    if (this.state.visible) {
      let className = `notification notification--${this.props.type}`;
      return (
        <div
          className={className}
          onClick={this.dismiss}
          onTouchStart={this.dismiss}
        >
          {this.props.children}
        </div>
      );
    } else {
      return <span />;
    }
  }
});

export default Notification;
