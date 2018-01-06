<template lang="pug">
  v-layout(row="" wrap="")
    v-card
      v-card-title(:primary-title="true")
        span.headline {{formTitle}}
      v-card-text
        v-container(grid-list-md='')
          v-layout(wrap='')
            v-flex(xs12='', sm12='', md12='')
              v-text-field(label='title', required='', v-model="title", :error-messages="errors.collect('title')", v-validate="'required'", data-vv-name="title")
            v-flex(xs12='', sm12='', md12='')
              v-text-field(label='describe', v-model="describe", multi-line, :error-messages="errors.collect('describe')", v-validate="'required|max:100'", data-vv-name="describe", :counter="100")
            v-flex(xs12='', sm12='', md12='')
              v-text-field(label='place', v-model="place", persistent-hint='', required, :error-messages="errors.collect('place')", v-validate="'required'", data-vv-name="place")
            v-flex(xs12='', md4="", lg6="")
              v-menu(
              lazy="",
              :close-on-content-click="false",
              v-model="dateMenu",
              transition="scale-transition",
              offset-y="")
                v-text-field(slot="activator", label="Date picker in menu", v-model="date", readonly="", :error-messages="errors.collect('date')", v-validate="'required'", data-vv-name="date")
                v-date-picker(v-model='date', autosave="")
            v-flex(xs12='', md4="", lg6="")
              v-menu(
              lazy="",
              :close-on-content-click="false",
              v-model="timeMenu",
              transition="scale-transition",
              offset-y="")
                v-text-field(slot="activator", label="Time picker in menu", v-model="time", readonly="", :error-messages="errors.collect('time')", v-validate="'required'", data-vv-name="time")
                v-time-picker(v-model="time", format="24hr", autosave="")
      v-card-actions(v-if="!editMode")
        v-spacer
        v-btn.blue--text.darken-1(flat='', @click='clear') Clear
        v-btn.blue--text.darken-1(flat='', @click='submit') Add
      v-card-actions(v-else)
        v-spacer
        v-btn.blue--text.darken-1(flat='', @click='back') Back
        v-btn.blue--text.darken-1(flat='', @click='submit', :loading="getLoading") Save
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    $validates: true,
    props: {
      meetup: {
        type: Object,
        default: () => {
          return {}
        }
      },
      formTitle: {
        type: String,
        default: 'Add New Meetup'
      },
      editMode: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        date: null,
        time: null,
        title: '',
        describe: '',
        place: '',
        dateMenu: false,
        timeMenu: false
      }
    },
    computed: {
      ...mapGetters([
        'getLoading'
      ]),
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
    mounted () {
      let meetupKeys = Object.keys(this.meetup)
      if(meetupKeys.length) {
        meetupKeys.map(key => {
          this[key] = this.meetup[key]
        })
      }
    },
    methods: {
      ...mapActions([
        'addMeeting',
        'editMeeting'
      ]),
      async submit () {
        const validate = await this.$validator.validateAll()
        if (validate) {
          this.editMode ? await this.editMeeting(this.collectMeetup) : await this.addMeeting(this.collectMeetup)
          this.$router.push('/')
        }
      },
      clear () {
        this.title = ''
        this.describe = ''
        this.place = ''
        this.date = null
        this.time = null
        setTimeout(() => {
          this.errors.clear()
        })
      },
      back () {
        this.$router.push('/')
      },
      saveMeetup () {

      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
