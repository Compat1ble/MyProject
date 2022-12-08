import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//import { Button } from 'element-ui'   //按需引入需要根据elementui官网更改babel.config.js
import App from './App.vue'
import router from './router/index'
import store from './store'
import './api/mock'
import Cookie from 'js-cookie'
Vue.config.productionTip = false
Vue.use(ElementUI)
//Vue.use(Button)


//添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  //判断token存不存在
  const token = Cookie.get('token')
  if (!token && to.name !== 'login') {//token不存在说明当前用户是未登录，应该跳转至登陆页面
    next({
      name: 'login'
    })
  } else if (token && to.name === 'login') { //token存在说明用户已经登陆，此时跳转至首页
    next({
      name: 'home'
    })
  } else {
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
