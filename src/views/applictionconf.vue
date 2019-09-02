<template>
  <div class="applictionconf">
    <div class="title">
      <el-button type="primary" @click="changeTableVisible = true">变更</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="监测对象" sortable></el-table-column>
      <el-table-column label="对应传感器型号" sortable></el-table-column>
      <el-table-column label="监测内容" sortable></el-table-column>
      <el-table-column label="名称" sortable></el-table-column>
      <el-table-column label="单位" sortable></el-table-column>
      <el-table-column label="判断条件" sortable></el-table-column>
      <el-table-column label="备注" sortable></el-table-column>
    </el-table>
    <el-dialog title="阈值调整" width="600px" :visible.sync="changeTableVisible">
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item label="监测类型">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="监测对象">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="对应传感器型号">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="监测内容">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="判断条件">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="变更时间">
          <el-date-picker v-model="form.time" style="width: 100%;" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button>重 置</el-button>
        <el-button type="primary" @click="changeTableVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Applictionconf",
    data: () => ({
      tableData: [],
      changeTableVisible: false,
      form: {}
    })
  }
</script>

<style lang="scss" scoped>
  .applictionconf {

    .title {
      padding: 10px 0;


    }
  }

</style>
