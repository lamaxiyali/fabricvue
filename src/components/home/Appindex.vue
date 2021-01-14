<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div>hello</div>
</template>
<script>
  export default {
    name: 'AppIndex',
    created() {
      alert(this.$store.state.user.username)
    }
  }
</script>
<style scoped>
</style>
