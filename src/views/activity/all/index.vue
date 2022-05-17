// 报名活动页面，分类展示所有活动
<template>
    <div>
        <div class="assist-box">
            <top-nav
                :selected.sync="restrictions"
                @handleSelect="handleSelect"
                @handleSearchAty="handleSearchAty"
            />
            <el-table v-show="activities.length==0" empty-text="暂无活动"></el-table>
            <aty-card
                class="atyCard"
                v-for="item in activities"
                :key="item.id"
                :data="item"
                @click="show(item)"
            />
        </div>
        <!-- 活动信息展示 -->
        <el-dialog
            title="活动详情"
            width="900px"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            append-to-body
            style="overflow: auto; margin-top: -25px;"
        >
            <div class="dialog-container">
                <el-image
                    :src="atyCovImgComputed"
                    class="dialog-img"
                    fit="cover"
                    :style="dialogImgStyle"
                ></el-image>
                <div class="dialog-info">
                    <router-view />
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Mybutton from "@/components/mybutton.vue";
import TopNav from "./modules/TopNav";
import AtyCard from "./modules/AtyCard";

export default {
    components: {
        myButton:Mybutton,
        TopNav,
        AtyCard,
    },
    data() {
        return {
            // 活动限制
            restrictions: {
                atyType: "",
                atyLocation: "",
                atyTime: "",
            },
            atyTimeWeight: {
                '一周内': 1,
                '一月内': 2,
                '三月内': 3,
                '一年内': 4,
                '所有': 5,
            },



            // 选中活动
            selectedAty: {},
            // 活动详细页面
            activities: [],
            // 对话框是否显示
            dialogVisible: false,
            // 搜索的活动
            searchContext:"",

            dialogImgStyle: {
                width: "600px",
                height: this.$store.getters.pageHeight * 0.6 + "px",
            },

            // 处理点击海报的跳转问题
            isClickPoster: this.$store.state.activity.clicked
        };
    },
    watch: {
        // 发现用户修改了活动限制
        restrictions: {
            handler(newVal, oldVal) {
                this.refreshAtys();
            },
            deep: true,
        }
    },
    computed: {
        USER_ID() {
            return this.$store.getters.userId;
        },
        USER_NAME(){
            return this.$store.getters.uname;
        },
        atyCovImgComputed() {
            return this.$store.getters.baseUrl+`/file/download/${this.selectedAty.poster}`;
        },
    },
    async created() {
        // 获取所有未报名活动
        this.refreshAtys();
    },
    mounted(){
        // 路由跳转后，发现点击海报的参数发生改变，则打开详情页面
        // 如果不为空，则证明点击海报获取到了活动id，打开页面并且加载报名内容
        if(this.isClickPoster){
            let  results = this.$store.state.activity.selected_aty; 
              // 展示报名页面，同时点击海报的状态更新  
             this.$store.state.activity.clicked='';
            this.show(results);            
              
        }
    },
    methods: {
        // 重新获取符合限制的活动信息
        async refreshAtys() {
            const atys = await this.$store.dispatch("activity/getAllAty", {
                userId: this.USER_ID,
                name: this.searchContext
            });
            // console.log(atys);
            let data = [];
            for(let i = 0; i < atys.length; ++i) {
                data.push({
                    ...atys[i].activityBean,
                    time: atys[i].time,
                })
            }

            this.activities = data.filter(item => {
                let isPassed = true;
                if(this.restrictions.atyTime != '' && this.restrictions.atyTime != '所有') {
                    if(this.atyTimeWeight[this.restrictions.atyTime] < this.atyTimeWeight[item.time]) isPassed = false;
                }
                if(this.restrictions.atyType != '' && this.restrictions.atyType != '所有') {
                    if(this.restrictions.atyType != item.types) isPassed = false;
                }
                if(isPassed) return item;
            });
        },
        handleSelect(data) {
            this.restrictions = data;
        },

        // 搜索活动
        handleSearchAty(val){
            this.searchContext= val;
            this.refreshAtys();
            // console.log(val);
        },

        // 显示活动信息对话框
       async show(value) {
            this.selectedAty = value;
            console.log(value)
            this.dialogVisible = true;
            // 获取轮播图列表
            const respData = await this.$store.dispatch('activity/getRoundPictures',value.picture);
            value.roundPictures = respData;
            // console.log(value.roundPictures);
            this.$store.commit('activity/SET_SELECTED_ATY', value);
            let nextPath = `/activity/all/register/info?id=${value.id}`;
            if(this.$route.fullPath != nextPath) this.$router.push(nextPath);
        },
        
    },
};
</script>

<style scoped>
.atyCard + .atyCard {
    margin-top: 13px;
}

.dialog-container {
    display: flex;
}

.dialog-info {
    margin-left: 70px;
    /* border: 1px solid red; */
    width: 100%;
    padding-top: 10px;
    overflow: auto;
    height: 450px;
}

</style>

