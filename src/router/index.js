import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home.vue'
import BookDetail from '../pages/book/index.vue'

const routes = [
  { path: '/book', component: Home },
  { path: '/book/detail', component: BookDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
