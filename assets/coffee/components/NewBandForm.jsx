import React from "react";
import ReactDOM from "react-dom";

let NewBandForm = React.createClass({
  displayName: "NewBandForm",
  handleSubmit(e) {
    e.preventDefault();
    let input = ReactDOM.findDOMNode(this.refs.bandName);
    let name = input.value.trim();
    if (!name || name.length <= 2) {
      return;
    }
    this.props.onNewBandSubmit({ name });
    input.value = "";
    input.blur();
  },
  render() {
    return (
      <form className="add-new-band" onSubmit={this.handleSubmit}>
        <input placeholder="Enter band name" ref="bandName" />
      </form>
    );
  }
});

export default NewBandForm;
