<template>
  <div>
    <el-form
      class="changeInput"
      :model="info"
      :rules="infoRules"
      label-position="left"
      ref="infoRef"
      label-width="110px"
      style="overflow: auto;
      margin-top: 30px;
      margin-left: 40px;"
    >
      <el-form-item class="width" label="姓名：" prop="name">
        <el-col :span="10">
          <el-input v-model="info.name"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item class="width" label="性别：" prop="sex">
        <el-radio-group v-model="info.sex">
          <el-radio label="MALE">男</el-radio>
          <el-radio label="FEMALE">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="width" label="组别：" prop="type">
        <el-radio-group v-model="info.type">
          <el-radio label="PROFESSIONAL_COACH">职业组</el-radio>
          <el-radio label="AMATEUR_COACH">非职业组</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="width" label="出生日期：" prop="birth">
        <el-col :span="10">
          <!-- <el-input v-model="info.birth" placeholder="如2000-07"></el-input> -->
          <div class="block">
            <el-date-picker
              v-model="info.birth"
              type="date"
              placeholder="选择日期"
              editable
            >
            </el-date-picker>
          </div>
        </el-col>
      </el-form-item>
      <el-form-item class="width" label="籍贯：" prop="origin">
        <el-col :span="10">
          <el-input v-model="info.origin" placeholder="如江苏南京"></el-input>
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
      <el-form-item class="width" label="教练员等级：" prop="level">
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
       <el-form-item class="width" label="组别：" prop="type">
        <el-radio-group v-model="info.cardType">
          <el-radio label="ID_NUM">身份证号码</el-radio>
          <el-radio label="HMT_NUM">港澳台居住证</el-radio>
          <el-radio label="PASSPORT">护照号</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="width" label="证件号：" prop="idcardNumber">
        <el-col :span="10">
          <el-input v-model="info.idcardNumber"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item class="width" label="俱乐部名称：" prop="club">
        <el-col :span="10">
          <el-input v-model="info.club" disabled></el-input>
        </el-col>
      </el-form-item>
      <!-- <el-form-item class="width" label="俱乐部类型：" prop="clubType">
        <el-col :span="10">
          <el-input v-model="info.clubType"></el-input>
        </el-col>
      </el-form-item> -->
    </el-form>
    <div class="userCheckBox">
      <el-checkbox v-model="info.agreeUserContack"></el-checkbox>
      <span class="userCheckContext">是否同意</span>
      <el-link  @click="handleagree">《注册协议》</el-link>
    </div>
    <div class="buttons">
      <Mybutton type="orange" style="margin-right:1rem" @click="pushNext"
        >下一步</Mybutton
      >
    </div>
    <el-dialog
        title="《注册协议》"
        :visible.sync="agreeVisible"
        width="50rem"
        center
        append-to-body
      >
        <pre>
                俱乐部为运动员、教练员初次申请等级证书时使用，认证申请流程为：
                
     1 点击“运动员注册申请”、“教练员注册申请”后，进入“材料提交页面”

     2 根据界面提示，依次填写姓名、性别、出生年月、游戏项目、申请运动员等级（隶属俱乐部自动生成），同时提交：
     
    （1）《江苏省电子竞技运动协会运动员注册申请表》、《江苏省电子竞技运动协会注册运动员代表资格协议》；（必填）

    （2）运动员与俱乐部签订的聘用合同（扫描复印件）；（必填）

    （3）运动员二代身份证扫描件；（必填）

    （4）运动员两寸照片（必填，用于制作电子证书和实体证书）

    （5）年龄未满18周岁不得申请认证。
            </pre
        >
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
     var validateAge = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入身份证号码！"));
      } else {
        var userCard = value;
        // 获取出生日期
        // userCard.substring(6,10) + "-" + userCard.substring(10,12) + "-" + userCard.substring(12,14)
        var yearBirth = userCard.getFullYear();
        var monthBirth = userCard.getMonth() + 1;
        var dayBirth = userCard.getDate();
        // 获取当前年月日并计算年龄
        var myDate = new Date();
        var monthNow = myDate.getMonth() + 1;
        var dayNow = myDate.getDate();
        var age = myDate.getFullYear() - yearBirth;
        if (
          monthNow < monthBirth ||
          (monthNow == monthBirth && dayNow < dayBirth)
        ) {
          age--;
        }
        if (age < 18) {
          callback(new Error("未满18岁不得认证！"));
        }
        callback();
      }
      // console.log("->",this.ageLimit(value))
    };
    return {
      agreeVisible:false,
      info: {
        name: "",
        sex: "",
        birth: "",
        project: "",
        type: "",
        level: "",
        club: this.$store.getters.uname,
        clubType: "",
        idcardNumber: "",
        origin: "",
        agreeUserContack:""
      },
      projects: [
        { value: "王者荣耀", label: "王者荣耀" },
        { value:"英雄联盟", label: "英雄联盟" },
        { value: "炉石传说", label: "炉石传说" },
        { value: "星际争霸", label: "星际争霸" },
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
           { validator: validateAge, trigger: "blur" },
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
            message: "请选择教练员等级！",
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
          // {
          //   min: 18,
          //   max: 18,
          //   message: "身份证长度不合法",
          //   trigger: "blur",
          // },
         
        ],
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
  methods: {
    pushNext() {
      this.$refs.infoRef.validate(async (valid) => {
        if(this.info.agreeUserContack!==true) return this.$message.error(
            "请先勾选注册协议！"
          );
        if (!valid) return this.$message.error("请先填写完本页内容！");
        this.info.birth = Date.parse(this.info.birth);
        // console.log(this.info)
        this.$store.commit("certificate/SET_COACH", this.info);
        // console.log("..",this.$store.getters.ATHLETE_INFO)
        await this.$router.push("/identify/first/confirmCoach");
      });
    },
    handleagree(){
      this.agreeVisible=true;
    }
  },
};
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: space-evenly;
}
</style>
