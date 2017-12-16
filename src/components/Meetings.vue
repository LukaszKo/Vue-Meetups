<template lang="pug">
  v-layout(row="" wrap="")
    v-flex.text-xs-center.text-md-center
      h2 Meetings
      meeting(:meeting="meeting" v-for="meeting in meetings", :key="meeting.title")
</template>

<script>
  import Meeting from './Meeting.vue'

  export default {
    components: {Meeting},
    computed: {
      meetings () {
        return this.$store.getters.meetings
      }
    },
    mounted () {
      this.$store.dispatch('GetMeetings')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
