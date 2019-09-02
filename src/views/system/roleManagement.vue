<template>
    <div class="creatingPlan">
        <div class="operation-btn">
            <el-button type="success" icon="el-icon-plus" @click="dialogFormEntrance = true">新建角色</el-button>
            <el-button
                type="primary"
                icon="el-icon-edit-outline"
                @click="dialogFormJurisdiction = true"
            >权限设置</el-button>
            <el-button type="primary" icon="el-icon-delete">删除角色</el-button>
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
            <el-table-column label="角色名称" width="180">
                <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column prop="name" label="角色描述"></el-table-column>
            <el-table-column prop="date" label="创建时间"></el-table-column>
            <el-table-column label="操作" width="200">
                <!-- <template slot-scope="scope"> -->
                    <el-button type="danger">删除角色</el-button>
                <!-- </template> -->
            </el-table-column>
        </el-table>
        <el-dialog title="创建/编辑角色" :visible.sync="dialogFormEntrance" width="37%">
            <el-form :model="form" style="padding: 0 40px 0 10px">
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEntrance = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormEntrance = false">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="权限设置" :visible.sync="dialogFormJurisdiction" width="37%">
            <el-tree
                :data="data2"
                show-checkbox
                node-key="id"
                :default-expanded-keys="[2, 3]"
                :default-checked-keys="[5]"
                :props="defaultProps"
            ></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormJurisdiction = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormJurisdiction = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data2: [
                {
                    label: "一级 1",
                    children: [
                        {
                            label: "二级 1-1",
                            children: [
                                {
                                    label: "三级 1-1-1"
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "一级 2",
                    children: [
                        {
                            label: "二级 2-1",
                            children: [
                                {
                                    label: "三级 2-1-1"
                                }
                            ]
                        },
                        {
                            label: "二级 2-2",
                            children: [
                                {
                                    label: "三级 2-2-1"
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "一级 3",
                    children: [
                        {
                            label: "二级 3-1",
                            children: [
                                {
                                    label: "三级 3-1-1"
                                }
                            ]
                        },
                        {
                            label: "二级 3-2",
                            children: [
                                {
                                    label: "三级 3-2-1"
                                }
                            ]
                        }
                    ]
                }
            ],
            activeName: "",
            searchValue: "",
            dialogFormEntrance: false, // 控制新增模态框
            dialogFormJurisdiction: false, // 权限设置
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