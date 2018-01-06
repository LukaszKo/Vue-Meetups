import axios from 'axios'

axios.defaults.headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

export default {
  ProccessGetRequest: async (url) => {
    try {
      let response = await axios.get(url)
      return response.data
    } catch (err) {
      console.error(err)
    }
  },
  ProccessPostRequest: async (url, body) => {
    try {
      let response = await axios.post(url, body)
      return response.data
    } catch (err) {
      console.error(err)
    }
  },
  ProccessDeleteRequest: async (url, body) => {
    try {
      let response = await axios.delete(url, body)
      return response.data
    } catch (err) {
      console.error(err)
    }
  },
  ProccessPatchRequest: async (url, body) => {
    try {
      let response = await axios.patch(url, body)
      return response.data
    } catch (err) {
      console.error(err)
    }
  }
}
