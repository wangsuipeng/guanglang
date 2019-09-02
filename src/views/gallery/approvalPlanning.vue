<template>
    <div>
        <div class="operation-btn">
            <el-button type="warning" icon="el-icon-view" @click="dialogFormApproval = true">审批计划</el-button>
            <el-input
                style="float: right;width: 400px"
                placeholder="搜索项目数据"
                prefix-icon="el-icon-search"
                v-model="searchValue"
            ></el-input>
        </div>
        <el-table
            border
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            @selection-change="handleSelectionChange"
        >
            <el-table-column fixed type="selection" width="55"></el-table-column>
            <el-table-column label="状态" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="工程名称" width="120"></el-table-column>
            <el-table-column prop="name" label="工程类型" width="120"></el-table-column>
            <el-table-column prop="name" label="管线类型" width="120"></el-table-column>
            <el-table-column prop="name" label="所属管廊" width="120"></el-table-column>
            <el-table-column prop="name" label="所在位置" width="120"></el-table-column>
            <el-table-column prop="name" label="道路范围" width="120"></el-table-column>
            <el-table-column prop="name" label="长度" width="120"></el-table-column>
            <el-table-column prop="name" label="宽度" width="120"></el-table-column>
            <el-table-column prop="name" label="高度" width="120"></el-table-column>
            <el-table-column prop="name" label="舱数" width="120"></el-table-column>
            <el-table-column prop="name" label="申报日期" width="120"></el-table-column>
            <el-table-column prop="name" label="申报单位" width="120"></el-table-column>
            <el-table-column prop="name" label="项目审核日期" width="120"></el-table-column>
            <el-table-column prop="name" label="项目审核人" width="120"></el-table-column>
            <el-table-column prop="name" label="项目审批单位" width="120"></el-table-column>
            <el-table-column prop="name" label="开工日期" width="120"></el-table-column>
            <el-table-column prop="name" label="竣工日期" width="120"></el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        </el-table>
        <el-dialog title="新增管廊计划" :visible.sync="dialogFormApproval" width="37%">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="管廊信息" name="first">
                    <el-form :model="form" style="padding: 0 40px 0 10px">
                        <el-form-item label="项目名称" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="工程类型" :label-width="formLabelWidth">
                            <el-select
                                v-model="form.region"
                                placeholder="请选择活动区域"
                                style="width: 100%"
                            >
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="管线类型" :label-width="formLabelWidth">
                            <el-select
                                v-model="form.region"
                                placeholder="请选择活动区域"
                                style="width: 100%"
                            >
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所在舱" :label-width="formLabelWidth">
                            <el-select
                                v-model="form.region"
                                placeholder="请选择活动区域"
                                style="width: 100%"
                            >
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属管廊" :label-width="formLabelWidth">
                            <el-select
                                v-model="form.region"
                                placeholder="请选择活动区域"
                                style="width: 100%"
                            >
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="长度" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="宽度" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="高度" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="所在道路" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="相邻道路" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="总孔数" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="地图信息" name="second"></el-tab-pane>
                <el-tab-pane label="上传附件" name="third">
                    <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple
                    >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">
                            将文件拖到此处，或
                            <em>点击上传</em>
                        </div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-tab-pane>
            </el-tabs>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormApproval = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormApproval = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: "",
            searchValue: "",
            dialogFormApproval: false, // 控制审批模态框
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

<style scoped>
.container-main {
    margin-top: 20px;
}
.operation-btn {
    margin-bottom: 15px;
}
</style>