React = require 'react'
Modal = require './Modal'
LogIn = require './LogIn'
ReactLayeredComponentMixin = require '../mixins/ReactLayeredComponentMixin'

LogInLink = React.createClass
  displayName: 'LogInLink'

  mixins: [ReactLayeredComponentMixin],

  handleClick: ->
    @setState {shown: !@state.shown}

  getInitialState: ->
    {shown: false, modalShown: false}

  renderLayer: ->
    if (!@state.shown)
      return (
        <span />
      )
    else
      return (
        <Modal onRequestClose={@handleClick}>
          <LogIn />
        </Modal>
      )

  render: ->
    <a href="#" role="button" onClick={@handleClick}>Sign in to vote!</a>

module.exports = LogInLink
