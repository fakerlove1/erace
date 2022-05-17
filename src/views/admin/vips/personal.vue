<template>
  <div>
    <div class="crumb-box">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-crumb">
        <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        <el-breadcrumb-item>个人会员</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索框，搜索会员 -->
      <el-input
        class="changeInput"
        size="small"
        v-model="queryInfo.searchContext"
        placeholder="输入姓名检索会员"
        clearable
        @keyup.enter.native="handleSearch"
        type="field"
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
          prop="name"
          label="姓名"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="realName"
          label="实名情况"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="successTimes"
          sortable
          label="活动次数"
          width="100"
          align="center"
        ></el-table-column>
        <!-- <el-table-column prop="point" sortable label="积分" width="100" align="center"></el-table-column> -->
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
            <el-col :offset="5" :span="15">
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

    <el-dialog
      title="会员信息"
      append-to-body
      :visible.sync="dialogVisible"
      width="30%"
      v-model="userInfo"
    >
      <el-form>
        <el-form-item label="真实姓名：">{{ userInfo.name }} </el-form-item>
        <el-form-item label="性别">{{ userInfo.sex }}</el-form-item>
        <el-form-item label="联系方式："
          >{{ userInfo.phoneNumber }}
        </el-form-item>
        <el-form-item label="证件号码：">{{ userInfo.cardId }} </el-form-item>
      </el-form>
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

      dialogVisible: false, //个人信息的显示
      userInfo: "", //个人信息
    };
  },
  computed: {},
  created() {
    // 获取所有的个人用户
    this.getPersonUsers();
  },
  methods: {
    // 获取会员列表
    async getPersonUsers() {
      console.log(":::", this.queryInfo.searchContext);
      const respData = await this.$store.dispatch("admin/getUsersOfRole", {
        roleName: "PERSON",
        page: this.queryInfo.pageNum,
        number: this.queryInfo.pageSize,
        username: this.queryInfo.searchContext,
      });
      // console.log(respData);
      this.totalNumber = respData.userCount ? respData.userCount : 0;
      this.totalPageSize = respData.pageCount ? respData.pageCount : 1;
      respData.personBean.forEach((item) => {
        if (item.realName) item.realName = "已实名";
        else {
          item.realName = "未实名";
          item.age = "无";
        }
      });
      this.tableData = respData.personBean;
      // console.log('table',this.tableData)
    },
    // 通过uuid获取头像
    getAvatarUrl(data) {
      if (!data.avatar) {
        return require("@/assets/imgs/register/personalRegisterIcon.png");
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
    // 会员类型过滤方法
    prefPosFilterMethod(value, row, column) {
      const property = column["property"];
      return this.prefPosMap[row[property]] === value;
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
      // console.log(data);
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
     * 查看用户信息
     */
    async getUserInfo(id) {
      // console.log(id)
      const respData = await this.$store.dispatch("admin/getUserById", {
        userId: id,
      });
      console.log(respData);
      this.userInfo = {
        ...respData.data.userInformation,
        ...respData.data.userExtensionPerson,
      };
      console.log(this.userInfo);
    },
    /**
     * 搜索
     */
    handleSearch() {
      this.getPersonUsers();
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
  box-sizing: border-box;
  position: relative;
  bottom: 1rem;
}
</style>
