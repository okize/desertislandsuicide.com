React   = require 'react'
FastClick = require 'fastclick'
Notification = require './components/Notification.cjsx'
StatusBar = require './components/StatusBar.cjsx'
Header = require './components/Header.cjsx'
Voting = require './components/Voting.cjsx'
EventEmitterMixin = require './mixins/EventEmitterMixin'

# mount point for app
appEl = document.getElementById 'app'

# init FastClick
FastClick appEl

React.initializeTouchEvents true

App = React.createClass
  displayName: 'App'

  mixins: [EventEmitterMixin]

  getDefaultProps: ->
    loggedIn: window.loggedIn
    userName: window.userName || null

  getInitialState: ->
    notifications: []

  displayNotification: (obj) ->
    @setState {notifications: [obj]}

  componentDidMount: ->
    # listener for notifications
    @addListener 'App', 'notification', @displayNotification

  render: ->
    if @state.notifications.length
      note = @state.notifications.pop()
      notifications = <Notification delay={note.delay} type={note.type}>{note.msg}</Notification>
    else
      notifications = <span />
    <div className="main-wrapper" role="main">
      {notifications}
      <StatusBar loggedIn={@props.loggedIn} userName={@props.userName} />
      <Header />
      <Voting loggedIn={@props.loggedIn} />
    </div>

if appEl?
  React.render <App />, appEl
