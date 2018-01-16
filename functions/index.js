const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({orgin: true})
const serviceAccount = require('./firebaseKey.json')
const webpush = require('web-push')
const firebaseConfig = require('./firebaseConfig')
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL
})

exports.storeMeeting = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    if (request.body.success) {
      webpush.setVapidDetails('mailto: youemail@emai.com', firebaseConfig.vapidPublicKey, firebaseConfig.vapidPrivateKey)
      admin.database().ref('subscriptions').once('value')
        .then(subscriptions => {
          subscriptions.forEach(sub => {
            const pushConfig = sub.val()
            webpush.sendNotification(pushConfig, JSON.stringify({
              title: 'New Meeting',
              content: 'new meeting added to calendar',
              openUrl: '/'
            }))
              .catch(err => {
                console.log(err)
              })
          })
          response.status(201).json({message: 'Meeting added'})
        })
        .catch(err => {
          response.status(500).json({err: JSON.stringify(err)})
        })
    }
  })
})

exports.removeMeeting = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    if (request.body.success) {
      webpush.setVapidDetails('mailto: youemail@emai.com', firebaseConfig.vapidPublicKey, firebaseConfig.vapidPrivateKey)
      admin.database().ref('subscriptions').once('value')
        .then(subscriptions => {
          subscriptions.forEach(sub => {
            const pushConfig = sub.val()
            webpush.sendNotification(pushConfig, JSON.stringify({
              title: 'Removed Meeting: ' + request.body.title,
              content: 'meeting removed from calendar',
              openUrl: '/'
            }))
              .catch(err => {
                console.log(err)
              })
          })
          response.status(201).json({message: 'Meeting removed'})
        })
        .catch(err => {
          response.status(500).json({err: JSON.stringify(err)})
        })
    }
  })
})
