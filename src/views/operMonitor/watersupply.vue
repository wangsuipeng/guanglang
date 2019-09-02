<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="" label="设备名称"></el-table-column>
      <el-table-column prop="" label="设备类型"></el-table-column>
      <el-table-column prop="" label="监测位置"></el-table-column>
      <el-table-column prop="" label="监测项"></el-table-column>
      <el-table-column prop="" label="设备状态"></el-table-column>
      <el-table-column prop="" label="监控值"></el-table-column>
      <el-table-column prop="" label="统计"></el-table-column>
      <el-table-column prop="" label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "Watersupply",
    data: () => ({
      tableData: []
    })
  }
</script>

<style scoped>

</style>
