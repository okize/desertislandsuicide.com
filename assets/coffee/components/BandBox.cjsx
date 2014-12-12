React = require 'react'
request = require 'superagent'

BandList = React.createClass(
  displayName: 'BandList'
  render: ->
    bandNodes = @props.data.map((band) ->
      <li>{band.name}</li>
    )
    <ul className="bandList">
      {bandNodes}
    </ul>
)

BandBox = React.createClass
  displayName: 'BandBox'

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
    setInterval @getBandsFromServer, @props.pollInterval

  render: ->
    <BandList data={@state.data} />

module.exports = BandBox
