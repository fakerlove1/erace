<template>
    <div>
        <div class="crumb-box">
            <el-breadcrumb
                separator-class="el-icon-arrow-right"
                class="bread-crumb"
            >
                <el-breadcrumb-item>会员管理</el-breadcrumb-item>
                <el-breadcrumb-item>协会会员</el-breadcrumb-item>
            </el-breadcrumb>
       
        </div>
      <div class="table-box">
           <div font-size="20px">此功能暂未开放，敬请期待！</div>
             <!--  <el-table :data="tableData" 
                    style="width: 100%" 
                    stripe 
                    @selection-change="handleSelectionChange"
                >
                <el-table-column type="selection" label="50" align="center"></el-table-column>
                <el-table-column align="center" width="51">
                    <template slot-scope="scope">
                        <el-avatar :src="getAvatarUrl(scope.row)"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column prop="uname" label="名称" width="100" align="center"></el-table-column>
                <el-table-column label="会员级别" width="120" align="center">
                    <template slot-scope="scope">
                        <p v-show="!scope.row.isEdit" class="text" @click="toEdit(scope.$index)">
                            {{ scope.row.userRoleZh }}
                        </p>
                        <el-select 
                            v-show="scope.row.isEdit" 
                            v-model="scope.row.newUserRole" 
                            size="mini" 
                            class="changeInput"
                        >
                            <el-option 
                                v-for="(item, index) in levelOptions" 
                                :key="index" 
                                :label="item.label" 
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <i 
                            v-show="scope.row.isEdit" 
                            class="el-icon-check icon-in-level"
                            @click="changeLevel(scope.row)"
                        ></i>
                        <i 
                            v-show="scope.row.isEdit" 
                            class="el-icon-close icon-in-level"
                            @click="cancelChangeLevel(scope.$index)"
                        ></i>
                    </template>
                </el-table-column>
                <el-table-column 
                    prop="bizScope"  
                    label="业务" 
                    width="100" 
                    align="center"
                ></el-table-column>
                <el-table-column prop="launchTimes" sortable label="发布活动" width="100" align="center"></el-table-column>
                <el-table-column prop="atyTimes" sortable label="参加活动" width="100" align="center"></el-table-column>
                <el-table-column prop="tolItg" sortable label="积分" width="100" align="center"></el-table-column>
                <el-table-column align="right">
                     <p class="text orange" @click="sendMsg">发送通知</p>
                </el-table-column>
                <el-table-column align="right">
                     <p class="text blue" @click="showMemIndex">会员主页</p>
                </el-table-column>
                <el-table-column align="right">
                    <template slot-scope="scope">
                        <el-col :offset="3" :span="17"> -->
                            <!-- 用户没有在小黑屋 -->
                            <!-- <el-select 
                                v-show="scope.row.prohibit==0" 
                                class="changeInput"
                                v-model="scope.row.tmpProhibit"
                                placeholder="小黑屋" 
                                size="small"
                                @change="setProhibt($event, scope.row)"
                            >
                                <el-option 
                                    v-for="(item, index) in prohibtOptions" 
                                    :key="index"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select> -->

                            <!-- 用户在小黑屋 -->
                            <!-- <div class="prohibtit-box" v-show="scope.row.prohibit!=0">
                                <p>小黑屋：{{ getProhibit(scope.row.prohibit) }}</p>
                                <my-button 
                                    class="prohibit-button" 
                                    type="normal" 
                                    width="80" 
                                    height="25" 
                                    size="10"
                                    @click="cancelProhibit(scope.row)"
                                >取消</my-button>
                            </div>
                        </el-col>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pageNum"
                layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>-->
        </div>
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
            // 会员级别选项
            levelOptions: [
                { value: 'ASSOCIATION_PRESIDENT', label: '会长' },
                { value: 'ASSOCIATION_VICE_PRESIDENT', label: '副会长' },
                { value: 'ASSOCIATION_STANDING_DIRECTOR', label: '常务理事' },
                { value: 'ASSOCIATION_DIRECTOR', label: '理事' },
                { value: 'ASSOCIATION_V_FULL', label: '会员' },
            ],
            // 业务？？
            bizScopeMap: {},
            bizScopeFilters: [],
            // 小黑屋options
            prohibtOptions: [
                { value: 7*24*60*60*1000, label: '7天' },
                { value: 15*24*60*60*1000, label: '15天' },
                { value: 30*24*60*60*1000, label: '30天' },
                { value: -1, label: '永久' },
            ],
            // 分页
            queryInfo: {
                query:'',
                pageNum: 1
            },
            // 总页数
            total: 0,
        };
    },
    created() {
        // 获取prefPos过滤器，初始化过滤器
        this.prefPosHandle();
        // 获取所有的个人用户
        this.getUsers();
    },
    methods: {
        /**
         * 基本信息处理
         */
        // 获取prefPos过滤器，初始化过滤器
        async prefPosHandle() {
            const mapData = await this.$store.dispatch('data/getMap', {
                pageNum: this.queryInfo.pageNum,
                query: '',
                roleName: 'ASSOCIATION',
            });
            let map = {};
            let filter = [{text: '无', value: '无'}];
            for(let i = 0; i < mapData.length; ++i) {
                map[mapData[i].wordEn] = mapData[i].wordZh;
                filter.push({
                    text: mapData[i].wordZh,
                    value: mapData[i].wordZh,
                })
            }
            this.bizScopeMap = map;
            this.bizScopeFilters = filter;
        },
        // 获取会员列表
        async getUsers() {
            const userData = await this.$store.dispatch('admin/getUsersOfRole', 'ASSOCIATION');
            let users = [];
            for(let i = 0; i < userData.length; ++i) {
                const userInfo = await this.$store.dispatch('user/getUserInfo', userData[i]);
                // 获取会员级别
                const userRoleData = await this.$store.dispatch('user/getUserRole', userInfo.id);
                for(let i = 0; i < userRoleData.length; ++i) {
                    let userRole = userRoleData[i];
                    for(let j = 0; j < this.levelOptions.length; ++j) {
                        if(this.levelOptions[j].value == userRole) {
                            // 会员身份的中文（因为修改身份需要使用到旧身份，所以还需要原来的英文）
                            userInfo.userRoleEn = userRole;
                            userInfo.userRoleZh = this.levelOptions[j].label;
                            break;
                        }
                    }
                }
                userInfo.isEdit = false;
                // 获取用户发布活动次数
                const restrictions = {
                    atyType: "ALL",
                    atyLocation: "ALL",
                    atyTime: "ALL",
                };
                const atyIds = await this.$store.dispatch("activity/getAllAty", {
                    restrictions: JSON.stringify(restrictions),
                    userId: userInfo.id,
                });
                userInfo.launchTimes = atyIds.LAUNCHED.length;
                // 处理bizScope
                userInfo.bizScope = '无';
                users.push(userInfo);
            }
            this.tableData = users;
        },
        // 通过uuid获取头像
        getAvatarUrl(data) {
            // 数据库中没有头像的数据，则使用默认头像
            if(data.avatar = 'no-avatar') {
                return require('@/assets/imgs/register/companyRegisterIcon.png');
            } else {
                return this.$store.getters.baseUrl+`file?uuid=${data.avatar}&userId=${this.$store.getters.userId}`;
            }
        },


        /**
         * 一些操作处理
         */
        // 多选处理
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        toEdit(index) {
            this.tableData[index].isEdit = true;
        },
        changeLevel(value) {
            let data = {
                userId: value.id,
                oldRole: value.userRoleEn,
                newRole: value.newUserRole,
            };
            this.$store.dispatch('user/updateUserRole', data);
            this.getUsers();
        },
        cancelChangeLevel(index) {
            this.tableData[index].isEdit = false;
        },


        /**
         * 小黑屋相关操作
         */
        getProhibit(value) {
            let time = value/1000/60/60;
            if(time < 24) return time+'小时';
            else if(time/24 <= 30) return time/24+'天';
            else return "永久"
        },
        setProhibt(value, scope) {
            let data =  {
                userId: scope.id,
                prohibit: value,
            };
            this.$store.dispatch('user/updateUserInfo', data);
            this.getUsers();
        },
        cancelProhibit(scope) {
            let data =  {
                userId: scope.id,
                prohibit: 0,
            };
            this.$store.dispatch('user/updateUserInfo', data);
            this.getUsers();
        },
        
        // 分页相关操作
        handleCurrentChange(newPage){
            this.queryInfo.pageNum = newPage;
            this.getPersonUsers();
        },

        // 其他操作
        sendMsg() {
            this.$message.info('该功能还未正式投入使用，敬请期待！');
        },
        showMemIndex() {            
            this.$message.info('该功能还未正式投入使用，敬请期待！');
        }
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

.text {
    display: inline-block;
    cursor: pointer;
}
.text + .text {
    margin-left: 100px;
}
.orange {
    color: rgb(205,171,157);
}
.orange:hover {
    color: rgb(194, 151, 134);
}
.blue {
    color: rgb(164,176,184);
}
.blue:hover {
    color: rgb(139, 157, 168);
}

.icon-in-level {
    font-size: 16px;
    cursor: pointer;
}
.icon-in-level + .icon-in-level {
    margin-left: 10px;
}

.prohibtit-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.prohibtit-box p {
    position: relative;
    top: -5px;
}
.prohibtit-box .prohibit-button {
    position: relative;
    top: -2px;
}

.el-pagination{
    margin: 10px;
}
</style>