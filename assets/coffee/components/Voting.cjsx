React = require 'react'
request = require 'superagent'
help = require '../helpers'
BandList = require './BandList'
NewBandForm = require './NewBandForm'
EventEmitterMixin = require '../mixins/EventEmitterMixin'

Voting = React.createClass
  displayName: 'Voting'

  refreshRate: 500000

  mixins: [EventEmitterMixin]

  getApiUrl: ->
    if @props.loggedIn
      '/api/bands'
    else
      /bandsNoAuth/

  getBandList: ->

    url = "#{@getApiUrl()}?cacheBuster=#{Date.now().toString()}"

    # get a list of bands and vote counts
    request
      .get url
      .end (error, res) =>

        if error?
          console.error error
          return @emit 'App', 'notification', {msg: 'Error getting band list, please refresh page.', type: 'error', delay: 5}

        # update state with bands
        if @isMounted()
          @setState
            data: res.body

  getInitialState: ->
    data: []

  handleBandVote: (band) ->

    # post new vote to the server
    request
      .post "/api/bands/#{band.id}/vote"
      .set 'X-CSRF-Token', help.getCsrfToken()
      .set 'Accept', 'application/json'
      .end (error, res) =>

        if error? or res.status != 200
          console.error error
          return @emit 'App', 'notification', {msg: 'Sorry, your vote was not recorded, please try again.', type: 'error', delay: 5}

        @emit 'App', 'notification', {msg: "You voted for #{band.name}!", type: 'info', delay: 3}

        # update band list
        @getBandList()

  handleNewBandSubmit: (formData) ->

    # post new band to the server
    request
      .post '/api/bands/'
      .send formData
      .set 'X-CSRF-Token', help.getCsrfToken()
      .set 'Accept', 'application/json'
      .end (error, res) =>

        if error? or res.status != 200
          console.error error
          return @emit 'App', 'notification', {msg: 'Sorry, your band was not saved, try again.', type: 'error', delay: 5}

        @emit 'App', 'notification', {msg: "#{formData.name} has been nominated!", type: 'info', delay: 3}

        # update band list
        @getBandList()

  componentDidMount: ->

    # load band list
    @getBandList()

    # periodically update list with new entries
    setInterval @getBandList, @refreshRate

    # listener for band votes
    @addListener 'Voting', 'vote-for-band', @handleBandVote

  render: ->
    <div className="voting-wrapper">
      {if @props.loggedIn then <NewBandForm onNewBandSubmit={@handleNewBandSubmit} else null />}
      <BandList data={@state.data} loggedIn={@props.loggedIn} />
    </div>

module.exports = Voting
