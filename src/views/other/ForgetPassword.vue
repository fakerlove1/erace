<template>
    <div class="container shadow">
        <el-avatar class="centerAvatar" :size="100"></el-avatar>
        <div class="arrorTop"></div>
        <div class="formContainer">
            <el-form
                ref="forgetFormRef"
                :rules="forgetFormRules"
                :model="forgetForm"
                label-width="130px"
                size="small"
                label-position="left"
                class="changeInput"
            >
                <!-- <el-form-item label="用户名:" prop="username">
                    <el-col :span="15">
                        <el-input v-model="forgetForm.username"></el-input>
                    </el-col>
                </el-form-item> -->
                <el-form-item label="注册邮箱/手机号:" prop="info">
                    <el-col :span="15">
                        <el-input v-model="forgetForm.info"></el-input>
                    </el-col>
                    <el-col :offset="1" :span="5">
                        <mybutton 
                            width="100" 
                            height="32" 
                            size="12" 
                            class="getCodeButton" 
                            type="normal"
                            @click="sendVerCode"
                        ><span v-if="!isSend" disabled="isSend" >获取验证码</span>
                        <span v-else>{{timeout}}s后重新发送</span>
                        </mybutton>
                    </el-col>
                </el-form-item>
                <el-form-item label="填写验证码:" prop="verificationCode">
                    <el-col :span="10">
                        <el-input v-model="forgetForm.verificationCode"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="新密码:" prop="password">
                    <el-col :span="15">
                        <el-input v-model="forgetForm.password" type="password" auto-complete="new-password"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="确认密码:" prop="repeatPassword">
                    <el-col :span="15">
                        <el-input v-model="forgetForm.repeatPassword" type="password" auto-complete="new-password"></el-input>
                    </el-col>
                </el-form-item>
                <div class="buttons">
                    <mybutton class="submitButton button" type="orange" @click="submitHandler">提交</mybutton>
                    <mybutton class="button" type="normal" @click="returnLogin">返回</mybutton>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import Mybutton from "@/components/mybutton.vue";
export default {
    components: {
        Mybutton,
    },
    data() {
        var infoValidate = (rule, value, callback) => {
            //验证邮箱的正则
            var regEmail = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
            if (regEmail.test(value) || value.length == 11) return callback();
            else callback(new Error("请输入正确的邮箱/手机号！"));
        };
        var validatePass = (rules, value, callback) => {
            if (this.forgetForm.repeatPassword != null) {
                this.$refs.forgetFormRef.validateField("repeatPassword");
            }
            return callback();
        };
        var validateRepeatPass = (rules, value, callback) => {
            if (this.forgetForm.password != value) {
                return callback("两次输入密码不一致");
            } else if (value == null) return callback("两次输入密码不一致");
            return callback();
        };
        /**
         * info:邮箱/手机号
         * verificationCode:验证码
         */
        return {
            // 是否发送
            isSend:false,
            // 倒计时
            timeout:60,
            forgetForm: {
                info: "",
                verificationCode: "",
                password: "",
                repeatPassword: "",
            },
            forgetFormRules: {
                info: [
                    {
                        required: true,
                        message: "请输入注册邮箱/手机号",
                        trigger: "blur",
                    },
                    {
                        validator: infoValidate,
                        trigger: "blur",
                    },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 6,
                        max: 64,
                        message: "长度至少为 6 字符",
                        trigger: "blur",
                    },
                    { validator: validatePass, trigger: "blur" },
                ],
                repeatPassword: [
                    {
                        required: true,
                        message: "两次输入密码不一致",
                        trigger: "blur",
                    },
                    { validator: validateRepeatPass, trigger: "blur" },
                ],
                verificationCode: [
                    {
                        required: true,
                        message: "请输入验证码",
                        trigger: "blur",
                    },
                ],
            }
        };
    },
    methods: {
        sendVerCode() {
            this.$refs.forgetFormRef.validateField('info',async error => {
                console.log("click!!")
                if(error != '') return this.$message.error(error);
                const resp = await this.$store.dispatch('other/sendResetVerCode', {
                    info: this.forgetForm.info,
                });
                if(resp) {
                    this.isSend = true,
                    this.timeout =60;
                    this.setTimeout();
                }
            })  
        },
        setTimeout(){
            this.timeout--;
            if(this.timeout > 0){
                setTimeout(this.setTimeout,1000);
            } else this.isSend = false;
        },
        submitHandler() {
            this.$refs.forgetFormRef.validate(async (value) => {
                if (!value) return this.$message.error("请先完善必填信息！");
                this.$store.dispatch('other/resetPassward', {
                    info: this.forgetForm.info,
                    verificationCode: this.forgetForm.verificationCode,
                    newPwd: this.forgetForm.password,
                });
            });
        },
        returnLogin() {
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>
.centerAvatar {
    margin-bottom: 5px;
}
.container {
    padding-top: 20px;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 600px;
    height: 480px;
    background: rgba(15, 15, 15, 0.3);
    /* opacity: 25%; */
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 30px;
}
.arrorTop {
    width: 0;
    height: 0;
    border-bottom: 15px solid white;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
}
.formContainer {
    width: 600px;
    height: 340px;
    background: white;
    border-radius: 0 0 30px 30px;
    padding: 20px;
    padding-left: 50px;
    padding-top: 50px;
}
.buttons {
    position: relative;
    left: -15px;
    width: 100%;
    top: 20px;
    display: flex;
    justify-content: space-around;
}
.buttons .button {
    width: 120px;
    height: 40px;
}
</style>

