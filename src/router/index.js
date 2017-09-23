import Vue from 'vue'
import Router from 'vue-router'
import Work from '@/components/Work'
import Main from '@/components/Main'
import Meetings from '@/components/Meetings'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main
    },
    {
      path: '/meetings',
      component: Meetings
    },
    {
      path: '/work',
      component: Work
    }
  ]
})
