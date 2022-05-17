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
          <el-table-column align="center" width="51">
            <!-- <template slot-scope="scope">
            <el-avatar :src="getAvatarUrl(scope.row)"></el-avatar>
          </template> -->
          </el-table-column>
          <el-table-column prop="applicationId" label="申请编号" align="center">
          </el-table-column>
          <el-table-column prop="memberId" label="会员编号" align="center">
          </el-table-column>
          <el-table-column prop="name" label="姓名" align="center">
          </el-table-column>
          <el-table-column
            prop="applicationType"
            label="申请证书类型"
            align="center"
          >
            <template slot-scope="scope">
              {{ getCertType(scope.row.applicationType) }}
            </template>
          </el-table-column>
          <el-table-column prop="club" label="所属俱乐部" align="center">
          </el-table-column>
          <!-- <el-table-column prop="clubType" label="俱乐部类型" align="center">
          </el-table-column> -->
          <el-table-column prop="download" label="资料下载" align="center">
            <template slot-scope="scope">
              <el-image
                class="download-icon"
                :src="require('@/assets/imgs/other/dataPack.png')"
                @click="handleDataDownload(scope.row)"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="认证状态" align="center">
            <template slot-scope="scope">
              {{ getState(scope.row.state) }}
            </template>
          </el-table-column>

          <el-table-column align="right">
            <template slot-scope="scope">
              <p class="text blue" @click="showMemIndex(scope.row.memberId)">
                申请信息
              </p></template
            >
          </el-table-column>
          <el-table-column align="right" width="300">
            <template slot-scope="scope">
              <div v-if="scope.row.state == 'AUTHORIZING' || 'LOGOUTING'">
                <my-button
                  class="select-button"
                  style="width:80px;height:30pX;margin-right:20px"
                  type="orange"
                  @click="
                    handleExamine(
                      scope.row.applicationId,
                      scope.row.state,
                      true
                    )
                  "
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
                        >
                        </el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div style="text-align: center; margin: 0">
                    <my-button
                      type="orange"
                      size="mini"
                      @click="handleRefuse(scope.row.applicationId, scope.row.state,                                     false)"
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
              <div v-else-if="tableData.state == 'AUTHORIZED'">已认证</div>
              <div v-else-if="tableData.state == 'UNAUTHORIZED'">
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
      title="申请人信息"
      append-to-body
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form>
        <el-form-item label="真实姓名：">{{ applInfo.name }} </el-form-item>
        <el-form-item label="性别："
          >{{ applInfo.sex == "FEMALE" ? "女" : "男" }}
        </el-form-item>
        <el-form-item label="出生年月：">{{ getdate() }} </el-form-item>
        <el-form-item label="身份证号码："
          >{{ applInfo.idcardNumber }}
        </el-form-item>

        <div v-if="applInfo.applicationType !== 'UPDATE'">
          <el-form-item label="申请运动员等级：">
            {{ getTypeLevel() }}
          </el-form-item>
          <el-form-item label="申请运动员游戏项目：">{{
            applInfo.project
          }}</el-form-item>
        </div>

        <div v-else>
          <el-form-item label="申请运动员类型：">
            <span>{{ getSplitStr(applInfo.type, 0) + "->" }}</span
            ><span style="color:red">{{ getSplitStr(applInfo.type, 1) }}</span>
          </el-form-item>
          <el-form-item label="申请运动员等级：">
            <span>{{ getSplitStr(applInfo.level, 0) + "->" }}</span
            ><span style="color:red">{{ getSplitStr(applInfo.level, 1) }}</span>
          </el-form-item>
          <el-form-item label="申请运动员游戏项目：">
            <span>{{ getSplitStr(applInfo.project, 0) + "->" }}</span
            ><span style="color:red">{{
              getSplitStr(applInfo.project, 1)
            }}</span>
          </el-form-item>
        </div>
      </el-form>
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
  data() {
    return {
      applInfo: "", //申请信息
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

      // cause: "",
      checkForm: {
        cause: "",
        result: "",
      },

      refuseRules: {
        cause: [
          { required: true, message: "请输入不通过原因！", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getApplications();
  },
  methods: {
    /**
     * 查看用户信息
     */
    async getApplications() {
      const respData = await this.$store.dispatch("admin/getApplications", {
        pageNum: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize,
      });
      // console.log(respData);
      this.totalNumber = respData.data.applications.length;
      let data = [];
      if (respData.data.applications) {
        respData.data.applications.forEach(async (item) => {
          //  console.log(item.application.memberId)
          const info = await this.getAuthenticationDetail(item.memberId);
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
    async getAuthenticationDetail(value) {
      // console.log('->',value)
      const infoData = await this.$store.dispatch(
        "admin/getAuthenticationDetail",
        {
          memberId: value,
        }
      );
      // console.log("->",infoData.data.member)
      if (infoData.data.member) {
        return infoData.data.member;
      }
    },

    showMemIndex(id) {
      // this.$message.info("该功能还未正式投入使用，敬请期待！");
      this.dialogVisible = true;

      // 获取会员信息
      const x = this.tableData.find((x) => x.memberId === id);
      this.applInfo = x;
    },
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val;
    },
    // 下载附件
    async handleDataDownload(scope) {
      this.$store.dispatch("data/downloadAnnex", scope.zipUrl);
    },
    // 审核通过
    async handleExamine(id, state, isPass) {
      // console.log(isPass)
      var str = "";
      if (state == "LOGOUTING") {
        str = "checkLogoutApplication";
      } else {
        str = "checkAuthenticationApplication";
      }
      console.log(str)
      await this.$store.dispatch(`admin/${str}`, {
        applicationId: id,
        result: isPass,
      });
      location.reload();
    },
    // 审核不通过
    async handleRefuse(id, state, isPass) {

       var str = "";
      if (state == "LOGOUTING") {
        str = "checkLogoutApplication";
      } else {
        str = "checkAuthenticationApplication";
      }
      this.$refs.refuseRef.validate(async (valid) => {
        if (!valid) return this.$message.error("请输入不通过原因！");
        this.visible = false;
        // console.log(",",isPass)
        
        console.log(id);
        const result = await this.$store.dispatch(
         `admin/${state}`,
          {
            applicationId: id,
            result: isPass,
            cause: this.checkForm.cause,
          }
        );

        location.reload();
      });
    },
    // 包装返回的证书类型
    getCertType(item) {
      switch (item) {
        case "AUTHENTICATION":
          return "认证";
        case "LOGOUT":
          return "注销";
        case "UPDATE":
          return "更新";
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
    // 时间戳转换
    getdate() {
      //  console.log("=>",this.certInfo.memberBirth) ;
      var date = new Date(parseInt(this.applInfo.birth));
      // console.log(date);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";

      return Y + M + D;
    },

    // 包装返回的运动员类别
    getTypeLevel() {
      // applInfo.type+applInfo.level
      // 主要需要返回“职业一级运动员 非职业二级教练员等等” 只能通过后端返回的包装一下 目前想过前端最好的包装方法（苦中作乐自恋一下）
      var types, levels;
      switch (
        this.applInfo.level //包装一下等级 变成中文的
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
        this.applInfo.type //包装类型，并把等级插进去
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

    // 包装切割的字符串
    /**
     * project、type、level都是更新的时候加上";"隔开，需要用split分割成两个状态
     */
    getSplitStr(str, index) {
      // console.log("-->", this.applInfo);
      var upInfo = str.split(";");
      console.log(upInfo);
      switch (upInfo[index]) {
        case "AMATEUR_PLAYER": {
          return "非职业运动员";
        }
        case "AMATEUR_COACH": {
          return "非职业教练员";
        }
        case "PROFESSIONAL_PLAYER": {
          return "职业运动员";
        }
        case "PROFESSIONAL_COACH": {
          return "职业教练员";
        }
        case "1": {
          return "一级";
        }
        case "2": {
          return "二级";
        }
        case "3": {
          return "三级";
        }
        default:
          return upInfo[index];
      }
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
