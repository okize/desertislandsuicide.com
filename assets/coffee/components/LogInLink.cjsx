React = require 'react'
Modal = require './Modal'
LogInButtons = require './LogInButtons'
ReactLayeredComponentMixin = require '../mixins/ReactLayeredComponentMixin'
EventEmitterMixin = require '../mixins/EventEmitterMixin'

LogInLink = React.createClass
  displayName: 'LogInLink'

  mixins: [ReactLayeredComponentMixin, EventEmitterMixin]

  componentDidMount: ->
    # listener for displaying modal
    @addListener 'LogInLink', 'show-modal', @handleClick

  handleClick: ->
    @setState {modalShown: !@state.modalShown}

  getInitialState: ->
    {modalShown: false}

  renderLayer: ->
    if (!@state.modalShown)
      return (
        <span className="login-buttons-target" />
      )
    else
      return (
        <Modal onRequestClose={@handleClick}>
          <LogInButtons />
        </Modal>
      )

  render: ->
    <button className="button-link" onClick={@handleClick}>Sign in to vote!</button>

module.exports = LogInLink
