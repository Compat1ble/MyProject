
import Cookie from 'js-cookie'
export default {
  state: {
    isCollapse: false, //用于控制菜单展开收起
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home'
      }
    ],
    menu: []
  },
  mutations: {
    //修改菜单展开收起的方法
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    //更新面包屑状态函数
    selectMenu(state, val) {
      console.log(val)
      //判断是否是首页，若是首页不进行操作
      if (val.name !== 'home') {
        //如果item中的name和val中的name相等 则返回数组的索引
        const index = state.tabsList.findIndex(item => item.name === val.name)
        if (index === -1) {
          state.tabsList.push(val)
        }
      }
    },
    //删除指定的tag数据
    closeTag(state, item) {
      const index = state.tabsList.findIndex(val => val.name === item.name)
      state.tabsList.splice(index, 1)
    },
    //设置menu数据
    setMenu(state, val) {
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    //动态注册路由
    addMenu(state, router) {
      //判断当前缓存中是否有数据
      if (!Cookie.get('menu')) return
      const menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      const menuArray = []
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`../views/cp${item.url}`)
            return item
          })
          menuArray.push(...item.children)
        } else {
          item.component = () => import(`../views/cp${item.url}`)
          menuArray.push(item)
        }

      });
      menuArray.forEach(item => {
        router.addRoute('Main', item)
      })

    }
  }
}