<template lang="pug">
  v-app#app(toolbar='', v-if="show")
    v-navigation-drawer.hidden-md-and-up(temporary='', v-model='drawer', light='', overflow='', absolute='')
      v-list
        v-list-tile(v-for='item in items', :key='item.title', :to="item.link")
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title {{ item.title }}
    v-toolbar.blue.darken-4(dark='')
      v-toolbar-side-icon.hidden-md-and-up(@click.stop='drawer = !drawer')
      v-toolbar-title
        router-link(tag="span", to="/", style="cursor: pointer")
          | Note Your Life
      v-spacer.hidden-xs-only
      v-toolbar-items.hidden-xs-only
        v-btn(flat="" v-for='item in items', :key='item.title', :to="item.link") {{item.title}}
    main.blue-grey.lighten-4
      v-container(fluid='')
        router-view
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
          {title: 'Meetings', icon: 'dashboard', link: '/meetings'},
          {title: 'Work', icon: 'question_answer', link: 'work'}
        ],
        right: null,
        show: false
      }
    },
    mounted () {
      setTimeout(() => {
        this.show = true
      }, 1000)
    },
    components: {Loader}
  }
</script>

<style lang="sass">
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
