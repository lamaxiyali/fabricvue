<template>
  <div style="margin-bottom: 30px;display: flex;justify-content: center;align-items: center">
    <!--    <el-input-->
    <!--      @keyup.enter.native="searchClick"-->
    <!--      placeholder="通过书名或作者搜索..."-->
    <!--      prefix-icon="el-icon-search"-->
    <!--      size="small"-->
    <!--      style="width: 400px;margin-right: 10px"-->
    <!--      v-model="keywords">-->
    <!--    </el-input>-->
    <el-select
      style="width: 400px;margin-right: 10px"
      v-model='value9'
      filterable
      clearable
      remote
      reserve-keyword
      placeholder='请任务发布者'
      :remote-method='remoteMethod'
      :loading='loading'>
      <el-option
        v-for='item in options4'
        :key='item.value'
        :label='item.label'
        :value='item.value'>
      </el-option>
    </el-select>
    <el-button size="small" type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
  </div>
</template>

<script>
  export default {
    name: 'SearchTask',
    data () {
      return {
        keywords: '',
        books: [],
        cardLoading: [],
        options4: [],
        value9: '',
        list: [],
        loading: false,
        states: [ '中国' ]
      }
    },
    mounted () {
      var _this = this
      this.$axios.get('/querycompany')
        .then(res => {
          _this.states = res.data
        }).catch(failed => {
        alert('网络错误')
      })
    },
    methods: {
      searchClick () {
        this.$emit('onSearch', this.value9)
      },
      remoteMethod (query) {
        // alert(this.states)
        this.list = this.states.map(item => {
          return { value: item, label: item }
        })
        if (query !== '') {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            this.options4 = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1
            })
          }, 200)
        } else {
          this.options4 = []
        }
      }
    }
  }
</script>

<style scoped>

</style>
