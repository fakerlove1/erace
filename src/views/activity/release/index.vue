<template>
  <div>
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
            <el-form-item label="活动名称：" prop="actName">
              <el-input v-model="releaseForm.actName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="活动类型：" prop="actType">
              <el-select v-model="releaseForm.actType">
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
              v-for="(i, index) in prefPosTitles"
              :key="index"
              :label="i"
              prop="staffTypes"
            >
              <el-select :key="index" v-model="releaseForm.staffTypes[index]">
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
                v-model="releaseForm.staffCount[index]"
                controls-position="right"
              ></el-input-number>
              <el-col :span="30">
                <el-form-item label="活动岗位要求：" prop="jobRequirement">
                  <el-input
                    v-model="releaseForm.tmpRequirement[index]"
                    placeholder="请描述清楚是否要求全程参加"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-button
              style="position: relative; left: -20px"
              size="small"
              circle
              icon="el-icon-plus"
              @click="addMemberTypeSelect"
            ></el-button>
            <el-button
              v-show="this.prefPosTitles.length > 1"
              style="position: relative; left: -20px"
              size="small"
              circle
              icon="el-icon-minus"
              @click="removeMemberTypeSelect"
            ></el-button>
          </el-col>
        </el-row>

        <!-- <el-row>
                    <el-col :span="15">
                        <el-form-item
                            label="活动岗位要求："
                            prop="jobRequirement"
                        >
                            <el-input
                                v-model="releaseForm.jobRequirement"
                                placeholder="请描述清楚是否要求全程参加"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> -->
        <el-row>
          <el-col :span="7">
            <el-form-item label="报名费用：" prop="cost">
              <el-input v-model.number="releaseForm.cost"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="活动奖金：" prop="reward">
              <el-input v-model.number="releaseForm.reward"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="releaseForm.actType != '线上赛事'">
          <el-col :span="20">
            <el-form-item label="活动地点：" prop="actAddress">
              <el-cascader
                v-model="releaseForm.actAddress"
                :options="locationOption"
                :props="{ expandTrigger: 'hover' }"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15" v-if="releaseForm.actType != '线上赛事'">
            <el-form-item label="详细地址：" prop="detailAddress">
              <!-- locationalUrl的处理 -->
              <el-input v-model="releaseForm.detailAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="活动报名联系方式：" prop="contactWay">
              <el-input v-model="releaseForm.contactWay" placeholder="如联系人电话、qq号码等"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item prop="actScope" label="报名对象">
              <el-radio v-model="releaseForm.actScope" label="PERSON"
                >个人</el-radio
              >
              <el-radio v-model="releaseForm.actScope" label="GROUP"
                >团体</el-radio
              >
              <el-radio v-model="releaseForm.actScope" label="ALL"
                >不限</el-radio
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="活动简介：" prop="actInformation">
              <el-input
                v-model="releaseForm.actInformation"
                :rows="5"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="活动海报：" prop="poster">
              <el-upload
                class="upload-demo"
                action="#"
                :limit="1"
                :http-request="covImgUpload"
                :before-upload="beforeUploadPhoto"
                multiple
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg或者png文件，且不超过10mb
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="活动组图：" prop="picture">
              <el-upload
                class="upload-demo"
                action="#"
                :limit="10"
                :http-request="imagesUpload"
                :before-upload="beforeUploadPhoto"
                multiple
                :file-list="releaseForm.picture"
                :on-remove="handleRemove"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg或者png文件，且不超过10mb
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="活动方案：" prop="actPlan">
              <el-upload
                class="upload-demo"
                action="#"
                :limit="1"
                :http-request="additionFileUpload"
                :before-upload="beforeUploadSc"
              >
                <el-button size="small" type="primary">点击上传</el-button>
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
import locationOptions from "@/data/locationCascaderOptions";
import { ATY_TYPES, PREF_POS } from "@/data/wordMap.js";

export default {
  components: {
    Mybutton,
  },
  data() {
    var validateMemerTypes = (rule, value, callback) => {
      if (this.memberTypes[0].type != "" && this.memberTypes[0].number > 0) {
        return callback();
      } else callback("请正确填写!");
    };
    return {
      // 提交的数据
      releaseForm: {
        actName: "",
        actType: "",
        atyTime: "",
        holdBeginTime: "",
        holdEndTime: "",
        signupTime: "",
        enrollBeginTime: "",
        enrollEndTime: "",
        actAddress: "",
        detailAddress: "",
        contactWay: "",
        actScope: "",
        cost: "",
        reward: "",
        staffTypes: [],
        staffCount: [],
        tmpRequirement: [],
        jobRequirement: "",
        actInformation: "",
        picture: [],
        poster: "",
        actPlan: "",
      },
      // 地点选择（省市镇）
      locationOption: locationOptions,
      // 表单校验规则
      releaseFormRules: {
        actName: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur",
          },
        ],
        actType: [
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
        actAddress: [
          {
            required: true,
            message: "请输入活动地点",
            trigger: "blur",
          },
        ],
        detailAddress: [
          {
            required: true,
            message: "请输入详细活动地点",
            trigger: "blur",
          },
        ],
        contactWay: [
          {
            required: true,
            message: "请输入活动报名联系方式",
            trigger: "blur",
          },
        ],
        actScope: [
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
          { type: "number", message: "必须为数字值" },
        ],
        reward: [
          {
            required: true,
            message: "请输入活动奖金金额",
            trigger: "blur",
          },
          { type: "number", message: "必须为数字值" },
        ],
        poster: [
          {
            required: true,
            message: "请上传活动海报图片",
            trigger: "change",
          },
        ],
        actPlan: [
          {
            required: true,
            message: "请上传活动方案",
            trigger: "change",
          },
        ],
        picture: [
          {
            required: true,
            message: "请上传活动组图",
            trigger: "change",
          },
        ],
      },
      // 工作人员需求类别和数量选项
      memberType: PREF_POS,
      // 工作人员需求类别和数量数组
      prefPosTitles: ["工作人员需求类别和数量:"],
      // 活动类型
      atyTypeOptions: ATY_TYPES,
      // 文件限制
      uploadLimitP: true,
      uploadLimitF: true,
      uploadLimitPlan: true,
    };
  },
  created() {
    // this.releaseForm = this.$store.getters.reLaunched
    // console.log(this.$store.getters.reLaunched);
  },
  watch: {
    $route: "clear",
  },
  methods: {
    // 添加工作人员需求类别和数量
    addMemberTypeSelect() {
      this.prefPosTitles.push("");
    },
    // 删除工作人员需求类别和数量
    removeMemberTypeSelect() {
      this.prefPosTitles.pop();
    },
    // 自定义上传
    covImgUpload(item) {
      this.releaseForm.poster = item.file;
    },
    imagesUpload(item) {
      this.releaseForm.picture.push(item.file);
      console.log(this.releaseForm.picture);
    },
    additionFileUpload(item) {
      this.releaseForm.actPlan = item.file;
    },

    // 删除文件
    handleRemove(file, fileList) {
      // fileList.splice(fileList.indexOf(file.name),1);
      this.releaseForm.picture = fileList;
      console.log(file.name);
      console.log(fileList);
    },
    beforeUploadPhoto(file) {
      var fileSize = file.size;
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg == "jpg" || testmsg == "JPG";
      const extension2 = testmsg == "png" || testmsg == "PNG";
      const ext = extension || extension2;
      if (!(extension || extension2)) {
        this.$message({
          message: "上传文件只能是 jpg或者png格式!",
          type: "warning",
        });
      }
      const isLt2M = fileSize / 1024 / 1024 < 10;
      if (!isLt2M) {
        this.$message.warning(" 上传文件大小不能超过 10MB!");
      }
      const fileJudge = ext && isLt2M;
      this.uploadLimitP = fileJudge;
      //  console.log(this.uploadLimitP);
    },

    beforeUploadSc(file) {
      var fileSize = file.size;
      const isLt50M = fileSize / 1024 / 1024 <10;
      if (!isLt50M) {
        this.$message.warning(" 上传文件大小不能超过 10mb!");
      }
      this.uploadLimitF = isLt50M;
    },
    // 企划书格式限制
    beforeUploadPlan(file) {
      var fileSize = file.size;

      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension =
        testmsg == "doc" ||
        testmsg == "docx" ||
        testmsg == "DOC" ||
        testmsg == "DOCX";
      const extension2 = testmsg == "pdf" || testmsg == "PDF";
      const extension3 = testmsg == "ppt" || testmsg == "PPT";
      const sizeJudge = extension || extension2 || extension3;
      if (!sizeJudge) {
        this.$message({
          message: "上传文件只能是 word、ppt、pdf格式!",
          type: "warning",
        });
      }
      const isLt100M = fileSize / 1024 / 1024 < 100;
      if (!isLt100M) {
        this.$message.warning(" 上传文件大小不能超过 100MB!");
      }
      this.uploadLimitPlan = isLt100M && sizeJudge;
    },

    handleSubmit() {
      this.$refs.releaseFormRef.validate(async (value) => {
        // 处理上传文件的错误
        if (
          this.uploadLimitP !== true ||
          this.uploadLimitF !== true ||
          this.uploadLimitPlan !== true
        )
          return this.$message.error("上传文件不符合要求！");

        let data = { ...this.releaseForm };

        // 把时间变成毫秒制
        data.holdBeginTime = new Date(data.atyTime[0]).getTime();
        data.holdEndTime = new Date(data.atyTime[1]).getTime();
        data.enrollBeginTime = new Date(data.signupTime[0]).getTime();
        data.enrollEndTime = new Date(data.signupTime[1]).getTime();

        // 处理人员类别和数量一一对应
        let ttprefPoss = "",
          ttprefNums = "";
        for (let i = 0; i < data.staffTypes.length; ++i) {
          if (data.staffTypes[i] != "" && data.staffCount[i] > 0) {
            ttprefPoss += data.staffTypes[i] + ";";
            ttprefNums += data.staffCount[i] + ";";
          }
        }
        // 处理地区(数组->字符串)
        if (data.actAddress == "undefined"||data.actAddress=="") {
          data.actAddress = "线上";
        } else {
          let location = data.actAddress[0];
          for (let i = 1; i < data.actAddress.length; ++i) {
            location = location + "-" + data.actAddress[i];
          }

          data.actAddress = location;
        }
        data.staffTypes = ttprefPoss;
        data.staffCount = ttprefNums;

        // console.log(data);
        // console.log(this.releaseForm)

        const result = await this.$store.dispatch("activity/releaseAty", data);
        if (result) {
          this.$store.commit("activity/SET_RELAUNCHED", "");
          setTimeout(() => {
            this.$router.push("/activity/my");
          }, 750);
        }
      });
    },
  },
};
</script>

<style scoped>
.formBox {
  margin-top: 30px;
}
.upload {
  width: 200px;
  height: 150px;
}
::v-deep .el-upload-list__item {
  background-color: #dadada;
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
