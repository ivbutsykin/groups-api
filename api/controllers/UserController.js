/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require('jsonwebtoken');

module.exports = {
  createUser: async (req, res) => {
    try {
      const {name, email, password} = req.body;
      const user = await User.create({name, email, password}).fetch();
      const token = jwt.sign(user, sails.config.passport.jwtSecret, {
        expiresIn: '1d',
      });
      return res.send(token);
    } catch (e) {
      res.status(400).send(e);
    }
  },
};

