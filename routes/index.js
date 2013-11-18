
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Desert Island Suicide' });
};

exports.subscribed = function(req, res){
  res.render('index', { title: 'Subscription confirmed!', subscribed: true });
};