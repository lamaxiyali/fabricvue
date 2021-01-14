<template>
    <p>
      <input ref="input" :value="value" @input="$emit('input',$event.target.value)">
<!--      <input  v-model="value">-->
    </p>
</template>

<script>
    export default {
        name: 'TestChild1',
      props: [
        'value'
      ]
    }
</script>

<style scoped>

</style>
