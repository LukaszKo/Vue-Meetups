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
    const meetings = await MeetingsService.GetMeetings()
    commit(constans.SET_MEETINGS, meetings)
  } catch (err) {
    console.error(err)
  }
}
