const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const bandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  submitted_by: {
    type: String,
    required: true,
  },
  children: [{
    type: Schema.ObjectId,
    ref: 'Vote',
  },
  ],
  users_who_voted_for: {
    type: Array,
  },
  vote_count: {
    type: Number,
    default: 0,
    index: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
}, { strict: true });

// hook to keep vote_count up to date
bandSchema.pre('save', function bandSchemaPreSave(next) {
  this.vote_count = this.children.length;
  return next();
});

bandSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Band', bandSchema);
