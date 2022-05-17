<template>
  <div>
    <div class="crumb-box">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-crumb">
        <el-breadcrumb-item>年度审核</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="show">
      <div class="sumbit">
        <mybutton @click="openAnnual">提交年审材料</mybutton>
      </div>
      <!-- <div class="forbidden" v-if="isOpen==false" style="font-size:1.5rem"  >
          年审还未开放！
        </div> -->
    </div>
    <mybutton class="history" type="orange" @click="watchHistory"
      >查看历史年审记录</mybutton
    >
    <el-dialog title="提交材料" :visible.sync="annualVisible" append-to-body>
      <div>
        <div style="margin:2rem">
          <el-form>
            <el-form-item label="年审附件：">
              <p>《江苏省电子竞技运动协会教练员注册信息列表》</p>
              <el-upload
                class="upload-demo"
                action="#"
                :limit="1"
                :http-request="listUpload"
                :before-upload="beforeUpload"
                multiple
              >
                <el-button size="small" type="primary">点击上传</el-button
                >
                <div class="el-upload__tip" slot="tip">只能上传单个大小不超过10mb的word文件!</div>
                <br />
                <el-link type="info" @click="download(3)"
                  >点击下载《江苏省电子竞技运动协会教练员注册信息列表》</el-link
                >
              </el-upload>
            </el-form-item>
          </el-form>
          <div style="display:flex;justify-content:center">
            <mybutton type="orange" @click="submitAnnual">提交</mybutton>
            
          </div>
        </div>
      </div>
    </el-dialog>
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
        <el-table-column prop="result" label="提交结果" align="center">
        </el-table-column>
        <el-table-column prop="year" label="提交年份" align="center">
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleHistoryChange"
        :current-page="historyQuery.pageNum"
        :page-size="historyQuery.pageSize"
        :page-count="historyQuery.totalPageSize"
        layout="total, prev, pager, next, jumper"
        :total=" historyList.length"
      ></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import mybutton from "../../../components/mybutton.vue";
export default {
  components: { mybutton },
  data() {
    return {
      annualVisible: false,
      dialogVisible: false,
      isOpen: "",
      myType: "",
      myType2: "",
      annualForm: {
        annualFile: "",
      },
      // 用于查询历史记录
      historyList: [],
      historyQuery: {
        pageNum: 1,
        pageSize: 10,
        totalNumber: 0,
        totoPageSize: 1,
      },
      // 上传文件限制
      uploadLimit: true,
    };
  },
  created() {
    // var date = new Date();
    // date .toLocaleDateString();
    // // console.log(Date.parse(date));
    // console.log(date);
    this.SetOpenTime();
  },
  methods: {
    openAnnual() {
      this.annualVisible = true;
    },
    listUpload(item) {
      this.annualForm.annualFile = item.file;
      console.log(this.annualForm.annualFile);
    },
    // 提交审核材料
    async submitAnnual() {
      //文件判断
      if (
          this.uploadLimit !== true 
        )
      return this.$message.error("上传文件不符合要求！");

      const data = await this.$store.dispatch(
        "certificate/submitAnnualAuthentication",
        {
          file: this.annualForm.annualFile,
        }
      );
      // console.log(this.annualForm.annualFile);
      location.reload();
      
        

      
    },
    // 开放年审的时间
    SetOpenTime() {
      var date = new Date();
      var startTime = Date.parse(`12/1/${date.getFullYear()}`);
      var endTime = Date.parse(`1/1/${date.getFullYear()}`);
      // console.log(startTime);
      // console.log(endTime);
      // console.log(date.getTime());
      var LocalTime = date.getTime();
      if (LocalTime >= startTime && LocalTime <= endTime) {
        this.isOpen = true;
      } else this.isOpen = false;
      // console.log(this.isOpen);
    },
    // 下载列表模板
    async download(id) {
      this.$store.dispatch("certificate/downloadTemplate", id);
    },
    // 监听
     handleHistoryChange(val){
      this.historyQuery.pageNum = val;
    },
    async watchHistory() {
      this.dialogVisible = true;
      // console.log(this.$store.getters.uname);
      var data = await this.$store.dispatch('certificate/getAnnualAuthenticationResult',
      {
        clubName:this.$store.getters.uname,
        pageNum:this.historyQuery.pageNum,
        pageSize:this.historyQuery.pageSize
      })
      this.historyList = data.data.annualAuthenticationResultBeans;
      console.log(this.historyList)
    },
    // 大小限制
    beforeUpload (file) {
      var fileSize = file.size;
      
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = 
        testmsg == "doc" ||
        testmsg == "docx" ||
        testmsg == "DOC" ||
        testmsg == "DOCX";
      
      const formatJudge =  extension;
      if (!formatJudge) {
          this.$message({
              message: "上传文件只能是word格式!",
              type: "warning",
          });
      }
      const isLt50M = fileSize / 1024 / 1024 <10;
      if (!isLt50M) {
          this.$message.warning(" 上传文件大小不能超过 10mb!");
      }
      this.uploadLimit =  isLt50M&& formatJudge;
    },
    
  },
};
</script>

<style>
.crumb-box {
  padding: 15px;
  background: rgb(115, 134, 147);
  height: 50px;
}
.type-select-box {
  width: 85%;
  height: 125px;
  margin-left: 7%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.show {
  margin: 2rem;
  position: absolute;
  top: 10%;
}
.history {
  margin: 2rem;
  position: absolute;
  top: 25%;
}
.el-upload__tip{
  color:rgb(0, 0, 255);
}
</style>
