// GET /login
exports.login = (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  return res.render('login', { title: 'Login' });
};

// GET /logout
exports.logout = (req, res) => {
  req.logout();
  return res.redirect('/');
};

// GET /api/account
exports.account = (req, res) => res.render('account', { title: 'Account' });
