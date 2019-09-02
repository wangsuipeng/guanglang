<template>
    <div class="information">
        <div class="return-btn">
            <el-button type="primary" size="medium" circle @click="returnBtn" class="last-step">
                <i class="icon-ai207 iconfont"></i>
            </el-button>
        </div>
        <div class="container" style="width:98%;padding: 0 20px">
            <el-tabs v-model="message" @tab-click="tagChange">
                <el-tab-pane :label="`部门`" name="first">
                    <template>
                        <div class="handle-box architec-box">
                            <el-select v-model="searchDepKey" placeholder="筛选条件">
                                <el-option label="请选择查询条件" value></el-option>
                                <el-option label="部门名称" value="name"></el-option>
                                <el-option label="创建人" value="createUsername"></el-option>
                            </el-select>
                            <el-input
                                v-model="searchDepVelue"
                                placeholder="筛选关键词"
                                class="handle-input mr10"
                            ></el-input>
                            <el-button type="primary" icon="el-icon-search" @click="searchDep">搜索</el-button>
                            <el-button
                                type="primary"
                                icon="el-icon-plus"
                                @click="handleEdit"
                                style="margin-left: 0"
                            >新增</el-button>
                        </div>
                        <el-table :data="department" stripe style="width: 100%" border>
                            <el-table-column label="序号" align="center" width="50">
                                <template slot-scope="scope">
                                    <a
                                        class="titleText"
                                        @click="handleClick(scope.row)"
                                        v-text="indexed(scope.$index)"
                                    ></a>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="部门名称" align="center" width="350"></el-table-column>
                            <el-table-column
                                prop="createUsername"
                                label="创建人"
                                width="200"
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                prop="createTime"
                                label="创建日期"
                                align="center"
                                width="200"
                            ></el-table-column>
                            <el-table-column prop="desc" label="备注" align="center"></el-table-column>
                            <el-table-column label="操作" align="center" width="200">
                                <template slot-scope="scope">
                                    <el-button
                                        type="primary"
                                        icon="el-icon-edit"
                                        circle
                                        plain
                                        @click="handleEdit(scope.row)"
                                        size="small"
                                    ></el-button>
                                    <el-button
                                        type="danger"
                                        icon="el-icon-delete"
                                        circle
                                        plain
                                        @click="handleDelete(scope.row)"
                                        size="small"
                                    ></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination
                                background
                                @current-change="handleCurrentChange"
                                layout="prev, pager, next"
                                :total="total"
                                :page-size="pageSize"
                                :current-page="currPage"
                                style="text-align: center;margin-top: 10px;"
                            ></el-pagination>
                        </div>
                    </template>
                </el-tab-pane>

                <el-tab-pane :label="`岗位`" name="second">
                    <template v-if="message === 'second'">
                        <div class="handle-box architec-box">
                            <el-select v-model="searchPostKey" placeholder="筛选条件">
                                <el-option label="请选择查询条件" value></el-option>
                                <el-option label="岗位名称" value="name"></el-option>
                                <el-option label="创建人" value="createUsername"></el-option>
                            </el-select>
                            <el-input
                                v-model="searchPostVelue"
                                placeholder="筛选关键词"
                                class="handle-input mr10"
                            ></el-input>
                            <el-button type="primary" icon="el-icon-search" @click="searchPost">搜索</el-button>
                            <el-button
                                type="primary"
                                icon="el-icon-plus"
                                @click="handleEdit"
                                style="margin-left: 0"
                            >新增</el-button>
                        </div>
                        <el-table :data="posts" stripe style="width: 100%" border>
                            <el-table-column label="序号" align="center" width="50">
                                <template slot-scope="scope">
                                    <a
                                        class="titleText"
                                        @click="handleClick(scope.row)"
                                        v-text="indexed(scope.$index)"
                                    ></a>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="岗位名称" width="300" align="center"></el-table-column>
                            <el-table-column
                                prop="createUsername"
                                label="创建人"
                                width="200"
                                align="center"
                            ></el-table-column>
                            <el-table-column
                                prop="createTime"
                                label="创建日期"
                                align="center"
                                width="200"
                            ></el-table-column>
                            <el-table-column prop="desc" label="备注" align="center"></el-table-column>
                            <el-table-column label="操作" align="center" width="200">
                                <template slot-scope="scope">
                                    <el-button
                                        type="primary"
                                        icon="el-icon-edit"
                                        circle
                                        plain
                                        @click="handleEdit(scope.row)"
                                        size="small"
                                    ></el-button>
                                    <el-button
                                        type="danger"
                                        icon="el-icon-delete"
                                        circle
                                        plain
                                        @click="handleDelete(scope.row)"
                                        size="small"
                                    ></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination
                                background
                                @current-change="handleCurrentChange"
                                layout="prev, pager, next"
                                :total="total"
                                :page-size="pageSize"
                                :current-page="currPage"
                                style="text-align: center;margin-top: 10px;"
                            ></el-pagination>
                        </div>
                    </template>
                </el-tab-pane>

                <el-tab-pane :label="`用户`" name="third">
                    <template v-if="message === 'third'">
                        <div class="handle-box architec-box">
                            <el-select v-model="searchUserKey" placeholder="筛选条件">
                                <el-option label="请选择查询条件" value></el-option>
                                <el-option label="用户名称" value="username"></el-option>
                                <el-option label="真实姓名" value="nickname"></el-option>
                                <el-option label="性别" value="sex"></el-option>
                                <el-option label="手机" value="phone"></el-option>
                                <el-option label="邮箱" value="email"></el-option>
                                <el-option label="创建人" value="createUsername"></el-option>
                            </el-select>
                            <el-input
                                v-model="searchUserValue"
                                placeholder="筛选关键词"
                                class="handle-input mr10"
                            ></el-input>
                            <el-button type="primary" icon="el-icon-search" @click="searchUser">搜索</el-button>
                            <el-button
                                type="primary"
                                icon="el-icon-plus"
                                @click="handleEdit"
                                style="margin-left: 0"
                            >新增</el-button>
                        </div>
                        <el-table :data="users" stripe style="width: 100%" border>
                            <el-table-column label="序号" align="center" width="50">
                                <template slot-scope="scope">
                                    <a
                                        class="titleText"
                                        @click="handleClick(scope.row)"
                                        v-text="indexed(scope.$index)"
                                    ></a>
                                </template>
                            </el-table-column>
                            <el-table-column prop="username" label="用户名称" align="center"></el-table-column>
                            <el-table-column prop="nickname" label="真实姓名" align="center"></el-table-column>
                            <el-table-column prop="sex" label="性别" align="center"></el-table-column>
                            <el-table-column prop="phone" label="手机" align="center"></el-table-column>
                            <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
                            <el-table-column prop="createUsername" label="创建人" align="center"></el-table-column>
                            <el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
                            <el-table-column prop="remark" label="备注" align="center"></el-table-column>
                            <el-table-column label="角色" align="center">
                                <template slot-scope="scope">
                                    <el-button
                                        @click="bindUserRole(scope.row)"
                                        type="text"
                                        size="small"
                                    >绑定角色</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column label="登陆管理" align="center">
                                <template slot-scope="scope">
                                    <a class="titleText" @click="quiteUser(scope.row)">强制退出</a>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="180" align="center">
                                <template slot-scope="scope">
                                    <el-button
                                        type="primary"
                                        icon="el-icon-edit"
                                        circle
                                        plain
                                        @click="handleEdit(scope.row)"
                                        size="small"
                                    ></el-button>
                                    <el-button
                                        type="danger"
                                        icon="el-icon-delete"
                                        circle
                                        plain
                                        @click="handleDelete(scope.row)"
                                        size="small"
                                    ></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination
                                background
                                @current-change="handleCurrentChange"
                                layout="prev, pager, next"
                                :total="total"
                                :page-size="pageSize"
                                :current-page="currPage"
                                style="text-align: center;margin-top: 10px;"
                            ></el-pagination>
                        </div>
                    </template>
                </el-tab-pane>

                <el-tab-pane :label="`角色`" name="forth">
                    <template v-if="message === 'forth'">
                        <div class="handle-box architec-box">
                            <el-select v-model="searchRoleKey" placeholder="筛选条件">
                                <el-option label="请选择查询条件" value></el-option>
                                <el-option label="角色名称" value="name"></el-option>
                                <el-option label="创建人" value="createUsername"></el-option>
                            </el-select>
                            <el-input
                                v-model="searchRoleValue"
                                placeholder="筛选关键词"
                                class="handle-input mr10"
                            ></el-input>
                            <el-button type="primary" icon="el-icon-search" @click="searchRole">搜索</el-button>
                            <el-button
                                type="primary"
                                icon="el-icon-plus"
                                @click="handleEdit"
                                style="margin-left: 0"
                            >新增</el-button>
                        </div>
                        <el-table :data="roles" stripe style="width: 100%" border>
                            <el-table-column label="序号" align="center" width="50">
                                <template slot-scope="scope">
                                    <a
                                        class="titleText"
                                        @click="handleClick(scope.row)"
                                        v-text="indexed(scope.$index)"
                                    ></a>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
                            <el-table-column prop="createUsername" label="创建人" align="center"></el-table-column>
                            <el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
                            <el-table-column prop="desc" label="备注" align="center"></el-table-column>
                            <el-table-column fixed="right" label="权限" width="180" align="center">
                                <template slot-scope="scope">
                                    <el-button
                                        @click="bindRoleFunc(scope.row)"
                                        type="text"
                                        size="small"
                                    >绑定权限</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="部门" width="180" align="center">
                                <template slot-scope="scope">
                                    <el-button
                                        @click="bindRoleDep(scope.row)"
                                        type="text"
                                        size="small"
                                    >绑定部门</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="项目" width="180" align="center">
                                <template slot-scope="scope">
                                    <el-button
                                        @click="bindRoleProj(scope.row)"
                                        type="text"
                                        size="small"
                                    >绑定项目</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="180" align="center">
                                <template slot-scope="scope">
                                    <el-button
                                        type="primary"
                                        icon="el-icon-edit"
                                        circle
                                        plain
                                        @click="handleEdit(scope.row)"
                                        size="small"
                                    ></el-button>
                                    <el-button
                                        type="danger"
                                        icon="el-icon-delete"
                                        circle
                                        plain
                                        @click="handleDelete(scope.row)"
                                        size="small"
                                    ></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pagination">
                            <el-pagination
                                background
                                @current-change="handleCurrentChange"
                                layout="prev, pager, next"
                                :total="total"
                                :page-size="pageSize"
                                :current-page="currPage"
                                style="text-align: center;margin-top: 10px;"
                            ></el-pagination>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>

        <el-dialog title="新增/编辑部门信息" :visible.sync="editVisible" width="30%" center>
            <el-form :model="form" label-width="80px" style="padding: 0 20px 0 10px">
                <el-form-item label="公司名称">
                    <el-input v-model="form.name" @keyup.native="noPlace" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="上级部门">
                    <el-select v-model="form.pid" style="width: 100%">
                        <el-option
                            v-for="(item, index) in parentDeps"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="查看部门信息" :visible.sync="checkVisible" center width="35%">
            <el-form :model="form" label-width="80px" style="padding: 0 20px 0 10px">
                <el-form-item label="部门名称">
                    <el-input v-model="form.name" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="创建人">
                    <el-input v-model="form.createUsername" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="上级部门">
                    <el-select v-model="form.pid" :disabled="true">
                        <el-option
                            v-for="(item, index) in parentDeps"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="创建日期">
                    <el-date-picker
                        type="date"
                        :disabled="true"
                        placeholder="选择日期"
                        v-model="form.createTime"
                        value-format="yyyy-MM-dd"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.desc" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="新增/编辑岗位信息" :visible.sync="editVisibleP" width="30%" center>
            <el-form :model="formP" label-width="80px" style="padding: 0 20px 0 10px">
                <el-form-item label="岗位名称">
                    <el-input v-model="formP.name" @keyup.native="noPlaceP" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="所属部门">
                    <el-select v-model="formP.departmentId" style="width: 100%">
                        <el-option
                            v-for="(item, index) in parentDepP"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="formP.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisibleP = false">取 消</el-button>
                <el-button type="primary" @click="saveEditP">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="查看岗位信息" :visible.sync="checkVisibleP" center width="35%">
            <el-form :model="formP" label-width="80px" style="padding: 0 20px 0 10px">
                <el-form-item label="岗位名称">
                    <el-input v-model="formP.name" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="所属部门">
                    <el-select v-model="formP.departmentId" :disabled="true">
                        <el-option
                            v-for="(item, index) in parentDepP"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="创建人">
                    <el-input v-model="formP.createUsername" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="创建日期">
                    <el-date-picker
                        type="date"
                        :disabled="true"
                        placeholder="选择日期"
                        v-model="formP.createTime"
                        value-format="yyyy-MM-dd"
                        style="width: 100%;"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="formP.desc" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="新增/编辑用户信息" :visible.sync="editVisibleU" width="30%" center>
            <el-form :model="formU" label-width="80px" style="padding: 0 20px 0 10px">
                <el-form-item label="用户名称">
                    <el-input v-model="formU.username" @keyup.native="noPlaceU" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" v-if="passwordCan">
                    <el-input v-model="formU.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="真实姓名">
                    <el-input v-model="formU.nickname" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="性别">
                    <el-radio v-model="formU.sex" label="男">男</el-radio>
                    <el-radio v-model="formU.sex" label="女">女</el-radio>
                </el-form-item>

                <el-form-item label="手机">
                    <el-input
                        v-model="formU.phone"
                        autocomplete="off"
                        @keyup.native="proving"
                        maxlength="11"
                    ></el-input>
                </el-form-item>

                <el-form-item label="邮箱">
                    <!-- <el-input v-model="formU.email" autocomplete="off" @keyup.native="proving1"></el-input> -->
                    <el-input v-model="formU.email" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="所属部门">
                    <el-select v-model="formU.theirDepartmentId" @change="checkPosts" style="width: 100%">
                        <el-option
                            v-for="(item, index) in parentDepP"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="所属岗位">
                    <el-select v-model="formU.stationId" style="width: 100%">
                        <el-option
                            v-for="(item, index) in posts1"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input type="textarea" v-model="formU.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisibleU = false">取 消</el-button>
                <el-button type="primary" @click="saveEditU">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="查看用户信息" :visible.sync="checkVisibleU" center width="35%">
            <el-form :model="formU" label-width="80px" style="padding: 0 20px 0 10px">
                <el-form-item label="用户名称">
                    <el-input v-model="formU.username" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="真实姓名">
                    <el-input v-model="formU.nickname" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="性别">
                    <el-radio v-model="formU.sex" label="男" :disabled="true">男</el-radio>
                    <el-radio v-model="formU.sex" label="女" :disabled="true">女</el-radio>
                </el-form-item>

                <el-form-item label="手机">
                    <el-input
                        v-model="formU.phone"
                        autocomplete="off"
                        maxlength="11"
                        :disabled="true"
                    ></el-input>
                </el-form-item>

                <el-form-item label="邮箱">
                    <el-input v-model="formU.email" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="所属部门">
                    <el-select
                        v-model="formU.theirDepartmentId"
                        :on-change="checkPosts"
                        :disabled="true"
                    >
                        <el-option
                            v-for="(item, index) in parentDepP"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="所属岗位">
                    <el-select v-model="formU.stationId" :disabled="true">
                        <el-option
                            v-for="(item, index) in posts1"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="创建人">
                    <el-input v-model="formU.createUsername" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="创建日期">
                    <el-date-picker
                        type="date"
                        :disabled="true"
                        placeholder="选择日期"
                        v-model="formU.createTime"
                        value-format="yyyy-MM-dd"
                        style="width: 100%;"
                    ></el-date-picker>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input type="textarea" v-model="formU.remark" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="绑定角色" :visible.sync="bindU" center width="40%">
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <p>请选择角色所在的公司对角色进行查询：</p>
                        <el-tree :data="geTree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div>
                        <p v-if="chooseDepart">{{chooseDepart}}下的角色：</p>
                        <div v-if="chooseDepart&&chooseRoles.length!=0">
                            <el-checkbox-group v-model="checkRoles">
                                <el-checkbox
                                    v-for="(item, index) in chooseRoles"
                                    :label="item.id"
                                    name="type"
                                    :key="index"
                                >{{item.name}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                        <div v-else-if="chooseDepart&&chooseRoles.length==0">
                            <p style="margin-top:10px;">暂无角色，去创建</p>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="bindU = false">取 消</el-button>
                <el-button type="primary" @click="saveBindU">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="绑定菜单" :visible.sync="bindF" center width="40%">
            <div class="grid-content bg-purple">
                <el-tree
                    :data="geTreeFuncs"
                    ref="tree"
                    :props="defaultProps"
                    show-checkbox
                    node-key="id"
                    :default-checked-keys="chooseMenuIds"
                ></el-tree>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelBindM">取 消</el-button>
                <el-button type="primary" @click="saveBindM">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="绑定部门" :visible.sync="bindD" center width="40%">
            <el-tree
                :data="geTree"
                ref="treeD"
                :props="defaultProps"
                show-checkbox
                node-key="id"
                :default-checked-keys="chooseDeptIds"
                @check-change="handleCheckChangeD"
            ></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="bindD = false">取 消</el-button>
                <el-button type="primary" @click="saveBindD">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="绑定项目" :visible.sync="bindP" center width="40%">
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple">
                        <p>请选择角色所要绑定的项目：</p>
                        <el-checkbox-group v-model="checkedProjects">
                            <el-checkbox
                                v-for="(item, index) in allProjects"
                                :label="item.id"
                                :key="index"
                            >{{item.name}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="bindP = false">取 消</el-button>
                <el-button type="primary" @click="saveBindP">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="新增/编辑角色信息" :visible.sync="editVisibleR" width="30%" center>
            <el-form :model="formU" label-width="80px" style="padding: 0 20px 0 10px">
                <el-form-item label="角色名称">
                    <el-input v-model="formR.name" @keyup.native="noPlaceR" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="所属部门">
                    <el-select v-model="formR.theirDepartmentId" style="width: 100%">
                        <el-option
                            v-for="(item, index) in parentDepP"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input type="textarea" v-model="formR.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisibleR = false">取 消</el-button>
                <el-button type="primary" @click="saveEditR">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="查看角色信息" :visible.sync="checkVisibleR" center width="35%">
            <el-form :model="formR" label-width="80px" style="padding: 0 20px 0 10px">
                <el-form-item label="角色名称">
                    <el-input v-model="formR.name" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="所属部门">
                    <el-select v-model="formR.theirDepartmentId" :disabled="true">
                        <el-option
                            v-for="(item, index) in parentDepP"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="创建人">
                    <el-input v-model="formR.createUsername" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="创建日期">
                    <el-date-picker
                        type="date"
                        :disabled="true"
                        placeholder="选择日期"
                        v-model="formR.createTime"
                        value-format="yyyy-MM-dd"
                        style="width: 100%;"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="formR.desc" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="400px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="强制删除部门" :visible.sync="remind" width="50%" center>
            <div class="del-dialog-cnt" style="margin-bottom:20px">该部门下关联了以下子公司，岗位，用户，角色，是否确定删除该角色？</div>
            <el-table :data="remindDep" stripe style="width: 100%" max-height="250" border>
                <el-table-column prop="id" label="部门ID"></el-table-column>
                <el-table-column prop="name" label="部门名称"></el-table-column>
                <el-table-column prop="createUsername" label="创建人"></el-table-column>
                <el-table-column prop="createTime" label="创建日期"></el-table-column>
                <el-table-column prop="desc" label="备注"></el-table-column>
            </el-table>
            <el-table
                :data="remindPost"
                stripe
                style="width: 100%;margin-top:20px;"
                max-height="250"
                border
            >
                <el-table-column prop="id" label="岗位ID"></el-table-column>
                <el-table-column prop="name" label="岗位名称"></el-table-column>
                <el-table-column prop="createUsername" label="创建人"></el-table-column>
                <el-table-column prop="createTime" label="创建日期"></el-table-column>
                <el-table-column prop="phone" label="手机"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
            </el-table>
            <el-table
                :data="remindUsers"
                stripe
                style="width: 100%;margin-top:20px;"
                max-height="250"
                border
            >
                <el-table-column prop="id" label="用户ID"></el-table-column>
                <el-table-column prop="username" label="用户名称"></el-table-column>
                <el-table-column prop="nickname" label="真实姓名"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="phone" label="手机"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
            </el-table>
            <el-table
                :data="remindRoles"
                stripe
                style="width: 100%;margin-top:20px;"
                max-height="250"
                border
            >
                <el-table-column prop="id" label="角色ID"></el-table-column>
                <el-table-column prop="name" label="角色名称"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="createUsername" label="创建人"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="remind = false">取 消</el-button>
                <el-button type="primary" @click="yesdeleteDep">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="强制删除角色" :visible.sync="yesdelVisible" width="50%" center>
            <div class="del-dialog-cnt" style="margin-bottom:20px">该角色下关联了以下用户，是否确定删除该角色？</div>
            <el-table :data="deleBindUsers" stripe style="width: 100%" border>
                <el-table-column prop="id" label="用户ID"></el-table-column>
                <el-table-column prop="username" label="用户名称"></el-table-column>
                <el-table-column prop="nickname" label="真实姓名"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="phone" label="手机"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="yesdelVisible = false">取 消</el-button>
                <el-button type="primary" @click="yesdeleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
//   import $ from "jquery";

//   import echarts from "echarts/lib/echarts";
//   import "echarts/lib/chart/map";
//   import "echarts/map/js/china.js";

export default {
    name: "checkProject",
    data() {
        return {
            message: "first",
            editVisible: false, //编辑弹窗是否打开-部门
            checkVisible: false, //查看弹窗是否打开-部门
            delVisible: false, //是否删除弹窗打开
            remind: false, //强制删除弹窗打开
            remindDep: [], //部门绑定的子公司列表
            remindPost: [], //部门绑定岗位列表
            remindUsers: [], //部门绑定的用户列表
            remindRoles: [], //部门绑定的角色列表
            yesdelVisible: false,
            editVisibleP: false, //编辑弹窗是否打开-岗位
            checkVisibleP: false, //查看弹窗是否打开-岗位
            editVisibleU: false, //编辑弹窗是否打开-用户
            checkVisibleU: false, //查看弹窗是否打开-用户
            bindU: false, //用户绑定角色弹窗是否打开
            bindF: false,
            bindD: false,
            bindP: false,
            passwordCan: false, //设置用户密码输入框是否显示
            editVisibleR: false, //编辑弹窗是否打开-角色
            checkVisibleR: false, //查看弹窗是否打开-角色
            currPage: 1,
            pageSize: 10,
            total: 0,
            pageDanger: false, //当前页是否只剩一条数据
            searchYes: false,
            tab: "first",
            departmentList: [],
            department: [],
            checkPostsId: "",
            parentDeps: [
                {
                    name: "根目录",
                    id: -1
                }
            ],
            parentDepP: [],
            posts: [],
            posts1: [],
            users: [],
            editUserBefore: {
                username: "",
                phone: "",
                email: ""
            },
            roles: [],
            searchDepKey: "", //部门筛选条件字段
            searchDepVelue: "", //部门筛选条件模糊内容
            searchObj: {}, //要筛选的集中
            form: {
                //部门
                id: "",
                name: "",
                desc: "",
                pid: "",
                theirDepartmentId: "",
                createTime: "",
                createUsername: ""
            },
            nameBefore: "", //修改部门原来的名字
            namePBefore: "", //修改岗位原来的名字
            searchPostKey: "", //岗位筛选条件字段
            searchPostVelue: "", //岗位筛选条件模糊内容
            searchObjP: {}, //要筛选的集中
            formP: {
                //岗位
                id: "",
                name: "",
                desc: "",
                departmentId: "",
                theirDepartmentId: "",
                createTime: "",
                createUsername: ""
            },
            searchUserKey: "", //用户筛选条件字段
            searchUserValue: "", //用户筛选条件模糊内容
            searchObjU: {}, //要筛选的集中
            formU: {
                //用户
                id: "",
                username: "",
                password: "",
                nickname: "",
                sex: "",
                phone: "",
                email: "",
                theirDepartmentId: "",
                stationId: "",
                createTime: "",
                createUsername: "",
                remark: ""
            },
            searchRoleKey: "", //角色筛选条件字段
            searchRoleValue: "", //角色筛选条件模糊内容
            searchObjR: {}, //要筛选的集中
            formR: {
                //角色
                id: "",
                name: "",
                theirDepartmentId: "",
                createTime: "",
                createUsername: "",
                desc: ""
            },
            deleBindUsers: [], //强制解绑的角色关联的用户
            geTree: [], //获取公司组织架构得树形
            defaultProps: {
                children: "children",
                label: "label"
            },
            chooseRoles: [], //用户绑定角色-选中部门下的角色列表
            chooseDepart: "", //用户绑定角色-选择角色所在的部门
            checkRoles: [], //用户绑定角色中被选中的角色id集合-展示用
            bindUserId: "", //绑定角色的当前用户的id
            bindRoles: [], //修改后的用户绑定角色信息-保存用

            geTreeFuncs: [], //获取所有菜单权限的树形
            chooseMenuIds: [], //已选择的所有菜单id的集合-展示用
            bindthisRoleId: "", //当前角色的id
            bindMenus: [], //角色绑定的菜单-保存用
            chooseDeptIds: [], //已选择的所有部门的id集合-展示用
            bindDeparts: [], //角色绑定的部门-保存用

            allProjects: [], //所有项目集合
            checkedProjects: [], //选中的项目的id集合-展示用
            bindProjects: [], //角色绑定的项目合集
            bindProjects: [], //角色绑定项目-保存用
            checkAll: false, //是否全选项目
            isIndeterminate: true
        };
    },
    created() {
        this.geTree = [];
        this.geTreeFuncs = [];
        this.department = [];
        setTimeout(() => {
            this.getData();
            this.getTree();
        }, 500);
    },
    methods: {
        returnBtn() {
            this.$router.go(-1)
        },
        indexed(index) {
            return index + (this.currPage - 1) * 10 + 1;
        },
        proving() {
            //手机号输入限制
            this.formU.phone = this.formU.phone.replace(/[^\.\d]/g, "");
            this.formU.phone = this.formU.phone.replace(".", "");
        },

        noPlace() {
            //限制空格的输入
            this.form.name = this.form.name.replace(/(^\s*)|(\s*$)/g, "");
        },
        noPlaceP() {
            //限制空格的输入
            this.formP.name = this.formP.name.replace(/(^\s*)|(\s*$)/g, "");
        },
        noPlaceU() {
            //限制空格的输入
            this.formU.username = this.formU.username.replace(
                /(^\s*)|(\s*$)/g,
                ""
            );
        },
        noPlaceR() {
            //限制空格的输入
            this.formR.name = this.formR.name.replace(/(^\s*)|(\s*$)/g, "");
        },
        quiteUser(row) {
            //强制退出
            $axios({
                url: "bjupm/users/autoQuit",
                method: "post",
                data: { username: row.username }
            })
                .then(res => {
                    if (res.code == 200) {
                        this.$message.success(`操作成功`);
                        this.getWhatU();
                    } else {
                        this.$message.error(`操作失败`);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        tagChange(tab, event) {
            //tab切换事件
            this.currPage = 1;
            this.total = 0;
            if (tab.name == "first") {
                this.tab = "first";
                this.getData();
                this.getTree();
            } else if (tab.name == "second") {
                this.getPost();
                this.getTree();
                this.tab = "second";
            } else if (tab.name == "third") {
                this.getUsers();
                this.getTree();
                this.tab = "third";
            } else {
                this.getRoles();
                this.getTree();
                this.getProjects();
                this.getMenus();
                this.tab = "forth";
            }
        },
        // 分页导航
        handleCurrentChange(val) {
            this.currPage = val;
            if (this.tab == "first") {
                if (this.searchYes == false) {
                    this.searchDepKey = "";
                    this.searchDepVelue = "";
                } else {
                }
                this.getData();
            } else if (this.tab == "second") {
                if (this.searchYes == false) {
                    this.searchPostKey = "";
                    this.searchPostVelue = "";
                } else {
                }
                this.getPost();
            } else if (this.tab == "third") {
                if (this.searchYes == false) {
                    this.searchUserKey = "";
                    this.searchUserValue = "";
                } else {
                }
                this.getUsers();
            } else {
                if (this.searchYes == false) {
                    this.searchRoleKey = "";
                    this.searchRoleValue = "";
                } else {
                }
                this.getRoles();
            }
        },
        getWhat() {
            //判断加载还是查询
            if (this.searchYes == false) {
                this.getData();
            } else {
                this.currPage = 1;
                this.getData1();
            }
        },
        getWhatP() {
            //判断加载还是查询
            if (this.searchYes == false) {
                this.getPost();
            } else {
                this.currPage = 1;
                this.getPost1();
            }
        },
        getWhatU() {
            //判断加载还是查询
            if (this.searchYes == false) {
                this.getUsers();
            } else {
                this.currPage = 1;
                this.getUsers1();
            }
        },
        getWhatR() {
            //判断加载还是查询
            if (this.searchYes == false) {
                this.getRoles();
            } else {
                this.currPage = 1;
                this.getRoles1();
            }
        },
        getData() {
            //获取部门的数据
            this.searchYes = false;
            var currPage = this.currPage - 1;
            this.searchObj = {};
            var key = this.searchDepKey;
            var obj = this.searchObj;
            obj[key] = this.searchDepVelue;
            $axios({
                url: `bjupm/department/findAll?pageNumber=${currPage}&pageSize=${this.pageSize}`,
                method: "post",
                data: this.searchObj
            })
                .then(res => {
                    if (res.code == 200) {
                        var list = res.data.rows;
                        this.department = list;
                        this.total = res.data.total;
                        if (res.data.rows.length == 1) {
                            this.pageDanger = true;
                        } else {
                            this.pageDanger = false;
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getData1() {
            //获取部门的数据
            this.searchYes = true;
            var currPage = this.currPage - 1;
            this.searchObj = {};
            var key = this.searchDepKey;
            var obj = this.searchObj;
            obj[key] = this.searchDepVelue;
            $axios({
                url: `bjupm/department/findAll?pageNumber=${currPage}&pageSize=${this.pageSize}`,
                method: "post",
                data: this.searchObj
            })
                .then(res => {
                    if (res.code == 200) {
                        var list = res.data.rows;
                        this.department = list;
                        this.total = res.data.total;
                        if (res.data.rows.length == 1) {
                            this.pageDanger = true;
                        } else {
                            this.pageDanger = false;
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.currPage = 1;
        },
        getTree() {
            //获取所有的公司的树形结构
            this.geTree = [];
            this.parentDeps = [{ name: "根目录", id: -1 }];
            $axios({
                url: "bjupm/department/findAll",
                method: "post",
                data: this.searchObj
            })
                .then(res => {
                    if (res.code == 200) {
                        var list = res.data.rows;
                        this.parentDeps = this.parentDeps.concat(list);
                        this.parentDepP = list;
                        for (var i = 0; i < list.length; i++) {
                            var obj = {
                                id: list[i].id,
                                pid: list[i].pid,
                                label: list[i].name,
                                children: []
                            };
                            this.geTree.push(obj);
                        }
                        this.filterArray(this.geTree, -1);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        searchDep() {
            //部门的模糊查询
            if (this.searchDepKey == "") {
                this.$message.warning(`查询条件不能为空！`);
                this.getData();
            } else {
                this.currPage = 1;
                this.getData1();
            }
        },
        filterArray(data, pid) {
            //递归，将数组变为树形结构
            let tree = [];
            let temp;
            for (let i = 0; i < data.length; i++) {
                if (data[i].pid === pid) {
                    let obj = data[i];
                    temp = this.filterArray(data, data[i].id);
                    if (temp.length > 0) {
                        obj.children = temp;
                    }
                    tree.push(obj);
                }
            }
            let th = false;
            for (let j = 0; j < data.length; j++) {
                for (let k = 0; k < data.length; k++) {
                    if (data[j].pid === data[k].id) {
                        th = true;
                        break;
                    }
                }
            }
            if (!th) {
                let obj = data[i];
                temp = this.filterArray(data, data[i].id);
                if (temp.length > 0) {
                    obj.children = temp;
                }
                tree.push(obj);
            }
            this.geTree = tree;
            return tree;
        },
        getPost() {
            //获取岗位的数据
            this.searchYes = false;
            var currPage = this.currPage - 1;
            this.searchObjP = {};
            var key = this.searchPostKey;
            var obj = this.searchObjP;
            obj[key] = this.searchPostVelue;
            $axios({
                url: `bjupm/post/findAll?pageNumber=${currPage}&pageSize=${this.pageSize}`,
                method: "post",
                data: this.searchObjP
            })
                .then(res => {
                    if (res.code === 200) {
                        this.posts = res.data.rows;
                        this.total = res.data.total;
                        if (res.data.rows.length == 1) {
                            this.pageDanger = true;
                        } else {
                            this.pageDanger = false;
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getPost1() {
            //获取岗位的数据
            this.searchYes = true;
            var currPage = this.currPage - 1;
            this.searchObjP = {};
            var key = this.searchPostKey;
            var obj = this.searchObjP;
            obj[key] = this.searchPostVelue;
            $axios({
                url: `bjupm/post/findAll?pageNumber=${currPage}&pageSize=${this.pageSize}`,
                method: "post",
                data: this.searchObjP
            })
                .then(res => {
                    if (res.code === 200) {
                        this.posts = res.data.rows;
                        this.total = res.data.total;
                        if (res.data.rows.length == 1) {
                            this.pageDanger = true;
                        } else {
                            this.pageDanger = false;
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.currPage = 1;
        },
        searchPost() {
            //部门的模糊查询
            if (this.searchPostKey == "") {
                this.$message.warning(`查询条件不能为空！`);

                this.getPost();
            } else {
                this.currPage = 1;
                this.getPost1();
            }
        },
        getUsers() {
            //获取用户的数据
            this.searchYes = false;
            var currPage = this.currPage - 1;
            this.searchObjU = {};
            var key = this.searchUserKey;
            var obj = this.searchObjU;
            obj[key] = this.searchUserValue;
            $axios({
                url: `bjupm/users/findAll?pageNumber=${currPage}&pageSize=${this.pageSize}`,
                method: "post",
                data: this.searchObjU
            })
                .then(res => {
                    if (res.code == 200) {
                        this.users = res.data.rows;
                        this.total = res.data.total;
                        if (res.data.rows.length == 1) {
                            this.pageDanger = true;
                        } else {
                            this.pageDanger = false;
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getUsers1() {
            //获取用户的数据
            this.searchYes = true;
            this.searchObjU = {};
            var key = this.searchUserKey;
            var obj = this.searchObjU;
            obj[key] = this.searchUserValue;
            var currPage = this.currPage - 1;
            $axios({
                url: `bjupm/users/findAll?pageNumber=${currPage}&pageSize=${this.pageSize}`,
                method: "post",
                data: this.searchObjU
            })
                .then(res => {
                    if (res.code == 200) {
                        this.users = res.data.rows;
                        this.total = res.data.total;
                        if (res.data.rows.length == 1) {
                            this.pageDanger = true;
                        } else {
                            this.pageDanger = false;
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.currPage = 1;
        },
        searchUser() {
            //人员的模糊查询
            if (this.searchUserKey == "") {
                this.$message.warning(`查询条件不能为空！`);
                this.getUsers();
            } else {
                this.currPage = 1;
                this.getUsers1();
            }
        },
        checkPosts() {
            //根据部门筛选岗位
            this.formU.stationId = "";
            $axios({
                url: "bjupm/post/findAll",
                method: "post",
                data: { departmentId: this.formU.theirDepartmentId }
            })
                .then(res => {
                    if (res.status === 200) {
                        this.posts1 = res.data.rows;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getRoles() {
            //获取角色的数据
            this.searchYes = false;
            var currPage = this.currPage - 1;
            this.searchObjR = {};
            var key = this.searchRoleKey;
            var obj = this.searchObjR;
            obj[key] = this.searchRoleValue;
            $axios({
                url: `bjupm/role/findAll?pageNumber=${currPage}&pageSize=${this.pageSize}`,
                method: "post",
                data: this.searchObjR
            })
                .then(res => {
                    if (res.code == 200) {
                        this.roles = res.data.rows;
                        this.total = res.data.total;
                        if (res.data.rows.length == 1) {
                            this.pageDanger = true;
                        } else {
                            this.pageDanger = false;
                        }
                    }
                })
                .catch(err => {
                    cosole.log(err);
                });
        },
        getRoles1() {
            //获取角色的数据
            this.searchYes = true;
            var currPage = this.currPage - 1;
            this.searchObjR = {};
            var key = this.searchRoleKey;
            var obj = this.searchObjR;
            obj[key] = this.searchRoleValue;
            $axios({
                url: `bjupm/role/findAll?pageNumber=${currPage}&pageSize=${this.pageSize}`,
                method: "post",
                data: this.searchObjR
            })
                .then(res => {
                    if (res.code == 200) {
                        this.roles = res.data.rows;
                        this.total = res.data.total;
                        if (res.data.rows.length == 1) {
                            this.pageDanger = true;
                        } else {
                            this.pageDanger = false;
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.currPage = 1;
        },
        searchRole() {
            //角色的模糊查询
            if (this.searchRoleKey == "") {
                this.$message.warning(`查询条件不能为空！`);
                this.getRoles();
            } else {
                this.currPage = 1;
                this.getRoles1();
            }
        },

        handleClick(row) {
            //查看单行
            if (this.tab == "first") {
                //-部门
                this.form.id = row.id;
                this.form.name = row.name;
                this.form.pid = row.pid;
                this.form.desc = row.desc;
                this.form.createTime = row.createTime;
                this.form.createUsername = row.createUsername;
                this.checkVisible = true;
            } else if (this.tab == "second") {
                //岗位
                this.formP.id = row.id;
                this.formP.name = row.name;
                this.formP.departmentId = row.departmentId;
                this.formP.desc = row.desc;
                this.formP.createTime = row.createTime;
                this.formP.createUsername = row.createUsername;
                this.checkVisibleP = true;
            } else if (this.tab == "third") {
                //用户
                this.formU.id = row.id;
                this.formU.username = row.username;
                this.formU.nickname = row.nickname;
                this.formU.sex = row.sex;
                this.formU.phone = row.phone;
                this.formU.email = row.email;
                this.formU.theirDepartmentId = row.theirDepartmentId;
                $axios({
                    url: "bjupm/post/findAll",
                    method: "post",
                    data: { departmentId: row.theirDepartmentId }
                })
                    .then(res => {
                        if (res.status === 200) {
                            this.posts1 = res.data.rows;
                            if (row.stationId == 0) {
                                this.formU.stationId = "";
                            } else {
                                this.formU.stationId = row.stationId;
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
                this.formU.desc = row.desc;
                this.formU.createTime = row.createTime;
                this.formU.createUsername = row.createUsername;
                this.formU.remark = row.remark;
                this.checkVisibleU = true;
            } else {
                //角色
                this.formR.id = row.id;
                this.formR.name = row.name;
                this.formR.theirDepartmentId = row.theirDepartmentId;
                this.formR.desc = row.desc;
                this.formR.createTime = row.createTime;
                this.formR.createUsername = row.createUsername;
                this.checkVisibleR = true;
            }
        },
        handleEdit(row) {
            //打开编辑弹窗
            if (this.tab == "first") {
                //-部门
                if (!row.id) {
                    //新增
                    this.form.id = "";
                    this.form.pid = "";
                    this.form.theirDepartmentId = "";
                    this.form.name = "";
                    this.nameBefore = "";
                    this.form.desc = "";
                    this.form.createUsername = "";
                } else {
                    //编辑
                    this.form.id = row.id;
                    this.form.pid = row.pid;
                    this.form.theirDepartmentId = row.pid;
                    this.form.name = row.name;
                    this.nameBefore = row.name;
                    this.form.desc = row.desc;
                    this.form.createUsername = row.createUsername;
                }
                this.editVisible = true;
            } else if (this.tab == "second") {
                //岗位
                if (!row.id) {
                    //新增
                    this.formP.id = "";
                    this.formP.departmentId = "";
                    this.formP.theirDepartmentId = "";
                    this.formP.name = "";
                    this.namePBefore = "";
                    this.formP.desc = "";
                    this.formP.createUsername = "";
                } else {
                    //编辑
                    this.formP.id = row.id;
                    this.formP.departmentId = row.departmentId;
                    this.formP.theirDepartmentId = row.departmentId;
                    this.formP.name = row.name;
                    this.namePBefore = row.name;
                    this.formP.desc = row.desc;
                    this.formP.createUsername = row.createUsername;
                }
                this.editVisibleP = true;
            } else if (this.tab == "third") {
                //用户
                this.posts = [];
                if (!row.id) {
                    //新增
                    this.passwordCan = true;
                    this.formU.id = "";
                    this.formU.username = "";
                    this.formU.password = "123456";
                    this.formU.nickname = "";
                    this.formU.sex = "";
                    this.formU.phone = "";
                    this.formU.email = "";
                    this.formU.theirDepartmentId = "";
                    this.formU.stationId = "";
                    this.formU.remark = "";
                    this.formU.createUsername = "";
                    this.editVisibleU = true;
                } else {
                    //编辑
                    this.passwordCan = false;
                    this.formU.id = row.id;
                    this.formU.username = row.username;
                    this.editUserBefore.username = row.username;
                    this.formU.password = row.password;
                    this.formU.nickname = row.nickname;
                    this.formU.sex = row.sex;
                    this.formU.phone = row.phone;
                    this.editUserBefore.phone = row.phone;
                    this.formU.email = row.email;
                    this.editUserBefore.email = row.email;
                    this.formU.theirDepartmentId = row.theirDepartmentId;
                    this.formU.createUsername = row.createUsername;
                    $axios({
                        url: "bjupm/post/findAll",
                        method: "post",
                        data: { departmentId: row.theirDepartmentId }
                    })
                        .then(res => {
                            if (res.code == 200) {
                                this.posts1 = res.data.rows;
                            }
                            if (row.stationId == 0) {
                                this.formU.stationId = "";
                            } else {
                                this.formU.stationId = row.stationId;
                            }
                            this.editVisibleU = true;
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    this.formU.remark = row.remark;
                }
            } else {
                if (!row.id) {
                    //新增
                    this.formR.id = "";
                    this.formR.name = "";
                    this.formR.desc = "";
                    this.formR.theirDepartmentId = "";
                    this.formR.createUsername = "";
                } else {
                    //修改
                    this.formR.id = row.id;
                    this.formR.name = row.name;
                    this.formR.desc = row.desc;
                    this.formR.theirDepartmentId = row.theirDepartmentId;
                    this.formR.createUsername = row.createUsername;
                }
                this.editVisibleR = true;
            }
        },
        checkDepartName() {
            //检查部门名是否重复
            if (this.nameBefore == this.form.name) {
                //修改时并没有修改名称就不必做重复判断
                this.saveDep();
            } else {
                $axios({
                    url: `bjupm/checked/departmentName?departmentName=${this.form.name}`,
                    method: "post",
                    data: {}
                })
                    .then(res => {
                        if (res.data == false) {
                            this.$message.warning(`该部门已经存在！`);
                            this.form.name = "";
                        } else {
                            this.saveDep();
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        // 判断编辑数据-部门
        saveEdit() {
            this.form.theirDepartmentId = this.form.pid;
            if (this.form.name == "" || this.form.name == null) {
                this.$message.warning(`您还未输入部门名称！`);
            } else {
                this.checkDepartName();
            }
        },
        saveDep() {
            //保存编辑数据
            var editId = this.form.id;
            if (
                this.form.theirDepartmentId == "" ||
                this.form.theirDepartmentId == null
            ) {
                this.$message.warning(`您还未选择上级部门！`);
            } else {
                if (editId == null || editId == "") {
                    //新增
                    $axios({
                        url: "bjupm/department/save",
                        method: "post",
                        data: this.form
                    })
                        .then(res => {
                            if (res.code == 200) {
                                this.$message.success(`操作成功`);
                                this.getWhat();
                            } else {
                                this.$message.error(`操作失败`);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    this.editVisible = false;
                } else {
                    //修改
                    if (this.form.theirDepartmentId == editId) {
                        this.$message.warning(`上级部门不能和该部门重复！`);
                    } else {
                        $axios({
                            url: "bjupm/department/update",
                            method: "post",
                            data: this.form
                        })
                            .then(res => {
                                if (res.code == 200) {
                                    this.$message.success(`操作成功`);
                                    this.getWhat();
                                } else {
                                    this.$message.error(`操作失败`);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                        this.editVisible = false;
                    }
                }
            }
        },
        checkPostName() {
            //检查岗位名称是否重复
            if (this.namePBefore == this.formP.name) {
                //修改时并没有修改名称就不必做重复判断
                this.savePost();
            } else {
                $axios({
                    url: `bjupm/checked/postName?postName='${this.formP.name}`,
                    method: "post",
                    data: {}
                })
                    .then(res => {
                        if (res.data == false) {
                            this.$message.warning(`该岗位已经存在！`);
                            this.formP.name = "";
                        } else {
                            this.savePost();
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        // 保存编辑-岗位
        saveEditP() {
            this.formP.theirDepartmentId = this.formP.departmentId;
            if (this.formP.name == "" || this.formP.name == null) {
                this.$message.warning(`您还未输入岗位名称！`);
            } else {
                this.checkPostName();
            }
        },
        savePost() {
            var editId = this.formP.id;
            if (editId == null || editId == "") {
                //新增
                $axios({
                    url: "bjupm/post/save",
                    method: "post",
                    data: this.formP
                })
                    .then(res => {
                        if (res.code == 200) {
                            this.$message.success(`操作成功`);
                            this.getWhatP();
                        } else {
                            this.$message.error(`操作失败`);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                //修改
                $axios({
                    url: "bjupm/post/update",
                    method: "post",
                    data: this.formP
                })
                    .then(res => {
                        if (res.code == 200) {
                            this.$message.success(`操作成功`);
                            this.getWhatP();
                        } else {
                            this.$message.error(`操作失败`);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            this.editVisibleP = false;
            this.getWhatP();
        },
        addUser() {
            //新增用户
            if (this.formU.username == "" || this.formU.username == null) {
                this.$message.warning(`用户名不能为空！`);
            } else {
                $axios({
                    url: `bjupm/checked/username?username=${this.formU.username}`,
                    method: "post",
                    data: {}
                })
                    .then(res => {
                        // if (res.code === 200) {
                        if (res == false) {
                            this.$message.warning(`用户名已经被占用！`);
                            this.formU.username = "";
                        } else {
                            if (
                                this.formU.password == "" ||
                                this.formU.password == null
                            ) {
                                this.$message.warning(`密码不能为空！`);
                            } else {
                                if (
                                    this.formU.phone == "" ||
                                    this.formU.phone == null
                                ) {
                                    this.$message.warning(`手机号码不能为空！`);
                                } else {
                                    $axios({
                                        url: `bjupm/checked/phone?phone=${this.formU.phone}`,
                                        method: "post",
                                        data: {}
                                    })
                                        .then(res => {
                                            // if (res.status === 200) {
                                                if (res == false) {
                                                    this.$message.warning(
                                                        `手机号已经被占用！`
                                                    );
                                                    this.formU.phone = "";
                                                } else {
                                                    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                                                    if (
                                                        this.formU.email ==
                                                            "" ||
                                                        this.formU.email ==
                                                            null ||
                                                        !myreg.test(
                                                            this.formU.email
                                                        )
                                                    ) {
                                                        this.$message.warning(
                                                            `请输入正确的邮箱地址！`
                                                        );
                                                    } else {
                                                        $axios({
                                                            url: `bjupm/checked/email?email=${this.formU.email}`,
                                                            method: "post",
                                                            data: {}
                                                        })
                                                            .then(res => {
                                                                // if (res.status === 200) {
                                                                    if (res == false) {
                                                                        this.$message.warning(
                                                                            `邮箱已经被占用！`
                                                                        );
                                                                        this.formU.email = "";
                                                                    } else {
                                                                        $axios({
                                                                            url:
                                                                                "bjupm/users/signup",
                                                                            method:
                                                                                "post",
                                                                            data: this
                                                                                .formU
                                                                        })
                                                                            .then(
                                                                                res => {
                                                                                    if (res.code == 200 ) {
                                                                                        this.$message.success(
                                                                                            `操作成功`
                                                                                        );
                                                                                        this.getWhatU();
                                                                                    } else {
                                                                                        this.$message.error(
                                                                                            `操作失败`
                                                                                        );
                                                                                    }
                                                                                }
                                                                            )
                                                                            .catch(
                                                                                err => {
                                                                                    console.log(err)
                                                                                }
                                                                            );
                                                                        this.editVisibleU = false;
                                                                    }
                                                                // }
                                                            })
                                                            .catch(err => {
                                                                console.log(
                                                                    err
                                                                );
                                                            });
                                                    }
                                                }
                                            // }
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        });
                                }
                            }
                        }
                        // }
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        },
        editUserYse() {
            //确定修改接口
            if (this.formU.stationId == "") {
                this.formU.stationId = 0;
            } else {
                this.formU.stationId = this.formU.stationId;
            }
            $axios({
                url: "bjupm/users/updateUser",
                method: "post",
                data: this.formU
            })
                .then(res => {
                    if (res.code == 200) {
                        this.$message.success(`操作成功`);
                        this.getWhatU();
                    } else {
                        this.$message.error(`操作失败`);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.editVisibleU = false;
        },
        checkEmail() {
            //邮箱检查
            var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (
                this.formU.email == "" ||
                this.formU.email == null ||
                !myreg.test(this.formU.email)
            ) {
                this.$message.warning(`请输入正确的邮箱地址！`);
            } else if (this.formU.email == this.editUserBefore.email) {
                this.editUserYse();
            } else {
                $axios({
                    url: `bjupm/checked/email?email=${this.formU.email}`,
                    method: "post",
                    data: {}
                })
                    .then(res => {
                        // if (res.status === 200) {
                            if (res.data == false) {
                                this.$message.warning(`邮箱已经被占用！`);
                                this.formU.email = "";
                            } else {
                                this.editUserYse();
                            }
                        // }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        checkPhone() {
            //手机号检查
            if (this.formU.phone == "" || this.formU.phone == null) {
                this.$message.warning(`手机号不能为空！`);
            } else if (this.formU.phone == this.editUserBefore.phone) {
                this.checkEmail();
            } else {
                $axios({
                    url: `bjupm/checked/phone?phone=${this.formU.phone}`,
                    method: "post",
                    data: {}
                })
                    .then(res => {
                        if (res.data == false) {
                            this.$message.warning(`手机号已经被占用！`);
                            this.formU.phone = "";
                        } else {
                            this.checkEmail();
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        editUser() {
            //修改用户
            if (this.formU.username == "" || this.formU.username == null) {
                this.$message.warning(`用户名不能为空！`);
            } else if (this.formU.username == this.editUserBefore.username) {
                this.checkPhone();
            } else {
                $axios({
                    url: `bjupm/checked/username?username=${this.formU.username}`,
                    method: "post",
                    data: {}
                })
                    .then(res => {
                        if (res == false) {
                            this.$message.warning(`用户名已经被占用！`);
                            this.formU.username = "";
                        } else {
                            this.checkPhone();
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        bindUserRole(row) {
            //打开用户绑定角色弹窗
            this.bindUserId = row.id;
            this.checkRoles = [];
            $axios({
                url: "bjupm/userRole/findAll",
                method: "post",
                data: {}
            })
                .then(res => {
                    if (res.code === 200) {
                        var list = res.data.rows;
                        for (var i = 0; i < list.length; i++) {
                            this.checkRoles.push(list[i].roleId);
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.bindU = true;
        },
        saveBindU() {
            //确定用户绑定角色
            this.bindRoles = [];
            for (var i = 0; i < this.checkRoles.length; i++) {
                var obj = {
                    userId: this.bindUserId,
                    roleId: this.checkRoles[i]
                };
                this.bindRoles.push(obj);
            }
            $axios({
                url: "bjupm/userRole/saveAll",
                method: "post",
                data: this.bindRoles
            })
                .then(res => {
                    if (res.code === 200) {
                        this.$message.success(`操作成功！`);
                        this.getWhatU();
                    } else {
                        this.$message.error(`操作失败！`);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.bindU = false;
        },
        handleNodeClick(indeterminate) {
            //点击组织架构节点获取当前节点的所有角色
            var checkId = indeterminate.id;
            this.chooseDepart = indeterminate.label;
            $axios({
                url: "bjupm/role/findAll",
                method: "post",
                data: { theirDepartmentId: checkId }
            })
                .then(res => {
                    if (res.code == 200) {
                        this.chooseRoles = res.data.rows;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 保存编辑-用户
        saveEditU() {
            var editId = this.formU.id;
            if (editId == null || editId == "") {
                //新增
                this.addUser();
            } else {
                //修改
                this.editUser();
            }
        },
        // 保存编辑-角色
        saveEditR() {
            var editId = this.formR.id;
            if (this.formR.name == "" || this.formR.name == null) {
                this.$message.warning(`您必须输入角色名`);
            } else {
                if (
                    this.formR.theirDepartmentId == "" ||
                    this.formR.theirDepartmentId == null
                ) {
                    this.$message.warning(`您必须选择所属部门`);
                } else {
                    if (editId == null || editId == "") {
                        //新增
                        $axios({
                            url: "bjupm/role/save",
                            method: "post",
                            data: this.formR
                        })
                            .then(res => {
                                if (res.code == 200) {
                                    this.$message.success(`操作成功`);
                                    this.getWhatR();
                                } else {
                                    this.$message.error(`操作失败`);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    } else {
                        //修改
                        $axios({
                            url: "bjupm/role/update",
                            method: "post",
                            data: this.formR
                        })
                            .then(res => {
                                if (res.code == 200) {
                                    this.$message.success(`操作成功`);
                                    this.getWhatR();
                                } else {
                                    this.$message.error(`操作失败`);
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                    this.editVisibleR = false;
                }
            }
        },
        getMenus() {
            //获取所有的菜单
            this.geTreeFuncs = [];
            $axios({
                url: "bjupm/menu/findAll",
                method: "post",
                data: {}
            })
                .then(res => {
                    if (res.code == 200) {
                        var list = res.data.rows;
                        for (var i = 0; i < list.length; i++) {
                            var obj = {
                                id: list[i].id,
                                pid: list[i].pid,
                                label: list[i].name,
                                children: []
                            };
                            this.geTreeFuncs.push(obj);
                        }
                        this.filterArrayF(this.geTreeFuncs, -1);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        filterArrayF(data, pid) {
            //递归，将数组变为树形结构
            let tree = [];
            let temp;
            for (let i = 0; i < data.length; i++) {
                if (data[i].pid == pid) {
                    var obj = data[i];
                    temp = this.filterArrayF(data, data[i].id);
                    if (temp.length > 0) {
                        obj.children = temp;
                    }
                    tree.push(obj);
                }
            }
            let th = false;
            for (let j = 0; j < data.length; j++) {
                for (let k = 0; k < data.length; k++) {
                    if (data[j].pid === data[k].id) {
                        th = true;
                        break;
                    }
                }
            }
            if (!th) {
                let obj = data[i];
                temp = this.filterArrayF(data, data[i].id);
                if (temp.length > 0) {
                    obj.children = temp;
                }
                tree.push(obj);
            }
            this.geTreeFuncs = tree;
            return tree;
        },

        bindRoleFunc(row) {
            //点击打开绑定权限弹窗
            this.bindthisRoleId = row.id;
            this.chooseMenuIds = [];
            $axios({
                url: "bjupm/roleMenu/findAll",
                method: "post",
                data: { roleId: row.id }
            })
                .then(res => {
                    if (res.code == 200) {
                        var list = res.data.rows;
                        for (var i = 0; i < list.length; i++) {
                            this.chooseMenuIds.push(list[i].menuId);
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.openbindRoleFunc();
        },
        openbindRoleFunc() {
            this.timeOut = setTimeout(() => {
                this.getMenus();
                this.bindF = true;
            }, 500);
        },
        cancelBindM() {
            //关闭
            this.bindF = false;
            this.getWhatR();
        },
        saveBindM() {
            //保存角色绑定菜单
            var idds = this.$refs.tree
                .getCheckedKeys()
                .concat(this.$refs.tree.getHalfCheckedKeys()); //获取该树形所有被勾选的id
            this.bindMenus = [];
            for (var i = 0; i < idds.length; i++) {
                var obj = {
                    roleId: this.bindthisRoleId,
                    menuId: idds[i]
                };
                this.bindMenus.push(obj);
            }
            $axios({
                url: "bjupm/roleMenu/saveAll",
                method: "post",
                data: this.bindMenus
            })
                .then(res => {
                    if (res.code === 200) {
                        this.$message.success(`操作成功！`);
                        this.getWhatR();
                    } else {
                        this.$message.error(`操作失败！`);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.bindF = false;
        },
        bindRoleDep(row) {
            //打开角色绑定部门的弹窗
            this.bindthisRoleId = row.id;
            this.chooseDeptIds = [];
            this.getTree();
            $axios({
                url: "bjupm/roleDepartment/findAll",
                method: "post",
                data: { roleId: row.id }
            })
                .then(res => {
                    if (res.code == 200) {
                        var list = res.data.rows;
                        for (var i = 0; i < list.length; i++) {
                            this.chooseDeptIds.push(list[i].departmentId);
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.openbindRoleDep();
        },
        openbindRoleDep() {
            this.timeOut = setTimeout(() => {
                this.bindD = true;
            }, 1000);
        },
        handleCheckChangeD(data, checked) {
            //选中部门节点
            var index = this.chooseDeptIds.indexOf(data.id);
            if (index != -1) {
                this.chooseDeptIds.splice(index, 1);
            } else {
                this.chooseDeptIds.push(data.id);
            }
        },

        saveBindD() {
            //保存角色绑定部门
            var idds = this.$refs.treeD.getCheckedKeys(); //获取该树形所有被勾选的id
            this.bindDeparts = [];
            for (var i = 0; i < idds.length; i++) {
                var obj = {
                    roleId: this.bindthisRoleId,
                    departmentId: idds[i]
                };
                this.bindDeparts.push(obj);
            }
            $axios({
                url: "bjupm/roleDepartment/saveAll",
                method: "post",
                data: this.bindDeparts
            })
                .then(res => {
                    if (res.code === 200) {
                        this.$message.success(`操作成功！`);
                        this.getWhatR();
                    } else {
                        this.$message.error(`操作失败！`);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.bindD = false;
        },
        bindRoleProj(row) {
            //打开角色绑定项目弹窗
            this.bindthisRoleId = row.id;
            this.checkedProjects = [];
            $axios({
                url: "bjupm/roleProject/findAll",
                method: "post",
                data: { roleId: row.id }
            })
                .then(res => {
                    if (res.code == 200) {
                        var list = res.data.rows;
                        for (var i = 0; i < list.length; i++) {
                            this.checkedProjects.push(list[i].projectId);
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.timeOut = setTimeout(() => {
                this.bindP = true;
            }, 500);
        },
        getProjects() {
            //获取所有的项目
            $axios({
                url: "bjupm/project/findAll",
                method: "post",
                data: {}
            })
                .then(res => {
                    if (res.status === 200) {
                        this.allProjects = res.data.rows;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        saveBindP() {
            //保存角色绑定项目
            this.bindProjects = [];
            for (var i = 0; i < this.checkedProjects.length; i++) {
                var obj = {
                    roleId: this.bindthisRoleId,
                    projectId: this.checkedProjects[i]
                };
                this.bindProjects.push(obj);
            }
            $axios({
                url: "bjupm/roleProject/saveAll",
                method: "post",
                data: this.bindProjects
            })
                .then(res => {
                    if (res.code === 200) {
                        this.$message.success(`操作成功！`);
                        this.getWhatR();
                    } else {
                        if (res.code == 500) {
                            this.$message.error(`不允许的操作！`);
                        } else {
                            this.$message.error(`操作失败！`);
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.bindP = false;
        },
        handleDelete(row) {
            //打开删除对话框
            if (this.tab == "first") {
                this.form.id = row.id;
            } else if (this.tab == "second") {
                this.formP.id = row.id;
            } else if (this.tab == "third") {
                this.formU.id = row.id;
            } else {
                this.formR.id = row.id;
            }
            this.delVisible = true;
        },
        // 确定删除
        deleteRow() {
            var deleId = [];
            if (this.tab == "first") {
                deleId.push(this.form.id);
                $axios({
                    url: "bjupm/department/delete",
                    method: "post",
                    data: deleId
                })
                    .then(res => {
                        if (res.code == 200) {
                            if (this.pageDanger == true) {
                                //当前页只剩一条
                                if (this.currPage == 1) {
                                    this.currPage = this.currPage;
                                } else {
                                    this.currPage = this.currPage - 1;
                                }
                            } else {
                                this.currPage = this.currPage;
                            }
                            this.getWhat();
                            this.$message.success(`删除成功`);
                        } else if (res.code == 500) {
                            this.remindDep = res.data.childDepartments;
                            this.remindPost = res.data.posts;
                            this.remindUsers = res.data.users;
                            this.remindRoles = res.data.roles;
                            this.remind = true;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else if (this.tab == "second") {
                deleId.push(this.formP.id);
                $axios({
                    url: "bjupm/post/delete",
                    method: "post",
                    data: deleId
                })
                    .then(res => {
                        if (res.code == 200) {
                            if (this.pageDanger == true) {
                                //当前页只剩一条
                                if (this.currPage == 1) {
                                    this.currPage = this.currPage;
                                } else {
                                    this.currPage = this.currPage - 1;
                                }
                            } else {
                                this.currPage = this.currPage;
                            }
                            this.getWhatP();
                            this.$message.success(`删除成功`);
                        } else {
                            this.$message.error(`删除失败`);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else if (this.tab == "third") {
                deleId.push(this.formU.id);
                $axios({
                    url: "bjupm/users/delete",
                    method: "post",
                    data: deleId
                })
                    .then(res => {
                        if (res.code == 200) {
                            if (this.pageDanger == true) {
                                //当前页只剩一条
                                if (this.currPage == 1) {
                                    this.currPage = this.currPage;
                                } else {
                                    this.currPage = this.currPage - 1;
                                }
                            } else {
                                this.currPage = this.currPage;
                            }
                            this.getWhatU();
                            this.$message.success(`删除成功`);
                        } else {
                            this.$message.error(`删除失败`);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                deleId.push(this.formR.id);
                $axios({
                    url: "bjupm/role/delete",
                    method: "post",
                    data: deleId
                })
                    .then(res => {
                        if (res.code == 200) {
                            if (this.pageDanger == true) {
                                //当前页只剩一条
                                if (this.currPage == 1) {
                                    this.currPage = this.currPage;
                                } else {
                                    this.currPage = this.currPage - 1;
                                }
                            } else {
                                this.currPage = this.currPage;
                            }
                            this.getWhatR();
                            this.$message.success(`删除成功`);
                        } else if (res.code == 500) {
                            this.deleBindUsers = res.data;
                            this.yesdelVisible = true;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            this.delVisible = false;
        },
        yesdeleteDep() {
            //强制删除部门
            var deleId = [];
            deleId.push(this.form.id);
            $axios({
                url: "bjupm/department/delete?forceDelete=1",
                method: "post",
                data: deleId
            })
                .then(res => {
                    if (res.code == 200) {
                        if (this.pageDanger == true) {
                            //当前页只剩一条
                            if (this.currPage == 1) {
                                this.currPage = this.currPage;
                            } else {
                                this.currPage = this.currPage - 1;
                            }
                        } else {
                            this.currPage = this.currPage;
                        }
                        this.getWhat();
                        this.$message.success(`删除成功`);
                    } else {
                        this.$message.error(`删除失败`);
                    }
                })
                .catch(err => {});
            this.remind = false;
        },
        yesdeleteRow() {
            //强制删除角色
            var deleId = [];
            deleId.push(this.formR.id);
            $axios({
                url: "bjupm/role/forceDelete",
                method: "post",
                data: {}
            })
                .then(res => {
                    if (res.code == 200) {
                        if (this.pageDanger == true) {
                            //当前页只剩一条
                            if (this.currPage == 1) {
                                this.currPage = this.currPage;
                            } else {
                                this.currPage = this.currPage - 1;
                            }
                        } else {
                            this.currPage = this.currPage;
                        }
                        this.getWhatR();
                        this.$message.success(`删除成功`);
                    } else {
                        this.$message.error(`删除失败`);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.yesdelVisible = false;
        }
    }
};
</script>

<style scoped>
.titleText {
    color: #409eff;
    cursor: pointer;
}

.titleText:hover {
    text-decoration: underline;
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
    border-radius: 6px;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
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

/* .architec-box /deep/ .el-input__inner {
    border-radius: 20px !important;
  } */
.return-btn {
    width: 100%;
    height: 50px;
}
.last-step {
    margin-left: 30px;
    margin-top: 10px;
}
</style>
