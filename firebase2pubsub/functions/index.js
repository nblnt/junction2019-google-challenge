const functions = require('firebase-functions');
const { PubSub } = require('@google-cloud/pubsub');

// Your Google Cloud Platform project ID
const projectId = 'juctionxbp2019-loremipsum';

// Instantiates a client
const pubsubClient = new PubSub({
    projectId: projectId,
    keyFilename: './JuctionXBP2019-LoremIpsum-ac684918aab9.json'
});

// The name for the new topic
const topicName = 'animals';
const topic = pubsubClient.topic(topicName);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.toPubSub = functions.database.instance('juctionxbp2019-loremipsum').ref('/messages/{pushId}/original/{messId}')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.toJSON();
      console.log('snapshot', original)
	  const data = Buffer.from(JSON.stringify(original));
	  return topic.publish(data);
 });
