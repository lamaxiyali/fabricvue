<template>
  <div>
<!--    <el-select v-model='value7' filterable placeholder='please select'  clearable>-->
<!--      <el-option-group v-for='group in options3' :key='group.label' :label='group.label'>-->
<!--        <el-option v-for='item in group.options' :key='item.value' :value='item.value' :label='item.label'></el-option>-->
<!--      </el-option-group>-->
<!--    </el-select>-->
<!--    <el-select v-model='value8' filterable placeholder='please select' clearable>-->
<!--      <el-option v-for='item in options' :key='item.value' :value='item.value' :label='item.label'></el-option>-->
<!--    </el-select>-->
    <router-link to="/form1">前往表单</router-link>
    <el-select
      v-model='value9'
      filterable
      remote
      reserve-keyword
      placeholder='请输入关键词'
      :remote-method='remoteMethod'
      :loading='loading'>
      <el-option
        v-for='item in options4'
        :key='item.value'
        :label='item.label'
        :value='item.value'>
      </el-option>
    </el-select>
  </div>
</template>

<script>
    export default {
      name: 'SelectVue',
      data () {
        return {
          options4: [],
          value9: [],
          list: [],
          loading: false,
          states: ['Alabama', 'Alaska', 'Arizona',
            'Arkansas', 'California', 'Colorado',
            'Connecticut', 'Delaware', 'Florida',
            'Georgia', 'Hawaii', 'Idaho', 'Illinois',
            'Indiana', 'Iowa', 'Kansas', 'Kentucky',
            'Louisiana', 'Maine', 'Maryland',
            'Massachusetts', 'Michigan', 'Minnesota',
            'Mississippi', 'Missouri', 'Montana',
            'Nebraska', 'Nevada', 'New Hampshire',
            'New Jersey', 'New Mexico', 'New York',
            'North Carolina', 'North Dakota', 'Ohio',
            'Oklahoma', 'Oregon', 'Pennsylvania',
            'Rhode Island', 'South Carolina',
            'South Dakota', 'Tennessee', 'Texas',
            'Utah', 'Vermont', 'Virginia',
            'Washington', 'West Virginia', 'Wisconsin',
            'Wyoming']
        }
      },
      mounted () {
        this.list = this.states.map(item => {
          return { value: item, label: item }
        })
        console.log(this.list)
      },
      methods: {
        remoteMethod (query) {
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
