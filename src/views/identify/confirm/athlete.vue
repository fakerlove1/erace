<template>
  <div class="container">
    <el-form :model="filesInfo" ref="filesInfoRef" :rules="filesInfoRules">
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
            只能上传单个大小不超过10mb的pdf，jpg或者png文件!
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
        <el-link type="info" @click="download(1)" id="my"
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
      <el-form-item label="协议：" prop="otherFileZip">
        <p>
          请提交其他证明材料（见申请协议）
        </p>
        <el-upload
          class="upload-demo"
          action="#"
          :limit="1"
          :http-request="otherFileZipUPload"
          multiple
          :before-upload="beforeUploadOther"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <div style="display:flex;justify-content:center">
      <mybutton type="orange" style="align:center" @click="handleSubmit">
        提交
      </mybutton>
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
      filesInfo: {
        photo: "",
        idcard: "",
        agreement: "",
        enrollApplication: "",
        idcard: "",
        qualificationProtocol: "",
        otherFileZip: "",
      },
      filesInfoRules: {
        photo: [
          {
            required: true,
            message: "请上传二代身份证扫描件！",
            trigger: "blur",
          },
        ],
        idcard: [
          {
            required: true,
            message: "请上传二寸照片！",
            trigger: "blur",
          },
        ],
        agreement: [
          {
            required: true,
            message: "请上传聘用合同复印件！",
            trigger: "blur",
          },
        ],
        enrollApplication: [
          {
            required: true,
            message: "请上传运动员注册申请表！",
            trigger: "blur",
          },
        ],
        qualificationProtocol: [
          {
            required: true,
            message: "请上传注册运动员代表资格协议！",
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
  },
  created() {
    // console.log("->",this.$store.getters.ATHLETE_INFO)
  },
  methods: {
    // 上传
    IdCardUpload(item) {
      this.filesInfo.idcard = item.file;
    },
    photogUpload(item) {
      this.filesInfo.photo = item.file;
    },
    agreementUpload(item) {
      this.filesInfo.agreement = item.file;
    },
    extraUpload(item) {
      this.filesInfo.enrollApplication = item.file;
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
    beforeUpload(file) {},
    handleSubmit() {
      console.log(this.filesInfo);
      this.$refs.filesInfoRef.validate(async (valid) => {
        if (!valid) return this.$message.error("填写不符合要求！");
        // console.log("=>",this.filesInfo)
        // 处理上传文件的错误
        const finalLimit =
          this.uploadLimitID &&
          this.uploadLimitPhoto &&
          this.uploadLimitCopy &&
          this.uploadLimitApply &&
          this.uploadLimitProtocol &&
          this.uploadLimitOther;
        if (!finalLimit) return this.$message.error("上传文件不符合要求！");
        var Info = {
          ...this.$store.getters.ATHLETE_INFO,
          ...this.filesInfo,
        };
        // console.log(this.$store.getters.ATHLETE_INFO);

        await this.$store.dispatch("certificate/submitCertification", Info);
        location.reload();
      });
    },
    async download(id) {
      this.$store.dispatch("certificate/downloadTemplate", id);
    },

    // TODO：格式限制没加好
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

<style>
.buttons {
  display: flex;
  justify-content: center;
}
.el-form .el-form-item {
  margin: 2rem;
}
.container {
  margin: 2rem;
}
a {
  cursor: pointer;
}
.el-upload__tip {
  color: rgb(0, 0, 255);
}
</style>
