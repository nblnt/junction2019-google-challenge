const express = require('express');
const bigquery = require('../cloud/bigquery');
const router = express.Router();
const util = require('util');

/* GET home page. */

router.post('/query', (req, res) => {
  if(req.body.from && req.body.to){
    bigquery.queryPositionsByTime(req.body.from,req.body.to,function (err,data){
        if(err){
            console.log(err);
            res.json({success:false, err: util.format(err)});
        }
        else{
            res.json({success: true, data:data});
        }
    });
  }
  else{
      res.json({success: true, data:[]});
  }
});

module.exports = router;