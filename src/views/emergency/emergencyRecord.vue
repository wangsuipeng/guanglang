<template>
  <div class="emergencyRecord">
    <div class="title">
      <el-button type="primary" icon="el-icon-plus">编辑记录</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column label="应急事件名称" sortable></el-table-column>
      <el-table-column label="所属管廊" sortable></el-table-column>
      <el-table-column label="应急预案名称" sortable></el-table-column>
      <el-table-column label="类型" sortable></el-table-column>
      <el-table-column label="等级" sortable></el-table-column>
      <el-table-column label="操作人" sortable></el-table-column>
      <el-table-column label="操作时间" sortable></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "EmergencyRecord",
    data: () => ({
      tableData: []
    }),
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    }

  }
</script>

<style lang="scss" scoped>
  .emergencyRecord {

    .title {
      width: 100%;
      padding: 10px;
    }
  }
</style>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
