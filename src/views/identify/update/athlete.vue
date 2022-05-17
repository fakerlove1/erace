<template>
  <div>
    <el-card>
      <el-table :data="athleteList">
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column
          label="申请编号"
          prop="id"
          align="center"
        ></el-table-column>
        <el-table-column
          label="运动员姓名"
          prop="name"
          align="center"
        ></el-table-column>
        <el-table-column label="组别" align="center">
          <template slot-scope="scope">{{ getType(scope.row.type) }}</template>
        </el-table-column>
        <el-table-column
          label="等级"
          prop="level"
          align="center"
        ></el-table-column>
        <el-table-column label="状态" prop="state" align="center">
          <template slot-scope="scope">{{
            getState(scope.row.state)
          }}</template></el-table-column
        >
        <el-table-column label="信息操作" align="center" width="220px">
          <template slot-scope="scope" style="display:flex;">
            <mybutton
              type="orange"
              style="margin-right:1rem;
                    height:30px;width:50px
                "
              @click="openAthlete(scope.row.id)"
              >更新</mybutton
            >
            <mybutton
              slot="reference"
              style="margin-right:1rem;
                    height:30px;width:50px
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
import Template from "../../tmp/template.vue";
export default {
  components: { Mybutton },
  data() {
    Template;
    return {
      athleteList: [], //运动员列表
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
  methods: {
    openAthlete(id) {
      this.athleteVisible = true;
      this.$router.push("/identify/uptate/athlete/info");
      const data = this.athleteList.find((x) => x.id === id);
      // console.log("->", data);
      this.$store.commit("certificate/SET_ATHELE", data);
      console.log("->", this.$store.getters.ATHLETE_INFO);
    },
    dropAthlete(id) {
      this.dropVisible = true;
      this.$store.commit("certificate/SET_DROP", id);
      this.$router.push("/identify/drop/athlete/info");
    },
    // 获取单个人员信息
    async getAuthenticationList() {
      let data = [];
      data = await this.$store.dispatch("certificate/getAuthenticationList", {
        type: "PLAYER",
        // pageNum:this.queryInfo.pageNum,
        // pageSize:this.queryInfo.pageSize
      });
      data.authorizedBeans.forEach((item) => {
        console.log(item.member);
        this.athleteList.push(item.member);
      });

      // // this.totalNumber = this.athleteList.length;
      console.log("--->", this.athleteList);
    },
    // 监听页面变化

    handleCurrentChange(val) {
      this.queryInfo.pageNum = val;
    },
    // 包装返回的组别类型
    getType(item) {
      if (item == "AMATEUR_PLAYER") {
        return "非职业组运动员";
      } else if (item == "PROFESSIONAL_PLAYER") {
        return "职业组运动员";
      }
    },
    // 包装状态
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
