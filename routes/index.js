var express = require('express');
var router = express.Router();

// home page
router.get('/', function(req, res) {
  res.render('index', { title: 'Desert Island Suicide' });
});

// subscription confirmation
router.get('/subscribed', function(req, res) {
  res.render('index', { title: 'Subscription confirmed!', subscribed: true });
});

module.exports = router;
