import constans from './constans'
import MeetingsService from '../../../services/MeetingsService'
import * as firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDTR70-aIkY3UFqHDJmDO4YFWwl8Rhc9qU",
  authDomain: "pwa-app-26ca8.firebaseapp.com",
  databaseURL: "https://pwa-app-26ca8.firebaseio.com/",
  projectId: 'pwa-app-26ca8'
};

firebase.initializeApp(config)

export const addMeeting = async ({commit}, payload) => {
  commit(constans.ADD_MEETING, payload)
  try {
    await MeetingsService.AddNewMeeting(payload)
  } catch (err) {
    console.error(err)
  }
}

export const getAllMeetings = async ({commit}) => {
  try {
    commit(constans.SET_LOADING, true)
    const meetings = await MeetingsService.GetMeetings()
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
