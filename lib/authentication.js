/* eslint-disable no-shadow */
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
const log = require('../lib/logger').logger;

const config = {
  facebook: {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: '/auth/facebook/callback',
    passReqToCallback: true,
  },
  twitter: {
    consumerKey: process.env.TWITTER_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: '/auth/twitter/callback',
    passReqToCallback: true,
  },
  google: {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: '/auth/google/callback',
    passReqToCallback: true,
  },
};

passport.serializeUser((user, done) => {
  log.info(`Serialized ${user.tokens[0].kind} user`);
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

// sign in with Facebook
passport.use(new FacebookStrategy(config.facebook, (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    return User.findOne({
      facebook: profile.id,
    }, (error, existingUser) => {
      if (existingUser) {
        req.flash('errors', {
          msg: `There is already a Facebook account that belongs to you.
                Sign in with that account or delete it, then link it with your current account.`,
        });
        return done(error);
      }
      return User.findById(req.user.id, (err, user) => {
        user.facebook = profile.id;
        user.tokens.push({
          kind: 'facebook',
          accessToken: accessToken,
        });
        user.profile.name = user.profile.name || profile.displayName;
        user.profile.gender = user.profile.gender || profile._json.gender;
        user.profile.picture = user.profile.picture || (`https://graph.facebook.com/${profile.id}/picture?type=large`);
        return user.save((err) => {
          req.flash('info', {
            msg: 'Facebook account has been linked.',
          });
          return done(err, user);
        });
      });
    });
  }
  return User.findOne({
    facebook: profile.id,
  }, (error, existingUser) => {
    if (existingUser) {
      return done(null, existingUser);
    }
    return User.findOne({
      email: profile._json.email,
    }, (err, existingEmailUser) => {
      if (existingEmailUser) {
        req.flash('errors', {
          msg: `There is already an account using this email address.
                Sign in to that account and link it with Facebook manually from Account Settings.`,
        });
        return done(err);
      }
      const user = new User();
      user.email = profile._json.email;
      user.facebook = profile.id;
      user.tokens.push({
        kind: 'facebook',
        accessToken: accessToken,
      });
      user.profile.name = profile.displayName;
      user.profile.gender = profile._json.gender;
      user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
      user.profile.location = (profile._json.location ? profile._json.location.name : '');
      return user.save(err => done(err, user));
    });
  });
}));


// sign in with Twitter
passport.use(new TwitterStrategy(config.twitter, (req, accessToken, tokenSecret, profile, done) => {
  if (req.user) {
    return User.findOne({
      twitter: profile.id,
    }, (error, existingUser) => {
      if (existingUser) {
        req.flash('errors', {
          msg: `There is already a Twitter account that belongs to you.
                Sign in with that account or delete it, then link it with your current account.`,
        });
        return done(error);
      }
      return User.findById(req.user.id, (err, user) => {
        user.twitter = profile.id;
        user.tokens.push({
          kind: 'twitter',
          accessToken: accessToken,
          tokenSecret: tokenSecret,
        });
        user.profile.name = user.profile.name || profile.displayName;
        user.profile.location = user.profile.location || profile._json.location;
        user.profile.picture = user.profile.picture || profile._json.profile_image_url_https;
        return user.save((err) => {
          req.flash('info', {
            msg: 'Twitter account has been linked.',
          });
          return done(err, user);
        });
      });
    });
  }
  return User.findOne({
    twitter: profile.id,
  }, (err, existingUser) => {
    if (existingUser) {
      return done(null, existingUser);
    }
    const user = new User();
    user.email = `${profile.username}@gmail.com`;
    user.twitter = profile.id;
    user.tokens.push({
      kind: 'twitter',
      accessToken: accessToken,
      tokenSecret: tokenSecret,
    });
    user.profile.name = profile.displayName;
    user.profile.location = profile._json.location;
    user.profile.picture = profile._json.profile_image_url_https;
    return user.save(err => done(err, user));
  });
}));

// sign in with Google
passport.use(new GoogleStrategy(config.google, (req, accessToken, refreshToken, profile, done) => {
  if (req.user) {
    return User.findOne({
      google: profile.id,
    }, (error, existingUser) => {
      if (existingUser) {
        req.flash('errors', {
          msg: `There is already a Google account that belongs to you.
                Sign in with that account or delete it, then link it with your current account.`,
        });
        return done(error);
      }
      return User.findById(req.user.id, (err, user) => {
        user.google = profile.id;
        user.tokens.push({
          kind: 'google',
          accessToken: accessToken,
        });
        user.profile.name = user.profile.name || profile.displayName;
        user.profile.gender = user.profile.gender || profile._json.gender;
        user.profile.picture = user.profile.picture || profile._json.picture;
        return user.save((err) => {
          req.flash('info', {
            msg: 'Google account has been linked.',
          });
          return done(err, user);
        });
      });
    });
  }
  return User.findOne({
    google: profile.id,
  }, (err, existingUser) => {
    if (existingUser) {
      return done(null, existingUser);
    }
    return User.findOne({
      email: profile._json.email,
    }, (err, existingEmailUser) => {
      if (existingEmailUser) {
        req.flash('errors', {
          msg: `There is already an account using this email address.
                Sign in to that account and link it with Google manually from Account Settings.`,
        });
        return done(err);
      }
      const user = new User();
      user.email = profile._json.email;
      user.google = profile.id;
      user.tokens.push({
        kind: 'google',
        accessToken: accessToken,
      });
      user.profile.name = profile.displayName;
      user.profile.gender = profile._json.gender;
      user.profile.picture = profile._json.picture;
      return user.save(err => done(err, user));
    });
  });
}));

module.exports = passport;
