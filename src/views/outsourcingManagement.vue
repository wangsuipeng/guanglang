<template>
  <div class="assetsParameter">
    <div class="row_">
      <div class="col1_">
        <el-input style="width: 200px" placeholder="请输入内容" v-model="search"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="getKeepList">搜索</el-button>
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
        <el-table-column label="故障详情" prop="details" align="center"></el-table-column>
        <el-table-column label="供应商" prop="providerName" align="center"></el-table-column>
        <el-table-column label="填写人" prop="createPersonName" align="center"></el-table-column>
        <el-table-column label="附件" align="center"></el-table-column>
        <el-table-column label="备注" prop="remark" align="center"></el-table-column>
        <el-table-column label="故障位置" align="center"></el-table-column>
        <el-table-column label="操作" width="90" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)" style="float:left;">编辑</el-button>
            <el-button type="text" @click="delRow(scope.row)" style="float: right;color: red;">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block pagination_">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="keepPage.pageNumber"
                       :page-sizes="[10, 30, 50, 100]" :page-size="keepPage.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="keepPage.total"></el-pagination>
      </div>
    </div>
    <el-dialog title="添加委外单" center width="900px" :before-close="handleClose" :visible.sync="dialogFormVisible">
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
                <el-form-item label="故障详情" prop="details" :label-width="formLabelWidth">
                  <el-input type="textarea" :rows="5" v-model="form.details"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="30">
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="填写人" prop="createPersonName" :label-width="formLabelWidth">
                <el-input v-model="form.createPersonName"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="供应商" prop="providerName" :label-width="formLabelWidth">
                <el-cascader style="width: 100%;" v-model="form.providerName" :options="options" clearable
                             @change="handleChange"></el-cascader>
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
          createPersonName: '',
          providerName: '',
          remark: ''
        },
        rules: {
          title: [{required: true, message: '请输入名称', trigger: 'blur'},],
          assetName: [{required: true, message: '请选择资产/备品名称', trigger: 'change'},],
          details: [{required: true, message: '请输入保养内容', trigger: 'blur'},],
          createPersonName: [{required: true, message: '请输入填写人', trigger: 'blur'},],
          remark: [{required: true, message: '请输入备注', trigger: 'blur'},],
          providerName: [{required: true, message: '请选择供应商名称', trigger: 'change'},],
        },
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
        keepPage: {
          pageNumber: 1,
          pageSize: 10,
          total: 0
        },
        search: '',
        isEdit: false,
        loading: false
      }
    },
    watch: {
      search(val) {
        if (!val) {
          this.getKeepList();
        }
      },
    },
    created() {
      this.getKeepList();
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
      edit(row) {
        this.form = {
          assetName: row.assetName.toString(),
          ...row
        };
        this.dialogFormVisible = true;
        this.isEdit = true;
      },
      getKeepList() {
        let pageNumber = this.keepPage.pageNumber - 1;
        $axios.post(`bjmaintenance/outsource/query?pageNumber=${pageNumber}&pageSize=${this.keepPage.pageSize}&search=${this.search}`, {}).then(res => {
          if (res.code === 200) {
            this.tableData = res.data.rows || [];
            this.keepPage.total = res.data.total;
          }
        })
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
      save(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {...this.form,providerName: this.form.providerName.toString(), assetName: this.form.assetName.toString()};
            if (this.isEdit) {
              $axios.post('bjmaintenance/outsource/update', data).then(res => {
                if (res.code === 200) {
                  this.$message.success('编辑成功!');
                  this.$refs[formName].resetFields();
                  this.dialogFormVisible = false;
                  this.getKeepList();
                } else {
                  this.$message.warning('编辑失败！');
                }
              });
            } else {
              delete data.id;
              $axios.post('bjmaintenance/outsource/save', data).then(res => {
                if (res.code === 200) {
                  this.$message.success('保存成功!');
                  this.$refs[formName].resetFields();
                  this.dialogFormVisible = false;
                  this.getKeepList();
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
          $axios.post(`bjmaintenance/outsource/delete?id=${row.id}`, {}).then(res => {
            this.loading = false;
            if (res.code === 200) {
              this.getKeepList();
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
      handleChange(value) {
        console.log(value);
      },
      handleSizeChange(val) {
        this.keepPage.pageSize = val;
        this.getKeepList();
      },
      handleCurrentChange(val) {
        this.keepPage.pageNumber = val;
        this.getKeepList();
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
