<template lang="pug">
  v-layout(row="" wrap="")
    v-flex.text-xs-center.text-md-center
      loader.loader(v-if="!newMeetups.length", :size="200", :width="2")
      meeting(v-if="newMeetups.length", :meeting="meeting" v-for="meeting of newMeetups", :key="meeting.title")
      v-flex(xs12='', sm12='', md12='', lg6="", offset-md3='')
        v-alert(v-model="!newMeetups.length", color="info", outline="", icon="info") There is no meeting created

</template>

<script>
  import Meeting from './Meeting.vue'
  import Loader from 'components/commons/Loader'
  import {mapActions, mapGetters} from 'vuex'
  import {firebaseDB} from '../firebase/firebase'

  export default {
    firebase: {
      newMeetups: firebaseDB.ref('meetings')
    },
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
