exports.index = (req, res) ->
  res.render 'index',
    title: 'Desert Island Suicide'

exports.subscribed = (req, res) ->
  res.render 'index',
    title: 'Subscription confirmed!'
    subscribed: true
