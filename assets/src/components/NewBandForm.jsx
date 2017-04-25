import React from 'react';
import ReactDOM from 'react-dom';

class NewBandForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const input = ReactDOM.findDOMNode(this.refs.bandName);
    const name = input.value.trim();
    if (!name || name.length <= 2) {
      return;
    }
    this.props.onNewBandSubmit({ name });
    input.value = '';
    input.blur();
  };

  render() {
    return (
      <form className="add-new-band" onSubmit={this.handleSubmit}>
        <input placeholder="Enter band name" ref="bandName" />
      </form>
    );
  }
}

export default NewBandForm;
