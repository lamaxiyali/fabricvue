<template>
      <div class="block">
        <el-row style="width: 200px;">
          <el-col :span="12">
            <el-button type="text" @click="clickTest" >
              <h2>获取消息</h2>
            </el-button>
          </el-col>
        </el-row>
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
      name: 'PersonMessage',
      data () {
        return {
          websocket: null,
          personmessage: null,
          messagearray: []
        }
      },
      created () {
        console.log('created')
        this.messagearray = this.$store.state.personmessage
        this.initWebSocket()
      },
      methods: {
        clickTest: function () {
          alert('消息测试')
          this.$axios.get('/user/query')
          .then(res => {
            if (res.status !== 200) {
              alert('获取数据错误')
            }
          }).catch(failed => {
            alert('网络错误')
          })
        },
        clickTest1: function () {
          this.$store.commit('messageRemove')
        },
        onConfirm () {
          let data = {
            code: 1,
            item: '传输数据'
          }
          this.websocketsend(JSON.stringify(data))
        },
        initWebSocket () {
          var username = this.$store.state.user.username
          var messageurl = 'ws://localhost:9999/websocket/' + username
          this.websock = new WebSocket(messageurl)
          this.websock.onmessage = this.websocketonmessage
          this.websock.onerror = this.websocketonerror
          this.websock.onopen = this.websocketonopen
          this.websock.onclose = this.websocketclose
        },
        websocketonopen () {
          let data = {
            code: 0,
            msg: '这是client：初次连接'
          }
          this.websocketsend(JSON.stringify(data))
        },
        websocketonerror () {
          console.log('WebSocket连接失败')
        },
        websocketonmessage (e) {
          console.log(e)
          alert('你有新消息：' + e.data)
          this.personmessage = e.data
          var array = this.personmessage.toString().split('---')
          this.$store.commit('messageAdd', array)
          this.messagearray = this.$store.state.personmessage
        },
        websocketsend (Data) {
          this.websock.send(Data)
        },
        websocketclose (e) {
          console.log('已关闭连接', e)
        }
      },
      destroyed() {
        this.websock.close()
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
