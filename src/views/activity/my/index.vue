// 报名活动页面，分类展示所有活动
<template>
    <div>
        <div class="assist-box">
            <top-nav
                :selected.sync="restrictions"
                @handleRestrictionsSelect="handleRestrictionsSelect"
            />
            <el-table v-show="activities.length==0" empty-text="暂无活动"></el-table>
            <aty-card
                class="atyCard"
                v-for="(item, index) in activities"
                :key="index"
                :data="item"
                @showSignMem="showSignMem"
                @showCause="showReason"
                @showPassMen='showPassMen'
                @deleteActy="deleteActy(arguments, index)"
            />
        </div>




        <!-- 审核报名人员 -->
        <el-dialog
            title="报名活动人员名单"
            :visible.sync="signUpDialogVisible"
            :modal-append-to-body="false"
            append-to-body
            style="overflow: hidden; margin-top: -20px"
            width="55%"
        >
            <el-table
                ref="signUpMemTableDataRef"
                :data="signUpMemTableData"
                stripe
                :height="$store.getters.pageHeight * 0.5"
                @selection-change="handleSelectionChange"
                style="width: 100%"
            >
                <el-table-column
                    type="selection"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="realName"
                    label="名称"
                    width="80"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="年龄"
                    width="80"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="staffType"
                    label="意向岗位"
                    width="100"
                    :filter-method="prefPosFilterHandler"
                    :filters="prefPosFilters"
                >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="type"
                    label="人员类别"
                    width="100"
                    :filter-method="prefPosFilterHandler"
                    :filters="prefPosFilters"
                >
                </el-table-column>
                <el-table-column
                    prop="successTimes"
                    label="已参加活动次数"
                    width="120"
                    align="center"
                    label-width="180"
                >
                </el-table-column>
                <el-table-column
                prop="times"
                label="实际完成活动次数"
                width="180"
                align="center"
                >

                </el-table-column>
                <el-table-column  label="个人简历" align="center">
                    <template slot-scope="scope">
                        <a v-if="scope.row.profileUrl!='无'" class="getUserInfoSpan" @click="downloadProfile(scope)"
                            >个人信息</a
                        >
                        <span v-else style="color: lightgray;">无</span>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer">
                <mybutton class="button" @click="handleRefuse">拒绝</mybutton>
                <mybutton class="button" type="orange" @click="handlePass"
                    >通过</mybutton
                >
            </span>
        </el-dialog>



        <!-- 查看已通过报名人员-->
        <el-dialog
            title="活动人员名单"
            :visible.sync="passDialogVisible"
            :modal-append-to-body="false"
            append-to-body
            style="overflow: hidden; margin-top: -20px"
            width="55%"
        >
            <el-table
                :data="allMemTableData"
                stripe
                :height="$store.getters.pageHeight * 0.5"
                @selection-change="handleSignUpMemSelChange"
                style="width: 100%"
            >
                <el-table-column
                    type="selection"
                    align="center"
                ></el-table-column>
                <el-table-column
                    prop="realName"
                    label="名称"
                    width="80"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="年龄"
                    width="80"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="staffType"
                    label="意向岗位"
                    width="100"
                    :filter-method="prefPosFilterHandler"
                    :filters="prefPosFilters"
                >
                </el-table-column>
                <el-table-column
                    prop="successTimes"
                    label="已参加活动次数"
                    width="120"
                    align="center"
                >
                </el-table-column>
                <el-table-column label="个人简历" align="center">
                    <template v-slot="scope">
                        <a v-if="scope.row.profileUrl!='无'" class="getUserInfoSpan" @click="downloadProfile(scope)"
                            >个人信息</a
                        >
                        <span v-else style="color: lightgray;">无</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="完成情况"
                    width="200"
                    prop="completion"
                    align="center"
                >
                </el-table-column>
            </el-table>
            <span slot="footer">
                <mybutton class="button" type="orange" @click="handleMemFinish"
                    >已完成</mybutton
                >
                <mybutton class="button" type="orange" @click="exportExcel('PASSED')"
                    >生成签到表</mybutton
                >
            </span>
        </el-dialog>

        <!-- 报表预览 -->
        <el-dialog
            title="签到表预览"
            :visible.sync="excelPreviewVisible"
            :modal-append-to-body="false"
            append-to-body
            style="overflow: hidden; margin-top: -20px"
            width="50%"
            id="exportExcelDialog"
        >
            <el-table
                ref="signUpMemTableDataRef"
                :data="exportExcelData"
                stripe
                :height="$store.getters.pageHeight * 0.5"
                @selection-change="handleExportSelChange"
                style="width: 100%"
            >
                <el-table-column
                    label="序号"
                    type="index"
                    width="50"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="teamName"
                    label="用户名"
                    width="120"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="realName"
                    label="姓名"
                    width="120"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="staffType"
                    label="意向岗位"
                    width="120"
                >
                </el-table-column>
                <el-table-column
                    prop="phoneNumber"
                    label="联系方式"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    label="参加活动情况"
                    align="center"
                >
                </el-table-column>
            </el-table>
            <span slot="footer">
                <mybutton class="button" type="orange" @click="exportExcel('EXPORT')"
                    >确定生成</mybutton
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Mybutton from "@/components/mybutton.vue";
import TopNav from "./modules/TopNav";
import AtyCard from "./modules/AtyCard";
import Template from "../../tmp/template.vue";
import htmlToExcel from "@/utils/htmlToExcel";
import { PREF_POS } from '@/data/wordMap.js'

export default {
    components: {
        Mybutton,
        TopNav,
        AtyCard,
        Template,
    },
    data() {
        return {
            // TopNav
            restrictions: {
                type: '',
                state: '',
            },


            selectedAtyId: "",
            selectedAty: '',


            // 活动详细页面
            activities: [],

            // 对话框显示
            signUpDialogVisible: false,
            passDialogVisible: false,
            excelPreviewVisible: false,
            // conclusionVisisble: false,

            // 表格多选
            signUpMemSelection: [],
            passedMemSelection: [],
            


            // 正在审核人员名单信息
            signUpMemTableData: [],

            // 所有人员名单信息
            allMemTableData: [],
            
            // 表格中意向岗位的筛选
            prefPosFilters: PREF_POS,
            
            
            // 导出ecxel
            exportExcelData: [],
        };
    },
    computed: {
        USER_TYPE() {
            return this.$store.getters.userType;
        },
        USER_ID() {
            return this.$store.getters.userId;
        },
    },
    async created() {
        // 获取所有活动(参与  +  发布)
        this.refreshAtys();
    },
    methods: {
        // 获取所有活动信息（参与  + 发布）
        async refreshAtys() {
            let joinedAtys = [];
            joinedAtys = await this.$store.dispatch("activity/getJoinedAty", {
                userId: this.USER_ID,
            });
            let releasedAtys = [];
            if(this.USER_TYPE == 'group' || this.USER_TYPE == 'club') {
                releasedAtys = await this.$store.dispatch("activity/getReleaseAty", {
                    userId: this.USER_ID,
                });
            }
            this.activities = [...releasedAtys, ...joinedAtys].filter(item => {
                let type = this.restrictions.type, state = this.restrictions.state;
                if(type == 'ALL' || type == '')   return item;
                else if(type == 'RELEASE') {
                    if(!item.userActState && (item.state == state || state == 'ALL'))
                        return item;
                } else if(type == 'JOIN') {
                    if(item.userActState && (item.userActState == state || state == 'ALL'))
                        return item;
                }
            });
        },
        

        /**
         * 审核工作人员报名
         */
        // 展示报名人员名单对话框(用于确认)
        async showSignMem(value) {
            this.selectedAtyId = value.id;
            this.selectedAty = value;
            this.getSignedUsers(value);
            this.signUpDialogVisible = true;
        },
        // 获取某一活动的报名待审核人员
        async getSignedUsers(value) {
            const respData = await this.$store.dispatch("activity/getSignedUsers",{
                actId: value.id,
            });
            // console.log(respData);
            let data = [];
            respData.forEach(value => {
                data.push({
                    age: value.age,
                    realName: value.realName,
                    times:value.times,
                    successTimes: value.successTimes,
                    profileUrl: value.profileUrl,
                    ...value.userActivity,
                })
                data[data.length - 1].staffType = data[data.length - 1].staffType.split(';')[0];
            });
            this.signUpMemTableData = data.filter((x) => {
                return x.state == 'UNDER_REVIEW';
            });
        },
        // 通过
        async handlePass() {
            let data = {
                actId: this.selectedAtyId,
                isPassed: true,
                cause: '',
            };
            // console.log(data.actId)
            for (let i = 0; i < this.signUpMemSelection.length; ++i) {
                data.userId = this.signUpMemSelection[i].userId;
                this.$store.dispatch("activity/examUserSign", data);
            }
            // this.getSignedUsers(this.selectedAty.id);
         
            
        },
        // 拒绝
        handleRefuse() {
            this.$messagebox
                .prompt("请输入不通过的原因", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
                    inputErrorMessage: "理由不能为空!",
                })
                .then(async ({ value }) => {
                    let data = {
                        actId: this.selectedAtyId,
                        isPassed: false,
                        cause: value,
                    };
                    for (let i = 0; i < this.signUpMemSelection.length; ++i) {
                        data.userId = this.signUpMemSelection[i].userId;
                        this.$store.dispatch("activity/examUserSign", data);
                    }
                    this.getSignedUsers(this.selectedAty.id);
                })
                .catch(() => {});
        },
        


        /**
         * 查看报名人员
         */
        // 展示dialog
        showPassMen(atyInfo) {
            this.selectedAty = atyInfo;
            this.passDialogVisible = true;
            this.getAllUsers(atyInfo.id);
        },
        // 获取所有参加活动的人员
        async getAllUsers(value) {
            console.log(value);
            const respData = await this.$store.dispatch("activity/getSignedUsers",{
                actId: value,
            });
            
            let data = [];
            respData.forEach(value => {
                data.push({
                    age: value.age,
                    realName: value.realName,
                    successTimes: value.successTimes,
                    completion: value.completion,
                    profileUrl: value.profileUrl,
                    phoneNumber: value.phoneNumber,
                    ...value.userActivity,
                })
                data[data.length - 1].staffType = data[data.length - 1].staffType.split(';')[0];
            });
            this.allMemTableData = data.filter((x) => {
                return x.state == 'PASSED' || x.state == 'COMPLETED' || x.state == 'UNCOMPLETED';
            });
        },
        // 处理人员完成活动
        async handleMemFinish() {
            for (let i = 0; i < this.passedMemSelection.length; ++i) {
                // 审核用户是否完成活动
                this.$store.dispatch("activity/examUserFinishAty", {
                    actId: this.selectedAty.id,
                    userId: this.passedMemSelection[i].userId,
                    state: true,
                    comment: "OK",
                });
            }
            this.getAllUsers(this.selectedAty.id); // 获取（更新）该活动下所有的报名名单
        },






        /**
         * 活动相关其他操作
         */
        // 撤销活动
        async deleteActy(argus, index) {
            let deData = {
                actId: argus[0].id,
                reason: argus[1],
            };
            const result = await this.$store.dispatch("activity/deleteAty", deData);
            if(result) this.activities[index].state = 'CANCELING';
        },


        

        // 查看未通过原因(企业、个人)
        async showReason(data) {
            this.$messagebox(`原因：${data}`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
                inputErrorMessage: "理由不能为空!",
            })
        },





        /**
         * 处理表格多选
         */
        handleSelectionChange(val) {
            this.signUpMemSelection = val;
        },
        handleSignUpMemSelChange(val) {
            this.passedMemSelection = val;
        },
        handleExportSelChange(val) {
            this.exportSelection = val;
        },



        // 报名人员表格中  意向岗位过滤器
        prefPosFilterHandler(value, row, column) {
            const property = column["property"];
            return row[property] === value;
        },


        // 下载个人简历
        async downloadProfile(scope) {
            this.$store.dispatch('data/downloadAnnex', scope.row.profileUrl);
        },




        exportExcel(value) {
            if(value == 'PASSED' && this.passedMemSelection.length <= 0) {
                return this.$message.error('请选择要导出的内容！');
            } else {
                this.exportExcelData = this.passedMemSelection;
                this.excelPreviewVisible = true;
            }
            if(value == 'EXPORT')
                htmlToExcel.getExcel("#exportExcelDialog", `${this.selectedAty.name}签到表`);
        },


        // 处理顶部过滤选项点击
        handleRestrictionsSelect(data) {
            this.restrictions = data;
            // console.log(data);
            this.refreshAtys();
        },

    },
};
</script>

<style scoped>
.atyCard + .atyCard {
    margin-top: 13px;
}
.button + .button {
    margin-left: 10px;
}
.getUserInfoSpan {
    color: lightgray;
    font-size: 15px;
    cursor: pointer;
}
.getUserInfoSpan:hover {
    color: #000;
}
</style>

