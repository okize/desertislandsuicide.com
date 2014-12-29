React = require 'react'
request = require 'superagent'
_ = require 'lodash'
help = require '../helpers'
LogIn = require './LogIn'
BandList = require './BandList'
NewBandForm = require './NewBandForm'

Voting = React.createClass
  displayName: 'Voting'

  getApiUrl: ->
    if @props.loggedIn
      '/api/bands'
    else
      /bandsNoAuth/

  getBandsFromServer: ->
    url = @getApiUrl()
    request.get url, ((result) ->
      if @isMounted()
        @setState
          data: result.body
    ).bind(this)

  getInitialState: ->
    data: []

  handleNewBandSubmit: (formData) ->

    # post new band to the server
    request
      .post '/api/bands/'
      .send formData
      .set 'X-CSRF-Token', help.getCsrfToken()
      .set 'Accept', 'application/json'
      .end (error, res) =>
        # TODO handle errors better
        return console.error error if error?

        # update band list
        results = JSON.parse(res.text)
        bands = @state.data.concat [results]
        @setState data: _.sortBy(bands, 'created_at').reverse()

  componentDidMount: ->
    @getBandsFromServer()
    setInterval @getBandsFromServer, @props.refreshRate

  render: ->
    <div className="voting-wrapper">
      {if @props.loggedIn then <NewBandForm onNewBandSubmit={@handleNewBandSubmit} else null />}
      <BandList data={@state.data} loggedIn={@props.loggedIn} />
    </div>

module.exports = Voting
