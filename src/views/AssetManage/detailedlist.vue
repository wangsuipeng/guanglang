<template>
  <div class="detailedilist">
    <div class="title">
      <el-button type="primary" icon="">导出表格</el-button>
      <el-button type="primary" icon="">变更</el-button>
      <el-button type="primary" icon="">维保</el-button>
    </div>
    <el-table :data="tableData" v-loading="loading" border row-key="index" :indent="16" style="width: 100%;">
      <el-table-column label="当前状态" show-overflow-tooltip>
        <template slot-scope="scope">
          <i class="el-icon-folder" style="font-size: 16px;color: #39b1ff;" v-if="scope.row.type === 'parent'"></i>
          <i class="el-icon-tickets" style="font-size: 18px;color: #39b1ff;"
             v-if="scope.row.type === 'children'"></i>
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目合同编码" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
      <el-table-column label="资产编码" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
      <el-table-column label="资产名称" show-overflow-tooltip>
        <template slot-scope="scope">
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
      <el-table-column label="生产厂商" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应商" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
      <el-table-column label="变更日期" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
      <el-table-column label="移交时间" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
      <el-table-column label="设计使用年限" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
      <el-table-column label="大修频次" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
      <el-table-column label="出厂价" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同价" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
      <el-table-column label="原值" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "Detailedlist",
    data: () => ({
      tableData: [],
      loading: false
    })
  }
</script>

<style lang="scss" scoped>
  .detailedilist {
    .title {
      padding: 10px;
    }

  }

</style>
