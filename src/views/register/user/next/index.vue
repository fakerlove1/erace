<template>
    <!-- 个人注册 -->
    <div class="personalInfo">
        <el-image class="checkImg" :src="require('@/assets/imgs/register/checkSuccessIcon.png')"></el-image>
        <span class="text">认证成功</span>
        <div class="checkBox">
            <!-- <el-image class="img" :src="require('@/assets/imgs/register/VipIcon.png')"></el-image> -->
            <mybutton class="vipButton" type="orange" width="180" height="50">
                <el-image class="vipImg" :src="require('@/assets/imgs/register/vipIcon.png')"></el-image>
                VIP会员
            </mybutton>
        </div>
    </div>
</template>

<script>
import Mybutton from "@/components/mybutton.vue";
export default {
    components: {
        Mybutton
    },
    data() {
        return {
        
        };
    },
    methods: {
    
    }
};
</script>

<style scoped>
.personalInfo {
    width: 550px;
    height: 460px;
    background: white;
    border-radius: 0 30px 30px 30px;
    padding: 20px;
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.checkImg {
    width: 100px;
    height: 75px;
}
.text {
    margin: 10px 0;
    font-size: 17px;
    margin-bottom: 50px;
}
.vipImg {
    float: left;
    position: relative;
    left: 20%;
    top: 15%;
}
</style>

