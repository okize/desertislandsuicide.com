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
    request
      .get url
      .end (err, res) =>

        # TODO handle errors better
        return console.error err if error?

        # update state with bands
        if @isMounted()
          @setState
            data: res.body

  getInitialState: ->
    data: []

  handleBandVote: (e) ->

    e.preventDefault()

    bandId = e.detail

    # post new vote to the server
    request
      .post("/api/bands/#{bandId}/vote")
      .set('X-CSRF-Token', help.getCsrfToken())
      .set('Accept', 'application/json')
      .end (error, res) =>

        # TODO handle errors better
        return console.error error if error?

        # update band list
        @getBandsFromServer()

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
        @getBandsFromServer()

  componentDidMount: ->
    @getBandsFromServer()
    window.addEventListener 'vote-for-band', @handleBandVote
    setInterval @getBandsFromServer, @props.refreshRate

  render: ->
    <div className="voting-wrapper">
      {if @props.loggedIn then <NewBandForm onNewBandSubmit={@handleNewBandSubmit} else null />}
      <BandList data={@state.data} loggedIn={@props.loggedIn} />
    </div>

module.exports = Voting
