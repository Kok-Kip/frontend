import Vue from 'vue'
import Router from 'vue-router'
import SearchEngine from '@/components/SearchEngine'
import SearchPage from '@/components/SearchPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SearchEngine',
      component: SearchEngine
    },
    {
      path: '/result',
      name: 'SearchPage',
      component: SearchPage
    }
  ]
})
