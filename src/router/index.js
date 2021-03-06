import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import devliceList from '../components/devliceList'
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
    	path:'/devliceList',
    	name:'devliceList',
    	component:devliceList
    }
  ]
})
