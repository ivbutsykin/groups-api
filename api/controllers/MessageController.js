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
      // const message = await Message.create( {body, user, group}).fetch().populate('user')
      res.send(message);
    } catch (e) {
      res.status(400).send(e);
    }
  },

  getMessages: async (req, res) => {
    try {
      const {id, skip, limit} = req.allParams();
      const group = await Group.findOne({id: req.params.id});
      if (!group) {
        res.status(404).send();
      }
      let messages = await Message.find({group: `${id}`}).
        skip(skip).
        limit(limit).
        populate('user');
      res.send(messages);
    } catch (e) {
      res.status(400).send(e);
    }
  },
};

