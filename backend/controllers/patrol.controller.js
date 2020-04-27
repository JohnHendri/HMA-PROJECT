const mongoose = require('mongoose');
const Patrol = require('../models/patrol.model');

module.exports.patrol_post = async (req, res, next) => {
  const patrol = new Patrol({
    _id: new mongoose.Types.ObjectId(),
    petugas: req.body.petugas,
    lokasi: req.body.lokasi,
    date_time: req.body.date_time,
  });
  try {
    const newPatrol = await patrol.save();
    res.status(201).json(newPatrol);
  } catch (err) {
    res.status(400);
  }
};
