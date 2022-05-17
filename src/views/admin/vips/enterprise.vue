<template>
  <div>
    <div class="crumb-box">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-crumb">
        <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        <el-breadcrumb-item>团体会员</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索框 -->
      <el-input
        placeholder="输入名称搜索企业会员"
        v-model="queryInfo.searchContext"
        class="changeInput"
        size="small"
        @keyup.enter.native="handleSearch"
      ></el-input>
    </div>
    <div class="table-box">
      <el-table
        :data="tableData"
        style="width: 100%"
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          label="50"
          align="center"
        ></el-table-column>
        <el-table-column align="center" width="51">
          <template slot-scope="scope">
            <el-avatar :src="getAvatarUrl(scope.row)"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="groupName"
          label="名称"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="groupType"
          label="性质"
          width="90"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="businessScope"
          label="业务范围"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column sortable label="发布活动" width="100" align="center">
          <template slot-scope="scope"
            ><el-button type="text" @click="releasedAty(scope.row.username)">{{
              scope.row.launchedActivities
            }}</el-button></template
          >
        </el-table-column>
        <el-table-column
          prop="participatedActivities"
          sortable
          label="参加活动"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="point"
          sortable
          label="积分"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column align="right">
          <p class="text orange" @click="sendMsg">发送通知</p>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <p class="text blue" @click="showMemIndex(scope.row.username)">
              会员信息
            </p>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-col :offset="3" :span="17">
              <!-- 用户没有在小黑屋 -->
              <el-select
                v-show="scope.row.darkroom == 0"
                class="changeInput"
                v-model="scope.row.tmpdarkroom"
                placeholder="小黑屋"
                size="small"
                @change="setBlackList($event, scope)"
              >
                <el-option
                  v-for="(item, index) in darkRoomOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>

              <!-- 用户在小黑屋 -->
              <div class="prohibtit-box" v-show="scope.row.darkroom != 0">
                <p>小黑屋：{{ getBlackListTime(scope.row.darkroom) }}</p>
                <my-button
                  class="prohibit-button"
                  type="normal"
                  width="80"
                  height="25"
                  size="10"
                  @click="leaveBlackList(scope)"
                  >取消</my-button
                >
              </div>
            </el-col>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-size="queryInfo.pageSize"
        :page-count="totalPageSize"
        layout="total, prev, pager, next, jumper"
        :total="totalNumber"
      ></el-pagination>
    </div>

    <!-- 会员信息 -->
    <el-dialog
      title="会员信息"
      append-to-body
      :visible.sync="dialogVisible"
      width="50%"
      v-model="userInfo"
    >
      <el-form>
        <el-form-item label="企业名称：">{{ userInfo.teamName }} </el-form-item>
        <el-form-item label="运营范围：">{{
          userInfo.businessScope
        }}</el-form-item>
        <el-form-item label="电子邮箱：">{{ userInfo.email }} </el-form-item>
        <el-form-item label="电话号码：">{{ userInfo.tel }} </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 发布的活动 -->
    <el-dialog
      title="发布过的活动"
      append-to-body
      :visible.sync="allAtyVisible"
      width="50%"
      v-model="userInfo"
    >
      <el-table :data="launchedAties">
        <el-table-column label="活动id" prop="id"></el-table-column>
        <el-table-column label="活动名称" prop="name"></el-table-column>
        <el-table-column label="活动类型" prop="types"></el-table-column>
        <el-table-column label="活动详情">
          <template slot-scope="scope"
            ><el-button type="text" @click="atyDetails(scope.row.id)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 活动详情 -->
    <el-dialog
      title="活动详情"
      append-to-body
      :visible.sync="atyDetailVisible"
      width="50%"
      ><div style="display:flex">
        <el-image
          style="width: 50%; height: 100%;margin-right:2rem"
          :src="posterComputed"
          fit="fill"
      />
      <el-form v-model="actyDetail">
        <el-form-item label="活动名称："><span>{{actyDetail.name}}</span></el-form-item>
        <el-form-item label="举办地点:"><span>{{actyDetail.location+"-"+actyDetail.detailedLocation}}</span></el-form-item>
        <el-form-item label="奖金："><span>{{'￥'+actyDetail.reward}}</span></el-form-item>
        <el-form-item label="报名费用："><span>{{'￥'+actyDetail.cost}}</span></el-form-item>
        <el-form-item></el-form-item>
         </el-form></div>
    </el-dialog>
  </div>
</template>

<script>
import Mybutton from "@/components/mybutton.vue";
import Template from "../../tmp/template.vue";
export default {
  components: {
    myButton: Mybutton,
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],

      // 小黑屋options
      darkRoomOptions: [
        { value: 7 * 24 * 60 * 60 * 1000, label: "7天" },
        { value: 15 * 24 * 60 * 60 * 1000, label: "15天" },
        { value: 30 * 24 * 60 * 60 * 1000, label: "30天" },
        { value: -1, label: "永久" },
      ],

      dialogVisible: false, //企业信息的显示
      userInfo: "", //个人信息

      allAtyVisible: false, //举办的所有活动的列表显示
      launchedAties: [], //团体举办的活动列表

      atyDetailVisible: false, //详情显示
      actyDetail: "",
      /**
       * 分页相关
       */
      // 查询对象，查询的名字或者页数
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
        searchContext: "",
      },
      totalNumber: 10, // 总条数
      totalPageSize: 1, // 总页数
    };
  },
  computed: {
    posterComputed() {
      return (
        this.$store.getters.baseUrl + `/file/download/${this.actyDetail.poster}`
      );
    },
    toTimeComputed(){
      return new Date(parseInt(this.actyDetail.beginTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');  

    }
  },
  created() {
    // 获取所有的团体用户
    this.getGroupUsers();
  },
  methods: {
    // 获取会员列表
    async getGroupUsers() {
      const respData = await this.$store.dispatch("admin/getUsersOfRole", {
        roleName: "GROUP",
        page: this.queryInfo.pageNum,
        number: this.queryInfo.pageSize,
        username: this.queryInfo.searchContext,
      });
      this.totalNumber = respData.userCount;
      this.totalPageSize = respData.pageCount;
      this.tableData = respData.groupBean;
    },
    // 通过uuid获取头像
    getAvatarUrl(data) {
      // 数据库中没有头像的数据，则使用默认头像
      if (!data.avatar) {
        return require("@/assets/imgs/register/companyRegisterIcon.png");
      } else {
        return (
          this.$store.getters.baseUrl +
          `file?uuid=${data.avatar}&userId=${this.$store.getters.userId}`
        );
      }
    },

    // 多选处理
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 业务类型过滤方法
    bizScopeFiltersMethod(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },

    /**
     * 小黑屋相关操作
     */
    getBlackListTime(value) {
      if (value < 0) return "永久";
      let time = Math.ceil(value / 1000 / 60 / 60);
      if (time < 24) return time + "小时";
      else if (time / 24 <= 30) return time / 24 + "天";
    },
    // 进入小黑屋
    async setBlackList(value, scope) {
      let data = {
        userId: scope.row.id,
        isBlacklist: true,
        time: value,
      };
      const result = await this.$store.dispatch("admin/setBlackList", data);
      if (result) {
        this.tableData[scope.$index].darkroom = value;
      }
    },
    // 离开小黑屋
    async leaveBlackList(scope) {
      let data = {
        userId: scope.row.id,
        isBlacklist: false,
        time: 0,
      };
      const result = await this.$store.dispatch("admin/setBlackList", data);
      if (result) {
        this.tableData[scope.$index].darkroom = 0;
        this.tableData[scope.$index].tmpdarkroom = "";
      }
    },

    /**
     * 分页相关操作
     */
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getPersonUsers();
    },

    /**
     * 搜索
     */
    handleSearch() {
      this.getGroupUsers();
    },

    /**
     * 其他操作
     */
    sendMsg() {
      this.$message.info("该功能还未正式投入使用，敬请期待！");
    },
    showMemIndex(username) {
      // this.$message.info("该功能还未正式投入使用，敬请期待！");
      this.dialogVisible = true;
      // 获取会员信息
      const person = this.tableData.find((x) => x.username === username);
      // console.log(person.id)
      this.getUserInfo(person.id);
    },
    /**
     * 查看用户信息
     */
    async getUserInfo(id) {
      // console.log(id)
      const respData = await this.$store.dispatch("admin/getUserById", {
        userId: id,
      });
      console.log(respData);
      this.userInfo = {
        ...respData.data.userExtensionOrganization,
        ...respData.data.userExtensionPerson,
      };
      console.log(this.userInfo);
    },

    // 点击查看发布的活动
    releasedAty(username) {
      // console.log('released')
      this.allAtyVisible = true;
      const enterprise = this.tableData.find((x) => x.username === username);
      this.getLaunchedAty(enterprise.id);
    },
    async getLaunchedAty(id) {
      // console.log(id)
      const respData = await this.$store.dispatch("activity/getReleaseAty", {
        userId: id,
      });
      // console.log(respData);
      this.launchedAties = respData;
    },
    /**
     * 查看活动详情
     */
    atyDetails(id) {
      this.atyDetailVisible = true;
      this.getAtyDetail(id);
    },
    getAtyDetail(id) {
      // console.log(id)
      const acty = this.launchedAties.find((x) => x.id === id);
      this.actyDetail = acty;
      // console.log(this.actyDetail.poster)
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

.table-box {
  margin: 5px 15px;
}

.text {
  display: inline-block;
  cursor: pointer;
}
.text + .text {
  margin-left: 100px;
}
.orange {
  color: rgb(205, 171, 157);
}
.orange:hover {
  color: rgb(194, 151, 134);
}
.blue {
  color: rgb(164, 176, 184);
}
.blue:hover {
  color: rgb(139, 157, 168);
}

.prohibtit-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.prohibtit-box p {
  position: relative;
  top: -5px;
}
.prohibtit-box .prohibit-button {
  position: relative;
  top: -2px;
}

.el-pagination {
  margin: 10px;
}
.el-input {
  width: 13rem;
  float: right;
  position: relative;
  bottom: 1rem;
}
</style>
