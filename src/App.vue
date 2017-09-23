<template lang="pug">
  v-app#app(toolbar='')
    v-navigation-drawer.hidden-md-and-up(temporary='', v-model='drawer', light='', overflow='', absolute='')
      v-list.pa-1
        v-list-tile(avatar='')
          v-list-tile-avatar
            img(src='https://randomuser.me/api/portraits/men/85.jpg')
          v-list-tile-content
            v-list-tile-title John Leider
      v-list.pt-0(dense='')
        v-divider
        v-list-tile(v-for='item in items', :key='item.title', :to="item.link")
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title {{ item.title }}
    v-toolbar.blue.darken-4(dark='')
      v-toolbar-side-icon.hidden-md-and-up(@click.stop='drawer = !drawer')
      v-spacer.hidden-xs-only
      v-toolbar-title
        router-link(tag="span", to="/", style="cursor: pointer")
          |Note Your Life
      v-spacer.hidden-xs-only
      v-toolbar-items.hidden-xs-only
        v-btn(flat="" v-for='item in items', :key='item.title', :to="item.link") {{item.title}}
    main
      v-container(fluid='')
        router-view
    v-footer.blue.darken-4
      v-spacer
      div © {{ new Date().getFullYear() }}


</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Meetings', icon: 'dashboard', link: '/meetings' },
        { title: 'Work', icon: 'question_answer', link: 'work' }
      ],
      right: null
    }
  }
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

@media (min-width: 1200px)
  #app
    margin: 0 20vw
  body
    background-image: url("../static/img/background.png")

</style>
