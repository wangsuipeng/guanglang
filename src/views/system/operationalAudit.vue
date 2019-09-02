<template>
    <div class="creatingPlan">
        <div class="operation-btn">
            <el-input
                style="width: 300px"
                placeholder="操作用户"
                prefix-icon="el-icon-search"
                v-model="searchValue"
            ></el-input>
            <el-date-picker v-model="searchValue" type="date" placeholder="起始日期"></el-date-picker>
            <el-date-picker v-model="searchValue" type="date" placeholder="截止日期"></el-date-picker>
            <el-button type="success" icon="el-icon-search">查询</el-button>
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
            <el-table-column label="操作用户">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="IP"></el-table-column>
            <el-table-column prop="name" label="操作模块"></el-table-column>
            <el-table-column prop="name" label="操作描述"></el-table-column>
            <el-table-column prop="name" label="操作时间"></el-table-column>
        </el-table>
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