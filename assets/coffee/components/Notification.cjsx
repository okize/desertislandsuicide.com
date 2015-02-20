React = require 'react'

Notification = React.createClass
  displayName: 'Notification'

  getDefaultProps: ->
    delay: 1000
    type: 'info'

  getInitialState: ->
    visible: true

  componentWillReceiveProps: (nextProps) ->
    # reset the timer if children are changed
    if nextProps.children != @props.children
      @setTimer()
      @setState visible: true

  componentDidMount: ->
    @setTimer()

  setTimer: ->
    # clear any existing timer
    if @_timer != null then clearTimeout(@_timer) else null

    # hide after delay
    @_timer = setTimeout((->
      @setState visible: false
      @_timer = null
    ).bind(this), @props.delay)

  render: ->
    if @state.visible
      className = "notification notification--#{@props.type}"
      <div className={className}>{this.props.children}</div>
    else
      <span />

module.exports = Notification
