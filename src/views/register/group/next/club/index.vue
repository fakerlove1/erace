<template>
    <!-- 团体注册 -->
    <div class="companyInfo">
        <el-form
            ref="clubRegisterNextInfoRef"
            :model="clubRegisterNextInfo"
            :rules="clubRegisterNextInfoRules"
            class="changeInput"
            size="small"
            label-position="left"
            label-width="120px"
        >
            <el-form-item label="俱乐部名称:" prop="organizationName">
                <el-col :span="15">
                    <el-input
                        v-model="clubRegisterNextInfo.organizationName"
                    ></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="组织机构代码:" prop="organizationCode">
                <el-col :span="15">
                    <el-input
                        v-model="clubRegisterNextInfo.organizationCode"
                    ></el-input>
                </el-col>
            </el-form-item>
            <!-- <el-form-item label="业务范围:" prop="businessScope">
                <el-col :span="10">
                    <el-cascader
                        v-model="clubRegisterNextInfo.businessScope"
                        :options="bizScopeOptions"
                        :props="{ expandTrigger: 'hover' }"
                        style="width: 20rem"
                    ></el-cascader>
                </el-col>
            </el-form-item> -->
            <el-divider></el-divider>
            <el-form-item label="联系电话:" prop="tel">
                <el-col :span="12">
                    <el-input
                        v-model="clubRegisterNextInfo.tel"
                    ></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="官网地址:" prop="website">
                <el-col :span="20">
                    <el-input
                        v-model="clubRegisterNextInfo.website"
                    ></el-input>
                </el-col>
            </el-form-item>
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
                    @click="returnLastStep"
                    >上一步</mybutton
                >
            </div>
        </el-form>
    </div>
</template>

<script>
import Mybutton from "@/components/mybutton.vue";
import bizScopeData from "@/data/bizScopeOptions.js";

export default {
    components: {
        Mybutton,
    },
    data() {
        return {
            // 团体注册——公司注册 下一步所需信息
            clubRegisterNextInfo: {
                organizationName: "",
                organizationCode: "",
                businessScope: "",
                tel: "",
                website: "",
            },
            // 团体注册——公司注册 下一步所需信息 校验规则
            clubRegisterNextInfoRules: {
                organizationName: [
                    {
                        required: true,
                        message: "请输入团体名称",
                        trigger: "blur",
                    },
                ],
                organizationCode: [
                    {
                        required: true,
                        message: "请输入组织机构代码",
                        trigger: "blur",
                    },
                ],
                businessScope: [
                    {
                        required: true,
                        message: "请选择业务范围",
                        trigger: "change",
                    },
                ],
                tel: [
                    {
                        required: true,
                        message: "请输入联系电话",
                        trigger: "blur",
                    },
                    // {
                    //     min: 11,
                    //     max: 11,
                    //     message: "请输入正确的电话号码",
                    //     trigger: "blur",
                    // },
                ],
                website: [
                    // {
                    //     required: true,
                    //     message: "请输入官网地址",
                    //     trigger: "blur",
                    // },
                ],
            },
        };
    },
    computed: {
        //   获取业务范围选项
        bizScopeOptions() {
            let data = bizScopeData;
            for(let i = 0; i < data.length; ++i) {
                data[i].value = data[i].wordZh;
                data[i].label = data[i].wordZh;
                if(data[i].children.length > 0) {
                    for(let j = 0; j < data[i].children.length; ++j) {
                        data[i].children[j].value = data[i].children[j].wordZh;
                        data[i].children[j].label = data[i].children[j].wordZh;
                        if(data[i].children[j].children && data[i].children[j].children.length > 0) {
                            for(let k = 0; k < data[i].children[j].children.length; ++k) {
                                data[i].children[j].children[k].value = data[i].children[j].children[k].wordZh;
                                data[i].children[j].children[k].label = data[i].children[j].children[k].wordZh;
                            }
                        }
                    }
                }
            }
            return data;
        }
    },
    created() {
        let info = JSON.parse(window.sessionStorage.getItem("clubRegisterNextInfo"));
        // console.log(info);
        if (info) this.clubRegisterNextInfo = info;
    },
    methods: {
        // 保存当前填写信息
        saveNowInfo() {
            window.sessionStorage.setItem(
                "clubRegisterNextInfo",
                JSON.stringify(this.clubRegisterNextInfo)
            );
        },
        // 处理下一步操作
        handleNextStep() {
            this.$refs.clubRegisterNextInfoRef.validate((value) => {
                if (value == false) return this.$message.error("请先完善信息");
                this.saveNowInfo();
                this.$router.push("/register/club/final");
            });
        },
        // 处理返回上一步操作
        returnLastStep() {
            this.saveNowInfo();
            this.$router.push("/register/group");
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
    padding-top: 40px;
    padding-left: 40px;
    float: right;
}
.buttons {
    display: flex;
    justify-content: space-evenly;
    position: relative;
    bottom: -75px;
}
.cancelButton {
    margin-left: 20px;
}
</style>

