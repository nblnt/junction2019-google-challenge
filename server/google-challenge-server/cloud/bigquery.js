const {BigQuery} = require('@google-cloud/bigquery');
const mysql = require('mysql');

const bigquery = new BigQuery({
	projectId: "juctionxbp2019-loremipsum",
	keyFilename: "./keys/JuctionXBP2019-LoremIpsum-ac684918aab9.json"
});
const table = "juctionxbp2019-loremipsum.animals.animals_stringid";

const queryPositionsByTime = (from, to, callback) => {
    const query = 'SELECT id, lat, lon, timestamp FROM `'+table+'` WHERE timestamp => ' + mysql.escape(from) + ' AND timesatmp <= '+mysql.escape(to);
	bigquery.query(query, callback);
}

module.exports = {
    queryPositionsByTime:queryPositionsByTime
}