<template>
  <div class="block">
    <el-timeline v-for="(item, index) in this.messagearray" :key="index">
      <el-timeline-item v-bind:timestamp="item[3]" placement="top">
        <el-card>
          <el-button type="text" ><h4>{{item[1]}}</h4></el-button>
          <p>{{item[2]}}</p>
          <div style="margin-top: 20px;color: #67C23A; font-size: 10px">
            [{{item[0]}}]
          </div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
  export default {
    name: 'SystemMessage',
    data () {
      return {
        systemmessage: null,
        messagearray: []
      }
    },
    mounted () {
      this.loadMessage()
    },
    methods: {
      loadMessage: function () {
        var _this = this
        this.$axios.get('/user/systemmessage')
        .then(res => {
          if (res.status === 200) {
            _this.systemmessage = res.data
            for (let i = 0; i < res.data.length; i++) {
              let array = res.data[i].message.toString().split('---')
              _this.messagearray.push(array)
            }
          } else {
            alert(400)
          }
        }).catch(failed => {
          alert('网络错误')
        })
      }
    }
  }
</script>

<style scoped>
  .block{
    width: 80%;
    margin: 20px 80px;
    text-align: left;
  }
</style>
