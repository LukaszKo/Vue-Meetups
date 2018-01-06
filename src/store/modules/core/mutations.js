import constans from './constans'

export default {
  [constans.ADD_MEETING] (state, payload) {
    state.meetings.push(payload)
  },
  [constans.ADD_WORK] (state, payload) {
    state.works.push(payload)
  },
  [constans.SET_MEETINGS] (state, payload) {
    let allMeetings = payload || []
    state.meetings = allMeetings.length ? allMeetings.reverse(): allMeetings
  },
  [constans.SET_LOADING] (state, payload) {
    state.loading = payload
  },
  [constans.SET_MEETUP] (state, payload) {
    state.meetup = payload || {}
  }
}
