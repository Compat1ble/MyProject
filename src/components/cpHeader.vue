<template>
  <div class="header-container">
    <div class="l-content">
      <el-button style="margin-right: 20px;" @click="handlemenu" icon="el-icon-menu" size="small "></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{path:item.path}">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img class="img" src="../assets/1.png" alt="">

        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出登录</el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
  data() {
    return {}
  },
  methods: {
    handlemenu: function () {
      this.$store.commit('collapseMenu')
    },
    handleClick(command) {
      if (command === 'cancel') {
        console.log('退出登录')
        //点击退出清除token信息
        Cookie.remove('token')
        //清除Cookie中的menu
        Cookie.remove('menu')
        //跳转登陆页面
        this.$router.push('login')
      }
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  mounted() {
    console.log(this.tags)
  }
}
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    color: #fff;
    font-size: 14px;
    padding-left: 10px;
  }
  .el-dropdown-link {
    .img {
      width: 40px;
      height: 40px;
    }
  }
  .l-content {
    display: flex;
    align-items: center;

    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        &.is-link {
          color: #666;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: white;
        }
      }
    }
  }
}
</style>