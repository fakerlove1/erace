<template>
  <div>
      
       <div class="crumb-box">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-crumb">
        <el-breadcrumb-item>更新信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="type-select-box">
        <router-link to="/identify/update/athlete">
      <mybutton
        :type="myType"
        @click="toAthelete()"
        >运动员</mybutton
      ></router-link>
       <router-link to="/identify/update/coach">
      <mybutton
      :type="myType2"
        @click="toCoach()"
        >教练员</mybutton
      >
       </router-link>
    </div>
    <router-view></router-view>
  </div>
  
</template>

<script>
import mybutton from '../../../components/mybutton.vue'
export default {
  components: { mybutton },
  data(){
      return{
           myType:"",
           myType2:""
      }
     
  },
 
  methods:{
      toAthelete(){
          if(!this.myType){
              this.myType="orange";
              this.myType2="";
          }
      },
      toCoach(){
          if(!this.myType2){
              this.myType2="orange";
              this.myType="";
          }
      }
  }

}
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
</style>
