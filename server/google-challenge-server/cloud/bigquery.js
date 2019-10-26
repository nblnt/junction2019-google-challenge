const {BigQuery} = require('@google-cloud/bigquery');
const mysql = require('mysql');

const bigquery = new BigQuery({
	projectId: "juctionxbp2019-loremipsum",
	keyFilename: "./keys/JuctionXBP2019-LoremIpsum-ac684918aab9.json"
});
const table = "juctionxbp2019-loremipsum.animals.animals_stringid";

const queryPositionsByTime = (from, to, callback) => {
    const query = 'SELECT id, lat, lon, timestamp FROM `'+table+'` WHERE timestamp > '
		+ parseInt(from) + ' AND timestamp < '+parseInt(to);
	bigquery.query(query, callback);
};

const queryPositionsById = (id, callback) => {
	const query = 'SELECT id, lat, lon, timestamp FROM `'+table+'` WHERE id = "' + id +'"';
	bigquery.query(query, callback);
};

const queryPositionsByGeo = (minLat, maxLat, minLon, maxLon,  callback)  => {
	const query = 'SELECT id, lat, lon, timestamp FROM `'+table+'` WHERE  lon <= ' + maxLon + ' AND lon >= '
		+ minLon + ' AND lat <= ' + maxLat + ' AND lat >= ' + minLat;
	bigquery.query(query, callback);
};

module.exports = {
    queryPositionsByTime:queryPositionsByTime,
	queryPositionsById:queryPositionsById,
	queryPositionsByGeo:queryPositionsByGeo
};
