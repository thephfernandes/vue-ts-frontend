// import * as fs from 'fs'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import Categories from '@/views/Categories.vue'
import EntryPage from '@/views/EntryPage.vue'
import CategorizedEntries from '@/views/CategorizedEntries.vue'
import Random from '@/views/Random.vue'
import About from '@/views/About.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/',
    name: 'landing',
    component: Home,
  },
  {
    path: '/entries/:API',
    name: 'entry',
    component: EntryPage,
  },
  {
    path: '/categories',
    name: 'categories',
    component: Categories,
  },
  {
    path: '/categories/:category',
    // name: 'categorizedEntries',
    component: CategorizedEntries,
  },
  {
    path: '/random',
    name: 'random',
    component: Random
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
    // () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

// function getRoutes(): string[] {
//   const routePaths = [];
//   for (let i = 0; i < Object.values(routes).length; i++) {
//     routePaths.push(Object.values(routes)[i].path);
//   }
//   return routePaths;
// }

// async function writeToSitemap(routes: string[]) {
//   try {
//     fs.writeFileSync('./sitemap.json', JSON.stringify({
//       routes: routes
//     }), 'utf-8');
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function generateSitemap() {
//   let links: string[] = [];
//   links = getRoutes();
//   writeToSitemap(links);
// }

// generateSitemap();

export default router
