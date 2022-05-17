<template>
  <div>
    <div class="crumb-box">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-crumb">
        <el-breadcrumb-item>证书管理</el-breadcrumb-item>
        <el-breadcrumb-item>认证管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-input
        class="changeInput"
        v-model="queryInfo.searchContext"
        size="small"
        placeholder="输入姓名检索"
        @keyup.enter.native="handleSearch"
      ></el-input>
    </div>

    <!--body-->

    <!--card-->
    <div class="table-box">
      <el-card>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            type="selection"
            label="30"
            align="center"
          ></el-table-column>
          <el-table-column prop="club" label="所属俱乐部" align="center">
          </el-table-column>
          <el-table-column prop="state" label="提交状态" align="center">
          </el-table-column>
          <el-table-column prop="download" label="资料下载" align="center">
            <template slot-scope="scope">
              <el-image
                class="download-icon"
                :src="require('@/assets/imgs/other/dataPack.png')"
                @click="handleDataDownload(scope.row)"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column label="年审记录" align="center">
            <template slot-scope="scope">
              <el-link @click="openAunnualhistory(scope.row.club)" type="info"
                >查看历史年审</el-link
              >
            </template>
          </el-table-column>
          <el-table-column align="right">
            <!-- <p class="text blue" @click="showMemIndex">申请人信息</p> -->
          </el-table-column>
          <el-table-column align="right" width="300">
            <template slot-scope="scope">
              <div v-if="scope.row.state !== '已通过'">
                <my-button
                  class="select-button"
                  style="width:80px;height:30pX;margin-right:20px"
                  type="orange"
                  @click="handleExamine(scope.row.club, true)"
                  >通过
                </my-button>
                <el-popover
                  placement="bottom"
                  title="请输入不通过原因"
                  width="300"
                  trigger="click"
                  ><div>
                    <el-form
                      ref="refuseRef"
                      :rules="refuseRules"
                      :model="checkForm"
                    >
                      <el-form-item label="不通过原因:" prop="cause">
                        <el-input
                          width="100%"
                          style="margin:1rem;"
                          v-model="checkForm.cause"
                          @change="handleChange"
                        >
                        </el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div style="text-align: center; margin: 0">
                    <my-button
                      type="orange"
                      size="mini"
                      @click="handleRefuse(scope.row.club, false)"
                      >确定</my-button
                    >
                  </div>
                  <my-button
                    slot="reference"
                    style="margin-right:1rem;
                    height:30px;width:80px
                "
                    >不通过</my-button
                  >
                </el-popover>
              </div>
              <div v-else-if="scope.row.state == '已通过'">已通过</div>
              <div v-else-if="scope.row.state == '未通过'">
                认证未通过
              </div>
            </template>
          </el-table-column>
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

    <el-dialog
      title="历史记录"
      append-to-body
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-table :data="historyList" style="width: 100%">
        <el-table-column
          type="selection"
          label="30"
          align="center"
        ></el-table-column>
        <el-table-column prop="club" label="所属俱乐部" align="center">
        </el-table-column>
        <el-table-column prop="yearNumber" label="审核年份" align="center">
        </el-table-column>
        <el-table-column prop="state" label="提交状态" align="center">
          <template slot-scope="scope">{{getState(scope.row.state)}}</template>
        </el-table-column>
      </el-table>
       <el-pagination
        @current-change="handleHistoryChange"
        :current-page="historyQuery.pageNum"
        :page-size="historyQuery.pageSize"
        :page-count="historyQuery.totalPageSize"
        layout="total, prev, pager, next, jumper"
        :total="historyList.length"
      ></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import Mybutton from "@/components/mybutton.vue";
import Template from "../tmp/template.vue";
export default {
  components: {
    myButton: Mybutton,
  },
  computed: {
    states() {
      if (this.tableData.state == "UNAUTHORIZED") return "认证未通过";
      else if (this.tableData.state == "AUTHORIZING") return "认证中";
    },
  },
  data() {
    return {
      selectedType: "REFEREE",
      formData: {},
      dialogVisible: false, //个人信息的显示
      visible: false,
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
      checkForm: {
        cause: "",
        result: "",
      },

      refuseRules: {
        cause: [
          { required: true, message: "请输入不通过原因！", trigger: "blur" },
        ],
      },

      // 用于查询历史记录
      historyList:[],
      historyQuery: {
        pageNum: 1,
        pageSize: 10,
        totalNumber: 0,
        totoPageSize: 1,
      },
    };
  },
  created() {
    this.getAnnualList();
  },
  methods: {
    /**
     * 查看用户信息
     */
    async getAnnualList() {
      const respData = await this.$store.dispatch("admin/getAnnualList", {
        pageNum: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize,
      });
      this.tableData = respData.annualAuthenticationBeanList;
      console.log("->", respData);
    },

    showMemIndex() {
      // this.$message.info("该功能还未正式投入使用，敬请期待！");
      this.dialogVisible = true;
      // 获取会员信息
      this.getUserInfo();
    },
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val;
    },
    handleHistoryChange(val){
      this.historyQuery.pageNum = val;
    },
    // 审核通过
    async handleExamine(id, isPass) {
      // console.log(isPass)
      await this.$store.dispatch("admin/checkAnnual", {
        club: id,
        result: isPass,
      });
      location.reload();
    },
    // 审核不通过
    async handleRefuse(id, isPass) {
      this.$refs.refuseRef.validate(async (valid) => {
        if (!valid) return this.$message.error("请输入不通过原因！");
        this.visible = false;
        // console.log(",",isPass)
        console.log(id);
        const result = await this.$store.dispatch("admin/checkAnnual", {
          club: id,
          result: isPass,
          cause: this.checkForm.cause,
        });

        location.reload();
      });
    },
    // 下载附件
    async handleDataDownload(scope) {
      this.$store.dispatch("admin/downloadAnnualZip", scope.fileUrl);
      // console.log(scope)
    },
    handleChange(value) {
      console.log(value);
    },

    // 查看年审记录
    async openAunnualhistory(id) {
      this.dialogVisible = true;
      var data = await this.$store.dispatch('admin/getClubAnnualList',
      {
        clubName:id,
        pageNum:this.historyQuery.pageNum,
        pageSize:this.historyQuery.pageSize
      })
      console.log(data.annualInfos);
      this.historyList = data.annualInfos;
    
    },
    getState(state){
      if(state==1){
        return "已通过";
      }
      else if(state == -1){
        return "认证中";
      }
      else if(state == 0){
        return "未通过";
      }
    }
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
/*上面是后加的*/

.border {
  border: 1px solid green;
}

.type-select-box {
  width: 100%;
  /**
    height: 125px;
    margin-left: 7%;
    margin-top: 5%;
    
    */

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

.el-input {
  width: 13rem;
  float: right;
  box-sizing: border-box;
  position: relative;
  bottom: 1rem;
}

.select-button:hover {
  background: rgb(255, 199, 177);
  color: white;
}
.el-card {
  margin-bottom: 10px;
  width: 100%;
}
</style>
