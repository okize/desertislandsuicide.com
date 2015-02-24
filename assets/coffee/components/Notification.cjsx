React = require 'react'

Notification = React.createClass
  displayName: 'Notification'

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
    ).bind(this), @props.delay * 1000)

  render: ->
    if @state.visible
      className = "notification notification--#{@props.type}"
      <div className={className} onClick={@dismiss} onTouchStart={@dismiss}>
        {@props.children}
      </div>
    else
      <span />

module.exports = Notification
