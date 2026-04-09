import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/home.vue'
import BookDetail from './pages/book/detail.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/book/detail/:id?', component: BookDetail }
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
