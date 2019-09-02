<template>
  <div class="container-main">
    <div class="operation-btn">
      <el-button type="success" icon="el-icon-refresh">变更</el-button>
    </div>
    <div class="content">
      <div class="tablebox">
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column prop="date" label="监测对象" width="180"></el-table-column>
          <el-table-column prop="name" label="对应传感器型号" width="180"></el-table-column>
          <el-table-column prop="address" label="监测内容"></el-table-column>
          <el-table-column prop="address" label="名称"></el-table-column>
          <el-table-column prop="address" label="单位"></el-table-column>
          <el-table-column prop="address" label="判断条件"></el-table-column>
          <el-table-column prop="address" label="备注"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "",
      searchValue: "",
      dialogFormEntrance: false, // 控制新增模态框
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          date: "排水系统",
          name: "",
          address: "",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleClick() {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.container-main .tablebox {
  border: 1px solid #ebeef5;
  border-bottom: 0;
  box-sizing: border-box;
}
.container-main {
  margin-top: 20px;
}
.operation-btn {
  margin-bottom: 15px;
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