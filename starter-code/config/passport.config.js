const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');

module.exports.setup = (passport) => {
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      if (err) {
        return cb(err);
      }
      cb(null, user);
    });
  });

  passport.use('local-login', new LocalStrategy((username, password, next) => {
    User.findOne({
      username
    }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, {
          message: "Incorrect username"
        });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, {
          message: "Incorrect password"
        });
      }

      return next(null, user);
    });
  }));

  passport.use('local-signup', new LocalStrategy({
      passReqToCallback: true
    },
    (req, username, password, next) => {
      // To avoid race conditions
      process.nextTick(() => {
        User.findOne({
          'username': username
        }, (err, user) => {
          if (err) {
            return next(err);
          }

          if (user) {
            return next(null, false);
          } else {
            // Destructure the body
            const {
              username,
              email,
              password
            } = req.body;
            const imgURL="https://vignette.wikia.nocookie.net/kotlc/images/a/a8/10546i3DAC5A5993C8BC8C.jpg/revision/latest/scale-to-width-down/310?cb=20170111040640";
            const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            const newUser = new User({
              username,
              email,
              password: hashPass,
              imgURL
            });

            newUser.save((err) => {
              if (err) {
                next(null, false, {
                  message: newUser.errors
                })
              }
              return next(null, newUser);
            });
          }
        });
      });
    }));
}


// module.exports.isAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated) {
//     next();
//   } else {
//     res.redirect('/login');
//   }
// };