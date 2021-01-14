<template>
  <el-container>
    <el-aside style="width: 130px;margin-top: 20px">
      <blockchain-side @indexSelect="handleSelect"></blockchain-side>
    </el-aside>
    <el-main>
      <el-container>
        <el-header style="height: 30px">
          <bread-bar class="breadcrumb-container"></bread-bar>
        </el-header>
        <router-view></router-view>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
  import BreadBar from './BreadBar'
  import Blockchain from './Blockchain'
  import BlockchainSide from './BlockchainSide'
  export default {
    name: 'BlockchainIndex',
    components: {Blockchain, BlockchainSide, BreadBar},
    methods: {
      handleSelect: function (key) {
        console.log(key)
        console.log('handleSelect')
        if (key === '0') {
          this.$router.push('/blockchain/ledger')
        }
        if (key === '1') {
          this.$router.push('/blockchain/channel')
        }
        if (key === '2') {
          this.$router.push('/blockchain/chaincode')
        }
      }
    }
  }
</script>

<style scoped>
  .breadcrumb-container{
    float: left;
  }
</style>
