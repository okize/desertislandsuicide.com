React = require 'react'
request = require 'superagent'
LogIn = require './LogIn'
BandList = require './BandList'
NewBandForm = require './NewBandForm'

csrfToken = document.getElementsByTagName('meta')['csrf-token'].getAttribute('content')
apiUrl = '/api/bands'

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

    # post new band to the server
    request
      .post(apiUrl)
      .send(formData)
      .set('X-CSRF-Token', csrfToken)
      .set('Accept', 'application/json')
      .end (error, res) =>
        # TODO handle errors better
        return console.error error if error?

        # update band list
        results = JSON.parse(res.text)
        bands = @state.data
        @setState data: @state.data.concat [results]

  componentDidMount: ->
    @getBandsFromServer()
    setInterval @getBandsFromServer, @props.refreshRate

  render: ->
    <div className="voting-wrapper">
      {if @props.loggedIn then <NewBandForm onNewBandSubmit={@handleNewBandSubmit} else null />}
      <BandList data={@state.data} />
    </div>

module.exports = Voting
