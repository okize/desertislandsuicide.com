# various "helper" functions

module.exports =

  # ensure user has been authenticated
  isAuthenticated: (req, res, next) ->
    if req.isAuthenticated()
      next()
    else
      req.flash 'errors',
        msg: 'You are not authorized to view this page'
      res.render('index')
