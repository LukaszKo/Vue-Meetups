import constans from './constans'
import MeetingsService from '../../../services/MeetingsService'
import { firebaseDB, firebaseStorage } from '../../../firebase/firebase'

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
    const response = await firebaseDB.ref('meetings').push(meetup)
    const filename = payload.image.name
    const ext = filename.slice(filename.lastIndexOf('.'))
    const fileData = await firebaseStorage.ref('meetings/' + response.key + '.' + ext).put(payload.image)
    let imageUrl = fileData.metadata.downloadURLs[0]
    await firebaseDB.ref('meetings').child(response.key).update({imageUrl: imageUrl, imageExt: ext})
    await MeetingsService.AddNewMeeting({success: true})
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
    await firebaseDB.ref('meetings').child(editMeetup['.key']).update(updateObj)
  } catch (err) {
    console.error(err)
  } finally {
    commit(constans.SET_LOADING, false)
  }
}

export const removeMeeting = async ({commit, dispatch}, payload) => {
  try {
    commit(constans.SET_LOADING, true)
    await firebaseDB.ref('meetings').child(payload.id).remove()
    await firebaseStorage.ref('meetings/' + payload.id + '.' + payload.ext).delete()
    await MeetingsService.RemoveMeeting({success: true, title: payload.title})
  } catch (err) {
    console.error(err)
  } finally {
    commit(constans.SET_LOADING, false)
  }
}
