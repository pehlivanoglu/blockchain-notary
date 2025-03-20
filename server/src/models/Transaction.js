const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({
  composerNid: {
    type: String,
    required: true
  },
  recipientNid: {
    type: String,
    required: true
  },
  composerRole: {
    type: String,
    required: true
  },
  recipientRole: {
    type: String,
    required: true
  },
  fields: {
    type: Map,
    of: String,
    required: true
  },
  ipfs_cid: {
    type: String,
    required: true
  },
  tx_hash: {
    type: String,
    required: true
  },
  agreementKey: {
    type: String,
    required: true
  },
  sending_time: {
    type: Date,
    default: () => {
      const now = new Date();
      return new Date(now.getTime()); // GMT+3
    }
  }
});

mongoose.model('Transaction', keySchema);