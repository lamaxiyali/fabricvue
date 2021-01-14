<template>
    <button @click="incrementHandler">{{count}}</button>
</template>

<script>
    export default {
      name: 'TestChild;',
      props: [
        'url'
      ],
      data () {
        return {
          cat: 'tomy',
          count: 1
        }
      },
      methods: {
        incrementHandler: function () {
          this.count++
          this.$emit('increment')
        }
      }
    }
</script>

<style scoped>

</style>
