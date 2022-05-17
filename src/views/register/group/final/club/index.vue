<template>
    <!-- 团体注册 -->
    <div class="companyInfo">
        <el-form
            ref="clubRegisterFinalInfoRef"
            :model="clubRegisterFinalInfo"
            :rules="clubRegisterFinalInfoRules"
            class="changeInput"
            size="small"
            label-position="left"
            label-width="100px"
        >
            <el-form-item label="公众号:" prop="officialId">
                <el-col :span="15">
                    <el-input
                        v-model="clubRegisterFinalInfo.officialId"
                    ></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="微博:" prop="weiBo">
                <el-col :span="15">
                    <el-input v-model="clubRegisterFinalInfo.weiBo"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="地址:" prop="address">
                <el-col :span="15">
                    <el-input
                        v-model="clubRegisterFinalInfo.address"
                    ></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="简介:" prop="introduction">
                <el-col :span="20">
                    <el-input
                        :rows="5"
                        type="textarea"
                        v-model="clubRegisterFinalInfo.introduction"
                    ></el-input>
                </el-col>
            </el-form-item>
            <el-form-item
                style="position: relative"
                label="资质文件:"
                prop="profile"
            >
                <el-upload
                    class="uploadComponent"
                    action="#"
                    :limit="1"
                    :on-change="handleChange"
                    :http-request="myUpload"
                    :before-upload="beforeUploadSc"
                >
                    <el-button
                        @click="
                            $message.warning(
                                '只能上传一个文件，若需要上传多个文件，请上传压缩包'
                            )
                        "
                        size="small"
                        type="primary"
                        >点击上传</el-button
                    >
                    <span slot="tip" class="el-upload__tip">
                        上传附件（需包含营业执照、组织机构代码证）
                    </span>
                </el-upload>
            </el-form-item>

            <div class="buttons">
                <mybutton
                    width="120"
                    height="35"
                    size="13"
                    type="orange"
                    @click="handleRegisterSubmit"
                    >注册</mybutton
                >
                <mybutton
                    width="120"
                    height="35"
                    size="13"
                    class="cancelButton"
                    @click="returnLastStep"
                    >上一步</mybutton
                >
            </div>
        </el-form>
    </div>
</template>

<script>
import Mybutton from "@/components/mybutton.vue";
export default {
    components: {
        Mybutton,
    },
    created() {
        let info = JSON.parse(
            window.sessionStorage.getItem("clubRegisterFinalInfo")
        );
        // console.log(info);
        if (info) this.clubRegisterFinalInfo = info;
    },
    data() {
        return {
            uploadUrl: "https://jsonplaceholder.typicode.com/posts/",
            fileList: [],
            // 团体注册——公司注册 最后一步所需信息
            clubRegisterFinalInfo: {
                officialId: "",
                weiBo: "",
                address: "",
                introduction: "",
                profile: "",
                fileList: [],
            },
            // 团体注册——公司注册 最后一步所需信 校验规则
            clubRegisterFinalInfoRules: {
                address: [
                    // {
                    //     required: true,
                    //     message: "请输入地址",
                    //     trigger: "blur",
                    // },
                ],
                introduction: [
                    {
                        required: true,
                        message: "请输入团体简介",
                        trigger: "blur",
                    },
                ],
                profile: [
                    {
                        required: true,
                        message: "请上传附件",
                        trigger: "change",
                    },
                ],
            },
            uploadLimit: true
        };
    },
    methods: {
        // 文件上传数量限制
        handleLimit() {
            this.$message.error(
                "只能上传一个文件，若需要上传多个文件，请上传压缩包"
            );
        },
        // 保存当前填写信息
        saveNowInfo() {
            window.sessionStorage.setItem(
                "clubRegisterFinalInfo",
                JSON.stringify(this.clubRegisterFinalInfo)
            );
        },
        handleChange(file, fileList) {
            this.clubRegisterFinalInfo.fileList = fileList;
            console.log(fileList)
        },
        myUpload(item) {
            console.log(item);
            this.clubRegisterFinalInfo.profile = item.file;
        },
        beforeUploadSc (file) {
        var fileSize = file.size;
       const isLt50M = fileSize / 1024 / 1024 <10;
        if (!isLt50M) {
            this.$message.warning(" 上传文件大小不能超过 10mb!");
        }
        this.uploadLimit =  isLt50M;
    },
        // 处理注册操作
        handleRegisterSubmit() {
            this.$refs.clubRegisterFinalInfoRef.validate((value) => {
                if (value == false) return this.$message.error("请先完善信息");
                if(this.uploadLimit !== true) return this.$message.error("上传文件不符合要求！");
                /*
                 * 注册逻辑代码
                 */
                const data = {
                    ...JSON.parse(window.sessionStorage.getItem("companyRegisterBasicInfo")),
                    ...JSON.parse(window.sessionStorage.getItem("clubRegisterNextInfo")),
                    ...this.clubRegisterFinalInfo,
                }
                data.businessScope = data.businessScope[0] + ";"+data.businessScope[1]+ ";" + data.businessScope[2];
                // console.log(data);
                this.$store.dispatch("user/registerGroup", data);
            });
        },
        // 处理返回上一步操作
        returnLastStep() {
            this.saveNowInfo();
            this.$router.push("/register/club/next");
        },
    },
};
</script>

<style scoped>
.companyInfo {
    width: 550px;
    height: 460px;
    background: white;
    border-radius: 30px 0 30px 30px;
    padding: 20px;
    padding-top: 38px;
    padding-left: 40px;
    float: right;
}
.uploadComponent {
    position: absolute;
}
.buttons {
    display: flex;
    justify-content: space-evenly;
    position: relative;
    bottom: -45px;
}
.cancelButton {
    margin-left: 20px;
}
</style>

