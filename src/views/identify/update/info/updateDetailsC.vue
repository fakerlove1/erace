<template>
  <div>
    <el-form
      class="changeInput"
      :model="info"
      :rules="infoRules"
      label-position="left"
      ref="infoRef"
      label-width="110px"
      style="
      margin-top: 40px;
      margin-left: 40px;
      "
    >
      <el-form-item class="width" label="姓名：" prop="name">
        <el-col :span="10">
          <el-input v-model="info.name" disabled></el-input>
        </el-col>
      </el-form-item>

      <el-form-item class="width" label="性别：" prop="sex">
        <el-radio-group v-model="info.sex" disabled>
          <el-radio label="MALE">男</el-radio>
          <el-radio label="FEMALE">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="width" label="组别：" prop="type">
        <el-radio-group v-model="info.type">
          <el-radio label="PROFESSIONAL_PLAYER">职业组</el-radio>
          <el-radio label="AMATEUR_PLAYER">非职业组</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="width" label="出生日期：" prop="birth">
        <el-col :span="10">
          <el-input v-model="getdate" placeholder="如2000-07"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="width" label="籍贯：" prop="origin">
        <el-col :span="10">
          <el-input
            v-model="info.origin"
            placeholder="如江苏南京"
            disabled
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="width" label="游戏项目：" prop="project">
        <el-col :span="10">
          <el-select v-model="info.project">
            <el-option
              v-for="item in projects"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item class="width" label="运动员等级：" prop="level">
        <el-col :span="10">
          <el-select v-model="info.level">
            <el-option
              v-for="item in levels"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item class="width" label="身份证号码：" prop="idcardNumber">
        <el-col :span="10">
          <el-input v-model="info.idcardNumber" disabled></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="width" label="俱乐部名称：" prop="club">
        <el-col :span="10">
          <el-input v-model="info.club" disabled></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="身份证扫描件：" prop="idcard">
        <p>请上传运动员二代身份证扫描件</p>
        <el-upload
          class="upload-demo"
          action="#"
          :limit="1"
          :http-request="IdCardUpload"
          :before-upload="beforeUploadID"
          multiple
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div class="el-upload__tip" slot="tip">
            只能上传单个大小不超过10mb的pdf,jpg或者png文件!
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="运动员两寸照片：" prop="photo">
        <p>请上传运动员运动员两寸照片</p>
        <el-upload
          class="upload-demo"
          action="#"
          :limit="1"
          :http-request="photogUpload"
          :before-upload="beforeUploadSp"
          multiple
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div class="el-upload__tip" slot="tip">
            只能上传单个大小不超过10mb的png或者jpg文件!
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="聘用合同复印件：" prop="agreement">
        <p>请上传聘用合同（扫描复印件）</p>
        <el-upload
          class="upload-demo"
          action="#"
          :limit="1"
          :http-request="agreementUpload"
          :before-upload="beforeUploadCopy"
          multiple
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div class="el-upload__tip" slot="tip">
            只能上传单个大小不超过10mb的pdf,jpg或者png文件!
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="申请表：" prop="enrollApplication">
        <p>请提交《江苏省电子竞技运动协会运动员注册申请表》</p>
        <el-upload
          class="upload-demo"
          action="#"
          :limit="1"
          :http-request="enrolUpload"
          :before-upload="beforeUploadSc"
          multiple
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div class="el-upload__tip" slot="tip">
            只能上传单个大小不超过10mb的pdf文件!
          </div>
        </el-upload>
        <el-link type="info" @click="download(1)"
          >点击下载《江苏省电子竞技运动协会运动员注册申请表》</el-link
        >
      </el-form-item>
      <el-form-item label="协议：" prop="qualificationProtocol">
        <p>
          请提交《江苏省电子竞技运动协会注册运动员代表资格协议》
        </p>
        <el-upload
          class="upload-demo"
          action="#"
          :limit="1"
          :http-request="qualificationUpload"
          :before-upload="beforeUploadProtocol"
          multiple
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div class="el-upload__tip" slot="tip">
            只能上传单个大小不超过10mb的pdf文件!
          </div>
        </el-upload>
        <el-link type="info" @click="download(2)"
          >点击下载《江苏省电子竞技运动协会注册运动员代表资格协议》</el-link
        >
      </el-form-item>
      <!-- TODO 放下载模板 -->
      <el-form-item label="其他证明材料：" prop="qualificationProtocol">
        <p>
          请提交其他证明材料（见申请协议）
        </p>
        <el-upload
          class="upload-demo"
          action="#"
          :limit="1"
          :http-request="otherFileZipUPload"
          :before-upload="beforeUploadOther"
          multiple
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <div class="buttons">
      <mybutton class="button" type="orange" @click="updateAuthentication"
        >提交</mybutton
      >
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
    return {
      isEdited: true,
      info: this.$store.getters.COACH_INFO,
      filesInfo: {
        idcard: "",
        photo: "",
        agreement: "",
        enrollApplication: "",
        qualificationProtocol: "",
        otherFileZip: "",
      },
      projects: [
        { value:"王者荣耀", label: "王者荣耀" },
        { value:"英雄联盟", label: "英雄联盟" },
        { value: "炉石传说", label: "炉石传说" },
        { value: "炉石传说", label: "星际争霸" },
      ],
      levels: [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
      ],
      infoRules: {
        name: [
          {
            required: true,
            message: "请输入真实姓名！",
            trigger: "blur",
          },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别！",
            trigger: "blur",
          },
        ],
        group: [
          {
            required: true,
            message: "请选择组别！",
            trigger: "blur",
          },
        ],
        birth: [
          {
            required: true,
            message: "请选择出生日期！",
            trigger: "blur",
          },
        ],
        project: [
          {
            required: true,
            message: "请选择游戏项目！",
            trigger: "blur",
          },
        ],
        level: [
          {
            required: true,
            message: "请选择运动员等级！",
            trigger: "blur",
          },
        ],
        club: [
          {
            required: true,
            message: "请输入俱乐部名称！",
            trigger: "blur",
          },
        ],
        clubType: [
          {
            required: true,
            message: "请输入俱乐部类型！",
            trigger: "blur",
          },
        ],
        origin: [
          {
            required: true,
            message: "请输入籍贯！",
            trigger: "blur",
          },
        ],

        idcardNumber: [
          {
            required: true,
            message: "请输入身份证号码！",
            trigger: "blur",
          },
          {
            min: 18,
            max: 18,
            message: "身份证长度不合法",
            trigger: "blur",
          },
        ],
      },

      // 上传文件限制
      uploadLimitID: true,
      uploadLimitPhoto: true,
      uploadLimitCopy: true,
      uploadLimitApply: true,
      uploadLimitProtocol: true,
      uploadLimitOther: true,
    };
  },
  computed: {
    USER_ID() {
      return this.$store.getters.userId;
    },
    cardIdComputed() {
      return (
        this.info.cardId.substring(0, 3) +
        "***********" +
        this.info.cardId.substring(14, 18)
      );
    },
    sex() {
      switch (this.info.gender) {
        case "FEMALE":
          return "女 ";
        case "MALE":
          return "男";
        case "X":
          return "不愿透露";
      }
    },
    // 时间戳转换
    getdate() {
      //  console.log("=>",this.certInfo.memberBirth) ;
      var date = new Date(parseInt(this.info.birth));
      // console.log(date);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";

      return Y + M + D;
    },
  },
  created() {
    console.log(this.$store.getters.ATHLETE_INFO);
  },
  methods: {
    beforeUpload() {},
    async updateAuthentication() {
      // 处理上传文件的错误
      const finalLimit =
        this.uploadLimitID &&
        this.uploadLimitPhoto &&
        this.uploadLimitCopy &&
        this.uploadLimitApply &&
        this.uploadLimitProtocol &&
        this.uploadLimitOther;
      if (!finalLimit) return this.$message.error("上传文件不符合要求！");
      await this.$store.dispatch("certificate/updateAuthentication", {
        ...this.filesInfo,
        ...this.info,
        memberId: this.info.id,
      });
      location.reload();
    },
    IdCardUpload(item) {
      this.filesInfo.idcard = item.file;
    },
    photogUpload(item) {
      this.filesInfo.photo = item.file;
    },
    agreementUpload(item) {
      this.filesInfo.agreement = item.file;
    },
    enrolUpload(item) {
      this.filesInfo.enrollApplication = item.file;
    },
    qualificationUpload(item) {
      this.filesInfo.qualificationProtocol = item.file;
    },
    otherFileZipUPload(item) {
      this.filesInfo.otherFileZip = item.file;
    },
    // 下载附件
    async download(id) {
      this.$store.dispatch("certificate/downloadTemplate", id);
    },
    // 大小限制
    beforeUpload(file) {
      var fileSize = file.size;

      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg == "pdf" || testmsg == "PDF";
      const extension2 = testmsg == "png" || testmsg == "PNG";
      const extension3 = testmsg == "jpg" || testmsg == "JPG";
      const formatJudge = extension2 || extension || extension3;
      if (!formatJudge) {
        this.$message({
          message: "上传文件只能是pdf,png或jpg格式!",
          type: "warning",
        });
      }
      const isLt50M = fileSize / 1024 / 1024 <10;
      if (!isLt50M) {
        this.$message.warning(" 上传文件大小不能超过 10mb!");
      }
      this.uploadLimitPP = isLt50M && formatJudge;
    },
    // 大小限制(Sc)
    beforeUploadSc(file) {
      var fileSize = file.size;

      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg == "pdf" || testmsg == "PDF";
      //const extension2 = testmsg == "png" || testmsg == "PNG";
      const formatJudge = extension;
      if (!formatJudge) {
        this.$message({
          message: "上传文件只能是pdf格式!",
          type: "warning",
        });
      }
      const isLt50M = fileSize / 1024 / 1024 <10;
      if (!isLt50M) {
        this.$message.warning(" 上传文件大小不能超过 10mb!");
      }
      this.uploadLimitPdf = isLt50M && formatJudge;
    },
    // 大小限制(Sp)
    // 大小限制
    beforeUploadID(file) {
      var fileSize = file.size;

      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg == "pdf" || testmsg == "PDF";
      const extension2 = testmsg == "png" || testmsg == "PNG";
      const extension3 = testmsg == "jpg" || testmsg == "JPG";
      const formatJudge = extension2 || extension || extension3;
      if (!formatJudge) {
        this.$message({
          message: "上传文件只能是pdf,png或jpg格式!",
          type: "warning",
        });
      }
      const isLt50M = fileSize / 1024 / 1024 <10;
      if (!isLt50M) {
        this.$message.warning(" 上传文件大小不能超过 10mb!");
      }
      this.uploadLimitID = isLt50M && formatJudge;
    },

    // 复印件
    beforeUploadCopy(file) {
      var fileSize = file.size;

      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg == "pdf" || testmsg == "PDF";
      const extension2 = testmsg == "png" || testmsg == "PNG";
      const extension3 = testmsg == "jpg" || testmsg == "JPG";
      const formatJudge = extension2 || extension || extension3;
      if (!formatJudge) {
        this.$message({
          message: "上传文件只能是pdf,png或jpg格式!",
          type: "warning",
        });
      }
      const isLt50M = fileSize / 1024 / 1024 <10;
      if (!isLt50M) {
        this.$message.warning(" 上传文件大小不能超过 10mb!");
      }
      this.uploadLimitCopy = isLt50M && formatJudge;
    },

    // 大小限制(Sc)申请表
    beforeUploadSc(file) {
      var fileSize = file.size;

      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg == "pdf" || testmsg == "PDF";
      //const extension2 = testmsg == "png" || testmsg == "PNG";
      const formatJudge = extension;
      if (!formatJudge) {
        this.$message({
          message: "上传文件只能是pdf格式!",
          type: "warning",
        });
      }
      const isLt50M = fileSize / 1024 / 1024 <10;
      if (!isLt50M) {
        this.$message.warning(" 上传文件大小不能超过 10mb!");
      }
      this.uploadLimitApply = isLt50M && formatJudge;
    },

    // 大小限制(Sc)协议
    beforeUploadProtocol(file) {
      var fileSize = file.size;

      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg == "pdf" || testmsg == "PDF";
      //const extension2 = testmsg == "png" || testmsg == "PNG";
      const formatJudge = extension;
      if (!formatJudge) {
        this.$message({
          message: "上传文件只能是pdf格式!",
          type: "warning",
        });
      }
      const isLt50M = fileSize / 1024 / 1024 <10;
      if (!isLt50M) {
        this.$message.warning(" 上传文件大小不能超过 10mb!");
      }
      this.uploadLimitProtocol = isLt50M && formatJudge;
    },
    // 大小限制(Sp)两寸照
    beforeUploadSp(file) {
      var fileSize = file.size;

      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      //const extension = testmsg == "pdf" || testmsg == "PDF";
      const extension2 = testmsg == "png" || testmsg == "PNG";
      const extension3 = testmsg == "jpg" || testmsg == "JPG";
      const formatJudge = extension2 || extension3;
      if (!formatJudge) {
        this.$message({
          message: "上传文件只能是png或者jpg格式!",
          type: "warning",
        });
      }
      const isLt50M = fileSize / 1024 / 1024 <10;
      if (!isLt50M) {
        this.$message.warning(" 上传文件大小不能超过 10mb!");
      }
      this.uploadLimitPhoto = isLt50M && formatJudge;
    },

    // 其他
    beforeUploadOther(file) {
      var fileSize = file.size;
      const isLt50M = fileSize / 1024 / 1024 <10;
      if (!isLt50M) {
        this.$message.warning(" 上传文件大小不能超过 10mb!");
      }
      this.uploadLimitOther = isLt50M;
    },
  },
};
</script>

<style scoped>
.width {
  width: 550px;
}
.largewidth {
  width: 700px;
}
.download-icon {
  cursor: pointer;
  width: 50px;
}
.buttons {
  margin-left: 35%;
  margin-bottom: 30px;
}
.buttons .button + .button {
  margin-left: 10%;
}

.userVer-buttons {
  margin-left: 15%;
}
.userVer-buttons .button + .button {
  margin-left: 15%;
}

.download-icon {
  cursor: pointer;
  width: 50px;
}
.el-upload__tip {
  color: rgb(0, 0, 255);
}
</style>
