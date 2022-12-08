<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
    <h3>{{isCollapse ? '后台' : '后台管理系统'}}</h3>
    <el-menu-item @click="clickmenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group v-for="subitem in item.children" :key="subitem.pass">
        <el-menu-item @click="clicksubmenu(subitem)" :index="subitem.pass">{{subitem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data() {
    return {}
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    clickmenu(item) {
      if (item.path != this.$route.path && !(this.$route.path == '/home' && item.path == '/')) {
        //console.log(this.$route.path)
        this.$router.push(item.path)
      }
      this.$store.commit('selectMenu', item)
    },
    clicksubmenu(subitem) {
      if (subitem.path != this.$route.path) {
        this.$router.push(subitem.path)
      }
    }
  },
  computed: {
    noChildren() {
      return this.menuData.filter(item => !item.children)
    },
    hasChildren() {
      return this.menuData.filter(item => item.children)
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    menuData() {
      //判断当前数据，如果缓存中没有，从当前store中获取
      return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  border-right: solid 0px #e6e6e6;
  h3 {
    color: white;
    text-align: center;
    line-height: 60px;
    height: 30px;
    font-size: 16px;
    font-weight: 400;
    height: 60px;
  }
}
</style>