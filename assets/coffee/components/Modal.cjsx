React = require 'react'
key = require 'keymaster'

Modal = React.createClass
  displayName: 'Modal'

  componentDidMount: ->
    # add keybinding to 'esc' to close modal when shown
    key 'esc', () =>
      @props.onRequestClose()

  componentWillUnmount: ->
    key.unbind 'esc'

  killClick: (e) ->
    # prevent clicks on modal content from closing modal
    e.stopPropagation()

  handleOverlayClick: ->
    # click on the modal overlay requests that modal be closed
    @props.onRequestClose()

  render: ->
    <div className="modal-overlay" onClick={@handleOverlayClick} onTouchStart={@handleOverlayClick}>
      <div className="modal-content" onClick={@killClick} onTouchStart={@killClick}>
        {@props.children}
      </div>
    </div>

module.exports = Modal
