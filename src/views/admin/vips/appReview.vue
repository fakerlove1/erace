<template>
    <div>
        <div class="crumb-box">
            <el-breadcrumb
                separator-class="el-icon-arrow-right"
                class="bread-crumb"
            >
                <el-breadcrumb-item>会员管理</el-breadcrumb-item>
                <el-breadcrumb-item>申请审核</el-breadcrumb-item>
            </el-breadcrumb>
                        <el-input 
                            class="changeInput"
                            v-model="searchContext"
                            size="small"
                            placeholder="输入姓名检索会员"
                            @keyup.enter.native="handleSearch"
                        ></el-input>
        </div>
        <div class="table-box">
            <el-table
                :data="tableData"
                style="width: 100%"
                stripe
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    align="center"
                ></el-table-column>
                <el-table-column width="51" align="center">
                    <template>
                        <el-avatar
                            :src="
                                require('@/assets/imgs/register/personalRegisterIcon.png')
                            "
                        ></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="teamName"
                    label="名称"
                    width="100"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    label="会员类型"
                    width="180"
                    :filters="vipTypeFilters"
                    :filter-method="vipTypeFilterMethod"
                    align="center"
                >
                    <template v-slot="scope">
                        <p>{{scope.row.organizationType}}</p>
                    </template>
                </el-table-column>
                <!--  管理员-审核用户-资料下载 -->
                <el-table-column label="资料下载" width="180" align="center">
                    <template slot-scope="scope">
                        <el-image class="download-icon" :src="require('@/assets/imgs/other/dataPack.png')" @click="handleDataDownload(scope)"></el-image>
                    </template>
                </el-table-column>
                
                <el-table-column
                    width="180"
                    align="center"
                >
                    <template v-slot="scope">
                        <a @click="showRegisterInfo(scope)">注册相关信息</a>
                    </template>
                </el-table-column>

                <el-table-column align="center">
                    <template v-slot="scope">
                        <my-button
                            @click="handleAllow(scope)"
                            width="75"
                            height="30"
                            class="button"
                            >通过</my-button
                        >
                        <my-button
                            @click="handleRefuse(scope)"
                            width="75"
                            height="30"
                            class="button"
                            >不通过</my-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>





        <el-dialog
            :title="registerDialogTitle"
            :visible.sync="registerInfoDialogVisible"
            width="45rem"
            append-to-body
        >
            <el-form
                ref="registerInfoFormRef"
                :model="registerInfoData"
                label-width="7rem"
            >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="名称：">{{registerInfoData.teamName}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="团体性质：">{{registerInfoData.organizationType}}</el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="组织机构代码：">
                    {{registerInfoData.officialCode}}
                </el-form-item>
                <!-- <el-form-item label="业务范围：">{{registerInfoData.businessScope}}</el-form-item> -->
                
                <el-divider></el-divider>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="邮箱：">{{registerInfoData.email}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="电话：">{{registerInfoData.tel}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="公众号：">{{registerInfoData.website?registerInfoData.website:'无'}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="微博：">{{registerInfoData.weibo?registerInfoData.weibo:'无'}}</el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="官网：">{{registerInfoData.website?registerInfoData.website:'无'}}</el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="地址：">{{registerInfoData.address?registerInfoData.address:'无'}}</el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="简介：">
                    {{registerInfoData.introduction}}
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
import Mybutton from "@/components/mybutton.vue";
export default {
    components: {
        myButton: Mybutton,
    },
    data() {
        return {
            tableData: [],
            multipleSelection: [],
            vipTypeFilters: [
                { text: "团体", value: "GROUP" },
                { text: "俱乐部", value: "俱乐部" },
            ],


            // 用户注册信息展示
            registerDialogTitle: '',
            registerInfoDialogVisible: false,
            registerInfoData: {},

            // 用户名搜索
            searchContext: ""
        };
    },
    created() {
        this.getExamList();
    },
    methods: {
        // 获取会员的申请列表
        async getExamList() {
            const respData =  await this.$store.dispatch("admin/getExamUser",
            {
                username:this.searchContext
            });
            // console.log(respData);
            let users = [];
            respData.forEach(item => {
                users.push({
                    id: item.id,
                    nickName: item.nickName,
                    username: item.username,
                    profileUrl: item.profileUrl,
                    ...item.userExtensionOrganization
                })
            });
            this.tableData = users;
        },



        // 多选处理
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 会员类型过滤方法
        vipTypeFilterMethod(value, row, column) {
            const property = column["property"];
            return row[property] === this.vipTypeMap[value];
        },


        // 下载附件
        handleDataDownload(scope) {
            this.$store.dispatch('data/downloadAnnex', scope.row.profileUrl);
        },




        // 查看用户注册信息
        showRegisterInfo(scope) {
            this.registerDialogTitle = `‘${scope.row.teamName}’ 注册信息`;
            this.registerInfoDialogVisible = true;
            this.registerInfoData = scope.row;
        },


        // 搜索
        handleSearch(){
            this.getExamList();
        },



        // 处理同意
        async handleAllow(scope) {
            const result = await this.$store.dispatch("admin/examUser", {
                userId: scope.row.id,
                isPassed: true,
                cause: "",
            });
            console.log(result);
            if(result) this.tableData.splice(scope.$index, 1);
        },
        // 处理拒绝
        async handleRefuse(scope) {
            this.$messagebox.prompt("请输入不通过的原因", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
                    inputErrorMessage: "理由不能为空!",
                }).then(async ({ value }) => {
                    const result = await this.$store.dispatch("admin/examUser", {
                        userId: scope.row.id,
                        isPassed: false,
                        cause: value,
                    });
                    if(result) this.tableData.splice(scope.$index, 1);
                }).catch(() => {});
        },
    },
};
</script>

<style scoped>
.crumb-box {
    padding: 15px;
    background: rgb(115, 134, 147);
    height: 50px;
}

.table-box {
    margin: 5px 15px;
}

.download-icon {
    cursor: pointer;
    width: 50px;
}

.button {
    margin-top: 5px;
    margin-bottom: 5px;
}
.button + .button {
    margin-left: 15px;
}
.button:hover {
    background: #fca07c;
    box-shadow: 0px 0px 5px #f39671;
    color: white;
}


a {
    color: grey;
    cursor: pointer;
}
a:hover {
    color: black;
    cursor: pointer;
}
.el-input{
    width: 13rem;
    float: right;
    box-sizing: border-box;
    position: relative;
    bottom: 1rem;
}
</style>