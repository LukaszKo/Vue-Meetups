<template lang="pug">
  v-app#app(toolbar='', v-if="show", v-scroll="onScroll")
    <!--v-navigation-drawer.hidden-md-and-up(temporary='', v-model='drawer', light='', overflow='', absolute='', v-touch="touch")-->
    <!--v-list-->
    <!--v-list-tile(v-for='item in items', :key='item.title', :to="item.link")-->
    <!--v-list-tile-action-->
    <!--v-icon {{ item.icon }}-->
    <!--v-list-tile-content-->
    <!--v-list-tile-title {{ item.title }}-->
    v-toolbar.blue.darken-4(dark='', v-touch="touch")
      <!--v-toolbar-side-icon.hidden-md-and-up(@click.stop='drawer = !drawer')-->
      v-toolbar-title Meetups Manager
      v-spacer.hidden-xs-only
      v-toolbar-items.hidden-xs-only
        v-btn(flat="" v-for='item in items', :key='item.title', :to="item.link") {{item.title}}
    main.blue-grey.lighten-4
      v-container(fluid='')
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
  loader.loader(v-else, :size="100", :width="5")

</template>

<script>
  import Loader from '@/components/commons/Loader'

  export default {
    name: 'app',
    data () {
      return {
        drawer: null,
        items: [
          {title: 'Meetups', link: '/meetings'},
          {title: 'Home', link: '/'}
        ],
        showFloatButton: false,
        right: null,
        show: false,
        swipeDirection: 'None',
        touch: {
          left: () => this.swipe('Left'),
          right: () => this.swipe('Right')
        }
      }
    },
    methods: {
      scrollUp () {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
      onScroll (e) {
        const offSet = window.pageYOffset || document.documentElement.scrollTop
        offSet > 250 ? this.showFloatButton = true : this.showFloatButton = false
      },
      swipe (move) {
        console.log(move)
        this.swipeDirection = move
        switch (move) {
          case 'Left':
            this.$router.push('meetings')
            break
          case 'Right':
            this.$router.push('/')
            break
        }
      }
    },
    mounted () {
      setTimeout(() => {
        this.show = true
      }, 500)
    },
    components: {Loader}
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
