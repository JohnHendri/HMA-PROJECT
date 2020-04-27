const express = require('express');
const router = express.Router();

const ctrPatrol = require('../controllers/patrol.controller');

router.post('/', ctrPatrol.patrol_post);

module.exports = router;
