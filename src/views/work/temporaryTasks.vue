<template>
    <div class="curing">
        <div class="operation-btn">
            <el-button type="success" icon="el-icon-plus" @click="dialogFormWorks = true">新增临时任务</el-button>
            <el-button type="warning" icon="el-icon-edit" @click="dialogFormWorks = true">修改任务</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="dialogFormWorks = true">取消任务</el-button>
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
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="状态" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="管廊名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="任务名称" width="120"></el-table-column>
            <el-table-column prop="address" label="任务详细" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="计划类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="任务类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="任务执行人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="预计开始时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="预计结束时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button type="warning">编辑</el-button>
                    <el-button type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="新增临时任务" :visible.sync="dialogFormWorks" width="37%">
            <el-form :model="form" style="padding: 0 40px 0 10px">
                <el-form-item label="管廊" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="任务名称" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="任务详细" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="任务类型" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="巡检线路" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="执行人" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.name" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.name" type="date" placeholder="选择日期"></el-date-picker>
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
.curing {
    margin-top: 15px;
}
</style>