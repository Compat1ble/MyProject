import Vue from 'vue'
import VueRouter from 'vue-router'
//import cpHome from '../views/cpHome.vue'
//import cpUser from '../views/cpUser.vue'
import cpMain from '../views/cpMain.vue'
//import cpMall from '../views/cpMall.vue'
//import cpPageOne from '../views/cpPageOne.vue'
//import cpPageTwo from '../views/cpPageTwo.vue'
import cpList from '../views/cpLogin.vue'
Vue.use(VueRouter)
const routes = [
  {

    path: '/',
    component: cpMain,
    name: 'Main',
    redirect: '/home',
    children: [
      // { path: 'home', name: 'home', component: cpHome },
      // { path: 'user', name: 'user', component: cpUser },
      // { path: 'mall', name: 'mall', component: cpMall },
      // { path: 'page1', name: 'page1', component: cpPageOne },
      // { path: 'page2', name: 'page2', component: cpPageTwo }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: cpList
  }

]
const router = new VueRouter({
  routes
})
export default router