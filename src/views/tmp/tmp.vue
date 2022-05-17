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
        <div class="form-box">
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
                        <el-form-item label="活动名称：">
                            <el-input v-model="releaseForm.atyName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="活动类型：">
                            <el-select v-model="releaseForm.atyType">
                                <el-option
                                    v-for="item in memberType"
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
                        <el-form-item label="报名时间：">
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
                <el-row>
                    <el-col :span="15">
                        <el-form-item label="举办时间：">
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

                <!-- 工作人员需求类别和数量 -->
                <el-row>
                    <el-col :span="10">
                        <el-form-item
                            v-for="i in memberTypes"
                            :key="i.id"
                            :label="i.title"
                        >
                            <el-select :key="i.id" v-model="i.type">
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
                                v-model="i.number"
                                controls-position="right"
                            ></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-button
                            style="position: relative"
                            size="small"
                            circle
                            icon="el-icon-plus"
                            @click="addMemberTypeSelect"
                        ></el-button>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="15">
                        <el-form-item label="活动岗位要求：">
                            <el-input v-model="releaseForm.note"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="活动地点："> 级联选择器 </el-form-item>
                </el-row>
                <el-row>
                    <el-col :span="15">
                        <el-form-item label="详细地址：">
                            <el-input v-model="releaseForm.location"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="15">
                        <el-form-item label="活动报名联系方式：">
                            <el-input v-model="releaseForm.cntWay"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="15">
                        <el-form-item>
                            <el-radio v-model="releaseForm.atyScope" label="1"
                                >个人</el-radio
                            >
                            <el-radio v-model="releaseForm.atyScope" label="2"
                                >团体</el-radio
                            >
                            <el-radio v-model="releaseForm.atyScope" label="3"
                                >协会单位</el-radio
                            >
                            <el-radio v-model="releaseForm.atyScope" label="4"
                                >不限</el-radio
                            >
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="15">
                        <el-form-item label="活动简介：">
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
                        <el-form-item
                            ><el-upload
                                class="upload inline-block"
                                drag
                                action="https://jsonplaceholder.typicode.com/posts/"
                                multiple
                            >
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">
                                    将文件拖到此处，或<em>点击上传</em>
                                </div>
                                <div
                                    class="el-upload__tip inline-block"
                                    slot="tip"
                                >
                                    上传附件（需包含活动方案，封面尺寸：420*285
                                    430*580 206*152）
                                </div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="buttons">
                    <my-button class="button" type="orange" @click="handleSubmit"
                        >提交</my-button
                    >
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import Mybutton from "@/components/mybutton.vue";
export default {
    components: {
        myButton: Mybutton,
    },
    data() {
        return {
            // 提交的数据
            releaseForm: {
                atyName: "",
                atyType: "",
                atyTime: "",
                // bgnTime: '',
                // endTime: '',
                signupTime: "",
                // signupBgnTime: '',
                // signupEndTime: '',
                location: "",
                locationUrl: "",
                atyScope: "",
                cost: "",
                prefPoss: "",
                prefNums: "",
                note: "",
                detail: "",
                images: "",
                annex: "",
                cntWay: "",
            },
            // 表单校验规则
            releaseFormRules: [],
            // 工作人员需求类别和数量选项
            memberType: [
                { value: "1", label: "导引类" },
                { value: "2", label: "接待类" },
                { value: "3", label: "服务类" },
                { value: "4", label: "新闻通讯类" },
                { value: "5", label: "秩序维护类" },
                { value: "6", label: "选手管理类" },
                { value: "7", label: "现场表演类" },
                { value: "8", label: "活动宣发类" },
            ],
            // 工作人员需求类别和数量数组
            memberTypes: [
                {
                    id: 1,
                    title: "工作人员需求类别和数量：",
                    type: "",
                    number: 0,
                },
            ],
            // 活动地点选项
            ProvinceOptions: [
                { value: "1", label: "江苏省" },
                { value: "2", label: "上海市" },
            ],
            // 活动类型
            atyType: "",
        };
    },
    methods: {
        addMemberTypeSelect() {
            let item = {
                id: this.memberTypes.length + 1,
                title: "",
                type: "",
                number: 0,
            };
            this.memberTypes.push(item);
            console.log(this.memberTypes);
        },
        handleSubmit() {
            
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

.form-box {
    position: relative;
    padding-left: 70px;
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