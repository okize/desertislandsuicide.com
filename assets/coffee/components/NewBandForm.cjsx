React = require 'react'
ReactDOM = require 'react-dom'

NewBandForm = React.createClass
  displayName: 'NewBandForm'

  handleSubmit: (e) ->
    e.preventDefault()
    input = ReactDOM.findDOMNode(@refs.bandName)
    name = input.value.trim()
    return unless name and name.length > 2
    @props.onNewBandSubmit {name: name}
    input.value = ''
    input.blur()
    return

  render: ->
    <form className="add-new-band" onSubmit={@handleSubmit}>
      <input placeholder="Enter band name" ref="bandName" />
    </form>

module.exports = NewBandForm
