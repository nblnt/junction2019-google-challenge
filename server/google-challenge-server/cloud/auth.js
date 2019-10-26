const {BigQuery} = require('@google-cloud/bigquery');
// const keyFilePath = require('../key/keys');
const bigquery = new BigQuery({projectId: 'plexiform-zone-257123',
    keyFileName: '..\\server\\google-challenge-server\\key\\keys.json'});

module.exports = function () {
    bigquery.createDataset('my_dataset').then((data) => {
        console.log('success', data);
    }).catch((err) => {
        console.log(err);
    });
};

// const admin = require('firebase-admin');
// const serviceAccount = require('../key/plexiform-zone-257123-firebase-adminsdk-yeyz6-f312851941');
//
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://plexiform-zone-257123.firebaseio.com"
// });
