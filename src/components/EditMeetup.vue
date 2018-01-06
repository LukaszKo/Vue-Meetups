<template lang="pug">
  v-container
    v-layout(row="" wrap="")
      add-meeting-form(:meetup="getMeetup", form-title="Edit meetup", :editMode="true")

</template>

<script>
  import AddMeetingForm from './AddMeetingForm.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: {AddMeetingForm},
    computed: {
      ...mapGetters([
        'getMeetup'
      ]),
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
