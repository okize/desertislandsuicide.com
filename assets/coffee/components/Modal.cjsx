React = require 'react'
keymaster = require 'keymaster'

Modal = React.createClass
  displayName: 'Modal'

  componentDidMount: ->
    # add keybinding to 'esc' to close modal when shown
    keymaster 'esc', () =>
      @props.onRequestClose()

  componentWillUnmount: ->
    keymaster.unbind 'esc'

  killClick: (e) ->
    # prevent clicks on modal content from closing modal
    e.stopPropagation()

  handleOverlayClick: ->
    # click on the modal overlay requests that modal be closed
    @props.onRequestClose()

  render: ->
    <div className="modal-overlay" onClick={@handleOverlayClick}>
      <div className="modal-content" onClick={@killClick}>
        {@props.children}
      </div>
    </div>

module.exports = Modal
