<template>
  <el-container>
    <el-aside width=auto>
      <cpAside></cpAside>
    </el-aside>
    <el-container>
      <el-header>
        <cpHeader></cpHeader>
      </el-header>
      <cpTag></cpTag>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import cpAside from '../components/cpAside.vue'
import cpHeader from '../components/cpHeader.vue'
import cpTag from '../components/cpTag.vue'
export default {
  data() {
    return {
      message: '这是main组件'
    }
  },
  components: {
    cpAside,
    cpHeader,
    cpTag
  }
}
</script>
  
<style scoped>
.el-header {
  padding: 0;
}
</style>