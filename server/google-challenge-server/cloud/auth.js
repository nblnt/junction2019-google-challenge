const {BigQuery} = require('@google-cloud/bigquery');
// const keyFilePath = require('../key/keys');
/*const bigquery = new BigQuery({projectId: 'plexiform-zone-257123',
    keyFileName: '..\\server\\google-challenge-server\\key\\keys.json'});

module.exports = function () {
    bigquery.createDataset('my_dataset').then((data) => {
        console.log('success', data);
    }).catch((err) => {
        console.log(err);
    });
};*/
const bigquery = new BigQuery({
	projectId: "juctionxbp2019-loremipsum",
	keyFilename: "./keys/JuctionXBP2019-LoremIpsum-ac684918aab9.json"
});
let testQuery = function() {
	const query = 'SELECT id, lat, lon, timestamp FROM `juctionxbp2019-loremipsum.animals.animals_stringid` WHERE id = "3" LIMIT 1000';
	bigquery.query(query, function(err, rows) {
	  if (!err) {
		  console.log(rows);
		// rows is an array of results.
	  }
	  else{
		  console.log(err)
	  }
});
}
module.exports = testQuery;
// const admin = require('firebase-admin');
// const serviceAccount = require('../key/plexiform-zone-257123-firebase-adminsdk-yeyz6-f312851941');
//
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://plexiform-zone-257123.firebaseio.com"
// });
