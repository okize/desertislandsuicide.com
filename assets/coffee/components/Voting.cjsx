React = require 'react'
request = require 'superagent'
LogIn = require './LogIn'
BandList = require './BandList'
NewBandForm = require './NewBandForm'

csrfToken = document.getElementsByTagName('meta')['csrf-token'].getAttribute('content')
apiUrl = '/api/bands'

loginForm = unless window.loggedIn then <LogIn />
newBandForm = if window.loggedIn then <NewBandForm onNewBandSubmit={@handleNewBandSubmit} />

Voting = React.createClass
  displayName: 'Voting'

  getBandsFromServer: ->
    request.get apiUrl, ((result) ->
      if @isMounted()
        @setState
          data: result.body
    ).bind(this)

  getInitialState: ->
    data: []

  handleNewBandSubmit: (formData) ->

    # optimistially update band list
    bands = @state.data
    newBand = @state.data.concat([formData])
    @setState data: newBand

    # post new band to the server
    request
      .post(apiUrl)
      .send(formData)
      .set('X-CSRF-Token', csrfToken)
      .set('Accept', 'application/json')
      .end (error, res) ->
        return console.error if error?
        return console.log JSON.parse(res.text)

  componentDidMount: ->
    @getBandsFromServer()
    setInterval @getBandsFromServer, @props.refreshRate

  render: ->
    <div className="voting-wrapper">
      {loginForm}
      {newBandForm}
      <BandList data={@state.data} />
    </div>

module.exports = Voting
