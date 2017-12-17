import constans from './constans'
import MeetingsService from '../../../services/MeetingsService'

export const addMeeting = async ({commit}, payload) => {
  commit(constans.ADD_MEETING, payload)
  try {
    await MeetingsService.AddNewMeeting(payload)
  } catch (err) {
    console.error(err)
  }
}

export const GetMeetings = async ({commit}) => {
  try {
    commit(constans.SET_LOADING, true)
    const meetings = await MeetingsService.GetMeetings()
    commit(constans.SET_MEETINGS, meetings.reverse())
  } catch (err) {
    console.error(err)
  } finally {
    commit(constans.SET_LOADING, false)
  }
}
