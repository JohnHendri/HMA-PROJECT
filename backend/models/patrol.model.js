const mongoose = require('mongoose');

const patrolSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  petugas: { type: String, require: true },
  lokasi: { type: String, require: true },
  date_time: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Patrol', patrolSchema, 'patrol');
