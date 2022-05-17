// 活动推荐
<template>
    <div>
        <div id="container">
            <div
                v-for="(recommend, index) in recommends"
                :key="index"
                @click="toAtyDialog(recommend.id)"
                class="recommendContainer float-left"
            >
                <el-image
                    style="width: 100%; height: 100%"
                    :src="getCovImg(index)"
                ></el-image>
            </div>
        </div>
    </div>
</template>

<script>
import Mybutton from "@/components/mybutton.vue";

export default {
    components: {
        Mybutton,
    },
    data() {
        return {
            recommends: [],
        };
    },
    computed: {
        USER_TYPE() {
            return this.$store.getters.userType;
        },
        USER_ID() {
            return this.$store.getters.userId;
        },
    },
    async created() {
        const roleData = await this.$store.dispatch("user/getUserRole");
        let userType = roleData[0].split("_")[0];
        if (userType != "ADMIN") {
            const userInfo = await this.$store.dispatch("user/getUserInfo",{
                userId: 0,
            });

            const atys = await this.$store.dispatch("activity/getAllAty", {
                userId: userInfo.userInformation.userId,
            });
            let recommendAtys = [];
            for (let i = 0; i < atys.length && i < 6; ++i) {
                recommendAtys.push({
                    ...atys[i].activityBean,
                    time: atys[i].time,
                });
            }

            this.recommends = recommendAtys;
        } else {
            this.$router.push('/application/review');
        }
    },
    methods: {
        getCovImg(index) {
           return this.$store.getters.baseUrl+`/file/download/${this.recommends[index].poster}`;
        }, 
        // 点击海报报名
        async toAtyDialog(id) {
            // store中证明点击海报的flag（也可以是Boolean）
            this.$store.state.activity.clicked=id;
            // 获取到对应id的推荐海报
            let results = this.recommends.find(x=>x.id === id);
            console.log("id",results);

            // 将选定的活动添加到store中的SET_SELECTED_ATY中
            this.$store.commit('activity/SET_SELECTED_ATY', results);
            // 路由跳转到我的可报名活动，便于二次跳转
             this.$router.push(`/activity/all/register/register`);
        }
    }
};
</script>

<style scoped>
#container {
    width: 100%;
    height: 100%;
}
.float-left {
    float: left;
}
.recommendContainer {
    width: 40%;
    height: 45%;
    /* border: solid red 1px; */
    margin-top: 2%;
    margin-left: 7%;
    position: relative;
    transition: all 0.1s linear;
}
.recommendContainer:hover {
    /* border: solid red 1px; */
    cursor: pointer;
    transform: scale(1.1);
    transition: all 0.3s linear;
}
.image-slot {
    background: grey;
}
</style>