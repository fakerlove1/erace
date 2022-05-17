<template>
    <div class="atyCard"  style="display:flex;justify-content:space-between;">
        <!-- 活动 海报 展示 -->
        <el-image class="covImg floatL" :src='posterComputed' />
        <!-- 活动 主要信息 展示 -->
        <div class="atyInfo floatL" id = "title">
            <h1>{{ atyInfo.name }}</h1>
            <div id="locationBox">
                <i class="el-icon-location-outline"></i>
                <p>{{ atyInfo.location }}</p>
            </div>
            <div id="divider"></div>
            <p style="font-size: 14px;position: relative; top:5px;">{{ prefPosComputed }}</p>
            <p style="font-size: 14px;position: relative; top:5px;">报名时间：{{ atyBgnTimeComputed }}&nbsp;{{atyEndTimeComputed}}</p>
        </div>
        <!-- 活动 次要信息 以及 详情须知 展示 -->
        <div class="atyInfoLast floatR">
            <p v-show="!isOverdue(atyInfo.signupEndTime)" class="up">{{ atyInfo.types }}</p>
            <p v-show="!isOverdue(atyInfo.signupEndTime)" class="money up" v-if="atyInfo.reward!==0">奖金：￥{{ atyInfo.reward }}</p>
            <p v-show="!isOverdue(atyInfo.signupEndTime)" class="money up" >报名费用：￥{{ atyInfo.cost }}</p>
            <mybutton v-if="!isOverdue(atyInfo.signupEndTime)" class="op" @click="handleClick" type= "orange">详情及报名</mybutton>
            <mybutton v-if="USER_INFO.darkroomBean.darkRoom" class="op" >小黑屋用户禁止报名</mybutton>
            <p v-show="isOverdue(atyInfo.signupEndTime)">已过期</p>
        </div>
    </div>
</template>

<script>
import mybutton from '../../../../components/mybutton.vue';
export default {
  components: { mybutton },
    props: ['data'],
    data() {
        return {
            atyInfo: this.data,
        };
    },
    computed: {
        // 海报处理
        posterComputed() {
            return this.$store.getters.baseUrl+`/file/download/${this.atyInfo.poster}`;
        },
        // 自定义处理
        prefPosComputed() {
            let staffTypes = this.atyInfo.staffTypes.split(';');
            let staffTypesCount = this.atyInfo.staffTypesCount.split(';');
            let retString = this.atyInfo.types;
            for(let i = 0; i < staffTypes.length - 1; ++i) {
                retString = retString + '，' + staffTypes[i] + staffTypesCount[i] + '名';
            }
            return retString;
        },
         USER_INFO() {
            return JSON.parse(this.$store.getters.userInfo);
        },
           // 处理活动时间的展示
        atyBgnTimeComputed() {
            return new Date(this.atyInfo.enrollBeginTime).toLocaleString().replace(/:\d{1,2}$/,' ') + ' 至'
        },
        atyEndTimeComputed() {
            return new Date(this.atyInfo.enrollEndTime).toLocaleString().replace(/:\d{1,2}$/,' ')
        },
    },
    created() {

    },
    methods: {
        // 活动是否过期了
        isOverdue(time) {
            return false;
        },
        // 处理点击
        handleClick(e) {
            this.$emit('click', e);
            // console.log(this.USER_INFO.darkroomBean.darkRoom)
        }
    }
};
</script>

<style scoped>
.atyCard {
    width: 100%;
    height: 170px;
    /* border: red solid 1px; */
    background-color: rgb(237,237,237);
    display: flex;
}
.atyCard div {
    height: 100%;
}

/* 海报图片大小 */
.covImg {
    height: 100%;
    width: 250px;
}

/* 活动相关信息展示 */
.atyInfo {
    width: 450px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
}
.atyInfo #locationBox {
    margin-top: 10px;
    font-size: 13px;
    height: 25px;
    display: flex;
    align-items: center;
}
.atyInfo #locationBox i {
    height: 20px;
}
.atyInfo #locationBox i::before {
    /* width: 20px;
    height: 20px; */
    font-size: 20px;
    color: rgb(150,213,254);
}
.atyInfo #divider {
    border-top: solid 1px grey;
    margin-top: 20px;
    height: 1px;
}

/* 活动详情须知等操作 */
.atyInfoLast {
    width: 200px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.atyInfoLast {
    font-size: 17px;
}
.atyInfoLast .up {
    position: relative;
    top: -10%;
    margin-top: 5px;
}
.atyInfoLast .money {
    font-size: 13px;
}
.atyInfoLast .op {
    font-size: 16px;
    position: absolute;
    bottom: 15px;
    right: 20px;
    cursor: pointer;
    display: block;
}
/* .atyInfoLast p :hover{
    color: #AC6A52;
    font-size: 18px;
} */

.floatL {
    float: left;
}
.floatR {
    float: right;
}
.mybutton{
    margin-right: 1rem;
}
#title{
    margin-top: 1rem; 
}
</style>