/**
 * MessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  postMessage: async function(req, res) {
    try {
      const {body, user, group} = req.body;
      const message = await Message.create(
        {body, user, group}).fetch();
      message.user = await User.findOne({id: message.user});
      res.send(message);
    } catch (e) {
      res.status(400).send(e);
    }
  },
};

