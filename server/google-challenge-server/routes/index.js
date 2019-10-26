const express = require('express');
const dal = require('../cloud/auth');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ message: 'Basic request success'});
});

router.get('/query', (req, res) => {
  dal();
});

module.exports = router;
