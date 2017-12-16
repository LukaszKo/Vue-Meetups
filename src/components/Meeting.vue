<template lang="pug">
  v-layout.meeting
    v-flex(xs12='', sm6='', offset-sm3='')
      v-card
        v-card-title(primary-title='')
          .container
            h3.headline.mb-0.green--text {{meeting.title}}
            .details-container
              .detail Describe: {{meeting.describe}}
              .detail Place: {{meeting.place}}
              .detail Date and Time: {{meeting.date }} {{ meeting.time}}
        v-card-actions
          v-btn.blue--text(flat='') Edit
          v-btn.orange--text(flat='') Remove

</template>

<script>
    export default {
      props: ['meeting']
    }
</script>

<style lang="sass" scoped>

  .meeting
    margin: 30px

  .container
    text-align: left
    padding: 10px

    .details-container
      margin-top: 15px
      display: flex
      flex-flow: column
</style>
