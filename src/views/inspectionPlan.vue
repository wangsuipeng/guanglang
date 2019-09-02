<template>
    <div class="inspectionPlan">
        <div class="header-search-add">
            <div style="float: left;margin-bottom: 20px">
                <el-input
                    class="w_500"
                    placeholder="请输入标题/巡检内容"
                    prefix-icon="el-icon-search"
                    v-model="searchValue"
                ></el-input>
                <el-button type="primary" @click="getPlanData">搜索</el-button>
            </div>
            <div style="float: right;margin-bottom: 10px">
                <el-button type="primary" @click="addPoll">新增</el-button>
            </div>
        </div>
        <el-table :data="planData" border style="width: 100%">
            <el-table-column align="center" type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
            <el-table-column align="center" prop="title" label="标题" width="180"></el-table-column>
            <el-table-column align="center" prop="assetName" label="资产/备品名称" width="180"></el-table-column>
            <el-table-column align="center" prop="context" label="巡检内容"></el-table-column>
            <el-table-column align="center" prop="pollingUser" label="巡检人"></el-table-column>
            <el-table-column align="center" prop="fillUser" label="填写人"></el-table-column>
            <el-table-column align="center" prop="pollingPeriod" label="巡检周期"></el-table-column>
            <el-table-column align="center" prop="accessory" label="附件"></el-table-column>
            <el-table-column align="center" prop="remark" label="备注"></el-table-column>
            <el-table-column align="center" prop="pollingPlace" label="巡检位置"></el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click="addPoll(scope.row)">编辑</el-button>
                    <el-button type="primary" @click="deletePoll(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            style="text-align: center;margin-top: 10px;"
            background
            layout="prev, pager, next"
            :total="total"
            @current-change="current_change"
            :page-size="pageSize"
            :current-page="currentPage"
        ></el-pagination>
        <el-dialog title="新增巡检计划" center :visible.sync="dialogPlanVisible" width="35%">
            <el-form ref="form" :model="pollForm" label-width="100px" style="padding: 0 40px">
                <el-form-item label="标题">
                    <el-input v-model="pollForm.title"></el-input>
                </el-form-item>
                <el-form-item label="资产/备品名称">
                    <el-cascader
                        style="width: 100%"
                        :options="options"
                        clearable
                        v-model="pollForm.assetName"
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="巡检内容">
                    <el-input v-model="pollForm.context"></el-input>
                </el-form-item>
                <el-form-item label="巡检人">
                    <el-select
                        style="width: 100%"
                        v-model="pollForm.pollingUser"
                        placeholder="请选择巡检人"
                    >
                        <el-option
                            v-for="item in personData"
                            :key="item.id"
                            :label="item.nickname"
                            :value="item.nickname"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="填写人">
                    <el-select style="width: 100%" v-model="pollForm.fillUser" placeholder="请选择填写人">
                        <el-option
                            v-for="item in personData"
                            :key="item.id"
                            :label="item.nickname"
                            :value="item.nickname"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="巡检周期">
                    <el-input v-model="pollForm.pollingPeriod" style="width: 380px"></el-input>
                    <span style="margin-left: 10px;font-size: 16px">天/次</span>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" :rows="3" v-model="pollForm.remark"></el-input>
                </el-form-item>
                <el-form-item label="巡检位置">
                    <el-input type="textarea" :rows="3" v-model="pollForm.pollingPlace"></el-input>
                </el-form-item>
                <el-form-item label="附件">
                    <el-button type="primary" v-model="pollForm.accessory">上传附件</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPlanVisible = false">取 消</el-button>
                <el-button type="primary" @click="savePoll">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            options: [
                {
                    value: "zhinan",
                    label: "指南",
                    children: [
                        {
                            value: "shejiyuanze",
                            label: "设计原则",
                            children: [
                                {
                                    value: "yizhi",
                                    label: "一致"
                                },
                                {
                                    value: "fankui",
                                    label: "反馈"
                                },
                                {
                                    value: "xiaolv",
                                    label: "效率"
                                },
                                {
                                    value: "kekong",
                                    label: "可控"
                                }
                            ]
                        },
                        {
                            value: "daohang",
                            label: "导航",
                            children: [
                                {
                                    value: "cexiangdaohang",
                                    label: "侧向导航"
                                },
                                {
                                    value: "dingbudaohang",
                                    label: "顶部导航"
                                }
                            ]
                        }
                    ]
                },
                {
                    value: "zujian",
                    label: "组件",
                    children: [
                        {
                            value: "basic",
                            label: "Basic",
                            children: [
                                {
                                    value: "layout",
                                    label: "Layout 布局"
                                },
                                {
                                    value: "color",
                                    label: "Color 色彩"
                                },
                                {
                                    value: "typography",
                                    label: "Typography 字体"
                                },
                                {
                                    value: "icon",
                                    label: "Icon 图标"
                                },
                                {
                                    value: "button",
                                    label: "Button 按钮"
                                }
                            ]
                        },
                        {
                            value: "form",
                            label: "Form",
                            children: [
                                {
                                    value: "radio",
                                    label: "Radio 单选框"
                                },
                                {
                                    value: "checkbox",
                                    label: "Checkbox 多选框"
                                },
                                {
                                    value: "input",
                                    label: "Input 输入框"
                                },
                                {
                                    value: "input-number",
                                    label: "InputNumber 计数器"
                                },
                                {
                                    value: "select",
                                    label: "Select 选择器"
                                },
                                {
                                    value: "cascader",
                                    label: "Cascader 级联选择器"
                                },
                                {
                                    value: "switch",
                                    label: "Switch 开关"
                                },
                                {
                                    value: "slider",
                                    label: "Slider 滑块"
                                },
                                {
                                    value: "time-picker",
                                    label: "TimePicker 时间选择器"
                                },
                                {
                                    value: "date-picker",
                                    label: "DatePicker 日期选择器"
                                },
                                {
                                    value: "datetime-picker",
                                    label: "DateTimePicker 日期时间选择器"
                                },
                                {
                                    value: "upload",
                                    label: "Upload 上传"
                                },
                                {
                                    value: "rate",
                                    label: "Rate 评分"
                                },
                                {
                                    value: "form",
                                    label: "Form 表单"
                                }
                            ]
                        },
                        {
                            value: "data",
                            label: "Data",
                            children: [
                                {
                                    value: "table",
                                    label: "Table 表格"
                                },
                                {
                                    value: "tag",
                                    label: "Tag 标签"
                                },
                                {
                                    value: "progress",
                                    label: "Progress 进度条"
                                },
                                {
                                    value: "tree",
                                    label: "Tree 树形控件"
                                },
                                {
                                    value: "pagination",
                                    label: "Pagination 分页"
                                },
                                {
                                    value: "badge",
                                    label: "Badge 标记"
                                }
                            ]
                        },
                        {
                            value: "notice",
                            label: "Notice",
                            children: [
                                {
                                    value: "alert",
                                    label: "Alert 警告"
                                },
                                {
                                    value: "loading",
                                    label: "Loading 加载"
                                },
                                {
                                    value: "message",
                                    label: "Message 消息提示"
                                },
                                {
                                    value: "message-box",
                                    label: "MessageBox 弹框"
                                },
                                {
                                    value: "notification",
                                    label: "Notification 通知"
                                }
                            ]
                        },
                        {
                            value: "navigation",
                            label: "Navigation",
                            children: [
                                {
                                    value: "menu",
                                    label: "NavMenu 导航菜单"
                                },
                                {
                                    value: "tabs",
                                    label: "Tabs 标签页"
                                },
                                {
                                    value: "breadcrumb",
                                    label: "Breadcrumb 面包屑"
                                },
                                {
                                    value: "dropdown",
                                    label: "Dropdown 下拉菜单"
                                },
                                {
                                    value: "steps",
                                    label: "Steps 步骤条"
                                }
                            ]
                        },
                        {
                            value: "others",
                            label: "Others",
                            children: [
                                {
                                    value: "dialog",
                                    label: "Dialog 对话框"
                                },
                                {
                                    value: "tooltip",
                                    label: "Tooltip 文字提示"
                                },
                                {
                                    value: "popover",
                                    label: "Popover 弹出框"
                                },
                                {
                                    value: "card",
                                    label: "Card 卡片"
                                },
                                {
                                    value: "carousel",
                                    label: "Carousel 走马灯"
                                },
                                {
                                    value: "collapse",
                                    label: "Collapse 折叠面板"
                                }
                            ]
                        }
                    ]
                },
                {
                    value: "ziyuan",
                    label: "资源",
                    children: [
                        {
                            value: "axure",
                            label: "Axure Components"
                        },
                        {
                            value: "sketch",
                            label: "Sketch Templates"
                        },
                        {
                            value: "jiaohu",
                            label: "组件交互文档"
                        }
                    ]
                }
            ],
            searchValue: "",// 搜索内容
            planData: [], // 巡检数据集合
            personData: [], // 所有用户
            dialogPlanVisible: false,
            total: 4,
            pageSize: 10,
            currentPage: 0,
            pollId: [], // 删除计划的id集合
            pollForm: {
                id: "",
                title: "", // 标题
                assetName: "", // 资产/备品名称
                context: "", // 巡检内容
                pollingUser: "", // 巡检人
                pollingUserId: "", // 巡检人id
                fillUserId: "", // 填写人id
                fillUser: "", // 填写人
                pollingPeriod: "", // 巡检周期
                remark: "", // 备注
                accessory: "", // 附件
                pollingPlace: "" //巡检位置
            }
        };
    },
    created() {
        this.getPlanData();
        this.getPerson();
    },
    mounted() {},
    methods: {
        indexMethod(index) {
            return (index + 1) * 1;
        },
        // 分页
        current_change(val) {
            this.currentPage = val;
        },
        // 获取所有的用户
        getPerson() {
            $axios({
                url:
                    "bjupm/users/findAll?pageNumber=" +
                    0 +
                    "&pageSize=" +
                    10000,
                method: "post",
                data: {}
            })
                .then(result => {
                    this.personData = result.data.rows;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 获取数据
        getPlanData() {
            $axios({
                url:
                    "bjpolling/pollingPlan/findAllByKey?pageNumber=" +
                    this.currentPage + 
                    "&pageSize=" +
                    this.pageSize + "&key=" +this.searchValue,
                method: "post",
                data: {}
            })
                .then(result => {
                    this.planData = result.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 新增巡检
        addPoll(row) {
            if (!row.id) {
                this.pollForm.id = "";
                this.pollForm.title = ""; // 标题
                this.pollForm.assetName = ""; // 资产/备品名称
                this.pollForm.context = ""; // 巡检内容
                this.pollForm.pollingUser = ""; // 巡检人
                this.pollForm.pollingUserId = ""; // 巡检人id
                this.pollForm.fillUserId = ""; // 填写人id
                this.pollForm.fillUser = ""; // 填写人
                this.pollForm.pollingPeriod = ""; // 巡检周期
                this.pollForm.remark = ""; // 备注
                this.pollForm.accessory = ""; // 附件
                this.pollForm.pollingPlace = ""; //巡检位置
                this.dialogPlanVisible = true;
            } else {
                this.pollForm.id = row.id;
                this.pollForm.title = row.title; // 标题
                this.pollForm.assetName = row.assetName; // 资产/备品名称
                this.pollForm.context = row.context; // 巡检内容
                this.pollForm.pollingUser = row.pollingUser; // 巡检人
                this.pollForm.pollingUserId = row.pollingUserId; // 巡检人id
                this.pollForm.fillUserId = row.fillUserId; // 填写人id
                this.pollForm.fillUser = row.fillUser; // 填写人
                this.pollForm.pollingPeriod = row.pollingPeriod; // 巡检周期
                this.pollForm.remark = row.remark; // 备注
                this.pollForm.accessory = row.accessory; // 附件
                this.pollForm.pollingPlace = row.pollingPlace; //巡检位置
                this.dialogPlanVisible = true;
            }
        },
        // 新增巡检计划
        savePoll() {
              this.pollForm.assetName = this.pollForm.assetName[
                    this.pollForm.assetName.length - 1
                ];
                this.pollForm.pollingPeriod = parseInt(
                    this.pollForm.pollingPeriod
                );
                for (var i = 0; i < this.personData.length; i++) {
                    if (
                        this.personData[i].nickname == this.pollForm.pollingUser
                    ) {
                        this.pollForm.pollingUserId = this.personData[i].id;
                    }
                    if (this.personData[i].nickname == this.pollForm.fillUser) {
                        this.pollForm.fillUserId = this.personData[i].id;
                    }
                }
            if (this.pollForm.id == "" || this.pollForm.id == null) {
                $axios({
                    url: "bjpolling/pollingPlan/save",
                    method: "post",
                    data: this.pollForm
                })
                    .then(result => {
                        console.log(result);
                        if (result.code === 200) {
                            this.$message({
                                message: "新增成功",
                                type: "success"
                            });
                            this.getPlanData();
                        } else {
                            this.$message.error("新增失败");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                this.dialogPlanVisible = false;
            } else {
                $axios({
                    url: "bjpolling/pollingPlan/update",
                    method: "post",
                    data: this.pollForm
                })
                    .then(result => {
                        console.log(result);
                        if (result.code === 200) {
                            this.$message({
                                message: "编辑成功",
                                type: "success"
                            });
                            this.getPlanData();
                        } else {
                            this.$message.error("编辑失败");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                this.dialogPlanVisible = false;
            }
        },
        // 删除巡检计划
        deletePoll(row) {
            this.pollId.push(row.id);
            this.$confirm("您确定要删除本条巡检计划吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    $axios({
                        url: "bjpolling/pollingPlan/delete",
                        method: "post",
                        data: this.pollId
                    })
                        .then(result => {
                            if (result.code === 200) {
                                this.$message("删除成功");
                                this.getPlanData();
                            } else {
                                this.$message.error("删除失败");
                            }
                            console.log(result);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.header-search-add {
    // margin-bottom: 10px;
}
.inspectionPlan {
    padding-top: 15px;
}
.w_500 {
    width: 400px;
}
</style>
