<template lang="pug">
  v-app#app(toolbar='', v-if="show", v-scroll="onScroll")
    v-navigation-drawer.hidden-md-and-up(temporary='', v-model='drawer', light='', overflow='', absolute='')
      v-toolbar.blue.darken-4(dark='')
        v-toolbar-title Menu
      v-divider
      v-list
        v-list-tile(v-for='item in items', :key='item.title', :to="item.link", :exact="true")
          v-list-tile-action
            v-icon {{item.icon}}
          v-list-tile-content
            v-list-tile-title {{ item.title }}
      v-btn.hidden-md-and-up.theme--dark.red(@click="askForNotification") Enable notification
    v-toolbar.blue.darken-4(dark='')
      v-toolbar-side-icon.hidden-md-and-up(@click.stop='drawer = !drawer')
      v-toolbar-title Meetups Manager
      v-spacer.hidden-xs-only
      v-btn.hidden-xs-only.theme--dark.red(@click="askForNotification") Enable notification
      v-toolbar-items.hidden-xs-only
        v-btn(flat="" v-for='item in items', :key='item.title', :to="item.link", :exact="true") {{item.title}}
          v-icon(right="") {{item.icon}}
    main.blue-grey.lighten-4
      v-container
        transition(name="slide-fade")
          router-view
      v-fab-transition
        v-btn.hidden-xs-only.theme--dark.red(v-if="showFloatButton", style="margin-right: 20vw", fixed='', bottom='', right='', fab='', @click="scrollUp")
          v-icon keyboard_arrow_up
      v-fab-transition
        v-btn.hidden-md-and-up.theme--dark.red(v-if="showFloatButton", fixed='', bottom='', right='', fab='', @click="scrollUp")
          v-icon keyboard_arrow_up
    v-footer.blue.darken-4(dark='')
      span.white--text &copy; 2017

</template>

<script>
  import Loader from '@/components/commons/Loader'
  import NotifyManager from './subscriptions/Manager'

  export default {
    name: 'App',
    components: {Loader},
    data () {
      return {
        drawer: null,
        items: [
          {title: 'Meetups', link: '/', icon: 'event'},
          {title: 'Add meetup', link: '/add', icon: 'add'}
        ],
        showFloatButton: false,
        right: null,
        show: false,
        swipeDirection: 'None'
      }
    },
    mounted () {
      setTimeout(() => {
        this.show = true
      }, 100)
    },
    methods: {
      scrollUp () {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
      onScroll () {
        const offSet = window.pageYOffset || document.documentElement.scrollTop
        offSet > 250 ? this.showFloatButton = true : this.showFloatButton = false
      },
      askForNotification () {
        NotifyManager.askForNotification()
      }
    }
  }
</script>

<style lang="sass">
  @import 'sass/transitions/slide'

  body
    margin: 0

  #app
    font-family: 'Lato', sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    color: #2c3e50

  footer
    color: white

  .loader
    margin-top: 40vh

  @media (min-width: 1200px)
    #app
      margin: 0 20vw
    body
      background-color: #37474f

</style>
