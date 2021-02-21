/**
 * MessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  postMessage: async function(req, res) {
    const {body, user, group} = req.body;
    const message = await Message.create(
      {body: body, user: user, group: group}).fetch();
    res.send(message);
  },
};

