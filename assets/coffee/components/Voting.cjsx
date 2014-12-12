React = require 'react'
request = require 'superagent'
BandList = require './BandList'
NewBandForm = require './NewBandForm'

Voting = React.createClass
  displayName: 'Voting'

  getBandsFromServer: ->
    request.get '/api/bands', ((result) ->
      if @isMounted()
        @setState
          data: result.body
    ).bind(this)

  getInitialState: ->
    data: []

  componentDidMount: ->
    @getBandsFromServer()
    setInterval @getBandsFromServer, @props.refreshRate

  render: ->
    <div>
      <BandList data={@state.data} />
      <NewBandForm data={@props.csrfToken} />
    </div>

module.exports = Voting
