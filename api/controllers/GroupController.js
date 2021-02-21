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
    const messages = await Group.findOne({id: id}).
      populate('messages').
      skip(skip).
      limit(limit);
    res.send(messages);
  },

  createGroup: async function(req, res) {
    const group = await Group.create({name: req.body.name}).fetch();
    res.send(group);
  },

  deleteGroup: async function(req, res) {
    const group = await Group.delete({id: req.params.id});
    res.send(group);
  },
};

