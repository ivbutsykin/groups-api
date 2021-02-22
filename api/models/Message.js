/**
 * Message.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    body: {
      type: "string",
      required: true,
      isNotEmptyString: true,
    },
    user: {
      model: "user",
      required: true,
    },
    group: {
      model: "group",
      required: true,
    },
  },
};
