<template>
  <div>
   <el-popover
        placement="top"
        title="填写说明"
        width="50%"
        trigger="hover"
      >
        <div style="margin:1rem">
      <pre>
         如选择“教练员证注销”，各个选项提交的材料如下：

        教练员本人申请——教练员本人手写或签字的注销申请，需得到俱乐部负责人签字批准并盖章

        教练员退役/转岗——教练员本人手写或签字的退役申请，需得到俱乐部负责人签字批准并盖章

        教练员违法违规——俱乐部对教练员违法违规行为的说明，需由俱乐部负责人签字并盖章，
        
        并附带其它可证明违法违规行为的材料（职业联盟处罚说明、公安机关、司法机关材料等）
      </pre>
        </div>
        <el-link
          type="info"
          slot="reference"
          style="position:absolute;right:3rem;top:3rem"
          >填写说明</el-link
        >
      </el-popover>
    <el-form :model="dropForm" ref="dropRef" :rules="dropRules">
      <el-form-item label="注销原因：" prop="dropCause">
        <el-select v-model="dropForm.dropCause">
          <el-option
            v-for="item in causes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- TODO: 添加一下提示 -->
      <el-form-item label="证明材料：" prop="dropFile">
        <p>请上传证明材料压缩包</p>
        <el-upload
          class="upload-demo"
          action="#"
          :limit="1"
          :http-request="filegUpload"
          :before-upload="beforeUpload"
          multiple
        >
          <el-link type="info" @click="download(4)">点击下载《江苏省电子竞技运动员注销申请表》</el-link
          ><br />
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <br />
      </el-form-item>
    </el-form>
    <div style="display:flex;justify-content:center">
      <mybutton type="orange" @click="logoutApplication">提交</mybutton>
    </div>
  </div>
</template>

<script>
import mybutton from "../../../../components/mybutton.vue";
export default {
  components: { mybutton },
  data() {
    return {
      causes: [
        { value: "教练员本人申请", label: "运动员本人申请" },
        { value: "教练员退役/转岗", label: "运动员退役/转岗" },
        { value: "教练员违法违规", label: "运动员违法违规" },
      ],
      dropForm: {
        dropCause: "",
        dropFile: "",
      },
      dropRules: {
        dropCause: [
          {
            required: true,
            message: "请选择注销原因！",
            trigger: "blur",
          },
        ],
        dropFile: [
          {
            required: true,
            message: "请上传证明材料！",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    filegUpload(item) {
      this.dropForm.dropFile = item.file;
    },
    beforeUpload() {},
    // 提交注销申请
    async logoutApplication() {
      this.$refs.dropRef.validate(async (valid) => {
        if (!valid) return this.$message.error("请先完善注销信息！");
        const data = await this.$store.dispatch(
          "certificate/logoutApplication",
          {
            memberId: this.$store.getters.DROP_MEMBER,
            cause: this.dropForm.dropCause,
            material: this.dropForm.dropFile,
          }
        );
        location.reload();
      });
    },
    async download(id) {
      this.$store.dispatch("certificate/downloadTemplate", id);
    },
  },
};
</script>

<style></style>
