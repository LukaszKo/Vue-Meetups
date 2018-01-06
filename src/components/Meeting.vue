<template lang="pug">
  v-layout.meeting
    v-flex(xs12='', md6='', sm6='', lg8="", offset-md2='')
      v-card
        v-card-title()
          h2.red--text {{meeting.title}}
        v-card-media(
        src="/static/img/view.png"
        height="200px"
        )
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
          v-btn.orange--text(flat='') Remove

</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    props: {
      meeting: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
      ...mapMutations([
        'SET_MEETUP'
      ]),
      editMeetup () {
        this.SET_MEETUP(this.meeting)
        this.$router.push('/edit')
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
