import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDTR70-aIkY3UFqHDJmDO4YFWwl8Rhc9qU",
  authDomain: "pwa-app-26ca8.firebaseapp.com",
  databaseURL: "https://pwa-app-26ca8.firebaseio.com/",
  projectId: 'pwa-app-26ca8',
  storageBucket: "gs://pwa-app-26ca8.appspot.com",
}

const firebaseApp = firebase.initializeApp(config)
export const firebaseDB = firebaseApp.database()
export const firebaseStorage = firebaseApp.storage()

export default {
  firebase: {
    meetingsDB: firebaseDB.ref('meetings'),
    meetingsStorage: firebaseStorage.ref('meetings')
  }
}
