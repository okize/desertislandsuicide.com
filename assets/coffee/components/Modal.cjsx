React = require 'react'

Modal = React.createClass
  displayName: 'Modal'

  killClick: (e) ->
    # clicks on the content shouldn't close the modal
    e.stopPropagation()

  handleBackdropClick: ->
    # when you click the background, the user is requesting that the modal gets closed.
    # note that the modal has no say over whether it actually gets closed. the owner of the
    # modal owns the state. this just "asks" to be closed.
    @props.onRequestClose()

  render: ->
    <div className="modal-overlay" onClick={@handleBackdropClick}>
      <div className="modal-content" onClick={@killClick}>
        {@props.children}
      </div>
    </div>

module.exports = Modal
