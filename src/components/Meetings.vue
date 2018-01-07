<template lang="pug">
  v-layout(row="" wrap="")
    v-flex.text-xs-center.text-md-center
      loader.loader(v-if="loading && !meetings.length", :size="200", :width="2")
      meeting(v-if="meetings.length", :meeting="meeting" v-for="meeting in meetings", :key="meeting.title")
      v-flex(xs12='', sm12='', md12='', lg6="", offset-md3='')
        v-alert(v-model="!loading && !meetings.length", color="info", outline="", icon="info") There is no meeting created

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
