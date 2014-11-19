
module.exports =

  # ensure user has been authenticated
  exports.isAuthenticated = (req, res, next) ->
    if req.isAuthenticated()
      next()
    res.status(401).render('error', message: 'Unauthorized')
