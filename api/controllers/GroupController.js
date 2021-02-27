/**
 * GroupController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getGroups: async (req, res) => {
    try {
      const groups = await Group.find();
      res.send(groups);
    } catch (e) {
      res.status(400).send(e);
    }
  },

  getGroup: async (req, res) => {
    try {
      const group = await Group.findOne({id: req.params.id}).
        populate('createdBy');
      if (!group) {
        res.status(404).send();
      }
      res.send(group);
    } catch (e) {
      res.status(400).send(e);
    }
  },

  createGroup: async (req, res) => {
    try {
      const {name} = req.body;
      const group = await Group.create({
        name,
        createdBy: req.user.id,
      }).fetch();
      res.send(group);
    } catch (e) {
      res.status(400).send(e);
    }
  },

  deleteGroup: async (req, res) => {
    try {
      const {id} = req.params;
      await Message.destroy({group: req.params.id});
      const group = await Group.destroy({id});
      res.send(group);
    } catch (e) {
      res.status(400).send(e);
    }
  },
};

