<template>
  <el-menu
    class="categories"
    default-active="0"
    @select="handleSelect"
    active-text-color="red">
    <el-menu-item index="0">
      <i class="el-icon-menu"></i>
      <span slot="title">个人信息</span>
    </el-menu-item>
    <el-menu-item index="1">
      <i class="el-icon-plus"></i>
      <span slot="title">参与任务信息</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-view"></i>
      <span slot="title">奖励信息</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'UserSide',
    data () {
      return {
        cid: ''
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key)
        this.cid = key
        this.$emit('indexSelect', this.cid)
      }
    }
  }
</script>

<style scoped>
  .categories {
    /*margin-left: 50%;*/
    /*left: -600px;*/
    /*top: 100px;*/
    width: 200px;
  }
</style>
