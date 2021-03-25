import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueChatScroll from 'vue-chat-scroll'

Vue.config.productionTip = false
Vue.use(vueChatScroll)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
