<template lang="pug">
  v-layout.meeting
    v-flex(xs12='', md10='', sm10='', lg8, offset-md1, offset-lg2, offset-sm1)
      v-card.grey.lighten-3(light, flat)
        v-card-title()
          h2.blue-grey--text.text--darken-1 {{meeting.title.toUpperCase()}}
        v-card-media(:src="meeting.imageUrl", height="300px")
        <!--loader(v-else="loadingImage", :size="295", :width="1", color="green")-->
        v-card-title(primaryTitle="")
          .details
            .div
              span.grey--text Describe: &nbsp
              span {{meeting.describe}}
            .div
              span.grey--text Place: &nbsp
              span {{meeting.place}}
            .div
              span.grey--text Date: &nbsp
              span {{meeting.date}}
            .div
              span.grey--text Time: &nbsp
              span {{meeting.time}}
        v-divider
        v-card-actions
          v-btn.green--text(flat='', @click="editMeetup") Edit
          v-btn.orange--text(flat='', @click="removeDialog = true") Remove
          v-dialog(v-model="removeDialog", max-width="300")
            v-card
              v-card-title.headline Remove meetup
              v-card-text You want to remove this meetup?
              v-divider
              v-card-actions
                v-spacer
                v-btn(flat="", color="primary", @click="removeDialog = false") Back
                v-btn(flat="", color="orange", @click="removeMeetup", :loading="getLoading") Confirm

</template>

<script>
  import {mapMutations, mapActions, mapGetters} from 'vuex'
  import Loader from 'components/commons/Loader'

  export default {
    components: {Loader},
    props: {
      meeting: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data () {
      return {
        loadingImage: false,
        removeDialog: false
      }
    },
    computed: {
      ...mapGetters([
        'getLoading'
      ])
    },
    mounted () {
      // this.loadingImage = true
      // setTimeout(() => {
      //   this.loadingImage = false
      // }, 600)
    },
    methods: {
      ...mapActions([
        'removeMeeting'
      ]),
      ...mapMutations([
        'SET_MEETUP'
      ]),
      editMeetup () {
        this.SET_MEETUP(this.meeting)
        this.$router.push('/edit')
      },
      async removeMeetup () {
        await this.removeMeeting({id: this.meeting['.key'], ext: this.meeting.imageExt, title: this.meeting.title})
        this.removeDialog = false
      }
    }
  }
</script>

<style lang="sass" scoped>

  .meeting
    margin: 30px 0

    .details
      text-align: left
</style>
