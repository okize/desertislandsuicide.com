React = require 'react'
request = require 'superagent'
_ = require 'lodash'
LogIn = require './LogIn'
BandList = require './BandList'
NewBandForm = require './NewBandForm'

Voting = React.createClass
  displayName: 'Voting'

  getBandsFromServer: ->
    request.get @props.apiUrl, ((result) ->
      if @isMounted()
        @setState
          data: result.body
    ).bind(this)

  getInitialState: ->
    data: []

  handleNewBandSubmit: (formData) ->

    # post new band to the server
    request
      .post(@props.apiUrl)
      .send(formData)
      .set('X-CSRF-Token', @props.csrfToken)
      .set('Accept', 'application/json')
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
      <BandList data={@state.data} />
    </div>

module.exports = Voting
