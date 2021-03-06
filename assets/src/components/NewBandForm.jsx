import React, { PropTypes } from 'react';

class NewBandForm extends React.Component {
  static propTypes = {
    onNewBandSubmit: PropTypes.func.isRequired,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.bandName;
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
        <input placeholder="Enter band name" ref={(component) => { this.bandName = component; }} />
      </form>
    );
  }
}

export default NewBandForm;
