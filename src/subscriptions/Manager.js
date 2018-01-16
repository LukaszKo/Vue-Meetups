import axios from 'axios'
import utils from '../utils/utility'
import keys from './keys'
import urls from '../database/configUrls'

export default {
  askForNotification () {
    if ('Notification' in window) {
      Notification.requestPermission(result => {
        if (result === 'granted') {
          this.configurePushSub()
        }
      })
    }
  },
  configurePushSub () {
    if (!('serviceWorker' in navigator)) {
      return
    }
    let reg
    navigator.serviceWorker.ready
      .then(swreg => {
        reg = swreg
        return swreg.pushManager.getSubscription()
      })
      .then(sub => {
        if (sub === null) {
          // Create a new subscription
          const convertedVapidPublicKey = utils.urlBase64ToUint8Array(keys.vapidPublicKey)
          return reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidPublicKey
          })
        } else {
          // We have a subscription
          return
        }
      })
      .then(newSub => {
        if (newSub) {
          return axios.post(urls.subscriptions, JSON.stringify(newSub), {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
        }
      })
      .then(res => {
        if (res && res.status === 200) {
          const options = {
            body: 'You accept notifications',
            tag: 'confirm-notify',
            renotify: true,
            actions: [
              {action: 'confirm', title: 'Okey'}
            ]
          }
          this.displayNotification(options)
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  displayNotification (options) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        registration.showNotification('Successfully subscribed', options)
      })
    }
  }
}
