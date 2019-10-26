const express = require('express');
const bigquery = require('../cloud/bigquery');
const router = express.Router();
const util = require('util');

router.post('/position', (req, res) => {
    bigquery.listPositions(req.body,function (err,data){
        if(err){
            console.log(err);
            res.json({success:false, err: util.format(err)});
        }
        else{
            res.json({success: true, data:data});
        }
    });
});

router.post('/device', (req, res) => {
    bigquery.listDeviceInfos(req.body,function (err,data){
        if(err){
            console.log(err);
            res.json({success:false, err: util.format(err)});
        }
        else{
            res.json({success: true, data:data});
        }
    });
});

router.post('/group', (req, res) => {
    bigquery.listGroups(req.body,function (err,data){
        if(err){
            console.log(err);
            res.json({success:false, err: util.format(err)});
        }
        else{
            res.json({success: true, data:data});
        }
    });
});

router.post('/countdevices', (req, res) => {
    bigquery.countDevices(req.body, function (err, data) {
        if(err){
            console.log(err);
            res.json({success:false, err: util.format(err)});
        }
        else{
            res.json({success: true, data:data});
        }
    })
})

module.exports = router;
