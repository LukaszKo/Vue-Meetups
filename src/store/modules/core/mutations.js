import constans from './constans'

export default {
  [constans.ADD_MEETING] (state, payload) {
    state.meetings.push(payload)
  },
  [constans.ADD_WORK] (state, payload) {
    state.works.push(payload)
  },
  [constans.SET_MEETINGS] (state, payload) {
    state.meetings = payload || []
  }
}
