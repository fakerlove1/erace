<template>
  <div>
    <div class="dialog-info-title">
      <h2>{{ atyInfo.name }}</h2>
    </div>
    <div class="dialog-info-location">
      <i class="el-icon-location-outline"></i>
      <p>{{ atyInfo.location }}</p>
    </div>
    <div class="dialog-info-divider">
      <el-divider></el-divider>
    </div>
    <div class="dialog-info-type">
      <p>活动类型：{{ atyInfo.types }}</p>
    </div>
    <br />
    <div class="dialog-info-detail">
      <p v-if="atyInfo.staffTypes != ''">{{ detailComputed }}</p>
      <p v-else>无具体要求</p>
    </div>
    <br />
    <div class="dialog-info">
      <p>奖金：￥{{ atyInfo.reward }}</p>
      <p>报名费用：￥{{ atyInfo.cost }}</p>
    </div>
    <br />
    <div class="dialog-info-introduction">
      <p>活动简介：{{ atyInfo.introduction }}</p>
    </div>
    <div class="dialog-info-note">
      <p>{{ atyInfo.note }}</p>
    </div>
    <div>
        <!-- 活动组图 -->
      <el-carousel :interval="4000" type="card" height="120px" style="magrin-top:10px">
        <el-carousel-item v-for="item in  atyInfo.roundPictures.length" :key="item">
          <el-image fit="contain" class="small" :src="atyPicturesComputed+atyInfo.roundPictures[item-1]"/>
          <!-- <h3>{{item}}</h3> -->
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- <div>{{this.atyInfo.roundPictures}}</div> -->
    <div class="buttons">
      <my-button type="orange" @click="toRegiser">报名</my-button>
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
      // atyId: '',
      atyInfo: {},
      atyPictures:[]
      
    };
  },
  watch: {
    // 发现用户修改了活动限制
    SELECTED_ATY: {
      handler(newVal, oldVal) {
        this.atyInfo = newVal;
      },
      deep: true,
    },
  },
  computed: {
    USER_TYPE() {
      return this.$store.getters.userType;
    },
    // 当前报名的活动的信息
    SELECTED_ATY() {
      return this.$store.getters.selected_aty;
    },
    // 活动报名详情
    detailComputed() {
      let pos = this.atyInfo.staffTypes.split(";");
      // console.log(pos);
      let ret = "";
      let num = this.atyInfo.staffTypesCount.split(";");
      if (this.atyInfo.staffTypes != "") ret = ret + "人员需求：";
      for (let i = 0; i < pos.length - 1; ++i) {
        ret = ret + pos[i] + num[i] + "名；";
      }
      return ret;
    },
    // 自定义处理
    atyCovImgComputed() {
      return (
        this.$store.getters.baseUrl + `/file/download/${this.atyInfo.poster}`
      );
    },
    atyPicturesComputed() {
      return (
        this.$store.getters.baseUrl + `/file/download/`
      );
    },
  },
  created() {
    this.atyInfo = this.SELECTED_ATY;
    // console.log("=>",this.atyInfo.roundPictures);
    // this.atyPictures = this.SELECTED_ATY.roundPictures;
  },
  methods: {
    toRegiser() {
      if (this.atyInfo.staffTypes.split(";").length == 1)
        this.$router.push(
          `/activity/all/register/confirm?prefPos=${JSON.stringify("")}&id=${
            this.atyInfo.id
          }`
        );
      else
        this.$router.push(
          `/activity/all/register/register?id=${this.atyInfo.id}`
        );
    },
    async getAtyPictures(){
        const respData = await this.$store.dispatch('activity/getRoundPictures',this.atyInfo.picture);
        console.log(respData);
        this.atyPictures = respData;
    }
  },
};
</script>

<style scoped>
.dialog-info-title {
  font-weight: bold;
}
.dialog-info-location {
  margin-top: 15px;
  display: flex;
}
.dialog-info-location i {
  height: 20px;
}
.dialog-info-location i::before {
  font-size: 20px;
  color: rgb(150, 213, 254);
}
.dialog-info-divider {
  width: 70%;
}
.dialog-info-detail {
}
.dialog-info-note {
  margin-top: 20px;
}
.buttons {
  position: absolute;
  bottom: 45px;
  right: 35px;
}

  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
