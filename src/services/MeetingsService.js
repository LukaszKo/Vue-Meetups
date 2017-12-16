import ServiceFactory from './ServiceFactory'
import urls from '../database/configUrls'

export default {
  AddNewMeeting (body) {
    return ServiceFactory.ProccessPostRequest(`${urls.restApi}/storeMeeting`, body)
  },
  GetMeetings () {
    return ServiceFactory.ProccessGetRequest(`${urls.restApi}/meetings`)
  }
}
