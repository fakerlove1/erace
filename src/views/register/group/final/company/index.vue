<template>
    <!-- 团体注册 -->
    <div class="companyInfo">
        <el-form
            ref="companyRegisterFinalInfoRef"
            :model="companyRegisterFinalInfo"
            :rules="companyRegisterNextFinalRules"
            class="changeInput"
            size="small"
            label-position="left"
            label-width="100px"
        >
            <el-form-item label="公众号:" prop="officialId">
                <el-col :span="15">
                    <el-input
                        v-model="companyRegisterFinalInfo.officialId"
                    ></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="微博:" prop="weiBo">
                <el-col :span="15">
                    <el-input v-model="companyRegisterFinalInfo.weiBo"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="地址:" prop="address">
                <el-col :span="15">
                    <el-input
                        v-model="companyRegisterFinalInfo.address"
                    ></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="简介:" prop="introduction">
                <el-col :span="20">
                    <el-input :rows="5" type="textarea" v-model="companyRegisterFinalInfo.introduction"></el-input>
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
                        @click="$message.warning('只能上传一个文件，若需要上传多个文件，请上传压缩包')"
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
        let info = JSON.parse(window.sessionStorage.getItem("companyRegisterFinalInfo"));
        // console.log(info);
        if (info) this.companyRegisterFinalInfo = info;
    },
    data() {
        return {
            // 团体注册——公司注册 最后一步所需信息
            companyRegisterFinalInfo: {
                officialId: "",
                weiBo: "",
                address: "",
                introduction: "",
                profile: "",
            },
            // 团体注册——公司注册 最后一步所需信 校验规则
            companyRegisterNextFinalRules: {
                officialId: [
                    // {
                    //     required: true,
                    //     message: "请输入公众号",
                    //     trigger: "blur",
                    // },
                ],
                weiBo: [
                    // {
                    //     required: true,
                    //     message: "请输入微博",
                    //     trigger: "blur",
                    // },
                ],
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
                profile: []
            },
            uploadLimit:true
        };
    },
    methods: {
        // 保存当前填写信息
        saveNowInfo() {
            window.sessionStorage.setItem(
                "companyRegisterFinalInfo",
                JSON.stringify(this.companyRegisterFinalInfo)
            );
        },
        handleChange(file, fileList) {
            this.companyRegisterFinalInfo.fileList = fileList;
           // console.log(fileList)
        },
        myUpload(item) {
            //console.log(item);
            this.companyRegisterFinalInfo.profile = item.file;
        },
        // 限制文件大小
        beforeUploadSc (file) {
            var fileSize = file.size;
            const isLt50M = fileSize / 1024 / 1024 <10;
            if (!isLt50M) {
                this.$message.warning(" 上传文件大小不能超过 10mb!");
            }
            this.uploadLimit=isLt50M;
        },
        // 处理注册操作
        handleRegisterSubmit(file) {
            this.$refs.companyRegisterFinalInfoRef.validate((value) => {
                if (value == false) return this.$message.error("请先完善信息");
                    
                if(this.uploadLimit !== true) return this.$message.error("上传文件不符合要求！");
                /*
                 * 注册逻辑代码
                 */
                let data = {
                    ...JSON.parse(window.sessionStorage.getItem("companyRegisterBasicInfo")),
                    ...JSON.parse(window.sessionStorage.getItem("companyRegisterNextInfo")),
                    ...this.companyRegisterFinalInfo,
                }
                data.businessScope = data.businessScope[0] +';'+ data.businessScope[1] +';'+ data.businessScope[2];
                // data.bizScope = JSON.stringify(data.bizScope);
                this.$store.dispatch("user/registerGroup", data);

            });
        },
        // 处理返回上一步操作
        returnLastStep() {
            this.saveNowInfo();
            this.$router.push("/register/company/next");
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
.buttons {
    display: flex;
    justify-content: space-evenly;
    position: relative;
    bottom: -10px;
}
.cancelButton {
    margin-left: 20px;
}
</style>

