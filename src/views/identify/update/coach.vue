<template>
  <div>
    <el-card>
      <el-table :data="athleteList">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="申请编号" prop="id"></el-table-column>
        <el-table-column label="教练员姓名" prop="name"></el-table-column>
        <el-table-column label="组别" align="center">
          <template slot-scope="scope">{{ getType(scope.row.type) }}</template>
        </el-table-column>
        <el-table-column label="等级" prop="level"></el-table-column>
        <el-table-column label="状态" prop="state" align="center">
          <template slot-scope="scope">{{
              getState(scope.row.state)
            }}</template>
        </el-table-column>
        <el-table-column label="信息操作" align="center" width="220px">
          <template slot-scope="scope">
            <mybutton
              round
              type="orange"
              style="margin-right:1rem;
                    height:30px;width:80px
                "
              @click="openAthlete(scope.row.id)"
              >更新</mybutton
            >
            <mybutton
              slot="reference"
              style="margin-right:1rem;
                    height:30px;width:80px
                "
              @click="dropAthlete(scope.row.id)"
              >注销</mybutton
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- <el-pagination
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-size="queryInfo.pageSize"
        :page-count="totalPageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalNumber"
      ></el-pagination> -->
    <el-dialog :visible.sync="athleteVisible" title="信息更新" append-to-body>
      <router-view></router-view>
    </el-dialog>
    <!-- 注销 -->
    <el-dialog
      :visible.sync="dropVisible"
      title="请提交注销信息"
      append-to-body
    >
      <router-view></router-view>
    </el-dialog>
  </div>
</template>

<script>
import Mybutton from "../../../components/mybutton.vue";
export default {
  components: { Mybutton },
  data() {
    return {
      athleteList: [],
      athleteVisible: false,
      dropVisible: false,
      totalNumber: "",
      checkForm: {
        cause: "",
      },
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
      refuseRules: {
        cause: [
          { required: true, message: "请输入不通过原因！", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getAuthenticationList();
  },
  computed: {
  
  },
  methods: {
    openAthlete(id) {
      this.athleteVisible = true;
      this.$router.push("/identify/uptate/coach/info");
      const data = this.athleteList.find((x) => x.id === id);
      // console.log("->", data);
      this.$store.commit("certificate/SET_COACH", data);
      //  console.log("->", this.$store.getters.COACH_INFO)
    },
    dropAthlete(id) {
      this.dropVisible = true;
      this.$store.commit("certificate/SET_DROP", id);
      this.$router.push("/identify/drop/coach/info");
    },
    // 获取单个人员信息
    async getAuthenticationList() {
      let data = [];
      data = await this.$store.dispatch("certificate/getAuthenticationList", {
        type: "COACH",
        // pageNum: this.queryInfo.pageNum,
        // pageSize: this.queryInfo.pageSize,
      });
      data.authorizedBeans.forEach((item) => {
        console.log(item.member);
        this.athleteList.push(item.member);
      });
      //  this.athleteList = data.authorizedBeans;
      // this.totalNumber = this.athleteList.length;
      // console.log("--->",this.athleteList);
    },
    // 包装返回的组别类型
    getType(item) {
      if (item == "AMATEUR_COACH") {
        return "非职业组教练员";
      } else if (item == "PROFESSIONAL_COACH") {
        return "职业组教练员";
      }
    },
    // 包装返回的状态
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
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val;
    },
  },
};
</script>

<style>
.el-input {
  width: 13rem;
  float: right;
  box-sizing: border-box;
  position: relative;
  bottom: 1rem;
}
</style>
