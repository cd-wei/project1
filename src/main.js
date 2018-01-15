// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './routers'
import App from './App'
import Vuex from 'vuex'
import store from './store/store'
import axios from 'axios'
import iView from 'iview'
import 'babel-polyfill'
import 'iview/dist/styles/iview.css'


Vue.config.productionTip = false
Vue.prototype.$ajax = axios
// Vue.prototype.HOST = '/api'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(iView)

const router = new VueRouter({
  mode: 'history',
  routes: routers
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
