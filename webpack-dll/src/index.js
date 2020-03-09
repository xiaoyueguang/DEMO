import a from './a.js'
import alpha from './alpha.js'
import b from './b'
import Vue from 'vue/dist/vue.esm.browser'

console.log(alpha, a, b)

new Vue({
  template: `<div>Hello {{msg}}!</div>`,
  data () {
    return {
      msg: 'World'
    }
  }
}).$mount('#app')