import Vue from 'vue'
import App from './App.vue'
import axios from './http'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

import animated from 'animate.css'

import router from './router'
import store from './store'

// import 'lib-flexible'

Vue.use(animated)

Vue.use(Viewer)
Viewer.setDefaults({
  Options: {
    'inline': true, 'button': true, 'navbar': true,
    'title': true, 'toolbar': true, 'tooltip': true,
    'movable': true, 'zoomable': true, 'rotatable': true,
    'scalable': true, 'transition': true, 'fullscreen': true,
    'keyboard': true, 'url': 'data-source'
  }
})

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
