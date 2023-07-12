import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:"/home"
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/hotsong',
    name: 'hotsong',
    component: ()=>import("../views/HotSongView.vue")
  },
  {
    path: '/search',
    name: 'search',
    component: ()=>import("../views/SearchView.vue")
  },
  {
    path: '/playlist',
    name: 'search',
    component: ()=>import("../views/PlaylistView.vue")
  },
  {
    path: '/player',
    name: 'player',
    component: ()=>import("../views/PlayerView.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
