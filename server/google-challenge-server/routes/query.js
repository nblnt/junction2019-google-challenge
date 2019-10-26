const express = require('express');
const bigquery = require('../cloud/bigquery');
const router = express.Router();
const util = require('util');

router.post('/', (req, res) => {
  if(req.body.from && req.body.to){
    bigquery.listPositions(req.body,function (err,data){
        if(err){
            console.log(err);
            res.json({success:false, err: util.format(err)});
        }
        else{
            res.json({success: true, data:data});
        }
    });
  }
  else if (req.body.id){
    bigquery.queryPositionsById(req.body.id, (err, data) => {
        if(err){
            console.log(err);
            res.json({success:false, err: util.format(err)});
        }
        else{
            res.json({success: true, data:data});
        }
    })
  }
  else if (req.body.minLat && req.body.maxLat && req.body.minLon && req.body.maxLon){
      bigquery.queryPositionsByGeo(req.body.minLat, req.body.maxLat, req.body.minLon, req.body.maxLon, (err, data) => {
          if(err){
              console.log(err);
              res.json({success: false, err: util.format(err)});
          }
          else{
              res.json({success: true, data:data});
          }
      });
  }
  else {
      res.json({success: true, data:[], defaultCall: true});
  }
});

module.exports = router;
