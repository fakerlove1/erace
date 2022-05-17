<template>
  <div class="atyCard">
    <!-- 活动 海报 展示 -->
    <el-image class="covImg" :src="atyCovImgComputed" />
    <!-- 活动 主要信息 展示 -->
    <div class="atyInfo">
      <h1 @click="hanleAtyDetails(atyInfo)" class="title">{{ atyInfo.name }}</h1>
      <div id="locationBox">
        <i class="el-icon-location-outline"></i>
        <p>{{ atyInfo.location }}</p>
      </div>
      <div id="divider"></div>
      <p style="font-size='15px;'">{{ prefPosComputed }}</p>
    </div>

    <!-- 活动 次要信息 以及 详情须知 展示 -->
    <!-- 个人 -->
    <div
      v-if="USER_TYPE == 'personal' || atyInfo.userActState"
      class="atyInfoLast floatR"
    >
      <p v-show="atyInfo.userActState == 'HOLDING'">进行中</p>
      <p
        v-show="atyInfo.userActState == 'UNDER_REVIEW'"
        style="position: relative; top: -15%;"
      >
        报名审核中
      </p>
      <p
        v-show="atyInfo.userActState == 'PASSED'"
        style="position: relative; top: -15%;"
      >
        已通过报名
      </p>
      <p
        v-show="atyInfo.userActState == 'TURN_DOWN'"
        style="position: relative; top: -15%;"
      >
        未通过报名
      </p>
      <el-button
        type="text"
        v-show="atyInfo.userActState == 'TURN_DOWN'"
        id="op"
        @click="$emit('showCause', atyInfo.cause)"
        >反馈及原因</el-button
      >
      <p
        v-show="atyInfo.userActState == 'COMPLETED'"
        style="position: relative; top: -15%;"
      >
        已完成活动
      </p>
      <p
        v-show="atyInfo.userActState == 'UNCOMPLETED'"
        style="position: relative; top: -15%;"
      >
        未完成活动
      </p>
    </div>

    <!-- 组织 -->
    <div v-else class="atyInfoLast floatR">
      <p v-show="atyInfo.state == 'HOLDING'" class="up">进行中</p>
      <p v-show="atyInfo.state == 'CHECKING'" class="up">审核中</p>
      <p v-show="atyInfo.state == 'ACCESS'" class="up">审核通过</p>

      <p v-show="atyInfo.state == 'CANCELED'" class="up">已撤回</p>
      <p
        v-show="atyInfo.state == 'CANCELING'"
        style="position: relative; top: -15%;"
      >
        撤回审核中
      </p>

      <mybutton
        class="opButton"
        v-show="
          atyInfo.state == 'ENROLLING' ||
            (atyInfo.state == 'ENROLL_CLOSED' && atyInfo.state != 'FAILED')
        "
        @click="$emit('showSignMem', atyInfo)"
        type="orange"
        >审核工作人员报名</mybutton
      >
      <mybutton
        class="opButton"
        v-show="
          atyInfo.state != 'CANCELED' &&
            atyInfo.state != 'CANCELING' &&
            atyInfo.state != 'FAILED'
        "
        @click="$emit('showPassMen', atyInfo)"
        >查看活动人员</mybutton
      >
      <mybutton
        class="opButton"
        @click="confirm(atyInfo)"
        v-show="
          atyInfo.state != 'CANCELED' &&
            atyInfo.state != 'CANCELING' &&
            atyInfo.state != 'HOLDING' &&
            atyInfo.state != 'ENDED' &&
            atyInfo.state != 'FAILED'
        "
        margin-left="5px"
        >撤回活动</mybutton
      >
      <mybutton
        v-show="atyInfo.state == 'CANCELED'"
        class="opButton"
        @click="handleRelaunch(atyInfo)"
      >
        重新发布
      </mybutton>
      <p v-show="atyInfo.state == 'CANCELED'" id="op">
        撤回原因：{{ atyInfo.note }}
      </p>

      <p v-show="atyInfo.state == 'ENROLLING'" class="up">报名中</p>

      <p v-show="atyInfo.state == 'ENROLL_CLOSED'" class="up">报名截止</p>

      <p
        v-show="atyInfo.state == 'FAILED'"
        class="up"
        style="margin-right:12px;font-size:20px"
      >
        申请未通过
      </p>
      <p
        v-show="atyInfo.state == 'FAILED'"
        id="op"
        @click="$emit('showCause', atyInfo.cause)"
      >
        反馈及原因
      </p>

      <p v-show="atyInfo.state == 'ENDED'" class="up">已结束</p>
    </div>



     <!-- 活动详情 -->
    <el-dialog
      title="活动详情"
      append-to-body
      :visible.sync="atyDetailVisible"
      width="50%"
      ><div style="display:flex">
        <el-image
          style="width: 50%; height: 100%;margin-right:2rem"
          :src="atyCovImgComputed"
          fit="fill"
      />
      <el-form v-model="actyDetail">
        <el-form-item label="活动名称："><span>{{atyInfo.name}}</span></el-form-item>
        <el-form-item label="举办地点:"><span>{{atyInfo.location+"-"+atyInfo.detailedLocation}}</span></el-form-item>
        <el-form-item label="奖金："><span>{{'￥'+atyInfo.reward}}</span></el-form-item>
        <el-form-item label="报名费用："><span>{{'￥'+atyInfo.cost}}</span></el-form-item>
        <!-- <el-form-item label="活动组图"><span>{{atyPictureComputed}}</span></el-form-item> -->
         </el-form></div>
    </el-dialog>
  </div>
</template>

<script>
import Mybutton from "../../../../components/mybutton.vue";

export default {
  components: { Mybutton },
  props: ["data"],
  data() {
    return {
      // 活动信息
      atyInfo: this.data,
       // 活动详情显示
      atyDetailVisible: false,
      actyDetail: "",

      // 意向岗位映射表
      prefPosMap: {},
      atyTypeMap: {},
      deleteDialogVisible: false,
      deleteCause: "",
      reasonRules: {
        deleteCause: [
          {
            required: true,
            message: "请输入撤回理由！",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    USER_TYPE() {
      return this.$store.getters.userType;
    },

    // 自定义computed
    atyCovImgComputed() {
      return (
        this.$store.getters.baseUrl + `/file/download/${this.atyInfo.poster}`
      );
      
    },
    // 活动组图computed
    atyPictureComputed() {
      return (
        this.$store.getters.baseUrl + `/file/download/zip/${this.atyInfo.picture}`
      );
      
    },
    prefPosComputed() {
      if (!this.atyInfo.staffTypes || !this.atyInfo.staffTypesCount)
        return this.atyInfo.types;
      const posData = this.atyInfo.staffTypes.split(";");
      const numData = this.atyInfo.staffTypesCount.split(";");
      let retString = "";
      retString = this.atyInfo.types;
      for (let i = 0; i < posData.length - 1; ++i) {
        retString = retString + "，" + posData[i] + numData[i] + "名";
      }
      return retString;
    },
  },
  methods: {
    // 确认是否撤销活动
    confirm(atyInfo) {
      // this.deleteDialogVisible = true;
      this.$messagebox
        .prompt("请输入撤销的原因", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: "理由不能为空!",
        })
        .then(async ({ value }) => {
          this.deleteAty(atyInfo, value);
        })
        .catch(() => {});
    },
    // 撤销活动
    deleteAty(atyInfo, deleteCause) {
      this.$emit("deleteActy", atyInfo, deleteCause);
    },

    // 重新发布活动
    handleRelaunch(atyInfo) {
      // console.log(atyInfo);
      this.$store.commit("activity/SET_RELAUNCHED", atyInfo);
      //    console.log(this.$store.getters.reLaunched)
      this.$router.push('/activity/release')
    },
    hanleAtyDetails(atyInfo){
      this.atyDetailVisible=true;
      
      // console.log("->",atyInfo);
    }
  },
};
</script>

<style scoped>
.atyCard {
  width: 100%;
  height: 170px;
  /* border: red solid 1px; */
  background-color: rgb(237, 237, 237);
  display: flex;
  justify-content: space-around;
}
.atyCard div {
  height: 100%;
}

/* 海报图片大小 */
.covImg {
  height: 100%;
  width: 250px;
}

/* 活动相关信息展示 */
.atyInfo {
  width: 450px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}
.atyInfo #locationBox {
  margin-top: 10px;
  font-size: 13px;
  height: 25px;
  display: flex;
  align-items: center;
}
.atyInfo #locationBox i {
  height: 20px;
}
.atyInfo #locationBox i::before {
  /* width: 20px;
    height: 20px; */
  font-size: 20px;
  color: rgb(150, 213, 254);
}
.atyInfo #divider {
  width: 80%;
  border-top: solid 1px grey;
  margin-top: 20px;
  height: 1px;
}

/* 活动详情须知等操作 */
.atyInfoLast {
  width: 200px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.atyInfoLast {
  font-size: 23px;
  position: relative;
  top: 15%;
}
.atyInfoLast .up {
  position: absolute;
  top: 40px;
  width: 100px;
  right: 90%;
}
.atyInfoLast .money {
  font-size: 13px;
}
.atyInfoLast #op {
  font-size: 13px;
  position: absolute;
  bottom: 20%;
  right: 20px;
  cursor: pointer;
}

.floatL {
  float: left;
}
.floatR {
  float: right;
}

#atyButton {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  position: absolute;
  right: 10px;
  top: 30px;
  padding: 10px;
}
.mybuttonP {
  width: 15px;
}

.opButton {
  margin: 8px;
  position: relative;
  top: -15%;
}
.atyInfo {
  margin-top: 1rem;
}
.title :hover{
  cursor: pointer;
}
</style>
