<template> 
<div style="margin:3rem">
<el-form >
    <el-form-item label="团体名称：">
    <div>{{groupInfo.teamName}}</div>
    </el-form-item>
    <el-form-item label="团体性质：">{{groupInfo.organizationType}}</el-form-item>
    <el-form-item label="邮箱：">{{groupInfo.email}}</el-form-item>
    <el-form-item label="电话：">{{groupInfo.tel}}</el-form-item>
    <el-form-item label="网址：">{{groupInfo.website?groupInfo.website:"暂无"}}</el-form-item>
    <el-form-item label="微博：">{{groupInfo.weibo}}</el-form-item>
</el-form>
</div>
</template>

<script>
export default {
  data() {
      return{
         groupInfo:{
            //  userId:"",
            //  teamName:"",
            //  organizationType:"",
            //  times:"",
            //  successTimes:""
         } 
      }
  },
  created() {
       this.getGroupInfo()
  },
  methods:{
    async getGroupInfo(){
        const respData = await this.$store.dispatch('user/getUserInfo',{
                userId: 0,
            })
        
        this.groupInfo=respData.userExtensionOrganization;
        console.log(this.groupInfo);
      }
  }
};
</script>

<style scoped></style>
