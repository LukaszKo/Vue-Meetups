<template lang="pug">
  v-layout.meeting
    v-flex(xs12='', md6='', sm6='', offset-md3='')
      v-card
        v-card-media(
        src="/static/img/view.png"
        height="200px"
        )
        v-card-title(primaryTitle="")
          .details
            h3.headline.blue--text {{meeting.title}}
            .div
              span Describe: &nbsp
              span.grey--text {{meeting.describe}}
            .div
              span Place: &nbsp
              span.grey--text {{meeting.place}}
            .div
              span Date: &nbsp
              span.grey--text {{meeting.date}}
            .div
              span Time: &nbsp
              span.grey--text {{meeting.time}}
        v-card-actions
          v-btn.green--text(flat='') Edit
          v-btn.orange--text(flat='') Remove

</template>

<script>
  export default {
    props: ['meeting']
  }
</script>

<style lang="sass" scoped>

  .meeting
    margin: 30px 0

    .details
      text-align: left
</style>
