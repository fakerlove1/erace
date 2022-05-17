<template>
    <!-- 团体注册 -->
    <div class="companyInfo">
        <el-form
            ref="companyRegisterBasicInfoRef"
            :rules="companyRegisterBasicInfoRules"
            :model="companyRegisterBasicInfo"
            size="small"
            class="changeInput"
            label-width="82px"
            label-position="left"
        >
            <!-- 公司、俱乐部通用注册信息 -->
            <el-form-item label="用户名:" prop="username">
                <el-col :span="12">
                    <el-input
                        v-model="companyRegisterBasicInfo.username"
                    ></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-col :span="16">
                    <el-input
                        type="password"
                        auto-complete="new-password"
                        v-model="companyRegisterBasicInfo.password"
                    ></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="确认密码:" prop="repeatPassword">
                <el-col :span="16">
                    <el-input
                        type="password"
                        auto-complete="new-password"
                        v-model="companyRegisterBasicInfo.repeatPassword"
                    ></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="邮箱:" prop="info">
                <el-col :span="16">
                    <el-input
                        v-model="companyRegisterBasicInfo.info"
                    ></el-input>
                </el-col>
                <mybutton
                    width="100"
                    height="32"
                    size="12"
                    class="getCheckCodeButton"
                    @click="getCheckCode"
                    type="normal"
                    >
                    <span v-if="!isSend" :disabled="isSend">获取验证码</span>
                    <span v-else>{{timeout}}s后重新发送</span>
                    </mybutton
                >
            </el-form-item>
            <el-form-item label="验证码:" prop="verificationCode">
                <el-col :span="10">
                    <el-input
                        v-model="companyRegisterBasicInfo.verificationCode"
                    ></el-input>
                </el-col>
            </el-form-item>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <!-- <el-form-item label="类型:" prop="type">
                <el-radio-group v-model="companyRegisterBasicInfo.type">
                    <el-radio label= 2>团体</el-radio>
                    <el-radio label= 3>俱乐部</el-radio>
                </el-radio-group>
            </el-form-item> -->
            <div class="userCheckBox">
                <el-checkbox
                    v-model="companyRegisterBasicInfo.agreeUserContack"
                ></el-checkbox>
                <span class="userCheckContext">是否同意</span>
                <a class="userContactHref" @click="dialogVisible = true">《用户条约》</a>
            </div>
            <div class="buttons">
                <mybutton
                    width="120"
                    height="35"
                    size="13"
                    type="orange"
                    @click="handleNextStep"
                    >下一步</mybutton
                >
                <mybutton
                    width="120"
                    height="35"
                    size="13"
                    class="cancelButton"
                    @click="returnlogin"
                    type="normal"
                    >取消</mybutton
                >
            </div>
        </el-form>





        <!-- 用户须知弹框 -->
        <el-dialog
            title="《用户须知》"
            :visible.sync="dialogVisible"
            width="50rem"
            append-to-body
            center
        >
            <pre>
                尊敬的客户您好，欢迎您访问江苏省电子竞技运动协会网站（以下简称：网站）。在您注册成为网站会员之前，
            请您务必、认真阅读和理解《网站用户注册协议》（以下简称：协议）中所有的条款。您必须完全同意协议中
            所有的条款，才可以注册成为本网站的会员，使用里面的服务。您在网站的注册和操作均将被视为您对协议所
            有条款及内容的自愿接受。

            一、声明
            （一）网站内在线产品的所有权归江苏省电子竞技运动协会所有
            （二）您在网站进行注册时，一旦点击“我接受”按钮，即表示为您已自愿接受协议中所有的条款和内容。
            （三）协议条款的效力范围仅限于本网站，您在网站的行为均受协议的约束。
            （四）您使用网站服务的行为，即被视为您已知悉本网站的相关公告并同意。
            （五）本网站有权在未提前通知您的情况下修改协议的条款，您每次进入网站在使用服务前，都应先查阅一遍
            协议。
            （六）本网站有权在未提前通知您的情况下修改、暂停网站部分或全部的服务，且不承担由此产生来自您和第
            三方的任何责任。
            （七）本网站提供免费注册服务，您的注册均是自愿行为，注册成功后，您可以得到网站更加完善的服务。
            （八）您注册成为会员后账户和密码如有灭失，不会影响到您已办理成功业务的效力，本网站可恢复您的注册
            账户及相关信息但不承担除此以外的其它任何责任。

            二、用户管理
            （一）您在本网站的所有行为都须符含中国的法律法规，您不得利用本网站提供的服务制作、复制、发布、传
            播以下信息：
            1、反对宪法基本原则的；
            2、危害国家安全、泄露国家机密、颠覆国家政权、破坏国家统一的；
            3、损害国家荣誉和利益的；
            4、煽动民族仇恨、民族歧视、破坏民族团结的；
            5、破坏国家宗教政策，宣扬邪教和封建迷信的；
            6、散布谣言、扰乱社会秩序、破坏社会稳定的；
            7、散布淫秽、色情、赌博、暴力、凶杀、恐怖内容或者教唆犯罪的
            8、侮辱或者诽谤他人，侵害他人合法权益的；
            9、以及法律、法规禁止的其他内容。
            （二）您在本网站的行为，还必须符合其他国家和地区的法律规定以及国际法的有关规定。
            （三）不得利用本网站从事以下活动：
            1、未经允许，进入他人计算机信息网络或者使用他人计算机信息网络的资源
            2、未经允许，对他人计算机信息网络的功能进行删除、修改或增加；
            3、未经允许，对他人计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加；
            4、制作、故意传播计算机病毒等破坏性程序的；
            5、其他危害计算机信息网络安全的行为。
            （四）遵守本网站其他规定和程序：
            1、您对自己在本网站中的行为和操作承担全部责任；
            2、您承担责任的形式包括但不仅限于，对受到侵害者信息进行赔偿、在本网站首先承担了因您的行为导致的
            行政处罚或侵权损害赔偿责任后，您应给予本网站的等额赔偿；
            3、如果本网站发现您传输的信息含有本协议所规定的内容，本网站有权在不通知您的情况下采取包括但不仅
            限于向国家有关机关报告、保存有关记录、删除该内容及链接地址、关闭服务器、暂停您账号的操作权限、
            停止向您提供服务等措施。

            三、注册会员权利和义务
            （一）注册会员有权使用本网站提供的服务功能。
            （二）注册会员同意遵守包括但不仅限于《中华人民共和国保守国家秘密法》、《中华人民共和国计算机信息
            系统安全保护条例》、《计算机软件保护条例》、《互联网电子公告服务管理规定》、《互联网信息服务管理
            办法》等在内的法律、法规。
            （三）您注册时有义务提供完整、真实的个人信息，信息如有变更，应及时更新。
            （四）您成为注册会员须妥善保管用户名和密码，用户登录后进行的一切活动均视为是您本人的行为和意愿，
            您负全部责任。
            （五）您在使用本网站服务时，同意且接受本网站提供的各类信息服务。
            （六）您使用本网站时，禁止有以下行为：
            1、上载、张贴、发送电子邮件或以其他形式传送含有违反国家法律、法规的信息或资料，这些资料包括但不
            仅限于咨询、资料、文字、软件、音乐、照片、图形等（下同）；
            2、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的资料；
            3、冒充任何个人或机构，或以虚伪不实的方式误导他人以为其与任何人或任何机构有关；
            4、通过本网站干扰、破坏或限制他人计算机软件、硬件或通讯设备功能的行为；
            5、通过本网站跟踪或以其他方式骚扰他人。

            四、用户隐私
            我们承诺，对您个人的信息和隐私的安全承担保密义务。未经您授权或同意，本网站不会将您的个人资料信息
            泄露给第三方，但以下情况除外，且本网站不承担任何责任。
            （一）政府单位按照中华人民共和国的法律、行政法规、部门规章、司法解释等规范性法律文件（统称“法律
            法规”），要求本网站提供的。
            （二）由于您将用户和密码告知或泄露给他人，由此导致的个人资料泄露。
            （三）包括但不仅限于黑客攻击、计算机病毒侵入或发作、政府管制等不可抗力而造成的用户个人资料泄露
            、丢失、被盗用或被篡改等。
            （四）为免除他人正在遭受威胁到其生命、身体或财产等方面的危险，所采取的措施。
            （五）本网站会与其他网站链接，但不对其他网站的隐私政策及内容负责。
            （六）此外，您若发现有任何非法使用您的用户账号或安全漏洞的情况，应立即通告本网站。
            （七）由于您自身的疏忽、大意等过错所导致的。
            （八）您在本网站的有关记录有可能成为您违反法律法规和本协议的证据。

            五、知识产权
            本网站所有的域名、商号、商标、文字、视频图像及声音内容、图形均受有关所有权和知识产权法律的保护
            ，未经本网站事先以书面明确允许，任何个人或单位，均不得进行复制和使用。

            六、法律适用
            （一）协议由本网站的所有人负责修订，并通过本网站公布，您的注册行为即被视为您自愿接受协议的全部
            条款，受其约束。
            （二）协议的生效、履行、解释及争议的解决均适用中华人民共和国法律。
            （三）您使用网站提供的服务如产生争议，原则上双方协商解决，协商不成可向南京仲裁委员会申请仲裁或
            人民法院提起诉讼。
            （四）协议的条款如与法律相抵触，本网站可进行重新解析，而其他条款则保持对您产生的法律效力和约束。
            </pre>
        </el-dialog>
    </div>
</template>

<script>
import Mybutton from "@/components/mybutton.vue";
export default {
    components: {
        Mybutton,
    },
    created() {
        let info = JSON.parse(window.sessionStorage.getItem("companyRegisterBasicInfo"));
        // console.log(info);
        if (info) this.companyRegisterBasicInfo = info;
    },
    destroy() {
        window.sessionStorage.removeItem("registerType");
    },
    data() {
        var validateEmail = (rule, value, callback) => {
            //验证邮箱的正则
            var regEmail = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
            if (regEmail.test(value)) return callback();
            else callback(new Error("请输入正确的邮箱！"));
        };
        var validatePass = (rules, value, callback) => {
            // 不能设置简单密码
            const regPassword = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/;

            if (this.companyRegisterBasicInfo.repeatPassword != null) {
                 // 如果密码不是字母、数字、字符三种中的两种，则验证不通过
                if(!regPassword.test(value)){
                    return callback("密码必须至少是数字、字符、字母中的两种！");
                }
                this.$refs.companyRegisterBasicInfoRef.validateField(
                    "repeatPassword"
                );
            }
            callback();
        };
        var validateRepeatPass = (rules, value, callback) => {
            if (this.companyRegisterBasicInfo.password != value) {
                return callback("两次输入密码不一致");
            } else if (value == null) return callback("两次输入密码不一致");
            callback();
        };
        return {
            // 倒计时
            timeout:60,
            // 是否发送验证码
            isSend:false,


            // 团体注册 基本信息 信息对象
            companyRegisterBasicInfo: {
                // 公共
                username: "",
                password: "",
                repeatPassword: "",
                info: "",
                verificationCode: "",
                type: "2",
                agreeUserContack: '',
            },


            // 团体注册 填写信息校验规则
            companyRegisterBasicInfoRules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                    {
                        min: 3,
                        max: 64,
                        message: "长度至少为 3 字符",
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
                info: [
                    { required: true, message: "请输入邮箱", trigger: "blur" },
                    { validator: validateEmail, trigger: "blur" },
                ],
                verificationCode: [
                    {
                        required: true,
                        message: "请输入验证码",
                        trigger: "blur",
                    },
                ],
                type: [
                    { required: true, message: "请选择", trigger: "change" },
                ],
            },


            // 用户须知dialog
            dialogVisible: false,

        };
    },
    methods: {
        // 返回登录界面
        returnlogin() {
            window.sessionStorage.clear();
            this.$router.push("/login");
        },
        // 处理进入下一步
        handleNextStep() {
            this.$refs.companyRegisterBasicInfoRef.validate((valid) => {
                if(valid == false) return this.$message.error("请先完善本页信息！");
                if(this.companyRegisterBasicInfo.agreeUserContack != true)
                    return this.$message.error('请先同意用户条约！');
                
                // 根据用户选择的时团体还是俱乐部注册 
                // 删除sessionStorage里多余的东西
                 window.sessionStorage.removeItem("clubRegisterBasicInfo");
                    window.sessionStorage.removeItem("clubRegisterNextInfo");
                    window.sessionStorage.removeItem("clubRegisterFinalInfo");
                // if(this.companyRegisterBasicInfo.type == 2) {
                   
                // } else {
                //     window.sessionStorage.removeItem("companyRegisterBasicInfo");
                //     window.sessionStorage.removeItem("companyRegisterNextInfo");
                //     window.sessionStorage.removeItem("companyRegisterFinalInfo");
                // }

                window.sessionStorage.setItem("companyRegisterBasicInfo", JSON.stringify(this.companyRegisterBasicInfo));
                let nextPath;
                // if(this.companyRegisterBasicInfo.type == 2) 
                nextPath = "/register/company/next";
                // else nextPath = "/register/club/next";
                this.$router.push({
                    path: nextPath,
                });
            });
        },
        // 获取邮箱验证码
        async getCheckCode() {
            console.log('Send!')
            this.$refs.companyRegisterBasicInfoRef.validateField('info', async error => {
                if(error) return this.$message.error('请先填写正确的邮箱！');
                const resp = await this.$store.dispatch('other/sendVerCode', {
                    info: this.companyRegisterBasicInfo.info,
                });
                if(resp) {
                    this.isSend = true;
                    this.timeout = 60;
                    this.setTimeout();
                }
            });
            
        },
        // 60s倒计时
        setTimeout(){
            this.timeout--;
            if(this.timeout > 0){
                setTimeout(this.setTimeout,1000);
            } else{
                this.isSend=false;
            }
        }
    },
};
</script>

<style scoped>
/* 团体注册CSS */
.companyInfo {
    width: 550px;
    height: 460px;
    background: white;
    border-radius: 30px 0 30px 30px;
    padding: 20px;
    padding-left: 40px;
    float: right;
}
.getCheckCodeButton {
    margin-left: 20px;
}
.buttons {
    display: flex;
    justify-content: space-evenly;
    position: relative;
    bottom: -1rem;
}
.cancelButton {
    margin-left: 20px;
}


/* 用户条约 */
.userCheckBox {
    display: block;
    margin-bottom: 10px;
}
.userCheckContext {
    margin-left: 10px;
}
.userContactHref {
    text-decoration: underline;
}
</style>