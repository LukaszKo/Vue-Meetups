<template lang="pug">
  v-container
    v-layout(row="" wrap="")
      v-flex.text-xs-center.text-md-center
        v-dialog.hidden-md-and-up(v-model='mobileDialog', persistent='', fullscreen="")
          v-btn(primary='', dark='', large='', slot="activator") Add Meeting Note
          add-meeting-form(slot="default", @close="mobileDialog = false", @save="onSave")
        v-dialog.hidden-xs-only(v-model='dialog', persistent='', width="50%")
          v-btn(primary='', dark='', large='', slot="activator") Add Meeting Note
          add-meeting-form(slot="default", @close="dialog = false", @save="onSave")
        v-btn(success='', dark='', large='') Add Work Note
        v-btn(primary="", dark="", large="", @click="askForNotification") Enable notification1

</template>

<script>
  import AddMeetingForm from './AddMeetingForm.vue'
  import utils from '../utils/utility'
  import axios from 'axios'

  export default {
    data () {
      return {
        dialog: false,
        mobileDialog: false
      }
    },
    methods: {
      onSave (meeting) {
        this.dialog = false
        this.mobileDialog = false
        this.$store.dispatch('addMeeting', meeting)
      },
      displayNotification () {
        if ('serviceWorker' in navigator) {
          const options = {
            body: 'Dobra robota ziomeczku',
            tag: 'confirm-notify',
            renotify: true,
            actions: [
              {action: 'confirm', title: 'Okey'}
            ]
          }
          navigator.serviceWorker.ready.then(registration => {
            registration.showNotification('Successfully subscribed', options)
          })
        }
      },
      async configurePushSub () {
        if (!('serviceWorker' in navigator)) {
          return
        }
        console.log('tutej')
        var reg
        navigator.serviceWorker.ready
          .then(function (swreg) {
            reg = swreg
            return swreg.pushManager.getSubscription()
          })
          .then(function (sub) {
            if (sub === null) {
              // Create a new subscription
              var vapidPublicKey = 'BFRKDS3jmAA8Qp_SQEiKMPGK7E_Kdnd_6N_x-kkeK-I7EK3V05Yro-0V1_JxBixqpXokY3VZ6PfQtpRQOoAS5-4'
              var convertedVapidPublicKey = utils.urlBase64ToUint8Array(vapidPublicKey)
              return reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidPublicKey
              })
            } else {
              console.log('else')
              // We have a subscription
            }
          })
          .then(function (newSub) {
            return axios.post('https://pwa-app-26ca8.firebaseio.com/subscriptions.json', JSON.stringify(newSub), {
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            })
          })
          .then(function (res) {
            if (res.ok) {
              console.log('dodalem subsskrypjce')
              this.displayNotification()
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      askForNotification () {
        if ('Notification' in window) {
          Notification.requestPermission(result => {
            if (result === 'granted') {
              this.configurePushSub()
            }
          })
        }
      }
    },
    components: {AddMeetingForm}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
