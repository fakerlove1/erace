<template>
    <div>
        <div class="assist-box">
            <div id="navDiv">
                <div id="selectContainer">
                    <mybutton
                        class="sortSelect"
                        :type="inviteButton"
                        @click="toInviteMode"
                        >邀请码管理</mybutton
                    >
                    <mybutton
                        class="sortSelect"
                        :type="memberButton"
                        @click="toMemberMode"
                        >会员列表</mybutton
                    >
                </div>
            </div>

            <!-- 邀请码管理div -->
            <div
                id="inviteCodeBox"
                class="full_screen"
                v-show="mode === 'invite'"
            >
                <el-form label-width="120px" class="form">
                    <el-form-item label="现有邀请码：">
                        <el-row>
                            <el-col :offset="1"> {{ INVITE_CODE_NUM }} </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="生成邀请码：">
                        <el-row>
                            <el-col :offset="1" :span="5">
                                <mybutton 
                                    :type=" inviteCodeType == 'V_PLUS' ? 'orange' : 'normal' "
                                    @click="inviteCodeType = 'V_PLUS'"
                                >
                                    团体成员
                                </mybutton>
                            </el-col>
                            <el-col :span="2">
                                <mybutton 
                                    :type=" inviteCodeType == 'FANS' ? 'orange' : 'normal' "
                                    @click="inviteCodeType = 'FANS'"
                                >
                                    粉丝
                                </mybutton>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item
                                v-for="(item, index) in accetperdTitle"
                                :key="index"
                                :label="item"
                            >
                                <el-col :offset="3">
                                    <el-input v-model="accetperdValue[index]"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col
                            :offset="1"
                            :span="1"
                            style="position: relative; left: 10px"
                        >
                            <el-button
                                circle
                                icon="el-icon-plus"
                                @click="add"
                            ></el-button>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="buttons">
                    <mybutton class="button" type="orange" @click="handleSendInvCode">提交</mybutton>
                </div>
            </div>

            <!-- 会员列表管理div -->
            <div
                id="memberManagerBox"
                class="full_screen"
                v-show="mode === 'member'"
            >
                <div class="filterBox changeInput">
                    <el-select class="memSelect" v-model="filterSelected" size="small">
                        <el-option
                            v-for="item in personType"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="member_container">
                    <mem-card
                        class="memCard"
                        v-for="item in memList"
                        :key="item.id"
                        :data="item"
                    >
                    </mem-card>
                </div>
            </div>

            <!-- 证书申请 | 俱乐部专属 -->
        </div>
    </div>
</template>

<script>
import mybutton from "../../../components/mybutton.vue";
import memCard from "./modules/memCard.vue";

export default {
    components: { mybutton, memCard },
    data() {
        return {
            mode: "invite",
            inviteButton: "orange",
            memberButton: "normal",
            // 邀请码
            inviteCodeType: "V_PLUS",
            accetperdTitle: ["发送邀请码："],
            accetperdValue: [],

            // 会员管理
            personType: [
                { value: 1, label: "所有" },
                { value: 2, label: "团体成员" },
                { value: 3, label: "粉丝" },
            ],
            filterSelected: "",
            memList: [
                // {
                //     id: 1,
                //     avatar:"no-avatar",
                //     uname: "Cat",
                //     type: "团体成员",
                //     remark: "战队成员",
                //     tolItg: "20",
                // },
                // {
                //     id: 2,
                //     avatar:"no-avatar",
                //     uname: "李天天",
                //     type: "粉丝",
                //     remark: "no-remark",
                //     tolItg: "0",
                // },
            ],
        };
    },
    computed: {
        USER_INFO() {
            return JSON.parse(this.$store.getters.userInfo);
        },
        INVITE_CODE_NUM() {
            return this.USER_INFO.invCodeRemNum;
        }
    },
    created() {
        // 获取组织会员
        this.getMembers();
    },
    methods: {
        /**
         * 信息获取
         */
        async getMembers() {
            const respData = await this.$store.dispatch('user/getMembers', 0);
            let datas = [];
            for(let i = 0; i < respData.length; ++i) {
                const userRlpInfo = await this.$store.dispatch('user/getMembersInfo', respData[i]);
                if(userRlpInfo.type == 'INV_CODE_SENDER_RECEIVER') {
                    const userInfo = await this.$store.dispatch('user/getUserInfo', userRlpInfo.userIdSub);
                    datas.push(userInfo);
                }
            }
            // this.memList = datas;
        },


        /**
         * 界面切换
         */
        // 切换至邀请码管理界面
        toInviteMode() {
            this.mode = "invite";
            this.inviteButton = "orange";
            this.memberButton = "normal";
        },
        // 切换至会员列表界面
        toMemberMode() {
            this.mode = "member";
            this.inviteButton = "normal";
            this.memberButton = "orange";
        },

        /**
         * 邀请码操作
         */
        // 增加发送邀请码用户
        add() {
            this.accetperdTitle.push('');
        },
        async handleSendInvCode() {
            // 检验一遍是否都符合11位手机号
            for(let i = 0; i < this.accetperdValue.length; ++i) {
                if(this.accetperdValue[i].length != 11) {
                    return this.$message.error('手机号不合法！');
                }
            }
            // 发送
            let flag = true; // true表明没有用户发送失败
            for(let i = 0; i < this.accetperdValue.length; ++i) {
                let data = {
                    username: this.accetperdValue[i],
                    type: this.inviteCodeType,
                };
                const respData = await this.$store.dispatch('other/sendInvCode', data);
                if(respData.status != 200) {
                    await this.$message.error('用户'+this.accetperdValue[i]+'发送失败');
                    flag = false;
                }
            }
            if(flag) await this.$message.success('全部发送成功！');
            else await this.$message.success('其余发送成功！');
        }
    },
};
</script>

<style scoped>
#navDiv {
    width: 100%;
    height: 50px;
    margin-top: 1%;
    margin-bottom: 25px;
    background-color: rgb(81, 108, 122);
}
#selectContainer {
    width: auto;
    height: 100%;
    float: right;
    display: flex;
    align-items: center;
}
.sortSelect {
    width: 125px;
    margin: 0 10px;
}
.full_screen {
    height: auto;
    width: 100%;
}
.border {
    border: green 1px solid;
}
#inviteCodeBox {
    padding: 5% 10%;
    padding-bottom: 10px;
}
.buttons {
    margin-top: 25px;
}
.button {
    position: relative;
    left: 40%;
}

.filterBox {
    display: flex;
    justify-content: flex-end;
    position: relative;
    top: -5px;
}
.filterBox .memSelect {
    margin-right: 10px;
    width: 150px;
}

.member_container {
    margin-top: 5px;
}
.memCard + .memCard {
    margin-top: 20px;
}
</style>

 