<template>
  <div>
    <div class="crumb-box">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-crumb">
        <el-breadcrumb-item>证书管理</el-breadcrumb-item>
        <el-breadcrumb-item>证书发放</el-breadcrumb-item>
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
          <el-table-column prop="id" label="申请编号" align="center">
          </el-table-column>
          <el-table-column prop="memberId" label="会员编号" align="center">
          </el-table-column>
          <el-table-column align="right">
            <template slot-scope="scope"
              ><el-link type="info" @click="showMemIndex(scope.row.id)">
                申请信息</el-link
              ></template
            >
          </el-table-column>
          <el-table-column align="right" width="300">
            <template slot-scope="scope">
              <div v-if="scope.row.state == 'AUTHORIZING' || 'LOGOUTING'">
                <my-button
                  class="select-button"
                  style="width:80px;height:30pX;margin-right:20px"
                  type="orange"
                  @click="submitPostNum(scope.row.id)"
                  >填写单号
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
                      @click="handleRefuse(scope.row.id, false)"
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
      width="50%"
    >
      <div class="info" style="padding:1rem">
        <div>申请编号：{{ formData.id }}</div>
        <div>邮寄地址：{{ formData.address }}</div>
        <div>收件人姓名：{{ formData.receiverName }}</div>
        <div>
          是否需要发票：{{ formData.needReceipt == true ? "是" : "否" }}
        </div>
        <div>
          电话号码：{{ formData.phoneNumber }}
        </div>
        <div>
          邮寄状态：{{ formData.state == true ? "已邮寄" : "未邮寄" }}
        </div>
        <div>支付凭证：</div>
        <el-image :src="evidenceComputed"> </el-image>
      </div>
    </el-dialog>
    <el-dialog
      title="填写单号"
      append-to-body
      :visible.sync="postVisible"
      width="30%"
    >
      <el-form :model="postNumForm">
        <el-form-item class="width" label="快递单号：" prop="name">
          <el-col :span="10">
            <el-input v-model="postNumForm.postNum"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div style="display:flex;justify-content:center">
        <my-button type="orange" @click="handleSubmit">提交</my-button>
      </div>
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
      postVisible: false,
      //card信息
      tableData: [],
      postNumForm: {
        postNum: "",
        postId: "",
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

      cause: "",
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
    this.getPostApplications();
  },
  computed: {
    evidenceComputed() {
      return (
        this.$store.getters.baseUrl + `/file/download/${this.formData.evidence}`
      );
    },
  },
  methods: {
    /**
     * 查看用户信息
     */
    async getPostApplications() {
      const respData = await this.$store.dispatch("admin/getPostApplications", {
        pageNum: this.queryInfo.pageNum,
        pageSize: this.queryInfo.pageSize,
      });
      this.tableData = respData.sendInformations;
      // console.log("->", respData);
    },

    showMemIndex(id) {
      // this.$message.info("该功能还未正式投入使用，敬请期待！");
      this.dialogVisible = true;
      const data = this.tableData.find((x) => x.id === id);
      console.log(data);
      this.formData = data;
    },
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val;
    },
    handleChange(value) {
      console.log(value);
    },
    submitPostNum(submitPostNum) {
      this.postVisible = true;
      this.postNumForm.postId = submitPostNum;
    },
    // 邮寄
    async handleSubmit() {
     await this.$store.dispatch("admin/postApplication", {
        postId: this.postNumForm.postId,
        state: true,
        trackingNumber: this.postNumForm.postNum,
      });
      location.reload();
    },
    // 不通过
        async handleRefuse(id, isPass) {
      this.$refs.refuseRef.validate(async (valid) => {
        if (!valid) return this.$message.error("请输入不通过原因！");
        this.visible = false;
        // console.log(",",isPass)
        console.log(id)
        const result = await this.$store.dispatch(
          "admin/postApplication",
          {
            postId: id,
            state: isPass,
            cause: this.checkForm.cause,
          }
        );

        location.reload();
      });
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

.info div {
  margin: 1rem;
}
</style>
