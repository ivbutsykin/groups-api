/**
 * GroupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getGroups: async (req, res) => {
    const groups = await Group.find();
    res.send(groups);
  },

  getGroup: async (req, res) => {
    const id = req.params;
    const group = await Group.findOne({id: id + ''});
    res.send(group);
  },

  getMessages: async (req, res) => {
    const {id, skip, limit} = req.allParams();
    let messages = await Group.find({id}).
      populate('messages', {skip, limit});
    messages = messages[0].messages;
    for (const message of messages) {
      const user = await User.findOne({id: message.user});
      message.user = user;
    }
    res.send(messages);
  },

  createGroup: async (req, res) => {
    const {name} = req.body;
    const group = await Group.create({name}).fetch();
    res.send(group);
  },

  deleteGroup: async (req, res) => {
    const {id} = req.params;
    let messages = await Group.find({id}).populate('messages');
    messages = messages.
      map(message => message.messages).
      flat().
      map(message => message.id);
    await Message.destroy({id: messages});
    const group = await Group.destroy({id});
    res.send(group);
  },
};

