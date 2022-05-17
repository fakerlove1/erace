<template>
  <div>
    <div class="crumb-box">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-crumb">
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>审核活动</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="table-box">
      <el-card>
        <!-- 活动发布审核 -->
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
          <el-table-column
            prop="name"
            label="申请发布活动"
            width="150"
            align="center"
          >
            <template slot-scope="scope"
              ><el-button type="text"
              @click="getAtyDetails(scope.row.id)"
                >{{ scope.row.name }}
              </el-button></template
            >
          </el-table-column>
          <el-table-column
            prop="types"
            label="活动类型"
            width="150"
            align="center"
            :filters="atyTypeFilter"
            :filter-method="atyTypeFilterHandler"
          >
          </el-table-column>
          <el-table-column
            prop="launchedTime"
            sortable
            label="活动发布时间"
            align="center"
          >
          </el-table-column>
          <el-table-column label="资料下载" width="150" align="center">
            <template slot-scope="scope">
              <el-image
                class="download-icon"
                :src="require('@/assets/imgs/other/dataPack.png')"
                @click="handleDataDownload(scope.row)"
              ></el-image>
            </template>
          </el-table-column>

          <el-table-column label="设置推荐位" width="150" align="center">
            <template slot-scope="scope">
              <!-- 展示状态 -->
              <p
                v-show="!scope.row.isEdit"
                class="text"
                @click="toEdit(scope.$index)"
              >
                {{ scope.row.atyLevel }}
              </p>
              <!-- 编辑状态 -->
              <el-select
                v-show="scope.row.isEdit"
                v-model="scope.row.tlevel"
                size="mini"
                class="changeInput"
              >
                <el-option
                  v-for="(item, index) in atyLevel"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <i
                v-show="scope.row.isEdit"
                class="el-icon-check icon-in-level"
                @click="changeLevel(scope.$index)"
              ></i>
              <i
                v-show="scope.row.isEdit"
                class="el-icon-close icon-in-level"
                @click="cancelChangeLevel(scope.$index)"
              ></i>
            </template>
          </el-table-column>
          <el-table-column align="center">
            <template v-slot="scope">
              <my-button
                @click="handleAllow(scope.$index)"
                width="75"
                height="30"
                class="button"
                >通过</my-button
              >
              <my-button
                @click="handleRefuse(scope.$index)"
                width="75"
                height="30"
                class="button"
                >不通过</my-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 审核撤回的活动 -->
      <el-card>
        <el-table
          :data="cancelTable"
          style="width: 100%"
          stripe
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            label="50"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="申请撤回活动"
            width="150"
            align="center"
          >
          <template slot-scope="scope"
              ><el-button type="text"
              @click="getAtyDetails(scope.row.id)"
                >{{ scope.row.name }}
              </el-button></template
            >
          </el-table-column>
          <el-table-column
            prop="types"
            label="活动类型"
            width="150"
            align="center"
            :filters="atyTypeFilter"
            :filter-method="atyTypeFilterHandler"
          >
          </el-table-column>

          <el-table-column
            label="撤回原因"
            width="150"
            align="center"
            prop="note"
          >
          </el-table-column>
          <el-table-column label="审核撤回" align="center">
            <template v-slot="scope">
              <my-button
                @click="allowDelete(scope.$index)"
                width="75"
                height="30"
                class="button"
                >通过</my-button
              >
              <my-button
                @click="refuseDelete(scope.$index)"
                width="75"
                height="30"
                class="button"
                >不通过</my-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
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
import { ATY_TYPES } from "@/data/wordMap.js";

export default {
  components: {
    myButton: Mybutton,
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      atyLevel: [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
      ],

      // 活动类型筛选
      atyTypeFilter: ATY_TYPES,

      // 撤回的活动
      cancelTable: [],

      // 搜索名字
      // 活动详情显示
      atyDetailVisible:false,
      actyDetail:''
    };
  },
  async created() {
    this.getExamAty();
    this.getCancelAty();
  },
  computed:{
      posterComputed() {
      return (
        this.$store.getters.baseUrl + `/file/download/${this.actyDetail.poster}`
      );
    },
  },
  methods: {
    /**
     * 活动发布
     */
    // 获取待审核活动列表
    async getExamAty() {
      const atyList = await this.$store.dispatch("admin/getExamAty");
      let data = [];
      for (let i = 0; i < atyList.length; ++i) {
        data.push({
          ...atyList[i].activity,
          ...atyList[i].activityExtension,
          zipUrl: atyList[i].zipUrl,
        });
        data[i].atyLevel = "默认";
        data[i].isEdit = false;
        data[i].launchedTime = this.ReadLaunchedTime(
          atyList[i].activity.launchedTime
        );
      }
      console.log(data);
      this.tableData = data;
    },
    // 处理同意
    async handleAllow(index) {
      const result = await this.$store.dispatch("admin/examAty", {
        actId: this.tableData[index].id,
        isPassed: true,
        cause: "",
        level:
          this.tableData[index].atyLevel == "默认"
            ? ""
            : this.tableData[index].atyLevel,
      });
      // console.log(result);
      if (result.status == 200) this.tableData.splice(index, 1);
    },
    // 处理不同意
    handleRefuse(index) {
      this.$messagebox
        .prompt("请输入不通过的原因", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: "理由不能为空!",
        })
        .then(async ({ value }) => {
          const result = await this.$store.dispatch("admin/examAty", {
            actId: this.tableData[index].id,
            isPassed: false,
            cause: value,
          });
          if (result.status == 200) this.tableData.splice(index, 1);
        })
        .catch(() => {});
    },
    // 推荐位进入编辑状态
    toEdit(index) {
      this.tableData[index].isEdit = true;
    },
    // 更改推荐位
    changeLevel(index) {
      if (this.tableData[index].tlevel == "")
        this.tableData[index].atyLevel = "默认";
      else this.tableData[index].atyLevel = this.tableData[index].tlevel;
      this.cancelChangeLevel(index);
    },
    // 取消推荐位设置
    cancelChangeLevel(index) {
      this.tableData[index].tlevel = "";
      this.tableData[index].isEdit = false;
    },

    /**
     * 活动撤销申请
     */
    // 撤销通过
    // 获取待审核活动撤销列表
    async getCancelAty() {
      const atys = await this.$store.dispatch("admin/getCancelAty");
      this.cancelTable = atys;
    },
    // 同意撤回
    async allowDelete(index) {
      const result = await this.$store.dispatch("admin/examCancelAty", {
        actId: this.cancelTable[index].id,
        isPassed: true,
        cause: "",
      });
      if (result) this.cancelTable.splice(index, 1);
    },
    // 拒绝撤销
    refuseDelete(index) {
      this.$messagebox
        .prompt("请输入不通过的原因", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: "理由不能为空!",
        })
        .then(async ({ value }) => {
          const result = await this.$store.dispatch("admin/examCancelAty", {
            actId: this.cancelTable[index].id,
            isPassed: false,
            cause: value,
          });
          if (result) this.cancelTable.splice(index, 1);
        })
        .catch(() => {});
    },

    /**
     * 其他操作
     */
    // 多选处理
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 活动类型筛选
    atyTypeFilterHandler(value, row, column) {
      if (row[column.property] == value) return value;
    },

    // 下载附件
    handleDataDownload(scope) {
      this.$store.dispatch("data/downloadAnnex", scope.zipUrl);
    },
    // 时间戳转换
    ReadLaunchedTime(timeString) {
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
    //获取活动详情
    getAtyDetails(id){
        this.atyDetailVisible=true;
         const acty = this.tableData.find((x) => x.id === id);
        this.actyDetail = acty;
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

.download-icon {
  cursor: pointer;
  width: 50px;
}

.button {
  margin-top: 5px;
  margin-bottom: 5px;
}
.button + .button {
  margin-left: 15px;
}
.button:hover {
  background: #fca07c;
  box-shadow: 0px 0px 5px #f39671;
  color: white;
}

.text {
  display: inline-block;
  cursor: pointer;
}

.icon-in-level {
  font-size: 16px;
  cursor: pointer;
}
.icon-in-level + .icon-in-level {
  margin-left: 10px;
}
.el-card {
  margin-bottom: 10px;
}
</style>
