let User = require('../models/user');

// GET /login
exports.login = function(req, res) {
  if (req.user) {
    res.redirect('/');
  }
  return res.render('login',
    {title: 'Login'});
};

// GET /logout
exports.logout = function(req, res) {
  req.logout();
  return res.redirect('/');
};

// GET /api/account
exports.account = (req, res) =>
  res.render('account',
    {title: 'Account'})
;
