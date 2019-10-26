const express = require('express');
const bigquery = require('../cloud/bigquery');
const router = express.Router();

router.use('/countDevices', (req, res) => {

    const callback = (err, data) => {
        if (err) {
            console.log(err);
            res.json({success: false, err: util.format(err)});
        } else {
            res.json({success: true, data: data});
        }
    };

    bigquery.countDevices({}, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result.length);
        }
    });
});

router.use('/countData', (req, res) => {
    const callback = (err, data) => {
        if (err) {
            console.log(err);
            res.json({success: false, err: util.format(err)});
        } else {
            res.json({success: true, data: data});
        }
    };
    let from = Math.round(Date.now() / 1000) - 60;
    bigquery.listPositions({from: from}, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result.length);
        }
    });
});

// data from active devices from last 10 minutes
router.use('/currentDevices', (req, res) => {
    const callback = (err, data) => {
        if (err) {
            console.log(err);
            res.json({success: false, err: util.format(err)});
        } else {
            res.json({success: true, data: data});
        }
    };
    let from = Math.round(Date.now() / 1000) - 600;
    //let from = 10000000;
    let idTimestamps = {};
    let allRecordFrom = {};
    bigquery.countDevices({from: from}, (err, result) => {
        if (err) {
            callback(err);
        } else {
            idTimestamps = result;
            bigquery.listPositions({from: from}, (err, result) => {
                if (err) {
                    callback(err);
                } else {
                    allRecordFrom = result;
                    let allData = [];
                    for (let i of idTimestamps) {
                        if (i.id && i.timestamp) {
                            let filtered = allRecordFrom.filter(x => x.id === i.id && x.timestamp === i.timestamp);
                            allData.push({
                                id: filtered[0].id,
                                lat: filtered[0].lat,
                                lon: filtered[0].lon,
                                timestamp: filtered[0].timestamp
                            });
                        }
                    }
                    callback(null, allData);
                }
            });
        }
    });

});

router.use('/countMoving', (req, res) => {
    const callback = (err, data) => {
        if (err) {
            console.log(err);
            res.json({success: false, err: util.format(err)});
        } else {
            res.json({success: true, data: data});
        }
    };
    let from = Math.round(Date.now() / 1000) - 600;
    bigquery.listPositions({from: from}, (err, result) => {
        if (err) {
            callback(err);
        } else {
            let devices = {}
            let arcLimit = 18 / (63710 * Math.PI);
            let arcLimitSQ = arcLimit * arcLimit;
            for (let rec of result) {
                if (!devices[rec.id]) {
                    devices[rec.id] = [rec];
                } else {
                    devices[rec.id].push(rec);
                }
            }
            for (let i in devices) {
                if (devices[i].length > 1) {
                    devices[i].sort(function (a, b) {
                        return b.timestamp - a.timestamp;
                    });
                } else {
                    delete devices[i];
                }
            }
            for (let i in devices) {
                let latDiff = devices[i][0].lat - devices[i][1].lat;
                let lonDiff = devices[i][0].lon - devices[i][1].lon;
                let dist = (latDiff * latDiff) + (lonDiff * lonDiff);
                if (dist < arcLimitSQ) {
                    delete devices[i];
                }
            }

            callback(null, Object.keys(devices).length);
        }
    });
});

module.exports = router;
