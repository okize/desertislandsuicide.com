React = require 'react'
request = require 'superagent'

VoteButton = React.createClass
  displayName: 'VoteButton'

  voteForBand: (e) ->
    e.preventDefault()

    # pass bandId along with event
    data = 'detail': @props.bandId
    window.dispatchEvent new CustomEvent 'vote-for-band', data

  render: ->
    if @props.loggedIn
      unless @props.userHasVotedFor
        <div className="band-vote-for float-right">
          <button onClick={@voteForBand}>Vote!</button>
        </div>
      else
        <div />
    else
      <div className="sign-in-to-vote float-right">
        Sign in to vote!
      </div>

module.exports = VoteButton
