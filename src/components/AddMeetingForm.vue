<template lang="pug">
  v-card
    v-card-title
      span.headline Add New Meeting Note
    v-card-text
      v-container(grid-list-md='')
        v-layout(wrap='')
          v-flex(xs12='', sm12='', md12='')
            v-text-field(label='title', required='', v-model="meeting.title")
          v-flex(xs12='', sm12='', md12='')
            v-text-field(label='describe', v-model="meeting.describe" , textarea)
          v-flex(xs12='', sm12='', md12='')
            v-text-field(label='place', v-model="meeting.place", persistent-hint='', required='')
          v-flex(xs12='', md4="")
            v-date-picker(v-model='meeting.date')
          v-flex(xs12='', md4="")
            v-time-picker(v-model="meeting.time")
    v-card-actions
      v-spacer
      v-btn.blue--text.darken-1(flat='', @click='$emit("close")') Close
      v-btn.blue--text.darken-1(flat='', @click='$emit("save", meeting)') Add
</template>

<script>
  export default {
    data () {
      return {
        meeting: {
          date: null,
          time: null
        }
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
