<template>
  <div class="tabs">
    <el-tag v-for="(item,index) in tags" :key="item.path" :closable="item.name!=='home'" :effect="$route.name===item.name?'dark':'plain'" @click="changeMenu(item)" @close="handleClose(item,index)" size="small">
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'cpTag',
  data() {
    return {}
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  methods: {
    ...mapMutations(['closeTag']),
    changeMenu(item) {
      console.log(this.$router)
      this.$router.push({ name: item.name })
      console.log(this.$router)
    },
    //点击删除tag删除的功能
    handleClose(item, index) {
      this.closeTag(item)
      const length = this.tags.length
      console.log(index, length)
      //如果删除的那个标签的路由跟当前路由不等则不做操作
      if (item.name !== this.$route.name) {
        return
      }
      //如果当前是最后一个标签
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name
        })
      } else {
        this.$router.push({
          name: this.tags[index].name
        })
      }
    }
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>