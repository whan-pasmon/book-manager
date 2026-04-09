import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home.vue'
import BookDetail from '../pages/book/detail.vue'

const routes = [
  { path: '/book', component: Home },
  { path: '/book/detail/:id?', component: BookDetail }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
