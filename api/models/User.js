/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
    },

    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },

    messages: {
      collection: 'message',
      via: 'user',
    },

    groups: {
      collection: 'group',
      via: 'createdBy',
    },

    password: {
      type: 'string',
      required: true,
    },
  },

  customToJSON() {
    return _.omit(this, ['password']);
  },

  beforeCreate: async function(user, cb) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt, null);
      return cb();
    } catch (error) {
      return cb(error);
    }
  },
};
