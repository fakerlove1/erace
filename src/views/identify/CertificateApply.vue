<template>
  <div>
    <div class="crumb-box">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-crumb">
        <el-breadcrumb-item>证书申请</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-card>
        <el-table :data="memberList">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="申请编号" prop="id"></el-table-column>
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column label="组别" align="center">
            <template slot-scope="scope">{{
              getType(scope.row.type)
            }}</template></el-table-column
          >
          <el-table-column label="等级" prop="level"></el-table-column>
          <el-table-column label="信息操作" align="center">
            <template slot-scope="scope">
              <mybutton
                round
                type="orange"
                style="margin-right:1rem;
                    height:30px;width:80px
                "
                @click="ecertificate(scope.row.id)"
                >电子证书</mybutton
              >
              <mybutton
                slot="reference"
                style="margin-right:1rem;
                    height:30px;width:80px
                "
                @click="paperCertify(scope.row.id)"
                >纸质证书</mybutton
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
        layout="total, prev, pager, next, jumper"
        :total="totalNumber"
      ></el-pagination> -->
      </el-card>
      <el-dialog
        :visible.sync="athleteVisible"
        title="电子证书"
        append-to-body
        width="80%"
      >
        <div id="molds" style="display:none">
          <img
            id="cover"
            alt="封面"
            width="800px"
            height="600px"
            src="../../assets/imgs/molds/证书图片01_画板 1.png"
          />
          <img
            id="first"
            alt="The Scream"
            width="800px"
            height="600px"
            src="../../assets/imgs/molds/证书图片-02.png"
          />
          <img
            id="second"
            alt="The Scream"
            width="1800px"
            height="600px"
            src="../../assets/imgs/molds/证书图片-03.png"
          />
          <img
            id="last"
            alt="The Scream"
            width="800px"
            height="600px"
            src="../../assets/imgs/molds/证书图片-05.png"
          />
          <img
            id="photo"
            alt="The Scream"
            width="800px"
            height="600px"
            style="z-index: 2;"
          />
          <img
            id="seal"
            alt="The Scream"
            width="100px"
            height="100px"
            style="z-index: 2;"
            src="../../assets/imgs/molds/seal.png"
          />
        </div>
        <!-- <p>Canvas:</p> -->
        <div style="display:flex;justify-content:center">
          <canvas
            id="myCanvas"
            width="900px"
            height="2400px"
            style="border:1px solid #d3d3d3;
          z-index: 1"
          >
            您的浏览器不支持 HTML5 canvas 标签。</canvas
          >
        </div>
        <div
          class="footer"
          style="margin:1rem;display:flex;justify-content:center;"
        >
          <mybutton
            type="orange"
            @click="ExportToLocal(`${certInfo.memberName}-电子证书`)"
            >导出</mybutton
          >
        </div>
      </el-dialog>
      <!-- 注销 -->
    </div>

    <!-- 弹框路由 -->

    <el-dialog
      title="申请纸质证书"
      append-to-body
      :visible.sync="AddressVisible"
      width="50%"
      destroy-on-close
    >
      <el-popover
        placement="right"
        title="填写说明"
        width="400"
        trigger="hover"
      >
        <div style="margin:1rem">
          "邮寄需要填写收件人信息，并缴纳相关的证书办理手续费以及邮寄费用。<br />
          协会账户名称：江苏省电子竞技运动协会<br />
          开户行：招商银行南京分行<br />
          账号：125903634610701<br />
        </div>
        <el-link
          type="info"
          slot="reference"
          style="position:absolute;right:3rem;top:3rem"
          >填写说明</el-link
        >
      </el-popover>
      <el-form
        label-width="110px"
        :model="addressForm"
        style="margin:1rem"
        ref="paperRef"
        :rules="PaperRules"
      >
        <el-form-item label="收件人姓名：" prop="receiverName">
          <el-input v-model="addressForm.receiverName"></el-input>
        </el-form-item>
        <el-form-item label="收件人电话：" prop="phoneNumber">
          <el-input v-model="addressForm.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="邮寄地址：" prop="address">
          <el-input v-model="addressForm.address"></el-input>
        </el-form-item>
        <el-form-item label="费用：" prop="cost">
          <el-input v-model="addressForm.cost"></el-input>
        </el-form-item>
        <el-form-item class="width" label="是否需要发票：" prop="needReceipt">
          <el-radio-group v-model="addressForm.needReceipt">
            <el-radio label="true">是</el-radio>
            <el-radio label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="补办原因（初申可不填）：" prop="cause">
          <el-input v-model="addressForm.cause"></el-input>
        </el-form-item>
        <el-form-item label="支付凭证：" prop="evidence">
          <span>请上传支付截图</span>
          <el-upload
            class="upload-demo"
            action="#"
            :limit="1"
            :http-request="evidenceUpload"
            :before-upload="beforeUploadSp"
            multiple
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div class="el-upload__tip" slot="tip">
              只能上传单个大小不超过10mb的png或者jpg文件!
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div style="display:flex;justify-content:center">
        <mybutton @click="submitPostalApplication()">申请</mybutton>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mybutton from "@/components/mybutton.vue";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default {
  components: { mybutton },
  data() {
    return {
      AddressVisible: false,
      dropVisible: false,
      athleteVisible: false,
      memberList: [],
      certInfo: {},
      // 填写的地址信息等
      addressForm: {
        receiverName: "",
        address: "",
        phoneNumber: "",
        cost: "",
        needReceipt: "",
        evidence: "",
        cause: "",
        memberId: "",
      },
      PaperRules: {
        receiverName: [
          {
            required: true,
            message: "请输入收件人姓名！",
            trigger: "blur",
          },
        ],
        receiverName: [
          {
            required: true,
            message: "请输入收件人姓名！",
            trigger: "blur",
          },
        ],
        phoneNumber: [
          {
            required: true,
            message: "请输入收件人电话！",
            trigger: "blur",
          },
        ],
        address: [
          {
            required: true,
            message: "请输入邮寄地址！",
            trigger: "blur",
          },
        ],
        cost: [
          {
            required: true,
            message: "请输入邮寄费用！",
            trigger: "blur",
          },
        ],
        needReceipt: [
          {
            required: true,
            message: "请选择是否需要发票！",
            trigger: "blur",
          },
        ],
        evidence: [
          {
            required: true,
            message: "请上传支付凭证！",
            trigger: "blur",
          },
        ],
      },
      // 上传文件限制
      uploadLimit: true,
    };
  },
  computed: {},
  created() {
    this.getAuthenticationList();
  },
  methods: {
    async getAuthenticationList() {
      let data = [];
      data = await this.$store.dispatch("certificate/getAuthenticationList", {
        type: "",
      });
      data.authorizedBeans.forEach((item) => {
        this.memberList.push(item.member);
      });

      // console.log(this.memberList);
    },
    // 电子证书
    async ecertificate(id) {
      this.athleteVisible = true;
      const info = await this.$store.dispatch("certificate/certificateCreate", {
        memberId: id,
      });
      this.certInfo = info.data;
      this.certInfo.birth = this.getdate(this.certInfo.memberBirth);
      console.log();
      // console.log(this.certInfo)
      // 加载证书画布
      this.loadCertfication();
    },
    // 申请纸质
    paperCertify(id) {
      this.AddressVisible = true;
      this.addressForm.memberId = id;
    },
    // 提交申请
    async submitPostalApplication() {
      //文件判断
      if (this.uploadLimit !== true)
        return this.$message.error("上传文件不符合要求！");

      this.$refs.paperRef.validate(async (valid) => {
        if (!valid) return this.$message("请先完善申请信息！");
        await this.$store.dispatch(
          "certificate/submitPostalApplication",
          this.addressForm
        );
        location.reload();
      });
    },
    evidenceUpload(item) {
      this.addressForm.evidence = item.file;
    },
    beforeUpload() {},
    loadCertfication() {
      // 创建画布
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      // 像素比
      var ratio = 1;
      myCanvas.height = ratio*myCanvas.height;
      myCanvas.width = ratio*myCanvas.width;
      // 挂载证书模板   
      var img = document.getElementById("cover");
      var img1 = document.getElementById("first");
      var img2 = document.getElementById("second");
      var img3 = document.getElementById("last");

      var photo = document.getElementById("photo");
      var seal = document.getElementById("seal");

      photo.src =
        this.$store.getters.baseUrl + `/file/download/${this.certInfo.photo}`;
      // console.log("ph", photo);
      photo.setAttribute("crossOrigin", "anonymous");
      // document.body.appendChild(img);
      ctx.drawImage(img, 0, 0, ratio*900, ratio*600);
      ctx.drawImage(img1, 0, ratio*600, ratio*900, ratio*600);
      ctx.drawImage(img2, 0, ratio*1200, ratio*900, ratio*600);
      ctx.drawImage(img3, 0, ratio*1800, ratio*900, ratio*600);
      ctx.drawImage(seal, ratio*170, ratio*1550, ratio*150, ratio*150);

      //  添加文本
      ctx.font = "20px Arial";
      ctx.textBaseline = "bottom";
      ctx.fillText(this.certInfo.memberName, 650, 1520);
      ctx.fillText(this.certInfo.memberSex == "MALE" ? "男" : "女", 650, 1565);
      ctx.fillText(this.certInfo.birth, 650, 1610);
      ctx.fillText(this.certInfo.memberOrigin, 650, 1650);
      ctx.fillText(this.certInfo.memberIdCard, 600, 1690);
      ctx.fillText(this.certInfo.memberPlayId, 650, 1730);
      ctx.fillText(this.certInfo.number, 150, 1590);
      ctx.fillText(this.certInfo.date, 150, 1690);

      photo.onload = () => {
        ctx.drawImage(photo, 585, 1270, 170, 220);
      };
    },
 
    // 导出图片
    async ExportToLocal(name) {
      // await a.dispatchEvent(event);
      html2canvas(document.getElementById("myCanvas"), {
        background: "#ffffff",
        useCORS: true,
        scale: 2,
      }).then(function(canvas) {
        // 总长度
        let contentWidth = 841.89;
        let contentHeight = 592.28 * 4;
        // console.log(contentHeight);
        let imgWidth = 841.89; //图片宽度高度
        let imgHeight = (841.89 / contentWidth) * contentHeight;
        let pageData = canvas.toDataURL("image/jpeg", 1.0);
        //一页pdf显示html页面生成的canvas高度;
        var pageHeight = (contentWidth / 841.89) * 592.28;
        var leftHeight = contentHeight;
        var position = 0; //页面偏移
        const pdf = new jsPDF("l", "pt", "a4");

        while (leftHeight > 0) {
          pdf.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
          leftHeight -= pageHeight;
          position -= 592.28;
          //避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage();
          }
        }

        pdf.save(name + ".pdf");
      });
    },
    // 时间戳转换
    getdate() {
      //  console.log("=>",this.certInfo.memberBirth) ;
      var date = new Date(parseInt(this.certInfo.memberBirth));
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
    // 包装返回的组别类型
    getType(item) {
      if (item == "AMATEUR_PLAYER") {
        return "非职业组运动员";
      } else if (item == "PROFESSIONAL_PLAYER") {
        return "职业组运动员";
      } else if (item == "AMATEUR_COACH") {
        return "非职业组教练员";
      } else if (item == "PROFESSIONAL_COACH") {
        return "职业组教练员";
      }
    },
    // 大小限制
    beforeUploadSp(file) {
      var fileSize = file.size;

      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      //const extension = testmsg == "pdf" || testmsg == "PDF";
      const extension2 = testmsg == "png" || testmsg == "PNG";
      const extension3 = testmsg == "jpg" || testmsg == "JPG";
      const formatJudge = extension2 || extension3;
      if (!formatJudge) {
        this.$message({
          message: "上传文件只能是png格式!",
          type: "warning",
        });
      }
      const isLt50M = fileSize / 1024 / 1024 <10;
      if (!isLt50M) {
        this.$message.warning(" 上传文件大小不能超过 10mb!");
      }
      this.uploadLimit = isLt50M && formatJudge;
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

.border {
  border: 1px solid green;
}

.type-select-box {
  width: 85%;
  height: 125px;
  margin-left: 7%;
  margin-top: 5%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.type-select-box2 {
  width: 85%;
  height: 125px;
  margin-left: 7%;
  margin-top: 10%;
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
.el-upload__tip {
  color: rgb(0, 0, 255);
}
</style>
