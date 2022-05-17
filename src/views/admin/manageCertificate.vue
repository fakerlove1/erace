<template>
  <div>
    <div class="crumb-box">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-crumb">
        <el-breadcrumb-item>证书管理</el-breadcrumb-item>
         <el-breadcrumb-item>认证管22理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table-box">
      <el-table
        :data="tableData"
        style="width: 100%"
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column width="51" align="center">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="100" align="center">
        </el-table-column>
        <el-table-column
          prop="vipType"
          label="会员类型"
          width="180"
          :filters="vipTypeFilters"
          :filter-method="vipTypeFilterMethod"
          align="center"
        >
        </el-table-column>
        <el-table-column label="资料下载" width="180" align="center">
          <template slot-scope="scope">
            <el-image
              class="download-icon"
              :src="require('@/assets/imgs/other/dataPack.png')"
              @click="handleDataDownload(scope.row)"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="申请证书类型" align="center">
          <template slot-scope="scope">{{ getType(scope.row.type) }}</template>
        </el-table-column>
        <el-table-column align="center">
          <template v-slot="scope">
            <el-upload
              style="display: inline-block;"
              class="button"
              action="https://jsonplaceholder.typicode.com/posts/"
              :limit="1"
              :http-request="myUpload($event, scope)"
            >
              <el-button size="small" type="primary">选择文件</el-button>
            </el-upload>
            <my-button
              @click="handleAllow(scope)"
              width="75"
              height="30"
              class="button hoverbutton"
              >通过</my-button
            >
            <my-button
              @click="handleRefuse(scope)"
              width="75"
              height="30"
              class="button hoverbutton"
              >不通过</my-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      tableData: [
        // {
        //     avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        //     name: "name1",
        //     vipType: "个人",
        //     certificateType: "教练员",
        // },
        // {
        //     avatar: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        //     name: "name2",
        //     vipType: "团体",
        //     certificateType: "运动员",
        // },
      ],
      multipleSelection: [],
      vipTypeFilters: [
        { text: "个人", value: "PERSON" },
        { text: "团体", value: "GROUP" },
        { text: "俱乐部", value: "CLUB" },
      ],
      vipTypeMap: {
        PERSON: "个人",
        GROUP: "团体",
        CLUB: "俱乐部",
      },
    };
  },
  created() {
    this.getUserRequests();
  },
  methods: {
    /**
     * 信息获取处理
     */
    async getUserRequests() {
      const respData = await this.$store.dispatch("admin/getUserRequests");
      let datas = [];
      for (let i = 0; i < respData.length; ++i) {
        let userReqInfo = await this.$store.dispatch(
          "admin/getUserReqInfo",
          respData[i]
        );
        // 信息的处理

        datas.push(userReqInfo);
      }
      // this.tableData = datas;
    },

    /**
     * 用户请求处理
     */
    myUpload(item, scope) {
      console.log(item);
      console.log(scope);
    },
    handleAllow(scope) {},
    handleRefuse(scope) {
      this.$messagebox
        .prompt("请输入不通过的原因", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: "理由不能为空!",
        })
        .then(async ({ value }) => {
          this.$store.dispatch("admin/examUserRequest", {
            userReqId: scope.row.userReqId,
            passed: false,
            cause: value,
          });
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
    // 会员类型过滤方法
    vipTypeFilterMethod(value, row, column) {
      const property = column["property"];
      return row[property] === this.vipTypeMap[value];
    },

    // 包装返回的组别类型
    getType(item) {
      if (item == "AMATEUR_PLAYER") {
        return "运动员";
      } else if (item == "PROFESSIONAL_PLAYER") {
        return "职业组运动员";
      } else if (item == "AMATEUR_COACH") {
        return "教练员";
      } else if (item == "PROFESSIONAL_COACH") {
        return "职业组教练员";
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
.hoverbutton:hover {
  background: #fca07c;
  box-shadow: 0px 0px 5px #f39671;
  color: white;
}
</style>
