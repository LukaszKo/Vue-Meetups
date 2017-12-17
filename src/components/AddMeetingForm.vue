<template lang="pug">
  v-card
    v-card-title
      span.headline Add New Meetup
    v-card-text
      v-container(grid-list-md='')
        v-layout(wrap='')
          v-flex(xs12='', sm12='', md12='')
            v-text-field(label='title', required='', v-model="title", :error-messages="errors.collect('title')", v-validate="'required'", data-vv-name="title")
          v-flex(xs12='', sm12='', md12='')
            v-text-field(label='describe', v-model="describe", multi-line, :error-messages="errors.collect('describe')", v-validate="'required|max:100'", data-vv-name="describe", :counter="100")
          v-flex(xs12='', sm12='', md12='')
            v-text-field(label='place', v-model="place", persistent-hint='', required, :error-messages="errors.collect('place')", v-validate="'required'", data-vv-name="place")
          v-flex(xs12='', md4="")
            v-date-picker(v-model='date')
          v-flex(xs12='', md4="")
            v-time-picker(v-model="time", format="24hr")
    v-card-actions
      v-spacer
      v-btn.blue--text.darken-1(flat='', @click='clear') Close
      v-btn.blue--text.darken-1(flat='', @click='submit') Add
</template>

<script>
  import moment from 'moment'

  export default {
    $validates: true,
    data () {
      return {
        date: null,
        time: null,
        title: '',
        describe: '',
        place: ''
      }
    },
    computed: {
      collectMeetup () {
        return {
          title: this.title,
          describe: this.describe,
          place: this.place,
          date: this.date,
          time: this.time
        }
      }
    },
    methods: {
      async submit () {
        const validate = await this.$validator.validateAll()
        if (!this.date) this.date = this.getCorrectFormat('YYYY-MM-DD')
        if (!this.time) this.time = this.getCorrectFormat('HH:mm')
        if (validate) this.$emit('save', this.collectMeetup)
      },
      clear () {
        this.$emit('close')
      },
      getCorrectFormat (format) {
        return moment().format(format)
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
