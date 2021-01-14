<template>
  <el-row>
  <div id="app">
    <ol>
      <li v-for="n in 10" v-bind:key="n">
        {{n}}
      </li>
    </ol>
  </div>
  <div>
    <p>normal string: {{url}}</p>
    <p>abnormal string : {{reverse}}</p>
  </div>
    <div>
      <p style = "font-size:25px;">计数器: {{ counter }}</p>
      <button @click = "counter++" style = "font-size:25px;">点我</button>
    </div>
    <lamaxiya ></lamaxiya>
    <p>{{total}}</p>
    <test-child v-on:increment="incrementTotal"></test-child>
    <test-child v-on:increment="incrementTotal"></test-child>
    <TestChild1 v-model="num"></TestChild1>
    <p>num: {{num}}</p>
    <input v-focus>
    <router-link to="/foo">Go to foo</router-link>
    <router-link to="/bar">Go to bar</router-link>
    <el-button @click="getDemo">dianji</el-button>
    <p>{{info}}</p>
  </el-row>
</template>

<script>
    import TestChild from './TestChild'
    import TestChild1 from './TestChild1'
    export default {
      name: 'Test',
      components: {
        TestChild, TestChild1
      },
      data () {
          return {
            sites: [
              {text: 'cat1'},
              {text: 'cat2'},
              {text: 'cat3'}
            ],
            site: 'cat',
            message: '<h1>testing</h1>',
            seen: false,
            url: 'www.baidu.com',
            counter: 1,
            total: 0,
            num: 100,
            info: null
          }
      },
      methods: {
        detail: function () {
          return 'test form'
        },
        change: function () {
          this.seen = !this.seen
        },
        reversite: function () {
          this.site = this.site.split('').reverse().join('')
        },
        incrementTotal: function () {
          this.total += 1
        },
        getDemo: function () {
          var _this = this
          this.$axios.get('/D:/project-vue/vue-workspace/wj-vue/src/assets/a.json')
          .then(response => (_this.info = response))
          .catch(function (err) {
              console.log(err)
          })
        }

      },
      filters: {
        filter1: function (value) {
          if (!value) return ''
          value = value.toString()
          return value.charAt(0).toUpperCase() + value.slice(1)
        }
      },
      computed: {
        reverse: function () {
          return this.url.toUpperCase()
        }
      },
      directives: {
        focus: {
          inserted: function (e1) {
            e1.focus()
          }
        }
      }
    }
</script>

<style scoped>

</style>
