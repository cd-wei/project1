import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    addr: '',
    txt: '',
    temperature: ''
  },
  actions: {
    getApi(context) {
      var CryptoJS = require('crypto-js')
      var UID = 'U6D77575E1'
      var KEY = 'depvmul3ka4vs4nq'
      var API = 'http://api.seniverse.com/v3/weather/now.json'
      var LOCATION = 'guangzhou'

      var ts = Math.floor((new Date()).getTime() / 1000)

      var str = 'ts=' + ts + '&uid=' + UID

      var sig = CryptoJS.HmacSHA1(str, KEY).toString(CryptoJS.enc.Base64)
      sig = encodeURIComponent(sig)
      str = str + '&sig=' + sig
      var url = '/api' + '?location=' + LOCATION + '&' + str + '&callback='
      axios.get(url).then(function (data) {
        var weather = data.data.results[0]
        context.state.addr = weather.location.name
        context.state.txt = weather.now.text
        context.state.temperature = weather.now.temperature
        console.log(context.state.temperature)
      }).catch(function (data) {
        console.log(data)
      })
    }
  }
})

export default store
