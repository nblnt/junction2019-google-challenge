const express = require('express');
const bigquery = require('../cloud/bigquery');
const router = express.Router();
const util = require('util');

/* GET home page. */

router.get('/query', (req, res) => {
  if(req.body.from && req.body.to){
    bigquery.queryPositionsByTime(req.body.from,req.body.to,(err,data)=>{
        if(err){
            res.json({success:false, err: util.format(err)});
        }
        else{
            res.json({success: true, data:[]});
        }
    });
  }
  else{
      res.json({success: true, data:[]});
  }
});

module.exports = router;