express = require('express')
router = express.Router()

# home page
router.get '/', (req, res) ->
  res.render 'index',
    title: 'Desert Island Suicide'

module.exports = router
