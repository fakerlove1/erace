<template>
  <div>
    <div class="crumb-box">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-crumb">
        <el-breadcrumb-item>初次认证</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="type-select-box">
      <my-button class="select-button" type="orange" @click="showMemIndex"
        >运动员认证</my-button
      >
      <my-button class="select-button" @click="showCoachIndex"
        >教练员认证</my-button
      >
    </div>
    <div class="table-box">
      <el-card>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            type="selection"
            label="30"
            align="center"
          ></el-table-column>
          <el-table-column align="center" width="51">
            <!-- <template slot-scope="scope">
            <el-avatar :src="getAvatarUrl(scope.row)"></el-avatar>
          </template> -->
          </el-table-column>
          <el-table-column prop="id" label="申请编号" align="center">
          </el-table-column>
          <el-table-column prop="name" label="姓名" align="center">
          </el-table-column>
          <el-table-column label="组别" align="center">
            <template slot-scope="scope">{{
              getTypeLevel(scope.row.type, findLevel(scope.row.id))
            }}</template>
          </el-table-column>
          <el-table-column prop="club" label="所属俱乐部" align="center">
          </el-table-column>
          <el-table-column
            width="180"
            prop="checkTime"
            label="申请认证日期"
            align="center"
          >
            <template slot-scope="scope">{{
              ReadCheckedTime(scope.row.checkTime)
            }}</template>
          </el-table-column>
          <!-- <el-table-column prop="clubType" label="俱" align="center">
          </el-table-column> -->
          <el-table-column prop="state" label="认证状态" align="center">
            <template slot-scope="scope">{{
              getState(scope.row.state)
            }}</template>
          </el-table-column>
          <el-table-column align="right" width="300"> </el-table-column>
        </el-table>
      </el-card>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-size="queryInfo.pageSize"
        :page-count="totalPageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalNumber"
      ></el-pagination>
    </div>
    <!-- 认证页的弹框路由 -->
    <el-dialog
      title="运动员认证"
      append-to-body
      :visible.sync="athleteVisible"
      width="50%"
    >
      <router-view></router-view>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>

    <el-dialog
      title="教练员认证"
      append-to-body
      :visible.sync="coachVisible"
      width="50%"
    >
      <router-view></router-view>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
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
      titles: ["认证账号手机号："],
      phones: [],
      athleteVisible: false,
      coachVisible: false,

      dialogVisible: false, //个人信息的显示
      //card信息
      tableData: [],
      /**
       * 分页相关
       */
      // 查询对象，查询的名字或者页数
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
        searchContext: "",
      },
      totalNumber: 0, // 总条数
      totalPageSize: 1, // 总页数

      cause: "",
    };
  },
  computed: {},
  created() {
    this.getApplications();
    // console.log(this.$store.getters.uname);
  },
  methods: {
    // 获取申请列表
    async getApplications() {
      const respData = await this.$store.dispatch(
        "certificate/getApplication",
        {
          pageNum: this.queryInfo.pageNum,
          pageSize: this.queryInfo.pageSize,
        }
      );
      // console.log("->",respData.data.applications);
      this.totalNumber = respData.data.applications.length;
      let data = [];
      if (respData.data.applications) {
        respData.data.applications.forEach(async (item) => {
          //  console.log(item.memberId)
          const info = await this.getOneAuthentication(item.memberId);
          // console.log(".....",info)
          data.push({
            ...item,
            ...info,
          });
        });
      }

      this.tableData = data;
      // console.log("...", this.tableData);
    },
    async getOneAuthentication(value) {
      // console.log('->',value)
      const infoData = await this.$store.dispatch(
        "certificate/getOneAuthentication",
        {
          memberId: value,
        }
      );
      // console.log("->",infoData)
      return infoData.data;
    },
    // 监听页面变化

    handleCurrentChange(val) {
      this.queryInfo.pageNum = val;
    },
    showMemIndex() {
      this.athleteVisible = true;
      this.$router.push("/identify/first/info");
    },
    showCoachIndex() {
      this.coachVisible = true;
      this.$router.push("/identify/first/infoCoach");
    },
    findLevel(id) {
      var person = this.tableData.find((x) => x.id === id);
      return person.level;
    },
    // 包装返回的组别类型
    // getType(item) {
    //   if (item == "AMATEUR_PLAYER") {
    //     return "非职业组运动员";
    //   } else if (item == "PROFESSIONAL_PLAYER") {
    //     return "职业组运动员";
    //   } else if (item == "AMATEUR_COACH") {
    //     return "非职业组教练员";
    //   } else if (item == "PROFESSIONAL_COACH") {
    //     return "职业组教练员";
    //   }
    // },
    // 包装返回的运动员类别
    getTypeLevel(type, level) {
      // applInfo.type+applInfo.level
      // 主要需要返回“职业一级运动员 非职业二级教练员等等” 只能通过后端返回的包装一下 目前想过前端最好的包装方法（苦中作乐自恋一下）
      var types, levels;
      switch (
        level //包装一下等级 变成中文的
      ) {
        case "1": {
          levels = "一级";
          break;
        }
        case "2": {
          levels = "二级";
          break;
        }
        case "3": {
          levels = "三级";
          break;
        }
      }

      switch (
        type //包装类型，并把等级插进去
      ) {
        case "AMATEUR_PLAYER": {
          types = `非职业${levels}运动员`;
          break;
        }
        case "AMATEUR_COACH": {
          types = `非职业${levels}教练员`;
          break;
        }
        case "PROFESSIONAL_PLAYER": {
          types = `职业${levels}运动员`;
          break;
        }
        case "PROFESSIONAL_COACH": {
          types = `职业${levels}教练员`;
          break;
        }
      }

      return types;
    },

    getState(item) {
      switch (item) {
        case "UNAUTHORIZED":
          return "认证未通过";
        case "AUTHORIZED":
          return "已认证";
        case "ANNUAL_ AUTHORIZING":
          return "年审中";
        case "AUTHORIZING":
          return "认证中";
        case "ANNUAL_UNAUTHORIZED":
          return "年审未通过";
        case "LOGOUTING":
          return "注销中";
      }
    },

    // 时间戳转换
    ReadCheckedTime(timeString) {
      var date = new Date(timeString);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
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

.border {
  border: 1px solid green;
}

.type-select-box {
  width: 85%;
  height: 125px;
  margin-left: 7%;
  margin-top: 5%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.type-select-box2 {
  width: 85%;
  height: 125px;
  margin-left: 7%;
  margin-top: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.select-button:hover {
  background: rgb(255, 199, 177);
  color: white;
}

.inviteCode-box {
  width: 70%;
  min-height: 200px;
  margin-left: 15%;
  margin-top: 20px;
  position: relative;
  padding-bottom: 20px;
}

.buttons {
  width: 100px;
  position: absolute;
  bottom: 10px;
  left: 40%;
  margin-top: 5px;
}
</style>
