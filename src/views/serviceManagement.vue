<template>
  <div class="assetsParameter">
    <div class="row_">
      <div class="col1_">
        <el-input style="width: 200px" placeholder="请输入内容" v-model="search"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="getRepairList">搜索</el-button>
      </div>
      <div class="col2_">
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
      </div>
    </div>
    <div class="table_">
      <el-table stripe border :data="tableData" :loading="loading" style="width: 100%">
        <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
        <el-table-column label="标题" prop="title" align="center"></el-table-column>
        <el-table-column label="资产/备品名称" prop="assetName" align="center"></el-table-column>
        <el-table-column label="报修内容" prop="details" align="center"></el-table-column>
        <el-table-column label="是否免费维修" prop="isFreeService" align="center"></el-table-column>
        <el-table-column label="维修金额" prop="serviceMoney" align="center"></el-table-column>
        <el-table-column label="维修通知人" prop="remindPersonName" align="center"></el-table-column>
        <el-table-column label="填写人" prop="createPersonName" align="center"></el-table-column>
        <el-table-column label="保修结果" prop="serviceResult" align="center"></el-table-column>
        <el-table-column label="附件" prop="" align="center"></el-table-column>
        <el-table-column label="备注" prop="remark" align="center"></el-table-column>
        <el-table-column label="保养位置" prop="" align="center"></el-table-column>
        <el-table-column label="操作" width="90" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)" style="float:left;">编辑</el-button>
            <el-button type="text" @click="delRow(scope.row)" style="float: right;color: red;">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block pagination_">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="repairPage.pageNumber"
                       :page-sizes="[10, 30, 50, 100]" :page-size="repairPage.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="repairPage.total"></el-pagination>
      </div>
    </div>
    <el-dialog title="添加报修单" center width="900px" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="资产/备品名称" prop="assetName" :label-width="formLabelWidth">
                <el-cascader style="width: 100%;" v-model="form.assetName" :options="options" clearable
                             @change="handleChange"></el-cascader>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
              <div class="grid-content bg-purple-light">
                <el-form-item label="报修内容" prop="details" :label-width="formLabelWidth">
                  <el-input type="textarea" :rows="5" v-model="form.details"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="报修通知人" prop="remindPersonName" :label-width="formLabelWidth">
                <el-input v-model="form.remindPersonName"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="填写人" prop="createPersonName" :label-width="formLabelWidth">
                <el-input v-model="form.createPersonName"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="是否免费保养" prop="isFreeService" :label-width="formLabelWidth">
                <div style="width: 100%;float: left;overflow: hidden">
                  <el-radio v-model="form.isFreeService" :label="1">是</el-radio>
                  <el-radio v-model="form.isFreeService" :label="2">否</el-radio>
                </div>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="维修金额 / 元" prop="serviceMoney" :label-width="formLabelWidth">
                <el-input v-model="form.serviceMoney"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="报修结果" prop="serviceResult" :label-width="formLabelWidth">
                <el-select v-model="form.serviceResult" style="width: 100%;" placeholder="请选择活动区域">
                  <el-option label="自行处理" value="1"></el-option>
                  <el-option label="委外处理" value="2"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="24">
            <div class="grid-content bg-purple-light">
              <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
                <el-input type="textarea" :rows="5" v-model="form.remark"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="附件" :label-width="formLabelWidth">
                <el-button type="primary">上传附件</el-button>
                <span>1.txt</span>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <!--        <el-row :gutter="30">-->
        <!--          <el-col :span="12">-->
        <!--            <div class="grid-content bg-purple-light">-->
        <!--              <el-form-item label="报修位置" :label-width="formLabelWidth">-->
        <!--                <el-input v-model="form.name"></el-input>-->
        <!--              </el-form-item>-->
        <!--            </div>-->
        <!--          </el-col>-->
        <!--        </el-row>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button type="primary" @click="save('form')">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "ServiceManagement",
    data() {
      return {
        form: {
          title: '',
          assetName: [],
          details: '',
          remindPersonName: '',
          createPersonName: '',
          isFreeService: '',
          serviceMoney: '',
          serviceResult: '',
          remark: ''
        },
        rules: {
          title: [{required: true, message: '请输入名称', trigger: 'blur'},],
          assetName: [{required: true, message: '请选择资产/备品名称', trigger: 'change'},],
          details: [{required: true, message: '请输入保养内容', trigger: 'blur'},],
          remindPersonName: [{required: true, message: '请输入保养通知人', trigger: 'blur'},],
          createPersonName: [{required: true, message: '请输入填写人', trigger: 'blur'},],
          isFreeService: [{required: true, message: '请选择是否免费维修', trigger: 'change'},],
          serviceMoney: [{required: true, message: '请输入维修金额', trigger: 'blur'},],
          serviceResult: [{required: true, message: '请输入维修结果', trigger: 'blur'},],
          remark: [{required: true, message: '请输入备注', trigger: 'blur'},],
        },
        loading: false,
        isEdit: false,
        formLabelWidth: '',
        dialogFormVisible: false,
        tableData: [],
        input: '',
        value: '',
        options: [
          {
            value: '1',
            label: 'A类',
            children: [
              {
                value: '11',
                label: 'a1',
              },
              {
                value: '12',
                label: 'b1',
              }
            ]
          },
          {
            value: '2',
            label: 'B类'
          },
          {
            value: '3',
            label: 'C类'
          }
        ],
        repairPage: {
          pageNumber: 1,
          pageSize: 10,
          total: 0
        },
        search: ''
      }
    },
    watch: {
      search(val) {
        if (!val) {
          this.getRepairList();
        }
      },
    },
    created() {
      this.getRepairList();
    },
    methods: {
      cancel(formName) {
        this.$refs[formName].resetFields();
        this.dialogFormVisible = false;
      },
      add() {
        this.dialogFormVisible = true;
        this.isEdit = false;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$refs.form.resetFields();
            done();
          })
          .catch(_ => {
          });
      },
      edit(row) {
        this.form = {
          assetName: row.assetName.toString(),
          ...row
        };
        this.dialogFormVisible = true;
        this.isEdit = true;
      },
      handleChange(value) {
        console.log(value);
      },
      save(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {...this.form, assetName: this.form.assetName.toString()};
            if (this.isEdit) {
              $axios.post('bjmaintenance/repair/update', data).then(res => {
                if (res.code === 200) {
                  this.$message.success('编辑成功!');
                  this.$refs[formName].resetFields();
                  this.dialogFormVisible = false;
                  this.getRepairList();
                } else {
                  this.$message.warning('编辑失败！');
                }
              });
            } else {
              delete data.id;
              $axios.post('bjmaintenance/repair/save', data).then(res => {
                if (res.code === 200) {
                  this.$message.success('保存成功!');
                  this.$refs[formName].resetFields();
                  this.dialogFormVisible = false;
                  this.getRepairList();
                } else {
                  this.$message.warning('保存失败！');
                }
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      delRow(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          $axios.post(`bjmaintenance/repair/delete?id=${row.id}`, {}).then(res => {
            this.loading = false;
            if (res.code === 200) {
              this.getRepairList();
              this.$message({type: 'success', message: '删除成功！'})
            } else {
              this.$message({type: 'warning', message: '删除失败！'})
            }
          }).catch(err => {
            this.loading = false;
            this.$message({type: 'error', message: '系统错误！'});
            console.log(err);
          })
        }).catch(cancel => {
        });
      },
      getRepairList() {
        let pageNumber = this.repairPage.pageNumber - 1;
        $axios.post(`bjmaintenance/repair/query?pageNumber=${pageNumber}&pageSize=${this.repairPage.pageSize}&search=${this.search}`, {}).then(res => {
          if (res.code === 200) {
            this.tableData = res.data.rows || [];
            this.repairPage.total = res.data.total;
          }
        })
      },
      handleSizeChange(val) {
        this.repairPage.pageSize = val;
        this.getRepairList();
      },
      handleCurrentChange(val) {
        this.repairPage.pageNumber = val;
        this.getRepairList();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .assetsParameter {
    width: 100%;
    height: 100%;

    .row_ {
      width: 100%;
      overflow: hidden;

      .col1_ {
        float: left;
        padding: 10px 0;
        box-sizing: border-box;
      }

      .col2_ {
        float: right;
        padding: 10px 0;
        box-sizing: border-box;
      }
    }

    .table_ {
      width: 100%;
      padding: 20px 10px;
      box-sizing: border-box;
    }

    .QRcode {
      width: 300px;
      height: 300px;
      overflow: hidden;

      img {
        height: 300px;
        text-align: center;
      }
    }

    .pagination_ {
      text-align: right;
      margin: 10px 0;
    }
  }
</style>
