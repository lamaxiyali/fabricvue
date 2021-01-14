<template>
 <div>
   <el-time-select
     v-model="value"
     :picker-options="time"
     placeholder="选择时间">
   </el-time-select>
   <el-time-picker
     v-model="value1"
     :picker-options="{
       selectableRange: '18:30:00 - 20:30:00'
     }"
     placeholder="any time"
     ></el-time-picker>
   <el-date-picker
     v-model="value"
     type="date"
     placeholder="select date"
     ></el-date-picker>
 </div>
</template>

<script>
    export default {
      name: 'TimePicker',
      data () {
        return {
          value: '',
          time: {
            start: '8:30',
            step: '00:15',
            end: '23:00'
          },
          value1: new Date(2016, 9, 10, 18, 40)
        }
      }
    }
</script>

<style scoped>

</style>
