<template>
    <div>
        <div class="crumb-box">
            <el-breadcrumb
                separator-class="el-icon-arrow-right"
                class="bread-crumb"
            >
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>发布协会活动</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="assist-box">
            <el-form
                :model="releaseForm"
                ref="releaseFormRef"
                :rules="releaseFormRules"
                label-width="150px"
                size="small"
                class="formBox form"
            >
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="活动名称：" prop="atyName">
                            <el-input v-model="releaseForm.atyName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="活动类型：" prop="atyTypes">
                            <el-select v-model="releaseForm.atyTypes">
                                <el-option
                                    v-for="item in atyTypeOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="报名时间：" prop="signupTime">
                            <el-date-picker
                                v-model="releaseForm.signupTime"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="15">
                        <el-form-item label="举办时间：" prop="atyTime">
                            <el-date-picker
                                v-model="releaseForm.atyTime"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- 工作人员需求类别和数量 -->
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            v-for="(i,index) in prefPosTitles"
                            :key="index"
                            :label="i"
                            prop="memberType"
                        >
                            <el-select :key="index" v-model="releaseForm.prefPoss[index]">
                                <el-option
                                    v-for="item in memberType"
                                    :key="item.label"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                            <el-input-number
                                style="
                                    position: relative;
                                    left: 20px;
                                    width: 100px;
                                "
                                :min="0"
                                size="small"
                                v-model="releaseForm.prefNums[index]"
                                controls-position="right"
                            ></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1">
                        <el-button
                            style="position: relative; left: -20px"
                            size="small"
                            circle
                            icon="el-icon-plus"
                            @click="addMemberTypeSelect"
                        ></el-button>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="15">
                        <el-form-item label="活动岗位要求：" prop="note">
                            <el-input v-model="releaseForm.note"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="报名费用：" prop="cost">
                            <el-input v-model="releaseForm.cost"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="活动奖金：" prop="reward">
                            <el-input v-model="releaseForm.reward"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="活动地点：" prop="location">
                            <el-cascader
                                v-model="releaseForm.location"
                                :options="locationOption"
                                :props="{ expandTrigger: 'hover' }"
                            ></el-cascader>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="15">
                        <el-form-item label="详细地址：">
                            <!-- locationalUrl的处理 -->
                            <el-input
                                v-model="releaseForm.locationUrl"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="15">
                        <el-form-item label="活动报名联系方式：" prop="cntWay">
                            <el-input v-model="releaseForm.cntWay"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="15">
                        <el-form-item prop="atyScope">
                            <el-radio v-model="releaseForm.atyScope" label="PERSON"
                                >个人</el-radio
                            >
                            <el-radio v-model="releaseForm.atyScope" label="MCH"
                                >团体</el-radio
                            >
                            <el-radio v-model="releaseForm.atyScope" label="ASSOCIATION"
                                >协会单位</el-radio
                            >
                            <el-radio v-model="releaseForm.atyScope" label="ALL"
                                >不限</el-radio
                            >
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="15">
                        <el-form-item label="活动简介：" prop="detail">
                            <el-input
                                v-model="releaseForm.detail"
                                :rows="5"
                                type="textarea"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="活动海报：" prop="covImg">
                            <el-upload
                                class="upload-demo"
                                action="#"
                                :limit="1"
                                :http-request="covImgUpload"
                            >
                                <el-button size="small" type="primary"
                                    >点击上传</el-button
                                >
                                <div slot="tip" class="el-upload__tip">
                                    只能上传jpg/png文件，且不超过500kb
                                </div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="活动组图：" prop="images">
                            <el-upload
                                class="upload-demo"
                                action="#"
                                :limit="1"
                                :http-request="imagesUpload"
                            >
                                <el-button size="small" type="primary"
                                    >点击上传</el-button
                                >
                                <div slot="tip" class="el-upload__tip">
                                    只能上传jpg/png文件，且不超过500kb
                                </div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="活动方案：" prop="additionFile">
                            <el-upload
                                class="upload-demo"
                                action="#"
                                :limit="1"
                                :http-request="additionFileUpload"
                            >
                                <el-button size="small" type="primary"
                                    >点击上传</el-button
                                >
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="buttons">
                    <mybutton class="button" type="orange" @click="handleSubmit"
                        >提交</mybutton
                    >
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import Mybutton from "@/components/mybutton.vue";
import locationOptions from '@/data/locationCascaderOptions'

export default {
    components: {
        Mybutton,
    },
    data() {
        var validateMemerTypes = (rule, value, callback) => {
            if(this.memberTypes[0].type != '' && this.memberTypes[0].number > 0) {
                return callback();
            } else callback('请正确填写!');
        }
        return {
            // 提交的数据
            releaseForm: {
                atyName: "",
                atyTypes: "",
                atyTime: "",
                bgnTime: '',
                endTime: '',
                signupTime: "",
                signupBgnTime: '',
                signupEndTime: '',
                location: "",
                locationUrl: "",
                cntWay: "",
                atyScope: "",
                cost: "",
                reward: '',
                prefPoss: [],
                prefNums: [],
                note: "",
                detail: "",
                images: "",
                covImg: "",
                additionFile: "",
            },
            // 地点选择（省市镇）
            locationOption: locationOptions,
            // 表单校验规则
            releaseFormRules: {
                atyName: [
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: "blur",
                    },
                ],
                atyTypes: [
                    {
                        required: true,
                        message: "请选择活动类型",
                        trigger: "change",
                    },
                ],
                signupTime: [
                    {
                        required: true,
                        message: "请选择活动报名时间",
                        trigger: "change",
                    },
                ],
                atyTime: [
                    {
                        required: true,
                        message: "请选择活动时间",
                        trigger: "blur",
                    },
                ],
                memberType: [
                    // {
                    //     validator: validateMemerTypes,
                    //     trigger: "change",
                    // },
                ],
                note: [
                    // { required: true, message: "请输入活动岗位要求", trigger: "blur" },
                ],
                location: [
                    {
                        required: true,
                        message: "请输入活动地点",
                        trigger: "blur",
                    },
                ],
                locationUrl: [
                    {
                        required: true,
                        message: "请输入详细活动地点",
                        trigger: "blur",
                    },
                ],
                cntWay: [
                    {
                        required: true,
                        message: "请输入活动报名联系方式",
                        trigger: "blur",
                    },
                ],
                atyScope: [
                    {
                        required: true,
                        message: "请选择活动范围",
                        trigger: "blur",
                    },
                ],
                cost: [
                    {
                        required: true,
                        message: "请输入活动报名费用",
                        trigger: "blur",
                    },
                ],
                reward: [
                    {
                        required: true,
                        message: "请输入活动奖金金额",
                        trigger: "blur",
                    },
                ],
                detail: [
                    // { required: true, message: "请输入活动报名联系方式", trigger: "blur" },
                ],
                covImg: [
                    {
                        required: true,
                        message: "请上传活动海报图片",
                        trigger: "change",
                    },
                ],
                images: [
                    // {
                    //     required: true,
                    //     message: "请上传活动组图",
                    //     trigger: "change",
                    // },
                ],
                additionFile: [
                    // {
                    //     required: true,
                    //     message: "请上传活动方案",
                    //     trigger: "change",
                    // },
                ],
            },
            // 工作人员需求类别和数量选项
            memberType: [],
            // 工作人员需求类别和数量数组
            prefPosTitles: ['工作人员需求类别和数量:'],
            // 活动类型
            atyTypeOptions: [],
        };
    },
    created() {
        this.getMemberTypeOptions();
        this.getAtyTypesOptions();
    },
    methods: {
        // 获得工作人员需求类别和数量
        async getMemberTypeOptions() {
            const data = await this.$store.dispatch('data/getMap', 'PREF_POS');
            let options = [];
            data.forEach((v, i) => {
                options.push({
                    label: v.wordZh,
                    value: v.wordEn,
                });
            });
            this.memberType = options;
        },
        // 获取活动类型
        async getAtyTypesOptions() {
            const data = await this.$store.dispatch('data/getMap', 'ACTIVITY_TYPE');
            let options = [];
            data.forEach((v, i) => {
                options.push({
                    label: v.wordZh,
                    value: v.wordEn,
                });
            });
            this.atyTypeOptions = options;
        },


        // 添加工作人员需求类别和数量
        addMemberTypeSelect() {
            this.prefPosTitles.push('');
        },

        // 自定义上传
        covImgUpload(item) {
            this.releaseForm.covImg = item.file;
        },
        imagesUpload(item) {
            this.releaseForm.images = item.file;
        },
        additionFileUpload(item) {
            this.releaseForm.additionFile = item.file;
        },

        // 处理发布活动请求
        handleSubmit() {
            this.$refs.releaseFormRef.validate(async (value) => {
                // if(value != true) return this.$message.error('请先完善信息!');

                let data = {...this.releaseForm}

                // 处理时间为毫秒
                data.bgnTime = new Date(data.atyTime[0]).getTime();
                data.endTime = new Date(data.atyTime[1]).getTime();
                data.signupBgnTime = new Date(data.signupTime[0]).getTime();
                data.signupEndTime = new Date(data.signupTime[1]).getTime();
                
                // 处理人员类别和数量一一对应
                let ttprefPoss = [], ttprefNums = [];
                for(let i = 0; i < data.prefPoss.length; ++i) {
                    if(data.prefPoss[i] != '' && data.prefNums[i] > 0) {
                        ttprefPoss.push(data.prefPoss[i]+'');
                        ttprefNums.push(data.prefNums[i]+'');
                    }
                }
                data.atyTypes = JSON.stringify({'atyTypes': [data.atyTypes]});
                data.prefPoss = JSON.stringify({'prefPoss': ttprefPoss});
                data.prefNums = JSON.stringify({'prefNums': ttprefNums});

                this.$store.dispatch('activity/releaseAty', data);
            });
        },
    },
};
</script>


<style scoped>
.crumb-box {
    padding: 15px;
    background: rgb(115, 134, 147);
    height: 50px;
}

.formBox {
    margin-top: 30px;
}
.upload {
    width: 200px;
    height: 150px;
}
.inline-block {
    display: inline-block;
}
.buttons {
    position: absolute;
    left: 40%;
    height: 100px;
}
</style>