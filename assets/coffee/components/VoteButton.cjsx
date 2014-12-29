React = require 'react'
request = require 'superagent'
help = require '../helpers'

VoteButton = React.createClass
  displayName: 'VoteButton'

  voteForBand: (e) ->

    e.preventDefault()

    # post new vote to the server
    request
      .post("/api/bands/#{@props.bandId}/vote")
      .set('X-CSRF-Token', help.getCsrfToken())
      .set('Accept', 'application/json')
      .end (error, res) =>
        # TODO handle errors better
        if error?
          return console.error error
        else
          return console.log JSON.parse(res.text)

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
