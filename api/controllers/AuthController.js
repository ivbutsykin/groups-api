/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require('jsonwebtoken');

module.exports = {
  login: function(req, res) {
    const user = req.user.toJSON();
    const token = jwt.sign(user, sails.config.passport.jwtSecret, {
      expiresIn: '1d',
    });
    return res.send(token);
  },

  logout: function(req, res) {
    req.logout();
    res.send();
  },
};

