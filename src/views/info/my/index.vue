// 我的信息页面，展示、修改自己的个人信息
<template>
  <div>
    <el-form
      class="changeInput"
      :model="editedInfo"
      :rules="editedInfoFromRules"
      ref="editedInfoRef"
      label-width="110px"
      style="
                overflow: auto;
                margin-top: 30px;
                margin-left: 40px;
            "
    >
      <el-form-item v-show="!isEdited" class="width" label="姓名：">
        <p v-if="info.name">{{ info.name }}</p>
        <p v-else style="color:red;">-</p>
      </el-form-item>
      <el-form-item v-show="!isEdited" class="width" label="身份证：">
        <p v-if="info.cardId">{{ cardIdComputed }}</p>
        <p v-else style="color:red;">-</p>
      </el-form-item>
      <!-- <el-form-item v-show="!isEdited||(isEdited&&info.cardId!='no-card-id')" class="width" label="性别：">
                <p v-if="info.cardId!='no-card-id'">{{ sex }}</p>
                <p v-else style="color:red;">还未实名</p>
            </el-form-item>
            <el-form-item v-show="!isEdited||(isEdited&&info.cardId!='no-card-id')" class="width" label="出生年月：">
                <p v-if="info.cardId!='no-card-id'">{{ info.birthDate }}</p>
                <p v-else style="color:red;">还未实名</p>
            </el-form-item> -->
      <el-form-item
        v-show="isEdited"
        class="width"
        label="真实姓名："
        prop="name"
      >
        <el-col :span="10">
          <el-input v-model="editedInfo.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item
        v-show="isEdited"
        class="width"
        label="身份证号码："
        prop="cardId"
      >
        <el-col :span="15">
          <el-input v-model="editedInfo.cardId"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item v-show="isEdited" class="width" label="性别：">
        <el-radio-group v-model="editedInfo.sex">
          <el-radio label="MALE">男</el-radio>
          <el-radio label="FEMALE">女</el-radio>
          <el-radio label="X">不愿透露</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 拍摄身份证件照实名认证，界面代码预留 -->
      <!-- <el-form-item v-show="info.cardId=='no-card-id'&&isEdited" class="width" label="身份证正面：">
                <p v-show="!isEdited" v-if="info.profile == 'no-profile'">还未上传个人简历，点击修改按钮即可上传</p>
                <el-image v-show="!isEdited" v-else class="download-icon" :src="require('@/assets/imgs/other/dataPack.png')" @click="handleDataDownload()"></el-image>
                <el-upload
                    v-show="isEdited"
                    drag
                    action="#"
                    :limit="1"
                    :http-request="myUserVerUpload1"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form-item>
            <el-form-item v-show="info.cardId=='no-card-id'&&isEdited" class="width" label="身份证反面：">
                <p v-show="!isEdited" v-if="info.profile == 'no-profile'">还未上传个人简历，点击修改按钮即可上传</p>
                <el-image v-show="!isEdited" v-else class="download-icon" :src="require('@/assets/imgs/other/dataPack.png')" @click="handleDataDownload()"></el-image>
                <el-upload
                    v-show="isEdited"
                    drag
                    action="#"
                    :limit="1"
                    :http-request="myUserVerUpload2"
                >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form-item> -->
      <!-- <el-form-item>
                <Mybutton v-show="info.cardId=='no-card-id'&&isEdited" type="orange" @click="handleUserVer">
                    确认
                </Mybutton>
            </el-form-item> -->

      <el-form-item v-show="!isEdited" label="邀请码：">
        <el-col :span="4">
          <el-input size="mini" v-model="invCode"></el-input>
        </el-col>
        <el-col :span="4">
          <Mybutton
            width="80"
            height="30"
            style="position:relative; left:15px;"
            @click="submitInvCode"
            >确认</Mybutton
          >
        </el-col>
      </el-form-item>

      <el-divider class="largewidth"></el-divider>

      <!-- <el-form-item class="width" label="意向岗位：">
                <p v-if="!isEdited">{{ !info.preferPosition ? '-' : info.preferPosition}}</p>
                <el-select v-else v-model="editedInfo.preferPosition">
                    <el-option
                        v-for="item in prefPos"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
            </el-form-item> -->
      <el-form-item class="width" label="教育经历：">
        <p v-if="!isEdited">{{ info.education ? info.education : "-" }}</p>
        <el-select v-else v-model="editedInfo.education" placeholder="请选择">
          <el-option
            v-for="(item, index) in educationOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="width" label="工作经验：">
        <p v-if="!isEdited">{{ info.experience ? info.experience : "-" }}</p>
        <el-input
          type="textarea"
          v-else
          v-model="editedInfo.experience"
          rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item class="width" label="邮箱：" prop="email">
        <p v-if="!isEdited">{{ info.email ? info.email : "-" }}</p>
        <el-input v-else v-model="editedInfo.email"></el-input>
      </el-form-item>
      <el-form-item class="width" label="联系电话：">
        <p>{{ info.phoneNumber }}</p>
      </el-form-item>
      <el-form-item class="width" label="QQ：">
        <p v-if="!isEdited">{{ info.qq ? info.qq : "-" }}</p>
        <el-input v-else v-model="editedInfo.qq"></el-input>
      </el-form-item>
      <el-form-item class="largewidth" label="个人简介：">
        <p v-if="!isEdited">
          {{ info.introduction ? info.introduction : "-" }}
        </p>
        <el-input
          type="textarea"
          v-else
          v-model="editedInfo.introduction"
          rows="5"
        ></el-input>
      </el-form-item>
      <el-form-item class="width" label="个人简历：">
        <p v-if="!info.profile">还未上传个人简历，点击修改按钮即可上传</p>
        <el-image
          v-else
          class="download-icon"
          :src="require('@/assets/imgs/other/dataPack.png')"
          @click="handleDataDownload()"
        ></el-image>
        <el-upload
          v-show="isEdited"
          drag
          action="#"
          :limit="1"
          :http-request="myUpload"
          :before-upload="beforeUploadSc"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传单个大小不超过10mb的pdf、word、ppt文件!
          </div>
        </el-upload>
      </el-form-item>
      <!-- <el-form-item class="width" label="实名认证："> </el-form-item> -->
    </el-form>
    <div class="buttons">
      <mybutton v-show="isEdited" class="button" @click="canceEdit"
        >取消</mybutton
      >
      <mybutton
        v-show="isEdited"
        class="button"
        type="orange"
        @click="saveEditedInfo"
        >保存</mybutton
      >

      <mybutton
        v-show="!isEdited"
        class="button"
        type="orange"
        @click="editInfo"
        >修改</mybutton
      >
    </div>

    <el-dialog
      title="实名制信息确认"
      :visible.sync="userVerDialogVis"
      width="30%"
      :before-close="handleUserVerDialogClose"
      append-to-body
    >
      <el-form :model="retMsg" label-width="100px" size="small">
        <el-form-item label="身份证：">
          <p>{{ retMsg.cardId }}</p>
        </el-form-item>
        <el-form-item label="姓名：">
          <p>{{ retMsg.realName }}</p>
        </el-form-item>
        <el-form-item label="性别：">
          <p>{{ retMsg.gender }}</p>
        </el-form-item>
        <el-form-item label="名族：">
          <p>{{ retMsg.nation }}</p>
        </el-form-item>
        <el-form-item label="生日：">
          <p>{{ retMsg.birthDate }}</p>
        </el-form-item>
        <el-form-item label="家庭住址：">
          <p>{{ retMsg.home }}</p>
        </el-form-item>
        <div class="userVer-buttons">
          <Mybutton class="button" @click="handleUserVerCancel">
            取消
          </Mybutton>
          <Mybutton type="orange" class="button" @click="handleUerVerOk">
            确认
          </Mybutton>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Mybutton from "@/components/mybutton.vue";
export default {
  components: {
    Mybutton,
  },
  data() {
    var validateEmail = (rule, value, callback) => {
      //验证邮箱的正则
      var regEmail = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
      if (regEmail.test(value)) return callback();
      else callback(new Error("请输入正确的邮箱！"));
    };
    return {
      isEdited: false,
      info: {},
      editedInfo: {},
      editedInfoFromRules: {
        name: [
          {
            required: true,
            message: "请输入真实姓名！",
            trigger: "blur",
          },
        ],
        cardId: [
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
        email: [{ validator: validateEmail, trigger: "blur" }],
      },
      // 教育经历
      educationOptions: [
        {
          value: "中专及以下",
          label: "中专及以下",
        },
        {
          value: "大专",
          label: "大专",
        },
        {
          value: "本科",
          label: "本科",
        },
        {
          value: "硕士",
          label: "硕士",
        },
        {
          value: "博士及以上",
          label: "博士及以上",
        },
      ],
      // 实名认证
      cardPic1: "",
      cardPic2: "",
      userVerDialogVis: false,
      retMsg: {},
      // 邀请码
      invCode: "",
      // 上传文件限制
      uploadLimit: true,
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
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    /**
     * 基本信息操作
     */
    // 获取用户的个人信息
    async getUserInfo() {
      const userInfo = await this.$store.dispatch("user/getUserInfo", {
        userId: 0,
      });
      // console.log(userInfo);
      let data = {
        ...userInfo.userInformation,
        ...userInfo.userExtensionPerson,
      };
      data.username = userInfo.username;
      // console.log(data);
      this.info = { ...data };
      this.editedInfo = { ...data };
    },

    /**
     * 实名认证
     */
    myUserVerUpload1(item) {
      this.cardPic1 = item.file;
    },
    myUserVerUpload2(item) {
      this.cardPic2 = item.file;
    },
    // 进行实名认证
    async handleUserVer() {
      if (
        this.editedInfo.realName == "" ||
        this.editedInfo.realName == "no-real-name" ||
        this.editedInfo.cardId == "" ||
        this.editedInfo.cardId == "no-card-id"
      )
        this.$store.dispatch("user/updateUserInfo", {
          realName: this.editedInfo.realName,
          cardId: this.editedInfo.cardId,
          gender: this.editedInfo.gender,
        });

      // 以下为通过证件照片实名认证，代码预留不用
      // if(this.cardPic1 == '' || this.cardPic2 == '')  return this.$message.error('请先上传身份证件正反照！');
      // let data = {
      //     front: this.cardPic1,
      //     back: this.cardPic2,
      // }
      // const respData = await this.$store.dispatch('user/userVer', data);
      // if(respData.status != 200 ) return this.$message.error(respData.msg);
      // this.retMsg = respData.data;
      // this.userVerDialogVis = true;
    },
    handleUserVerDialogClose() {
      this.retMsg = {}; // 防止信息泄露，关闭dialog直接清楚实名制信息（可能没必要其实）
    },
    async handleUerVerOk() {
      let data = {
        verified: true,
      };
      const respData = await this.$store.dispatch("user/userVerOk", data);
      if (respData.status != 200) return this.$message.error(respData.msg);
      this.$message.success("认证成功！请刷新页面");
    },
    handleUserVerCancel() {
      let data = {
        verified: false,
      };
      this.$store.dispatch("user/userVerOk", data);
      this.userVerDialogVis = false;
    },

    /**
     * 邀请码
     */
    submitInvCode() {
      if (this.invCode == "") return this.$message.error("请先输入邀请码！");
      this.$store.dispatch("user/updateUserRole", {
        invCode: this.invCode,
      });
    },

    /**
     * 修改个人信息
     */
    // 提交修改个人信息
    async saveEditedInfo() {
      this.$refs.editedInfoRef.validate(async (value) => {
        // 验证文件符合规范
        if (this.uploadLimit !== true)
          return this.$message.error("上传文件不符合要求！");

        if (!value) return this.$message.error("请先完善必填信息！");
        let data = {
          userId: this.USER_ID,
        };
        // 特判身份证是否合法（18位）
        Object.keys(this.info).forEach((key) => {
          if (this.info[key] != this.editedInfo[key])
            data[key] = this.editedInfo[key];
        });
        // console.log(data);
        const result = await this.$store.dispatch("user/updateUserInfo", data);
        if (result) {
          // this.info = this.editedInfo;
          this.isEdited = false;
          this.getUserInfo();
        }
      });
    },
    // 进入修改个人信息状态
    editInfo() {
      this.isEdited = true;
    },

    /**
     * 其他
     */
    // 下载个人简历附件
    handleDataDownload() {
      this.$store.dispatch("data/downloadAnnex", this.info.profile);
    },
    myUpload(item) {
      this.editedInfo.profile = item.file;
    },
    // 大小限制
    beforeUploadSc(file) {
      var fileSize = file.size;

      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension =
        testmsg == "pdf" ||
        testmsg == "PDF" ||
        testmsg == "DOC" ||
        testmsg == "doc" ||
        testmsg == "docx"||
        testmsg == "DOCX"||
        testmsg == "xls"||
        testmsg == "XLS"||
        testmsg == "XLSX"||
        testmsg == "xlsx"||
        testmsg == "PPT"||
        testmsg == "ppt"||
        testmsg == "PPTX"||
        testmsg == "pptx"

    ;
      //const extension2 = testmsg == "png" || testmsg == "PNG";
      if (!extension) {
        this.$message({
          message: "上传文件只能是 pdf、word、ppt格式!",
          type: "warning",
        });
      }
      const isLt50M = fileSize / 1024 / 1024 < 100;
      if (!isLt50M) {
        this.$message.warning(" 上传文件大小不能超过 100MB!");
      }
      this.uploadLimit = isLt50M;
    },

    // 取消编辑状态
    canceEdit() {
      this.isEdited = false;
      this.editedInfo = this.info;
    },
  },
};
</script>

<style scoped>
.width {
  width: 500px;
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
</style>
