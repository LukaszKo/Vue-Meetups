<template lang="pug">
  v-layout(row="" wrap="")
    v-flex.text-xs-center.text-md-center
      loader.loader(v-if="loading && !meetings.length", :size="100", :width="5")
      meeting(:meeting="meeting" v-for="meeting in meetings", :key="meeting.title")

</template>

<script>
  import Meeting from './Meeting.vue'
  import Loader from 'components/commons/Loader'

  export default {
    components: {Meeting, Loader},
    computed: {
      meetings () {
        return this.$store.getters.meetings
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    mounted () {
      this.$store.dispatch('GetMeetings')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  .loader
    margin-top: 20vh
</style>
