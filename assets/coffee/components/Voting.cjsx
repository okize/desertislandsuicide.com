React = require 'react'
request = require 'superagent'
help = require '../helpers'
EventEmitterMixin = require '../mixins/EventEmitterMixin'
LogIn = require './LogIn'
BandList = require './BandList'
NewBandForm = require './NewBandForm'

Voting = React.createClass
  displayName: 'Voting'

  refreshRate: 500000

  mixins: [EventEmitterMixin]

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

  handleBandVote: (bandId) ->

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

    # load band list
    @getBandsFromServer()

    # periodically update list with new entries
    setInterval @getBandsFromServer, @refreshRate

    # listener for band votes
    @addListener 'Voting', 'vote-for-band', @handleBandVote

  render: ->
    <div className="voting-wrapper">
      {if @props.loggedIn then <NewBandForm onNewBandSubmit={@handleNewBandSubmit} else null />}
      <BandList data={@state.data} loggedIn={@props.loggedIn} />
    </div>

module.exports = Voting
