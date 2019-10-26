const express = require('express');
const bigquery = require('../cloud/bigquery');
const router = express.Router();

router.use('/', (req, res) => {
    const query = req.query;
    const body = req.body;

    const callback = (err, data) => {
        if(err){
            console.log(err);
            res.json({success:false, err: util.format(err)});
        }
        else{
            res.json({success: true, data:data});
        }
    };

    if (query.length !== undefined && query.length !== 0) {
        bigquery.search(query, callback);
    }
    else {
        bigquery.search(req.body, callback);
    }
});

module.exports = router;
