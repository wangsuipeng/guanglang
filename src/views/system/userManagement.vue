<template>
    <div class="creatingPlan">
        <div class="operation-btn">
            <el-button type="success" icon="el-icon-plus" @click="dialogFormEntrance = true">新建用户</el-button>
            <el-button type="primary" icon="el-icon-edit-outline">编辑用户</el-button>
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
            <el-table-column label="账号" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="用户名"></el-table-column>
            <el-table-column prop="name" label="联系电话"></el-table-column>
            <el-table-column prop="name" label="邮箱"></el-table-column>
            <el-table-column prop="name" label="角色"></el-table-column>
            <el-table-column prop="name" label="单位"></el-table-column>
        </el-table>
        <el-dialog title="创建/编辑用户" :visible.sync="dialogFormEntrance" width="37%">
            <el-form :model="form" style="padding: 0 40px 0 10px">
                <el-form-item label="登录名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属角色" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属管廊" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属单位" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEntrance = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormEntrance = false">确 定</el-button>
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
<style>
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}
</style>