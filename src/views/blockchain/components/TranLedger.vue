<template>
    <el-row type="flex" justify="space-around" class="panel-group" :gutter="20">
      <el-col :span="10">
        <el-card>
          <div slot="header" class="clearfix">
            <span>节点信息</span>
          </div>
          <div>
            <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="节点1" name="1">
              <div>通道：mychannel</div>
              <div>所属组织：Sense1</div>
              <div>节点名称：peer0.sence.maintenance1.com</div>
            </el-collapse-item>
            <el-collapse-item title="节点2" name="2">
              <div>通道：mychannel</div>
              <div>所属组织：Sense1</div>
              <div>节点名称：peer1.sence.maintenance1.com</div>
            </el-collapse-item>
            <el-collapse-item title="节点3" name="3">
              <div>通道：mychannel</div>
              <div>所属组织：Sense2</div>
              <div>节点名称：peer0.sence.maintenance2.com</div>
            </el-collapse-item>
            <el-collapse-item title="节点4" name="4">
              <div>通道：mychannel</div>
              <div>所属组织：Sense2</div>
              <div>节点名称：peer1.sence.maintenance2.com</div>
            </el-collapse-item>
            </el-collapse>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>最近七次查询区块、交易变化情况</span>
          </div>
          <div>
            <line-ledger></line-ledger>
          </div>
        </el-card>
      </el-col>
    </el-row>
</template>

<script>
  import LineLedger from './LineLedger'
    export default {
      name: 'TranLedger',
      components: {LineLedger},
      data() {
        return {
          orderlist: [
            'peer0.sence.maintenance1.com',
            'peer1.sence.maintenance1.com',
            'peer0.sence.maintenance2.com',
            'peer1.sence.maintenance2.com'
          ],
          activeName: 1
        }
      }
    }
</script>

<style scoped>
  .panel-group {
    margin: 10px 50px;
  }
  .box-card {
    height: 300px;
  }
  .collapse {
    font-size: 14px;
    font-weight: bold;
  }
</style>
