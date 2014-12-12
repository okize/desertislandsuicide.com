log = require './log'

module.exports = (error) ->
  log.error error
  @emit 'end'
  return
