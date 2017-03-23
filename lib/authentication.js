let _ = require('lodash');
let passport = require('passport');
let FacebookStrategy = require('passport-facebook').Strategy;
let TwitterStrategy = require('passport-twitter').Strategy;
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let User = require('../models/user');
let log = require('../lib/logger').logger;

let config = {
  facebook: {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: '/auth/facebook/callback',
    passReqToCallback: true
  },
  twitter: {
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: '/auth/twitter/callback',
    passReqToCallback: true
  },
  google: {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: '/auth/google/callback',
    passReqToCallback: true
  }
};

passport.serializeUser(function(user, done) {
  log.info(`Serialized ${user.tokens[0].kind} user`);
  return done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, (err, user) => done(err, user));
});

// sign in with Facebook
passport.use(new FacebookStrategy(config.facebook, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    return User.findOne({
      facebook: profile.id
    }, function(err, existingUser) {
      if (existingUser) {
        req.flash('errors', {
          msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.'
        });
        return done(err);
      } else {
        return User.findById(req.user.id, function(err, user) {
          user.facebook = profile.id;
          user.tokens.push({
            kind: 'facebook',
            accessToken: accessToken
          });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || ("https://graph.facebook.com/" + profile.id + "/picture?type=large");
          return user.save(function(err) {
            req.flash('info', {
              msg: 'Facebook account has been linked.'
            });
            return done(err, user);
          });
        });
      }
    });
  } else {
    return User.findOne({
      facebook: profile.id
    }, function(err, existingUser) {
      if (existingUser) {
        return done(null, existingUser);
      }
      return User.findOne({
        email: profile._json.email
      }, function(err, existingEmailUser) {
        var user;
        if (existingEmailUser) {
          req.flash('errors', {
            msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.'
          });
          return done(err);
        } else {
          user = new User();
          user.email = profile._json.email;
          user.facebook = profile.id;
          user.tokens.push({
            kind: 'facebook',
            accessToken: accessToken
          });
          user.profile.name = profile.displayName;
          user.profile.gender = profile._json.gender;
          user.profile.picture = "https://graph.facebook.com/" + profile.id + "/picture?type=large";
          user.profile.location = (profile._json.location ? profile._json.location.name : '');
          return user.save(function(err) {
            return done(err, user);
          });
        }
      });
    });
  }
}));


// sign in with Twitter
passport.use(new TwitterStrategy(config.twitter, function(req, accessToken, tokenSecret, profile, done) {
  if (req.user) {
    return User.findOne({
      twitter: profile.id
    }, function(err, existingUser) {
      if (existingUser) {
        req.flash('errors', {
          msg: 'There is already a Twitter account that belongs to you. Sign in with that account or delete it, then link it with your current account.'
        });
        return done(err);
      } else {
        return User.findById(req.user.id, function(err, user) {
          user.twitter = profile.id;
          user.tokens.push({
            kind: 'twitter',
            accessToken: accessToken,
            tokenSecret: tokenSecret
          });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.location = user.profile.location || profile._json.location;
          user.profile.picture = user.profile.picture || profile._json.profile_image_url_https;
          return user.save(function(err) {
            req.flash('info', {
              msg: 'Twitter account has been linked.'
            });
            return done(err, user);
          });
        });
      }
    });
  } else {
    return User.findOne({
      twitter: profile.id
    }, function(err, existingUser) {
      var user;
      if (existingUser) {
        return done(null, existingUser);
      }
      user = new User();
      user.email = profile.username + "@gmail.com";
      user.twitter = profile.id;
      user.tokens.push({
        kind: 'twitter',
        accessToken: accessToken,
        tokenSecret: tokenSecret
      });
      user.profile.name = profile.displayName;
      user.profile.location = profile._json.location;
      user.profile.picture = profile._json.profile_image_url_https;
      return user.save(function(err) {
        return done(err, user);
      });
    });
  }
}));

// sign in with Google
passport.use(new GoogleStrategy(config.google, function(req, accessToken, refreshToken, profile, done) {
  if (req.user) {
    return User.findOne({
      google: profile.id
    }, function(err, existingUser) {
      if (existingUser) {
        req.flash('errors', {
          msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.'
        });
        return done(err);
      } else {
        return User.findById(req.user.id, function(err, user) {
          user.google = profile.id;
          user.tokens.push({
            kind: 'google',
            accessToken: accessToken
          });
          user.profile.name = user.profile.name || profile.displayName;
          user.profile.gender = user.profile.gender || profile._json.gender;
          user.profile.picture = user.profile.picture || profile._json.picture;
          return user.save(function(err) {
            req.flash('info', {
              msg: 'Google account has been linked.'
            });
            return done(err, user);
          });
        });
      }
    });
  } else {
    return User.findOne({
      google: profile.id
    }, function(err, existingUser) {
      if (existingUser) {
        return done(null, existingUser);
      }
      return User.findOne({
        email: profile._json.email
      }, function(err, existingEmailUser) {
        var user;
        if (existingEmailUser) {
          req.flash('errors', {
            msg: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.'
          });
          return done(err);
        } else {
          user = new User();
          user.email = profile._json.email;
          user.google = profile.id;
          user.tokens.push({
            kind: 'google',
            accessToken: accessToken
          });
          user.profile.name = profile.displayName;
          user.profile.gender = profile._json.gender;
          user.profile.picture = profile._json.picture;
          return user.save(function(err) {
            return done(err, user);
          });
        }
      });
    });
  }
}));

module.exports = passport;
