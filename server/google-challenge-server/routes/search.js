const express = require('express');
const bigquery = require('../cloud/bigquery');
const async = require('async');
const util = require('util');
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

router.use('/byspecies', (req, res) => {
    let getGroupInfo = (callback) => {
        console.log(req.body)
        bigquery.listGroups({species: req.body.species},(err, result)=>{
            if(err){
                callback(err);
            }
            else{
                let groups = {};
                for(let rec of result){
                    groups[rec.name] = rec.species;
                }
                callback(err, groups);
            }
        });
    }
    
    let getGroupBindings = (groups, callback) => {
        console.log(groups)
        bigquery.listDeviceInfos({groupname: Object.keys(groups) }, (err, result)=> {
            if(err){
                callback(err);
            }
            else{
                let byDevice = {};
                for(let rec of result){
                    if(!byDevice[rec.id]){
                        byDevice[rec.id] = {
                            positions:[],
                            group: rec.groupname,
                            species: groups[rec.groupname]
                        };
                    }
                }
                callback(null, byDevice);
            }
            
        });
    }

    let getAllPostions = (byDevice, callback)=>{
        bigquery.listPositions({from: req.body.from, to: req.body.to, id: Object.keys(byDevice)}, (err, result) => {
            if(err){callback(err);}
            else{
                for(let rec of result){
                    
                    byDevice[rec.id].positions.push({lat: rec.lat, lon:rec.lon, timestamp: rec.timestamp});
                }
                for(let i in byDevice){
                    if(byDevice[i].positions.length > 0){
                        byDevice[i].positions.sort((a,b)=>{return a.timestamp-b.timestamp;});
                    }
                    else{
                        delete byDevice[i];
                    }
                }
                callback(null, byDevice);
            }
        });
    }
    

    const callback = (err, data) => {
        if(err){
            res.json({success:false, err: util.format(err)});
        }
        else{
            res.json({success: true, data:data});
        }
    };

    async.waterfall(
        [
            getGroupInfo,
            getGroupBindings,
            getAllPostions      
        ],
        callback
    )
});

router.use('/bygroup', (req, res) => {
    let getGroupInfo = (callback) => {
        bigquery.listGroups({name: req.body.group},(err, result)=>{
            if(err){
                callback(err);
            }
            else{
                let species = null;
                if(result.length > 0){
                    species = result[0].species;
                }
                callback(err, species);
            }
        });
    }
    
    let getGroupBindings = (species, callback) => {
        bigquery.listDeviceInfos({groupname: req.body.group}, (err, result)=> {
            if(err){
                callback(err);
            }
            else{
                let byDevice = {};
                for(let rec of result){
                    if(!byDevice[rec.id]){
                        byDevice[rec.id] = {
                            positions:[],
                            group: rec.groupname,
                            species: species
                        };
                    }
                }
                callback(null, byDevice);
            }
            
        });
    }

    let getAllPostions = (byDevice, callback)=>{
        bigquery.listPositions({from: req.body.from, to: req.body.to, id: Object.keys(byDevice)}, (err, result) => {
            if(err){callback(err);}
            else{
                for(let rec of result){
                    byDevice[rec.id].positions.push({lat: rec.lat, lon:rec.lon, timestamp: rec.timestamp});
                }
                for(let i in byDevice){
                    if(byDevice[i].positions.length > 0){
                        byDevice[i].positions.sort((a,b)=>{return a.timestamp-b.timestamp;});
                    }
                    else{
                        delete byDevice[i];
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
            getGroupInfo,
            getGroupBindings,
            getAllPostions      
        ],
        callback
    )
});

module.exports = router;
