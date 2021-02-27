/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createUser: async (req, res) => {
    try {
      const {name, email, password} = req.body;
      const user = await User.create({name, email, password}).fetch();
      res.send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  },
};

