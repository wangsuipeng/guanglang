<template>
  <div class="curing">
    <div class="operation-btn">
      <el-button type="success" icon="el-icon-plus" @click="dialogFormWorks = true">新增</el-button>
      <el-input
        style="float: right;width: 400px;margin-bottom: 15px"
        placeholder="搜索人员、类型、时间"
        prefix-icon="el-icon-search"
        v-model="searchValue"
      ></el-input>
    </div>
    <div class="container-main">
      <div class="block-box" v-for="(item, index) in eventRecordData" :key="index">
        <ul>
          <li class="ranks" style="margin-left: 4px">
            <span style="font-size: 18px;color: #2b95ff">{{item.author}}</span>
            <span class="patrol">紧急巡视</span>
          </li>
          <li class="ranks" style="margin-left: 4px">进入</li>
          <li class="ranks">
            <i class="iconfont icon-wode1"></i>
            <span>单位人员：{{item.author}}</span>
          </li>
          <li class="ranks">
            <i class="iconfont icon-shijian1"></i>
            <span>开始时间：{{item.date}}</span>
          </li>
          <li class="ranks">
            <i class="iconfont icon-shijian1"></i>
            <span>离开时间：{{item.date}}</span>
          </li>
          <li class="ranks">
            <i class="iconfont icon-wode1"></i>
            <span>所属管廊：{{item.title}}</span>
          </li>
          <li class="ranks">
            <i class="iconfont icon-wode1"></i>
            <span>操作人员：系统管理员</span>
          </li>
          <li class="ranks editDelet">
            <i class="iconfont icon-bianji" title="编辑"></i>
            <i class="iconfont icon-shanchu" title="删除"></i>
          </li>
        </ul>
      </div>
    </div>
    <el-dialog title="新增" :visible.sync="dialogFormWorks" width="37%">
      <el-form :model="form" style="padding: 0 40px 0 10px">
        <el-form-item label="单位名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="人员" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="事由" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作业类型" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="进入时间" :label-width="formLabelWidth">
          <el-date-picker v-model="form.region" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="离开时间" :label-width="formLabelWidth">
          <el-date-picker v-model="form.region" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="所属管廊" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormWorks = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormWorks = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchValue: "",
      dialogFormWorks: false,
      formLabelWidth: "120px",
      activeName: "first",
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
      eventRecordData: [],// 事件记录数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
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
    },
    getData() {
      $http.get("/posts").then(res => {
        this.eventRecordData = res.posts;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container-main {
  margin-top: 20px; 
  .block-box {
    position: relative;
    float: left;
    width: 400px;
    font-size: 14px;
    color: #a0a0a0;
    height: 209px;
    padding-bottom: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #dee5e7;
    ul,
    li {
      padding-left: 6px;
      list-style: none;
    }
    li:last-child {
      opacity: 0;
      transition: opacity 1s;
      float: right;
      margin-right: 15px;
      margin-top: 10px;
      i {
        display: inline-block;
        font-size: 14px;
        margin-left: 10px;
        cursor: pointer;
        color: rgb(32, 32, 65);
        &:nth-child(1) {
          color: #2b95ff;
        }
        &:nth-child(2) {
          color: #ff2b36;
        }
      }
    }
    .ranks {
      margin-bottom: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .patrol {
      float: right;
      margin-right: 20px;
      font-weight: 500;
      color: rgb(241, 102, 9);
    }
    &:hover .editDelet {
      opacity: 1;
    }
  }
}
.operation-btn {
  margin-bottom: 15px;
}
.curing {
  margin-top: 15px;
}
</style>