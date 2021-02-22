/**
 * GroupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getGroups: async function(req, res) {
    const groups = await Group.find();
    res.send(groups);
  },

  getGroup: async function(req, res) {
    const group = await Group.findOne({id: req.params.id});
    res.send(group);
  },

  getMessages: async function(req, res) {
    const {id, skip, limit} = req.params;
    let messages = await Group.find({id: id}).
      populate('messages', {skip: skip, limit: limit});
    messages = messages[0].messages;
    for (const message of messages) {
      const user = await User.findOne({id: message.user});
      message.user = user;
    }
    res.send(messages);
  },

  createGroup: async function(req, res) {
    const group = await Group.create({name: req.body.name}).fetch();
    res.send(group);
  },

  deleteGroup: async function(req, res) {
    const {id} = req.params;
    let messages = await Group.find({id: id}).populate('messages');
    messages = messages.
      map(message => message.messages).
      flat().
      map(message => message.id);
    await Message.destroy({id: messages});
    const group = await Group.destroy({id: id});
    res.send(group);
  },
};

