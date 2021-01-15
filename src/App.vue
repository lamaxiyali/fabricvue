<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    localStorage.getItem('userMsg') && this.$store.replaceState(JSON.parse(localStorage.getItem('userMsg')))
    //  在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('userMsg', JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
  body{
    margin: 0px;
  }
*{ padding: 0; margin: 0; }
html,body{ width: 100%; height: 100%; }

</style>
