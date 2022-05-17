<template>
  <div>
    <div class="crumb-box">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-crumb">
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>所有活动</el-breadcrumb-item>
      </el-breadcrumb>
      <el-input
        placeholder="搜索活动名称"
        class="changeInput"
        size="small"
        v-model="queryInfo.searchContext"
        @keyup.enter.native="handleSearch"
      ></el-input>
    </div>

    <div class="table-box">
      <el-card>
        <el-table
          :data="tableData"
          stripe
          :row-style="{ height: '50px' }"
          @selection-change="handleSelectionChange"
          width="100%"
        >
          <el-table-column
            type="selection"
            label="50"
            align="center"
          ></el-table-column>

          <el-table-column
            prop="name"
            label="活动名称"
            width="150"
            align="center"
          >
            <template slot-scope="scope"
              ><el-button type="text" @click="getAtyDetails(scope.row.id)">{{
                scope.row.name
              }}</el-button></template
            >
          </el-table-column>
          <el-table-column
            prop="launcherName"
            label="活动发布者"
            width="250"
            align="center"
          ></el-table-column>
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
          ></el-table-column>
          <el-table-column label="资料下载" align="center">
            <template slot-scope="scope">
              <el-image
                class="download-icon"
                :src="require('@/assets/imgs/other/dataPack.png')"
                @click="handleDataDownload(scope.row)"
              ></el-image>
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
import Template from "../../tmp/template.vue";

export default {
  components: {
    myButton: Mybutton,
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],

      // 活动类型筛选
      atyTypeFilter: ATY_TYPES,

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
      // 活动详情显示
      atyDetailVisible: false,
      actyDetail: "",
    };
  },
  created() {
    this.getAllAty();
  },
  computed:{
       posterComputed() {
      return (
        this.$store.getters.baseUrl + `/file/download/${this.actyDetail.poster}`
      );
    },
  },
  methods: {
    // 获取待审核活动列表
    async getAllAty() {
      const respData = await this.$store.dispatch("admin/getAllAty", {
        page: this.queryInfo.pageNum,
        number: this.queryInfo.pageSize,
        name: this.queryInfo.searchContext,
      });
      // console.log(respData);
      this.totalNumber = respData.activityCount;
      this.totalPageSize = respData.pageCount;
      let data = [];
      if (respData.adminActivityBeanList) {
        respData.adminActivityBeanList.forEach((item) => {
          // console.log(item)
          data.push({
            ...item.activity,
            ...item.activityExtension,
            zipUrl: item.zipUrl,
            launcherName: item.launcherName,
            launchedTime: this.ReadLaunchedTime(item.activity.launchedTime),
          });
        });
      }

      // console.log(data);
      this.tableData = data;
    },
    /**
     * 搜索活动
     */
    handleSearch() {
      this.getAllAty();
    },
    /**
     * 处理页面切换
     */
    // 处理切换页数
    handleCurrentChange(val) {
      this.queryInfo.pageNum = val;
      this.getAllAty();
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
    async handleDataDownload(scope) {
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
  position: relative;
}

.table-box {
  margin: 10px 15px;
  padding-bottom: 15px;
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
.el-input {
  width: 13rem;
  position: absolute;
  bottom: 0.3rem;
  right: 0.9rem;
}
</style>
