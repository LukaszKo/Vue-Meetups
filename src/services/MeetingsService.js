import ServiceFactory from './ServiceFactory'

const url = 'https://us-central1-pwa-app-26ca8.cloudfunctions.net'

export default {
  AddNewMeeting (body) {
    return ServiceFactory.ProccessPostRequest(`${url}/storeMeeting`, body)
  },
  GetMeetings () {
    return ServiceFactory.ProccessGetRequest(`${url}/meetings`)
  }
}
