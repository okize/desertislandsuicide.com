React = require 'react'
Modal = require './Modal'
LogInButtons = require './LogInButtons'
ReactLayeredComponentMixin = require '../mixins/ReactLayeredComponentMixin'

LogInLink = React.createClass
  displayName: 'LogInLink'

  mixins: [ReactLayeredComponentMixin],

  handleClick: ->
    @setState {modalShown: !@state.modalShown}

  getInitialState: ->
    {modalShown: false}

  renderLayer: ->
    if (!@state.modalShown)
      return (
        <span />
      )
    else
      return (
        <Modal onRequestClose={@handleClick}>
          <LogInButtons />
        </Modal>
      )

  render: ->
    <a href="#" role="button" onClick={@handleClick}>Sign in to vote!</a>

module.exports = LogInLink
