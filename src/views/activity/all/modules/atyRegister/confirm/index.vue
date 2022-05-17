<template>
    <div>
        <div class="dialog-info-title">
            <h2>{{ atyInfo.name }}</h2>
        </div>
        <div class="dialog-info-location">
            <i class="el-icon-location-outline"></i>
            <p>{{ atyInfo.location }}</p>
        </div>
        <div class="dialog-info-divider">
            <el-divider></el-divider>
        </div>
        <div class="info-box">
            <!-- 报名活动确认————个人报名 -->
            <el-form label-width="100px" size="small" v-if="USER_TYPE == 'personal'">
                <el-form-item label="报名人员：">
                    <p>{{ $store.getters.uname }}</p>
                </el-form-item>
                <el-form-item label="报名职位：" v-show="havePrefPos">
                    <p>{{prefPosComputed[0] }}</p>
                </el-form-item>
                <el-form-item label="报名活动：">
                    <p>{{ atyInfo.name }}</p>
                </el-form-item>
                <el-form-item label="活动时间：">
                    <p>{{ atyBgnTimeComputed }}</p>
                    <p>{{ atyEndTimeComputed }}</p>
                </el-form-item>
                 <el-form-item label="联系方式：">
                    <p>{{atyInfo.contactWay}}</p>
                </el-form-item>
            </el-form>

            
            <!--报名活动确认————团体报名 -->
            <el-form label-width="100px" size="small" v-else>
                <el-form-item label="报名机构：">
                    <p>{{ $store.getters.uname }}</p>
                </el-form-item>
                <el-form-item label="报名活动：">
                    <p>{{ atyInfo.name }}</p>
                </el-form-item>
                <el-form-item label="活动时间：">
                    <p>{{ atyBgnTimeComputed}}</p>
                    
                    <p>{{ atyEndTimeComputed }}</p>
                </el-form-item>
                <el-form-item label="联系方式：">
                    <p>{{atyInfo.contactWay}}</p>
                </el-form-item>
            </el-form>
        </div>
        <div class="buttons">
            <my-button type="orange" @click="handleRegister">确认</my-button>
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
            // 活动详细信息
            atyInfo: {},
            prefPosMap: this.$store.getters.PREF_POS_EN_ZH,
        };
    },
    computed: {
        USER_TYPE() {
            return this.$store.getters.userType;
        },
        USER_NAME() {
            return this.$store.getters.uname;
        },
        // 当前报名的活动的信息
        SELECTED_ATY() {
            return this.$store.getters.selected_aty;
        },

        havePrefPos() {
           
            if(!this.atyInfo.staffTypes) return false;
            const tprefPos = this.atyInfo.staffTypes.split(';');
            if(tprefPos.length > 0) return true;
            return false;
        },


        // 处理活动时间的展示
        atyBgnTimeComputed() {
            return new Date(this.atyInfo.beginTime).toLocaleString().replace(/:\d{1,2}$/,' ') + ' 至'
        },
        atyEndTimeComputed() {
            return new Date(this.atyInfo.endTime).toLocaleString().replace(/:\d{1,2}$/,' ')
        },

        // 处理意向岗位无要求时
        prefPosComputed() {
            if(!this.$route.query.prefPos||this.$route.query.prefPos=="") return "null"
            else return JSON.parse(this.$route.query.prefPos)
        },
        prefPosNumComputed() {
            if(!this.$route.query.prefPosNum) return "null"
            else return JSON.parse(this.$route.query.prefPosNum)
        }

    },
    async created() {
        this.atyInfo = this.SELECTED_ATY;
    },
    methods: {
        // 处理活动报名
        async handleRegister() {
            const actId = this.atyInfo.id;
            const teamName = this.USER_NAME;
            // console.log(this.$route.query);
            const prefPos = this.prefPosComputed;
            const prefPosNum = this.prefPosNumComputed ;
            // console.log('nul',prefPos);
            // console.log('tet',prefPosNum);
            let preferPosition = '', preferPositionCount = '';
            for(let i = 0; i < prefPos.length; ++i) {
                preferPosition += prefPos[i] + ';';
                preferPositionCount += prefPosNum[i] + ';';
            }
            const data = {
                actId,
                teamName,
                preferPosition,
                preferPositionCount
            };
            const result = await this.$store.dispatch('activity/signUpAty', data);
            let toAll = () => {
                this
                this.$router.push('/activity/all');
                location.reload();
            }
            if(result) setTimeout(toAll, 1250);
        },
    }
};
</script>

<style scoped>
.dialog-info-title {
    font-weight: bold;
}
.dialog-info-location {
    margin-top: 15px;
    display: flex;
}
.dialog-info-location i {
    height: 20px;
}
.dialog-info-location i::before {
    font-size: 20px;
    color: rgb(150, 213, 254);
}
.dialog-info-divider {
    width: 70%;
}


.buttons {
    position: absolute;
    bottom: 45px;
    right: 35px;
}
</style>

