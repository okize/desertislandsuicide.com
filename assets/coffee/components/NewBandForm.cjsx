React = require 'react'

NewBandForm = React.createClass
  displayName: 'NewBandForm'

  handleSubmit: (e) ->
    ENTER_KEY = 13
    return if e.which != ENTER_KEY
    e.preventDefault()
    name = @refs.bandName.getDOMNode().value.trim()
    if name
      @props.onNewBandSubmit {name: name}
      @refs.bandName.getDOMNode().value = ''
    return

  render: ->
    <form className="add-new-band">
      <input
        onKeyDown={@handleSubmit}
        placeholder="Enter band name"
        ref="bandName"
      />
    </form>

module.exports = NewBandForm
