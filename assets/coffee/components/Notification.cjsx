React = require 'react'

Notification = React.createClass
  displayName: 'Notification'

  getDefaultProps: ->
    delay: 1000
    type: 'info'
    message: ''

  getInitialState: ->
    visible: true

  show: ->
    @setState visible: true

  dismiss: ->
    @setState visible: false

  componentWillReceiveProps: (nextProps) ->
    # reset the timer if children are changed
    if nextProps.children != @props.children
      @setTimer()
      @show()

  componentDidMount: ->
    @setTimer()

  setTimer: ->
    # clear any existing timer
    if @_timer != null then clearTimeout(@_timer) else null

    # dismiss after delay
    @_timer = setTimeout((->
      @dismiss()
      @_timer = null
    ).bind(this), @props.delay)

  render: ->
    if @state.visible
      className = "notification notification--#{@props.type}"
      <div
        className={className}
        onClick={@dismiss}
        onTouchStart={@dismiss}
      >{@props.message}</div>
    else
      <span />

module.exports = Notification
