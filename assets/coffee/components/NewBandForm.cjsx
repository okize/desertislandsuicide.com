React = require 'react'

NewBandForm = React.createClass
  displayName: 'NewBandForm'

  handleSubmit: (e) ->
    e.preventDefault()
    name = @refs.name.getDOMNode().value.trim()
    return unless name
    @props.onNewBandSubmit {name: name}
    @refs.name.getDOMNode().value = ''
    return

  render: ->
    <form className="add-new-band" onSubmit={@handleSubmit}>
      <input type="text" placeholder="Enter band name" ref="name" />
      <input type="submit" value="Submit" />
    </form>

module.exports = NewBandForm
