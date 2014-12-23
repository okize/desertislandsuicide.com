React = require 'react'
request = require 'superagent'

csrfToken = document.getElementsByTagName('meta')['csrf-token'].getAttribute('content')
apiUrl = '/api/bands'

VoteButton = React.createClass
  displayName: 'VoteButton'

  voteForBand: (e) ->
    e.preventDefault()

    # post new vote to the server
    request
      .post("#{apiUrl}/#{@props.bandId}/vote")
      .set('X-CSRF-Token', csrfToken)
      .set('Accept', 'application/json')
      .end (error, res) =>
        # TODO handle errors better
        return console.error error if error?
        return console.log JSON.parse(res.text)

  render: ->
    <div className="band-vote-for float-right">
      <button onClick={@voteForBand}>Vote!</button>
    </div>

module.exports = VoteButton
