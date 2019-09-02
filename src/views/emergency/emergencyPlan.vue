<template>
  <div class="EmergencyPlan">
    <div class="title">
      <el-button type="primary" icon="el-icon-plus" @click="createTableVisible = true">新增应急预案</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="">修改应急预案</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column label="应急预案名称" sortable></el-table-column>
      <el-table-column label="应急预案描述" sortable></el-table-column>
      <el-table-column label="类型" sortable></el-table-column>
      <el-table-column label="等级" sortable></el-table-column>
    </el-table>

    <el-dialog title="新增应急预案" center :visible.sync="createTableVisible">
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item label="应急预案名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="应急预案描述">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="应急预案类型">
          <el-radio-group v-model="form.name">
            <el-radio :label="1">电力</el-radio>
            <el-radio :label="2">暴雨</el-radio>
            <el-radio :label="3">消防</el-radio>
            <el-radio :label="3">其他</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="等级">
          <el-radio-group v-model="form.name">
            <el-radio :label="1">一般（级）</el-radio>
            <el-radio :label="2">较重（级）</el-radio>
            <el-radio :label="3">严重（级）</el-radio>
            <el-radio :label="4">特别严重（级）</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div style="padding: 10px">
        <el-button type="primary" icon="el-icon-plus" @click="stepTableVisible = true">增加</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column label="步骤说明" sortable></el-table-column>
        <el-table-column label="描述" sortable></el-table-column>
        <el-table-column label="顺序" sortable></el-table-column>
        <el-table-column label="操作" sortable></el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createTableVisible = false">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog title="步骤" center :visible.sync="stepTableVisible" width="400px">
      <el-form :model="stepForm" ref="form" label-width="70px">
        <el-form-item label="步骤名称">
          <el-input v-model="stepForm.name"></el-input>
        </el-form-item>
        <el-form-item label="步骤描述">
          <el-input v-model="stepForm.name"></el-input>
        </el-form-item>
        <el-form-item label="顺序">
          <el-input v-model="stepForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="stepTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="stepTableVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "EmergencyPlan",
    data: () => ({
      tableData: [],
      createTableVisible: false,
      form: {},
      stepForm: {},
      stepTableVisible: false
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
  .EmergencyPlan {

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
