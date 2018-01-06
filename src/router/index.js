import Vue from 'vue'
import Router from 'vue-router'
import Work from '@/components/Work'
import Meetings from '@/components/Meetings'
import EditMeetup from '@/components/EditMeetup'
import AddMeetup from '@/components/AddMeetup'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Meetings,
    },
    {
      path: '/work',
      component: Work
    },
    {
      path: '/add',
      component: AddMeetup
    },
    {
      path: '/edit',
      component: EditMeetup
    }
  ]
})
