import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Projects from '../views/Projects.vue'
import About from '../views/About.vue'
import Kubiki from '../views/Kubiki_Iblaxa.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/kubiki',
    name: 'kubiku',
    component: Kubiki
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
