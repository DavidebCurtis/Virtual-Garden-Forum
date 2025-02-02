const dateFormat = require('../utils/dateFormat');
const { Schema } = require('mongoose');

const plantHistorySchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    note_body: {
      type: String,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = plantHistorySchema;
