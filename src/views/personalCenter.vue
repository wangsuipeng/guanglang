<template>
    <div class="personCenter">
        <div class="return-btn">
            <el-button type="primary" size="medium" circle @click="returnBtn">
                <i class="icon-ai207 iconfont"></i>
            </el-button>
        </div>
        <div style="width:50%;margin-left:25%;margin-top:20px;padding-left:20px;padding-right:20px">
            <el-tabs v-model="message" @tab-click="tagChange">
                <el-tab-pane :label="`基本信息`" name="first">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>用户信息</span>
                        </div>
                        <el-form ref="form" :model="form" :rules="rulesM" label-width="80px">
                            <div @click="upload" class="avatar-uploader">
                                <img
                                    v-if="form.avatar"
                                    :src="form.avatarP"
                                    ref="userAvatar"
                                    class="avatar"
                                />
                                <img v-else class="avatar" src="../assets/images/avatarB.png" />
                                <input
                                    accept="image/*"
                                    type="file"
                                    id="fileInput"
                                    ref="inputer"
                                    @change="update"
                                    style="display:none;"
                                />
                            </div>
                            <hr />
                            <br />
                            <el-form-item label="职位" class="text">
                                <el-input v-model="form.stationName" size="small" :disabled="true"></el-input>
                            </el-form-item>

                            <el-form-item label="公司名称" class="text">
                                <el-input
                                    v-model="form.departmentName"
                                    size="small"
                                    :disabled="true"
                                ></el-input>
                            </el-form-item>

                            <el-form-item label="性别" prop="sex" style="width：100%" class="text">
                                <el-radio v-model="form.sex" label="男">男</el-radio>
                                <el-radio v-model="form.sex" label="女">女</el-radio>
                            </el-form-item>

                            <el-form-item label="姓名" class="text">
                                <el-input v-model="form.nickname" size="small"></el-input>
                            </el-form-item>

                            <el-form-item label="身份证号" class="text">
                                <el-input v-model="form.cardNmber" size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="工作证号" class="text">
                                <el-input v-model="form.jobNumber" size="small"></el-input>
                            </el-form-item>

                            <el-form-item label="邮箱" class="text">
                                <el-input v-model="form.email" size="small"></el-input>
                            </el-form-item>

                            <el-form-item label="手机" class="text">
                                <el-input v-model="form.phone" size="small"></el-input>
                            </el-form-item>
                            <el-form-item
                                label="验证码"
                                class="text"
                                style="width:50%;margin-left:50%"
                            >
                                <el-input
                                    type="text"
                                    placeholder="请输入验证码"
                                    v-model="form.context"
                                    style="width:68%"
                                    @keyup.enter.native="submitFormC"
                                ></el-input>
                                <el-button
                                    type="primary"
                                    @click="sendCode"
                                    id="count"
                                    style="width:30%"
                                >{{count}}</el-button>
                            </el-form-item>
                        </el-form>
                        <div
                            class="dialog-footer"
                            style="width:300px;margin-left:auto;margin-right:auto"
                        >
                            <el-button
                                type="primary"
                                style="width:300px;margin-left:auto;margin-right:auto"
                                @click="submitMessage"
                                size="big"
                            >确定</el-button>
                        </div>
                    </el-card>
                </el-tab-pane>

                <el-tab-pane :label="`修改密码`" name="second">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>修改密码</span>
                        </div>
                        <el-form ref="formP" :model="formP" :rules="rules" label-width="80px">
                            <el-form-item
                                label="新密码"
                                prop="password"
                                style="width:50%;margin-left:25%;"
                            >
                                <el-input
                                    v-model="formP.password"
                                    type="password"
                                    class="w_200"
                                    size="small"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="确认密码"
                                prop="repassword"
                                style="width:50%;margin-left:25%;"
                            >
                                <el-input
                                    v-model="formP.repassword"
                                    type="password"
                                    class="w_200"
                                    size="small"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="手机"
                                class="text"
                                style="width:50%;margin-left:25%;"
                            >
                                <el-input v-model="formP.phone" class="w_200" size="small"></el-input>
                            </el-form-item>
                            <el-form-item class="text" style="width:50%;margin-left:25%;">
                                <el-input
                                    type="text"
                                    placeholder="请输入验证码"
                                    v-model="formP.context"
                                    style="width:53%"
                                    @keyup.enter.native="submitFormC"
                                ></el-input>
                                <el-button
                                    type="primary"
                                    @click="sendCode1"
                                    id="count1"
                                    style="width:25%"
                                >{{count1}}</el-button>
                            </el-form-item>
                        </el-form>
                        <div
                            class="dialog-footer"
                            style="width:300px;margin-left:auto;margin-right:auto"
                        >
                            <el-button
                                type="primary"
                                style="width:300px;margin-left:auto;margin-right:auto"
                                @click="submitPassword('formP')"
                                size="big"
                            >确定</el-button>
                        </div>
                    </el-card>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
// import $ from "jquery";
import baseUrl from "../env.js";

export default {
    name: "checkProject",
    data() {
        return {
            oldPhone: "", //原有得手机号
            message: "first",
            userName: "",
            file: "",
            count: "发送验证码",
            count1: "发送验证码",
            timer: "0",
            timer1: "0",
            time: "",
            parentDeps: [],
            posts: [],
            avatar: "",
            avatarP: "",
            form: {
                avatar: "",
                avatarP: "",
                theirDepartmentId: "",
                stationName: "",
                username: "",
                nickname: "",
                sex: "",
                cardNmber: "",
                jobNumber: "",
                phone: "",
                email: "",
                context: "" //手机验证码
            },
            formP: {
                password: "",
                repassword: "",
                phone: "",
                context: "" //手机验证码
            },
            rules: {
                password: [
                    {
                        required: true,
                        message: "请输入新密码",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 10,
                        message: "长度在 6 到 10 个字符",
                        trigger: "blur"
                    }
                ],
                repassword: [
                    {
                        required: true,
                        message: "请重复新密码",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 10,
                        message: "长度在 6 到 10 个字符",
                        trigger: "blur"
                    }
                ]
            },
            rulesM: {
                name: [
                    {
                        required: true,
                        message: "用户名不能为空",
                        trigger: "blur"
                    }
                ],
                repassword: [
                    {
                        required: true,
                        message: "请重复新密码",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 10,
                        message: "长度在 6 到 10 个字符",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        this.getData();
        this.getDeps();
        this.getPost();
    },
    methods: {
        returnBtn() {
            this.$router.go(-1)
        },
        tagChange(tab, event) {
            //tab切换事件
            this.currPage = 0;
            if (tab.name == "first") {
                this.tab = "first";
                this.form.context = "";
                this.timer = 0;
                this.countdown();
            } else if (tab.name == "second") {
                this.formP.password = "";
                this.formP.repassword = "";
                this.formP.phone = "";
                this.formP.context = "";
                this.timer1 = 0;
                this.countdown1();
                this.tab = "second";
            }
        },
        getDeps() {
            //获取所有的公司的树形结构
            $axios({
                url: "bjupm/department/findAll",
                method: "post",
                data: {}
            })
                .then(res => {
                    if (res.data.code == 200) {
                        var list = res.data.data.rows;
                        this.parentDeps = list;
                    }
                })
                .catch(err => {});
        },
        getPost() {
            //获取岗位的数据
            $axios({
                url: "bjupm/post/findAll",
                method: "post",
                data: {}
            })
                .then(res => {
                    if (res.status === 200) {
                        this.posts = res.data.data.rows;
                    }
                })
                .catch(err => {
                    console.log(err)
                });
        },
        sendCode() {
            //发送验证码
            var regMoblie = /^1[3456789]\d{9}$/;
            if (this.timer < 60 && this.timer != 0) {
                this.$message.error("操作过于频繁！");
            } else {
                if (this.form.phone == "") {
                    this.$message.error("您还未输入手机号！");
                } else if (!regMoblie.test(this.form.phone)) {
                    this.$message.error("手机号格式不正确！");
                } else {
                    $axios({
                        url: "bjupm/login/sendCode",
                        method: "post",
                        data: {
                            phoneNumbers: this.form.phone,
                            templateCode: "信息变更验证码"
                        },
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.timer = 60;
                                this.countdown();
                                this.$message.success("发送成功");
                            } else if (res.data.code == 500) {
                                this.$message.warning(res.data.message);
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        });
                }
            }
        },
        sendCode1() {
            //发送验证码
            var regMoblie = /^1[3456789]\d{9}$/;
            if (this.timer1 < 60 && this.timer1 != 0) {
                this.$message.error("操作过于频繁！");
            } else {
                if (this.formP.phone == "") {
                    this.$message.error("您还未输入手机号！");
                } else if (this.formP.phone != this.form.phone) {
                    this.$message.error("请输入已绑定的手机号！");
                } else if (!regMoblie.test(this.formP.phone)) {
                    this.$message.error("手机号格式不正确！");
                } else {
                    $axios({
                        url: "bjupm/login/sendCode",
                        method: "post",
                        data: {
                            phoneNumbers: this.form.phone,
                            templateCode: "修改密码验证码"
                        },
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.timer1 = 60;
                                this.countdown1();
                                this.$message.success("发送成功");
                            } else if (res.data.code == 500) {
                                this.$message.warning(res.data.message);
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        });
                }
            }
        },
        countdown() {
            //60秒计时器
            var that = this;
            if (that.timer == 0) {
                that.count = "发送验证码";
                return false;
                that.timer = "60";
            } else {
                that.count = that.timer + "s";
                that.timer--;
            }
            setTimeout(function() {
                that.countdown();
            }, 1000);
        },
        countdown1() {
            //60秒计时器
            var that = this;
            if (that.timer1 == 0) {
                that.count1 = "发送验证码";
                return false;
                that.timer = "60";
            } else {
                that.count1 = that.timer1 + "s";
                that.timer1--;
            }
            setTimeout(function() {
                that.countdown1();
            }, 1000);
        },
        destroyed() {
            if (this.time) {
                //如果定时器在运行则关闭
                clearInterval(this.timer1);
            }
        },

        upload() {
            var fileInput = document.getElementById("fileInput");
            fileInput.click();
        },
        getData() {
            //获取当前用户的信息
            $axios({
                url: "bjupm/users/findUserInfo",
                method: "post",
                data: {}
            })
                .then(res => {
                    if (res.data.code == 200) {
                        var list = res.data.data;
                        this.form = list;
                        this.oldPhone = list.phone;
                        this.userName = list.username;
                        this.form.avatar = list.avatar;
                        localStorage.setItem("avatar", list.avatar);
                        if (
                            this.form.avatar == "" ||
                            this.form.avatar == null
                        ) {
                            this.form.avatarP = "";
                        } else {
                            this.form.avatarP =
                                baseUrl + "bjupload" + this.form.avatar;
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                });
        },
        async update() {
            console.log(1)
            //上传图片
            var inputDOM = this.$refs.inputer;
            var url;
            // 通过DOM取文件数据
            this.file = inputDOM.files[0];
            var formdata = new FormData();
            formdata.append("multipartFile ", inputDOM.files[0]);
            const loading = this.$loading({
                lock: true,
                text: "上传中...",
                spinner: "el-icon-loading",
                background: "rgba(255, 255, 255, 0.3)"
            });
            $axios({
                url: "bjupload/upload",
                method: "post",
                data: formdata
            })
                .then(res => {
                    loading.close();
                    url = res.data;
                    this.form.avatarP = baseUrl + "bjupload" + url;
                    this.form.avatar = url;
                    // this.$refs.headerDiv.userImage();
                })
                .catch(err => {
                    loading.close();
                });
        },
        submitMessage() {
            //提交数据
            if (this.form.phone == "") {
                this.$message.success(`请先输入手机号！`);
            } else {
                if (this.oldPhone == this.form.phone) {
                    //没有修改手机号
                    $axios({
                        url: "bjupm/users/updateUserSelf",
                        method: "post",
                        data: this.form,
                    })
                        .then(res => {
                            if (res.data.code == 200) {
                                this.$message.success(`修改成功！`);
                                this.getData();
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        });
                } else {
                    $axios({
                        url: `bjupm/checked/phone?phone=${this.form.phone}`,
                        method: "post",
                        data: {}
                    })
                        .then(res => {
                            if (res.data == false) {
                                this.$message.warning(`手机号已经被占用！`);
                                this.form.phone = "";
                            } else {
                                if (
                                    this.form.context == "" ||
                                    !this.form.context
                                ) {
                                    //没有输入验证码
                                    this.$message.warning(`请先验证手机号！`);
                                } else {
                                    $axios(
                                        "post",
                                        "bjupm/login/validateCode",
                                        {
                                            context: this.form.context,
                                            phoneNumbers: this.form.phone
                                        },
                                        { Authorization: "BINGJIANG" }
                                    )
                                        .then(res => {
                                            if (res.data.code == 200) {
                                                $axios({
                                                    url: "bjupm/users/updateUserSelf",
                                                    method: "post",
                                                    data: this.form,
                                                })
                                                    .then(res => {
                                                        if (
                                                            res.data.code == 200
                                                        ) {
                                                            this.$message.success(
                                                                `修改成功！`
                                                            );
                                                            this.getData();
                                                            this.form.context =
                                                                "";
                                                            this.timer = 0;
                                                            this.countdown();
                                                        }
                                                    })
                                                    .catch(err => {});
                                            } else {
                                                this.$message.error(
                                                    "验证码验证失败"
                                                );
                                            }
                                        })
                                        .catch(err => {
                                            this.$message.error(
                                                "验证码验证失败"
                                            );
                                            this.form.context = "";
                                            this.timer = 0;
                                            this.countdown();
                                        });
                                }
                            }
                        })
                        .catch(err => {});
                }
            }
        },
        submitPassword(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.formP.phone == "") {
                        this.$message.error(`请先验证手机号！`);
                    } else {
                        if (this.formP.context == "") {
                            this.$message.error(`请输入验证码！`);
                        } else {
                            if (this.formP.password === this.formP.repassword) {
                                $axios({
                                    url: "bjupm/login/validateCode",
                                    method: "post",
                                    data: {
                                        context: this.formP.context,
                                        phoneNumbers: this.formP.phone
                                    }
                                })
                                    .then(res => {
                                        if (res.data.code == 200) {
                                            $axios({
                                                url: "bjupm/users/updatePassword",
                                                method: "post",
                                                data: {
                                                    username: this.userName,
                                                    password: this.formP.password
                                                }
                                            })
                                                .then(res => {
                                                    if (res.data.code == 200) {
                                                        this.$message.success(
                                                            `修改成功！`
                                                        );
                                                        this.formP.password =
                                                            "";
                                                        this.formP.repassword =
                                                            "";
                                                        this.formP.phone = "";
                                                        this.formP.context = "";
                                                        this.timer1 = 0;
                                                        this.countdown1();
                                                        this.getData();
                                                    } else {
                                                        this.$message.error(
                                                            "修改失败"
                                                        );
                                                    }
                                                })
                                                .catch(err => {
                                                    this.$message.error(
                                                        "修改失败"
                                                    );
                                                });
                                        } else {
                                            this.$message.error(
                                                "验证码验证失败"
                                            );
                                        }
                                    })
                                    .catch(err => {
                                        this.$message.error("验证码验证失败");
                                    });
                            } else {
                                this.$message.error(
                                    `两次输入不一致，请确认你输入的密码两次完全一致！`
                                );
                                this.formP.password = "";
                                this.formP.repassword = "";
                                this.formP.phone = "";
                                this.formP.context = "";
                                this.timer1 = 0;
                                this.countdown1();
                            }
                        }
                    }
                } else {
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.return-btn {
    margin-left: 50px;
    margin-top: 20px;
}
.iconfont {
    font-size: 25px;
}
@media (max-width: 1400px) {
    .container {
        width: 1372px;
    }
}
.handle-box {
    margin-bottom: 20px;
}
.handle-input {
    width: 300px;
    display: inline-block;
}
.avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 89px;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    margin: 0 auto;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
}
.avatar-uploader:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
hr {
    background-color: #dcdfe6;
    height: 1px;
    border: none;
}
.w_200 {
    width: 300px;
}
.text .el-form-item__label {
    text-align: left;
}
.text {
    float: left;
    width: 50%;
}
</style>
