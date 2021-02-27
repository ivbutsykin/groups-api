/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');

module.exports = {
  login: function(req, res) {
    passport.authenticate('local', authenticate)(req, res);

    function authenticate(err, user, info) {
      if ((err) || (!user)) {
        return res.status(401).send(info);
      }

      req.logIn(user, function(err) {
        if (err) {
          res.status(401).send(err);
        }
        return res.send(user);
      });
    }
  },

  logout: function(req, res) {
    req.logout();
    res.send();
  },
};

