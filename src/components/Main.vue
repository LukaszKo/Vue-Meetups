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
        v-btn(primary="", dark="", large="", @click="askForNotification") Enable notification

</template>

<script>
  import AddMeetingForm from './AddMeetingForm.vue'
  import NotifyManager from '../subscriptions/Manager'

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
      askForNotification () {
        NotifyManager.askForNotification()
      }
    },
    components: {AddMeetingForm}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
