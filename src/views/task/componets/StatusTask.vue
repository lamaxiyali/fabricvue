<template>
  <div style="margin-bottom: 10px;display: flex;justify-content: center;align-items: center">
    <el-select v-model="value" size="small" clearable placeholder="任务选择(默认为显示全部)"  style="width: 500px;margin-right: 10px">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button size="small" type="primary" icon="el-icon-search" @click="status">筛选</el-button>
  </div>
</template>

<script>
  export default {
    name: 'StatusTask',
    data () {
      return {
        keywords: '',
        books: [],
        cardLoading: [],
        options: [{
          value: '已结束',
          label: '已结束'
        }, {
          value: '进行中',
          label: '进行中'
        }, {
          value: '未开始',
          label: '未开始'
        }],
        value: ''
      }
    },
    methods: {
      searchClick () {
        this.$emit('onSearch')
      },
      statusChange (callvalue) {
        this.$emit('onStatus', callvalue)
      },
      status: function () {
        this.$emit('onStatus', this.value)
      }
    }
  }
</script>

<style scoped>

</style>
