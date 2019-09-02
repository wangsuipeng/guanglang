<template>
  <div class="assetsParameter">
    <div class="row_">
      <div class="col1_">
        <el-cascader v-model="typeId" :options="options" :props="props" clearable @change="handleChange"></el-cascader>
        <el-input style="width: 200px" placeholder="请输入内容" clearable v-model="search"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="getList()">搜索</el-button>
      </div>
      <div class="col2_">
        <el-button type="primary" @click="dialogTypeVisible = true">设置备品类型</el-button>
        <el-button type="primary" icon="el-icon-full-screen" @click="">二维码打印</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="addType">添加</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogImportVisible = true">导入</el-button>
      </div>
    </div>
    <div class="table_">
      <el-table ref="multipleTable" v-loading="loading" stripe border :data="tableData" tooltip-effect="dark"
                style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" :formatter="indexed" label="序号" width="60" align="center"></el-table-column>
        <el-table-column label="备品编码" align="center" prop="coding"></el-table-column>
        <el-table-column label="名称" align="center" prop="name"></el-table-column>
        <el-table-column label="型号" align="center" prop="modelNumber"></el-table-column>
        <el-table-column label="生产厂商" align="center" prop="producer"></el-table-column>
        <el-table-column label="供应商名称" align="center" prop="supplier"></el-table-column>
        <el-table-column label="备选商名称" align="center" prop="alternativeSupplier"></el-table-column>
        <el-table-column label="生产日期" width="100" :formatter="producedDateFormatter"
                         align="center" prop="producedDate"></el-table-column>
        <el-table-column label="供应日期" width="100" :formatter="supplyDateFormatter"
                         align="center" prop="supplyDate"></el-table-column>
        <el-table-column label="变更日期" width="100" :formatter="changeDateFormatter"
                         align="center" prop="changeDate"></el-table-column>
        <el-table-column label="保养期 / 月" width="80" align="center" prop="expirationDate"></el-table-column>
        <el-table-column label="保质期 / 月" width="80" align="center" prop="maintenancePeriod"></el-table-column>
        <el-table-column label="二维码" align="center" width="80">
          <i class="iconfont icon-erweima icon_QRcode" slot-scope="scope" @click="findQRcode(scope.row.qrCodePath)"></i>
        </el-table-column>
        <el-table-column label="操作" align="center" width="115">
          <template slot-scope="scope">
            <el-button type="text" @click="editAssetsTable(scope.row)" style="float:left;margin-left: 10px;">编辑
            </el-button>
            <el-button type="text" @click="delTable(scope.row)" style="float: right;margin-right: 10px;color: red;">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block pagination_">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                       :page-sizes="[10, 30, 50, 100]" :page-size="tablePageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="tableTotal">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="isEditAssets ? '编辑备品' : '添加备品'" center width="900px" :before-close="handleClose"
               :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="ruleForm" :rules="rules">
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form-item label="型号" prop="modelNumber" :label-width="formLabelWidth">
                <el-input v-model="form.modelNumber"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="备品类型" prop="typeId" :label-width="formLabelWidth">
                <el-cascader style="width: 100%;" v-model="form.typeId" :options="options" :props="props"
                             clearable></el-cascader>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="备品编码" prop="coding" :label-width="formLabelWidth">
                <el-input v-model="form.coding"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="生产厂商" prop="producer" :label-width="formLabelWidth">
                <el-input v-model="form.producer"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="供应商名称" prop="supplier" :label-width="formLabelWidth">
                <el-input v-model="form.supplier"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="备选商名称" prop="alternativeSupplier" :label-width="formLabelWidth">
                <el-input v-model="form.alternativeSupplier"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="生产日期" prop="producedDate" :label-width="formLabelWidth">
                <el-date-picker v-model="form.producedDate" type="date" style="width: 100%" placeholder="选择生产日期">
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="供应日期" prop="supplyDate" :label-width="formLabelWidth">
                <el-date-picker v-model="form.supplyDate" type="date" style="width: 100%" placeholder="选择供应日期">
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="变更日期" prop="changeDate" :label-width="formLabelWidth">
                <el-date-picker v-model="form.changeDate" type="date" style="width: 100%" placeholder="选择变更日期">
                </el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="保质期（设备寿命日期 / 月）" prop="expirationDate" :label-width="formLabelWidth">
                <el-input v-model="form.expirationDate"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form-item label="保养期（服务商免费服务期 / 月）" prop="maintenancePeriod" :label-width="formLabelWidth">
                <el-input v-model="form.maintenancePeriod"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-row :gutter="10">
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <el-form-item label="预警日期" prop="warningTime" :label-width="formLabelWidth">
                      <el-select v-model="form.warningTime" style="width: 100%;" placeholder="请选择预警日期">
                        <el-option label="保修期" value="保修期"></el-option>
                        <el-option label="报废期" value="报废期"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content bg-purple-light">
                    <el-form-item label="前 / 天" :label-width="formLabelWidth">
                      <el-input v-model="warningDateDay"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <!--        <el-row :gutter="30">-->
        <!--          <el-col :span="12">-->
        <!--            <div class="grid-content bg-purple-light">-->
        <!--              <el-form-item label="绑定模型" :label-width="formLabelWidth">-->
        <!--                <div style="width: 100%;float: left;overflow: hidden">-->
        <!--                  -->
        <!--                </div>-->
        <!--              </el-form-item>-->
        <!--            </div>-->
        <!--          </el-col>-->
        <!--        </el-row>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="saveAssets('ruleForm')">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="设置备品类型" center width="900px" :visible.sync="dialogTypeVisible">
      <div class="row_">
        <div class="col1_">
          <el-input style="width: 200px" placeholder="请输入内容" v-model="typeSearch"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="getAssetList">搜索</el-button>
        </div>
        <div class="col2_">
          <el-button type="primary" icon="el-icon-plus" @click="addTypeList">新增</el-button>
        </div>
      </div>
      <el-table :data="typeData" border :loading="typeLoading">
        <el-table-column type="index" width="100" align="center" label="序号"></el-table-column>
        <el-table-column align="center" prop="name" label="备品类型"></el-table-column>
        <el-table-column align="center" prop="remark" label="备注"></el-table-column>
        <el-table-column align="center" width="90" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="" style="float:left;" @click="editTypeList(scope.row)">编辑</el-button>
            <el-button type="text" style="float: right;color: red;" @click="delType(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog :title="isTypeEdit ? '编辑备品类型' : '添加备品类型'" center width="400px" :before-close="closeType"
               :visible.sync="dialogAddTypeVisible">
      <el-form :model="typeForm" :rules="typeRules" ref="typeRef">
        <el-form-item label="备品类型" prop="name" :label-width="formLabelWidth">
          <el-input v-model="typeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="上级备品类型" prop="parentId" :label-width="formLabelWidth">
          <el-cascader style="width: 100%;" v-model="typeForm.parentId" :options="options" :props="props"></el-cascader>
        </el-form-item>
        <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
          <el-input v-model="typeForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelType('typeRef')">取 消</el-button>
        <el-button type="primary" @click="saveAssetType('typeRef')">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="二维码打印" center width="350px" :visible.sync="dialogQRcodeVisible">
      <div class="QRcode">
        <img :src="QRcode" alt="">
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogQRcodeVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogQRcodeVisible = false">打 印</el-button>
      </div>
    </el-dialog>

    <el-dialog title="导入" center width="900px" :visible.sync="dialogImportVisible">
      <el-row style="margin: 10px 0;">
        <el-button type="primary" icon="el-icon-download" @click="downloadModel">下载模板</el-button>
      </el-row>
      <el-row style="margin: 10px 0;">
        添加备品文件：
        <el-upload
          class="upload-demo"
          :action="action"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="1"
          :on-success="upsuccess"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">导入文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传xlsx文件</div>
        </el-upload>
      </el-row>
      <el-row style="margin: 5px 0;font-size: 12px;color: #9d9d9d;">
        导入备品文件规则说明：
      </el-row>
      <el-row style="margin: 5px 0;font-size: 12px;color: #9d9d9d;">
        1.仅支持excel表格文件
      </el-row>
      <el-row style="margin: 5px 0;font-size: 12px;color: #9d9d9d;">
        2.上传备品文件表头需包含备品编码、名称、型号、生产厂商、供应商名称、备选商名称、生产日期、供应日期、变更日期、保养期、保质期、预警时间
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogImportVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import API_PATH from '@/env'

  export default {
    name: "SparePartsParameter",
    data() {
      return {
        isTypeEdit: false,
        isEditAssets: false,
        warningDateDay: '',
        action: `${API_PATH}bjeam/alternativeAssets/exportAlternativeAssets`,
        QRcode: '',
        search: '',
        typeSearch: '',
        fileList: [],
        typeRules: {
          name: [{required: true, message: '请输入名称', trigger: 'blur'},],
          parentId: [{required: false},],
          remark: [{required: false},],
        },
        rules: {
          name: [{required: true, message: '请输入名称', trigger: 'blur'},],
          modelNumber: [{required: true, message: '请输入型号', trigger: 'blur'},],
          typeId: [{required: true, message: '请选择备品类型', trigger: 'change'},],
          coding: [{required: true, message: '请输入备品编码', trigger: 'blur'},],
          producer: [{required: true, message: '请输入生产厂商', trigger: 'blur'},],
          supplier: [{required: true, message: '请输入供应商名称', trigger: 'blur'},],
          alternativeSupplier: [{required: true, message: '请输入备选商名称', trigger: 'blur'},],
          producedDate: [{required: true, message: '请选择生产日期', trigger: 'change'},],
          supplyDate: [{required: true, message: '请选择供应日期', trigger: 'change'},],
          changeDate: [{required: true, message: '请选择变更日期', trigger: 'change'},],
          expirationDate: [{required: true, message: '请输入保质期', trigger: 'blur'},],
          maintenancePeriod: [{required: true, message: '请输入保养期', trigger: 'blur'},],
          warningTime: [{required: true, message: '请选择预警日期', trigger: 'change'},]
        },
        props: {
          value: 'id',
          label: 'name',
          children: 'childList',
        },//配置备品类型多选框
        form: {
          name: '',
          modelNumber: '',
          typeId: '',
          coding: '',
          producer: '',
          supplier: '',
          alternativeSupplier: '',
          producedDate: '',
          supplyDate: '',
          changeDate: '',
          expirationDate: '',
          maintenancePeriod: '',
          warningTime: ''
        },
        typeForm: {
          id: 0,
          name: '',
          parentId: [0],
          remark: ''
        },
        typeData: [],
        currentPage: 1,
        loading: false,
        tableTotal: 0,
        tablePageSize: 10,
        formLabelWidth: '',
        dialogFormVisible: false,
        dialogTypeVisible: false,
        dialogAddTypeVisible: false,
        dialogQRcodeVisible: false,
        dialogImportVisible: false,
        tableData: [],
        multipleSelection: [],
        input: '',
        options: [],
        typeLoading: false,
        typeId: '',
        AssetList: {
          pageNumber: 1,
          pageSize: 10
        }
      }
    },
    watch: {
      search(val) {
        if (!val) {
          this.getList();
        }
      },
      typeSearch(val) {
        if (!val) {
          this.getAssetList();
        }
      }
    },
    created() {
      this.getList();
      this.getAssetType();
      this.getAssetList();
    },
    methods: {
      indexed({index}) {
        return index + (this.currentPage - 1) * this.tablePageSize + 1;
      },
      editAssetsTable(row) {
        this.form = {
          id: row.id,
          name: row.name,
          modelNumber: row.modelNumber,
          typeId: row.typeId,
          coding: row.coding,
          producer: row.producer,
          supplier: row.supplier,
          alternativeSupplier: row.alternativeSupplier,
          producedDate: new Date(parseInt(row.producedDate)),
          supplyDate: new Date(parseInt(row.supplyDate)),
          changeDate: new Date(parseInt(row.changeDate)),
          expirationDate: row.expirationDate,
          maintenancePeriod: row.maintenancePeriod,
          warningTime: row.warningTime.split(',')[0]
        };
        this.warningDateDay = row.warningTime.split(',')[1];
        this.dialogFormVisible = true;
      },
      addTypeList() {
        this.isTypeEdit = false;
        this.dialogAddTypeVisible = true;
      },
      editTypeList(row) {
        this.typeForm = {
          id: row.id,
          name: row.name,
          remark: row.remark,
          parentId: row.parentId
        };
        this.isTypeEdit = true;
        this.dialogAddTypeVisible = true;
      },
      cancelType(formName) {
        this.$refs[formName].resetFields();
        this.dialogAddTypeVisible = false;
      },
      saveAssetType(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {...this.typeForm};
            data.parentId = data.parentId[0];
            if (this.isTypeEdit) {
              $axios.post('bjeam/alternativeAssetsType/update', data).then(res => {
                if (res.code === 200) {
                  this.$message.success('编辑成功!');
                  this.$refs[formName].resetFields();
                  this.dialogAddTypeVisible = false;
                  this.getAssetList();
                } else {
                  this.$message.warning('保存失败！');
                }
              });
            } else {
              delete data.id;
              $axios.post('bjeam/alternativeAssetsType/save', data).then(res => {
                if (res.code === 200) {
                  this.$message.success('保存成功!');
                  this.$refs[formName].resetFields();
                  this.dialogAddTypeVisible = false;
                  this.getAssetList();
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
      cancelForm(formName) {
        this.warningDateDay = '';
        this.$refs[formName].resetFields();
        this.dialogFormVisible = false;
      },
      getAssetList() {
        let pageNumber = this.AssetList.pageNumber - 1;
        $axios.post(`bjeam/alternativeAssetsType/findAllByPage?pageNumber=${pageNumber}&pageSize=${this.AssetList.pageSize}&param=${this.typeSearch}`, {}).then(res => {
          if (res.code === 200) {
            this.typeData = res.data.rows || [];
          }
        })
      },
      saveAssets(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {...this.form};
            data.typeId = this.form.typeId[0];
            data.changeDate = Number(this.form.changeDate);
            data.producedDate = Number(this.form.producedDate);
            data.supplyDate = Number(this.form.supplyDate);
            data.warningTime = `${this.form.warningTime},${this.warningDateDay}`;
            if (this.isTypeEdit) {
              $axios.post('bjeam/alternativeAssets/update', data).then(res => {
                if (res.code === 200) {
                  this.$refs[formName].resetFields();
                  this.this.$message.success('编辑成功！');
                  this.dialogFormVisible = false;
                  this.getList();
                } else {
                  this.$message.warning('编辑失败！');
                }
              })
            } else {
              delete data.id;
              $axios.post('bjeam/alternativeAssets/save', data).then(res => {
                if (res.code === 200) {
                  this.$refs[formName].resetFields();
                  this.this.$message.success('保存成功！');
                  this.dialogFormVisible = false;
                  this.getList();

                } else {
                  this.$message.warning('保存失败！');
                }
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addType() {
        this.dialogFormVisible = true;
      },
      upsuccess() {
        this.getList();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.warningDateDay = '';
            this.$refs.ruleForm.resetFields();
            done();
          })
          .catch(_ => {
          });
      },
      closeType(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$refs.typeRef.resetFields();
            done();
          })
          .catch(_ => {
          });
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      downloadModel() {
        $axios({
          url: 'bjeam/alternativeAssets/exportAssets',
          method: 'post',
          responseType: 'blob'
        }).then(response => {
          let elink = document.createElement('a');
          elink.style.display = 'none';
          elink.download = '模板.xlsx';
          let blob = new Blob([response]);
          document.body.appendChild(elink);
          elink.href = URL.createObjectURL(blob);
          elink.click();
          document.body.removeChild(elink);
        })
      },
      getAssetType() {
        $axios.post('bjeam/alternativeAssetsType/findAll').then(res => {
          if (res.code === 200) {
            this.options = res.data || [];
          }
        })
      },
      delType(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.typeLoading = true;
          $axios.post(`bjeam/alternativeAssetsType/deleteById?id=${row.id}`, {}).then(res => {
            this.typeLoading = false;
            if (res.code === 200) {
              this.getAssetList();
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
      delTable(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true;
          $axios.post(`bjeam/alternativeAssets/deleteById?id=${row.id}`, {}).then(res => {
            this.loading = false;
            if (res.code === 200) {
              this.getList();
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
      findQRcode(path) {
        this.QRcode = `${API_PATH}bjeam/asset/show?qrCodePath=${this.formatterPath(path)}`;
        this.dialogQRcodeVisible = true;
      },
      formatterPath(path) {
        return path.replace(/\\/g, '%5C').replace(/:/g, '%3A');
      },
      producedDateFormatter(row) {
        return this.$moment(row.producedDate)
      },
      supplyDateFormatter(row) {
        return this.$moment(row.supplyDate)
      },
      changeDateFormatter(row) {
        return this.$moment(row.changeDate)
      },
      getList() {
        this.loading = true;
        $axios.post(`bjeam/alternativeAssets/findAllByPage?pageNumber=${this.currentPage - 1}&pageSize=${this.tablePageSize}&typeId=${this.typeId}&param=${this.search}`, {}).then(res => {
          this.loading = false;
          if (res.code === 200) {
            this.tableData = res.data.rows || [];
            this.tableData.forEach((item, index) => {
              item.index = index;
            });
            this.tableTotal = res.data.total;
          }
        }).catch(err => {
          this.loading = false;
          this.$message({type: 'error', message: '系统错误！'});
          console.log(err);
        })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleChange() {
        this.getList();
      },
      handleSizeChange(val) {
        this.tablePageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getList();
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

    .icon_QRcode {
      font-size: 20px;
      color: #40b510;
      cursor: pointer;
    }
  }
</style>
