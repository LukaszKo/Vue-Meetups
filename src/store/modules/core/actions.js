import constans from './constans'
import MeetingsService from '../../../services/MeetingsService'
import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDTR70-aIkY3UFqHDJmDO4YFWwl8Rhc9qU",
  authDomain: "pwa-app-26ca8.firebaseapp.com",
  databaseURL: "https://pwa-app-26ca8.firebaseio.com/",
  projectId: 'pwa-app-26ca8',
  storageBucket: "gs://pwa-app-26ca8.appspot.com",
};

firebase.initializeApp(config)

export const addMeeting = async ({commit}, payload) => {
  commit(constans.ADD_MEETING, payload)
  const meetup = {
    title: payload.title,
    describe: payload.describe,
    place: payload.place,
    date: payload.date,
    time: payload.time
  }
  try {
    commit(constans.SET_LOADING, true)
    const response = await firebase.database().ref('meetings').push(meetup)
    const filename = payload.image.name
    const ext = filename.slice(filename.lastIndexOf('.'))
    const fileData = await firebase.storage().ref('meetings/' + response.key + '.' + ext).put(payload.image)
    let imageUrl = fileData.metadata.downloadURLs[0]
    await firebase.database().ref('meetings').child(response.key).update({imageUrl: imageUrl})
    await MeetingsService.AddNewMeeting({success: true})
  } catch (err) {
    console.error(err)
  } finally {
    commit(constans.SET_LOADING, false)
  }
}

export const getAllMeetings = async ({commit}) => {
  try {
    commit(constans.SET_LOADING, true)
    const data = await firebase.database().ref('meetings').once('value')
    let meetings = []
    const obj = data.val()
    Object.keys(obj).map(key => {
      meetings.push({
        id: key,
        title: obj[key].title,
        place: obj[key].place,
        describe: obj[key].describe,
        date: obj[key].date,
        time: obj[key].time,
        imageUrl:  obj[key].imageUrl
      })
    })
    commit(constans.SET_MEETINGS, meetings)
  } catch (err) {
    console.error(err)
  } finally {
    commit(constans.SET_LOADING, false)
  }
}

export const editMeeting = async ({commit, getters}, payload) => {
  const editMeetup = getters.getMeetup
  const updateObj = {}
  Object.keys(editMeetup).map(editkey => {
    Object.keys(payload).map(payloadKey => {
      if (editkey === payloadKey && editMeetup[editkey] !== payload[payloadKey]) {
        updateObj[payloadKey] = payload[payloadKey]
      }
    })
  })
  try {
    commit(constans.SET_LOADING, true)
    await firebase.database().ref('meetings').child(editMeetup.id).update(updateObj)
  } catch (err) {
    console.error(err)
  } finally {
    commit(constans.SET_LOADING, false)
  }
}
