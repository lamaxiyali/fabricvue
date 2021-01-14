<template>
  <el-breadcrumb separator="/" class="app-breadcrumb">
    <el-breadcrumb-item
      v-if="this.$route.meta.name"
      :to="{ path: '/blockchain/ledger' }"
    >首页</el-breadcrumb-item
    >
    <el-breadcrumb-item>{{ this.$route.meta.name }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: 'BreadBar'
  }
</script>

<style scoped>
  .app-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 20px;
    margin-left: 10px;
  }
</style>
