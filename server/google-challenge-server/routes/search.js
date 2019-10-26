const express = require('express');
const bigquery = require('../cloud/bigquery');
const async = require('async');
const router = express.Router();

router.use('/structured', (req, res) => {
    let getAllPostions = (callback)=>{
        bigquery.listPositions({from: req.body.from, to: req.body.to}, (err, result) => {
            if(err){callback(err);}
            else{
                let byDevice = {};
                for(let rec of result){
                    if(!byDevice[rec.id]){
                        byDevice[rec.id] = {positions: []};
                    }
                    byDevice[rec.id].positions.push({lat: rec.lat, lon:rec.lon, timestamp: rec.timestamp});
                }
                for(let i in byDevice){
                    byDevice[i].positions.sort((a,b)=>{return a.timestamp-b.timestamp;});
                }
                callback(null, byDevice);
            }
        });
    }

    let getGroupBindings = (byDevice, callback) => {
        bigquery.listDeviceInfos({id: Object.keys(byDevice)}, (err, result)=> {
            if(err){
                callback(err);
            }
            else{
                let byGroup = {};
                for(let rec of result){
                    if(!byGroup[rec.groupname]){
                        byGroup[rec.groupname] = {};
                    }
                    byGroup[rec.groupname][rec.id] = byDevice[rec.id];
                    byDevice[rec.id].group = rec.groupname;
                }
                callback(null, byDevice, byGroup);
            }
            
        });
    }

    let getGroupInfo = (byDevice, byGroup, callback) => {
        let groupList = [];
        bigquery.listGroups({name: Object.keys(byGroup)},(err, result)=>{
            if(err){
                callback(err);
            }
            else{
                for(let rec of result){
                    for(let devId in byGroup[rec.name]){
                        byGroup[rec.name][devId].species = rec.species;
                    }
                }
                callback(null, byDevice);
            }
        });
    }

    

    const callback = (err, data) => {
        if(err){
            console.log(err);
            res.json({success:false, err: util.format(err)});
        }
        else{
            res.json({success: true, data:data});
        }
    };

    async.waterfall(
        [
            getAllPostions,
            getGroupBindings,
            getGroupInfo
        ],
        callback
    )
});

module.exports = router;
