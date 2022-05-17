<template>
    <div id="app">
        <div class="background"></div>
        <div class="containerbody">
            <!-- 头像 -->
            <div class="main">
                <div id="bigPortrait">
                    <el-avatar :size="100" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </div>
            </div>
            <!-- 登录框 -->
            <div id="login">
                <el-form
                    ref="loginRef"
                    :rules="loginFromRules"
                    :model="loginFormData"
                    label-width="80px"
                >
                    <el-form-item class="white" label="用户名：" prop="username">
                        <el-input
                            type="text"
                            v-model="loginFormData.username"
                        ></el-input>
                    </el-form-item>
                    <el-form-item class="white" label="密码：" prop="password">
                        <el-input
                            type="password"
                            v-model="loginFormData.password"
                        ></el-input>
                    </el-form-item>
                    <a @click="toForget" class="forgetPasswordTip">忘记密码</a>
                </el-form>
                <div class="buttons">
                    <mybutton width="130" height="36" size="15" @click="loginHandle" class="button" type="orange" @keyup.enter="keyDown">登录</mybutton>
                    <mybutton width="130" height="36" size="15" @click="toRegister" class="button">用户注册</mybutton>
                    <span class="registerTip">没有账号？注册一个！</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Nav from "@/components/navigation";
import Mybutton from '@/components/mybutton.vue';
import { validUsernameUtil } from '@/utils/validate'
export default {
    components: {
        Nav, Mybutton,
    },
    data() {
        // 登录用户名校验
        var validatorUsername = (rule, value, callback) => {
            // console.log(value);
            if (!validUsernameUtil(value)) return callback("用户名长度在3-20")
            else return callback();
        };
        // 登录密码校验
        var validatorPassword = (rule, value, callback) => {
            if (value === "") {
                return callback("请输入密码");
            } else return callback();
        };
        return {
            // 头像地址
            avatar: "",
            // 登录表单
            loginFormData: {
                username: "",
                password: "",
            },
            // 表单校验规则
            loginFromRules: {
                username: [
                    {
                        validator: validatorUsername,
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        validator: validatorPassword,
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    mounted () {
        // 回车键登录
        window.addEventListener('keydown',this.keyDown);
    },
    methods: {
        // 跳转忘记密码页面
        toForget() {
            this.$router.push("/forget");
        },
        // 跳转注册
        toRegister() {
            this.$router.push({path: '/register/user'});
        },
        // 处理登录
        loginHandle() {
            this.$refs.loginRef.validate(async (valid) => {
                if (!valid) {
                    return this.$message.error("信息错误，登陆失败！");
                }
                this.$store.dispatch('user/login', this.loginFormData)
            });
        },
        // 回车键登录
        keyDown(e) {
            if(e.keyCode == 13) {
                this.loginHandle();
            }
        },
    },
};
</script>

<style scoped>

#bigPortrait {
    margin-top: 50px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 4em;
    height: 10em;
    width: 10em;
}
#login {
    margin-top: 3em;
    width: 35em;
    height: 35.5em;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 1.5em;
    padding: 6em 2em 2em 2em;
    background-color: rgb(21, 31, 39);
    box-shadow: 0 0 1.5em  rgb(38, 59, 77);
}

.forgetPasswordTip {
    font-size: 1.2em;
    text-decoration: none;
    color: rgb(226,228,229);
    position: relative;
    right: -21.5em;
    top: -1.4em;
    cursor: pointer;
}
.registerTip {
    font-size: 1.2em;
    color: white;
    display: block;
    position: relative;
    top: 0.4em;
    float: right;
    right: 1.8em;
}
.buttons {
    position: relative;
    left: 8px;
    margin-top: 4em;
}
.buttons .button {
    margin-left: 0.8em;
}
</style>