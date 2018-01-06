<template lang="pug">
  v-layout(row="" wrap="")
    v-flex.text-xs-center.text-md-center
      loader.loader(v-if="loading && !meetings.length", :size="100", :width="5")
      meeting(v-if="meetings.length", :meeting="meeting" v-for="meeting in meetings", :key="meeting.title")

</template>

<script>
  import Meeting from './Meeting.vue'
  import Loader from 'components/commons/Loader'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: {Meeting, Loader},
    computed: {
      ...mapGetters([
        'getMeetings',
        'getLoading'
      ]),
      meetings () {
        return this.getMeetings
      },
      loading () {
        return this.getLoading
      }
    },
    mounted () {
      this.getAllMeetings()
    },
    methods: {
      ...mapActions([
        'getAllMeetings'
      ])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  .loader
    margin-top: 20vh
</style>
