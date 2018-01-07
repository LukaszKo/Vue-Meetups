<template lang="pug">
  v-layout.meeting
    v-flex(xs12='', md6='', sm6='', lg8="", offset-md2='')
      v-card
        v-card-title()
          h2.red--text {{meeting.title}}
        v-card-media(v-if="!loadingImage", :src="meeting.imageUrl", height="300px")
        loader(v-else="loadingImage", :size="295", :width="1", color="green")
        v-card-title(primaryTitle="")
          .details
            .div
              span Describe: &nbsp
              span.blue--text {{meeting.describe}}
            .div
              span Place: &nbsp
              span.blue--text {{meeting.place}}
            .div
              span Date: &nbsp
              span.blue--text {{meeting.date}}
            .div
              span Time: &nbsp
              span.blue--text {{meeting.time}}
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
      this.loadingImage = true
      setTimeout(() => {
        this.loadingImage = false
      }, 600)
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
        await this.removeMeeting(this.meeting.id)
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
