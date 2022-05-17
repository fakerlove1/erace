<template>
    <div>
        <div id="containerBox" class="shadow">
            <div id="avatarContainer">
                <div class="avatarBox">
                    <a @click="toUserRegister">
                        <el-avatar :size="75" :src="require('@/assets/imgs/register/personalRegisterIcon.png')"></el-avatar>
                    </a>
                    <span>个人注册</span>
                    <div
                        v-show="registerType == 'personal'"
                        class="upArrow"
                    ></div>
                </div>
                <div class="avatarBox">
                    <a @click="toCompanyRegister">
                        <el-avatar :size="75" :src="require('@/assets/imgs/register/companyRegisterIcon.png')"></el-avatar>
                    </a>
                    <span>团体注册</span>
                    <div
                        v-show="registerType == 'company'"
                        class="upArrow"
                    ></div>
                </div>
            </div>
            <!-- 输入信息div框 -->
            <div id="informationBox">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Mybutton from "@/components/mybutton.vue";
export default {
    components: {
        Mybutton,
    },
    mounted() {
        this.registerType = window.sessionStorage.getItem('registerType') ? window.sessionStorage.getItem('registerType') : "personal";
    },
    data() {
        return {
            // personal个人注册，company团体注册
            registerType: "personal",
        };
    },
    methods: {
        // 切换个人注册、团体注册
        toUserRegister() {
            this.registerType = "personal";
            // window.sessionStorage.setItem('registerType', this.registerType);
            this.$router.push({
                name: "userregister",
            });
        },
        toCompanyRegister() {
            this.registerType = "company";
            // window.sessionStorage.setItem('registerType', this.registerType);
            this.$router.push({
                name: "companyregister",
            });
        },
    },
};
</script>

<style scoped>
#containerBox {
    padding-top: 20px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 600px;
    height: 600px;
    background: rgba(15, 15, 15, 0.3);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 30px;
}
#avatarContainer {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}
.avatarBox {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.avatarBox span {
    color: white;
    font-size: 10px;
    margin-bottom: 7px;
}
.avatarBox a {
    cursor: pointer;
}
.upArrow {
    width: 0;
    height: 0;
    border-bottom: 10px solid white;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
}
#informationBox {
    width: 100%;
}
</style>

