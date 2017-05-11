const mongoose = require('mongoose');
const _ = require('lodash');
const relationship = require('mongoose-relationship');

const Band = require('./band');

const { Schema } = mongoose;

const voteSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  user_ip_address: {
    type: String,
    required: true,
  },
  parent: [{
    type: Schema.ObjectId,
    ref: 'Band',
    childPath: 'children',
  },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
}, { strict: true });

voteSchema.pre('save', function (next) {
  return Band.findById(this.parent, (err, result) => {
    let error;
    if (err) {
      error = new Error('something went wrong');
      return next(error);
    }
    const users = result.users_who_voted_for;
    if (users.includes(this.user_id)) {
      error = new Error('User already voted for this band');
      return next(error);
    }
    users.push(this.user_id);
    result.save();
    return next();
  });
});

const relationshipOpts = {
  relationshipPathName: 'parent',
  triggerMiddleware: true,
};

voteSchema.plugin(relationship, relationshipOpts);

module.exports = mongoose.model('Vote', voteSchema);
