React = require 'react'
request = require 'superagent'

csrfToken = document.getElementsByTagName('meta')['csrf-token'].getAttribute('content')
apiUrl = '/api/bands'
bandId = '549988eac09193d9ae40dfb1'

BandName = React.createClass
  displayName: 'BandName'

  voteForBand: (e) ->
    e.preventDefault()
    # post new vote to the server
    request
      .post("#{apiUrl}/#{bandId}/vote")
      .set('X-CSRF-Token', csrfToken)
      .set('Accept', 'application/json')
      .end (error, res) =>
        # TODO handle errors better
        return console.error error if error?
        return console.log JSON.parse(res.text)

  render: ->
    <li className="band-item">
      <div className="band-vote-count">
        {@props.votes.length}
      </div>
      {@props.data.name}
      <button className="band-vote-for float-right" onClick={@voteForBand}>Vote!</button>
    </li>

BandList = React.createClass
  displayName: 'BandList'
  render: ->
    <ul className="band-list">
      {@props.data.map((band) ->
        <BandName key={band._id} data={band} votes={band.children} />
      )}
    </ul>

module.exports = BandList
