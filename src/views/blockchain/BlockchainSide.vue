<template>
  <el-menu
    class="categories"
    default-active="0"
    @select="handleSelect"
    active-text-color="red">
    <el-menu-item index="0">
      <i class="fontFamily lamafenbushishujuku"></i>
      <span slot="title">账本信息</span>
    </el-menu-item>
    <el-menu-item index="1">
      <i class="fontFamily lamatongdao"></i>
      <span slot="title">通道信息</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="fontFamily lamaicon-"></i>
      <span slot="title">链码信息</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'BlockchainSide',
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
    width: 150px;
  }
</style>
