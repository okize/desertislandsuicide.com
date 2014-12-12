React = require 'react'
request = require 'superagent'
BandList = require './BandList'
NewBandForm = require './NewBandForm'

csrfToken = document.getElementsByTagName('meta')['csrf-token'].getAttribute('content')

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

  handleNewBandSubmit: (formData) ->
    request
      .post('/api/bands')
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
    <div className="votingWrapper">
      <BandList data={@state.data} />
      <NewBandForm onNewBandSubmit={@handleNewBandSubmit} />
    </div>

module.exports = Voting
