<template>
  <div class="productItem">
    <el-table :data="tableData" v-loading="loading" border row-key="index" :indent="16" style="width: 100%;">
      <el-table-column label="名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <i class="el-icon-folder" style="font-size: 16px;color: #39b1ff;" v-if="scope.row.type === 'parent'"></i>
          <i class="el-icon-tickets" style="font-size: 18px;color: #39b1ff;"
             v-if="scope.row.type === 'children'"></i>
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
      <el-table-column label="规格型号" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
      <el-table-column label="产地" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
      <el-table-column label="厂商" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
      <el-table-column label="出厂日期" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应商" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "ProductItem",
    data: () => ({
      tableData: [],
      loading: false
    })
  }
</script>

<style lang="scss" scoped>
  .productItem {
    .title {
      padding: 10px;
    }

  }

</style>
