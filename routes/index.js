// home page
exports.index = function(req, res){
  res.render('index', { title: 'Desert Island Suicide' });
};

// subscription confirmation
exports.subscribed = function(req, res){
  res.render('index', { title: 'Subscription confirmed!', subscribed: true });
};
