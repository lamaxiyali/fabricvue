<template>
  <div>
    <el-row>
      <el-col :span="12">
        输入前激活
        <el-autocomplete placeholder="before your input" v-model="place1" :fetch-suggestions="querySearch">
        </el-autocomplete>
      </el-col>
      <el-col :span="12">
        输入后激活
        <el-autocomplete placeholder="before your input" v-model="place2" :fetch-suggestions="querySearch" :trigger-on-focus='false'>
        </el-autocomplete>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-input v-model="addCity" ></el-input>
        <el-button circle @click="add"><i class="el-icon-add-location"></i> </el-button>
      </el-col>
      <el-col :span="8">
        <el-input-number :min="1" :max="100" :step="2" v-model="num" label="select the number" @change="changeNumber"></el-input-number>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
      name: 'AutoInput',
      data () {
        return {
          place1: '',
          place2: '',
          allPlaces: [],
          addCity: '',
          num: 1
        }
      },
      methods: {
        changeNumber (number) {
          alert(number)
        },
        add () {
          var city = this.addCity
          this.allPlaces.push({'value': city})
          alert('add ok!')
        },
        loadingAllPlaces: function () {
          return [
            {'value': 'China'},
            {'value': 'Korea'},
            {'value': 'Aust'},
            {'value': 'USA'}
          ]
        },
        querySearch (queryString, callback) {
          var places = this.allPlaces
          var results = queryString ? places.filter(this.createFilter(queryString)) : places
          callback(results)
        },
        createFilter (queryString) {
          return (place) => {
            return place.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
          }
        }
      },
      mounted () {
        this.allPlaces = this.loadingAllPlaces()
      }
    }
</script>

<style scoped>

</style>
