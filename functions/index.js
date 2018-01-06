const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({orgin: true})
const serviceAccount = require('./firebaseKey.json')
const webpush = require('web-push')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://pwa-app-26ca8.firebaseio.com/'
})

exports.storeMeeting = functions.https.onRequest((request, response) => {
  let key
  cors(request, response, () => {
    admin.database().ref('meetings').push({
      title: request.body.title,
      describe: request.body.describe,
      place: request.body.place,
      date: request.body.date,
      time: request.body.time
    })
      .then((data) => {
        webpush.setVapidDetails('mailto: lukaszkochajewski@gmail.com', 'BFRKDS3jmAA8Qp_SQEiKMPGK7E_Kdnd_6N_x-kkeK-I7EK3V05Yro-0V1_JxBixqpXokY3VZ6PfQtpRQOoAS5-4', 'XTrOYVjN706SVI2phLvnu_2YkPGIHchrSIEHmsZbq44')
        key = data.key
        return admin.database().ref('subscriptions').once('value')
      })
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
        response.status(201).json({message: 'Meeting added', id: key})
      })
      .catch(err => {
        response.status(500).json({err})
      })
  })
})

exports.meetings = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    admin.database().ref('meetings').once('value')
      .then(data => {
        let meetings = []
        const obj = data.val()
        Object.keys(obj).map(key => {
          meetings.push({
            id: key,
            title: obj[key].title,
            place: obj[key].place,
            describe: obj[key].describe,
            date: obj[key].date,
            time: obj[key].time
          })
        })
        response.status(200).json(meetings)
      })
      .catch(err => {
        response.status(500).json({err})
      })
  })
})
