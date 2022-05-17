// 活动页面的框架页
<template>
    <div id="dashboardContainer">
        <!-- 侧边栏容器 -->
        <div id="menuContainer">
            <!-- 侧边栏的头像、用户名等信息 -->
            <div class="avatarContainer">
                <div class="avatar">
                    <el-avatar :size="120" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    <!-- 小星星图标 -->
                    <i></i>
                </div>
                <div class="avatarWords">
                    <span>{{ this.$store.getters.uname }}</span>
                    <span>{{ userType }}</span>
                    <!-- <span>积分：{{ this.$store.getters.tolItg }}</span> -->
                </div>
            </div>
            <!-- 侧边栏 -->
            <div class="menu">
                <my-menu :data="menus"></my-menu>
            </div>
        </div>
        <!-- 主页视窗 -->
        <div id="routerContainer">
            <router-view id="routerView" name="default" />
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import Mybutton from "@/components/mybutton.vue";
import { mapMutations } from "vuex";
import MyMenu from '../../components/myMenu.vue';

export default {
    components: {
        Mybutton,
        MyMenu,
    },
    data() {
        return {
            // 侧边栏激活信息
            isActive: "",
            // 侧边栏信息数组
            menus: [
                {
                    id: null,
                    name: "",
                    router: "",
                },
            ],
        };
    },
    async created() {

        // 获取已经激活的侧边栏选项
        let data = this.$store.getters.routerPath;
        if (data) this.isActive = data;
        

        // 获取用户信息
        const userInfo = await this.$store.dispatch('user/getMyInfo');

        // console.log(userInfo);
        // 判断用户种类，获取不同的侧边栏信息
        const userType = userInfo.userType;

        if(userInfo.userType == 'personal') {
            this.menus = this.$store.getters.PERSONAL_MENU;
        } else if(userInfo.userType == 'group' || userType == 'club') {
            this.menus = this.$store.getters.GROUP_MENU;
        } else if(userInfo.userType == 'admin'){
            this.menus = this.$store.getters.ADMIN_MENU;
        }

    },
    mounted() {
        // 监听网页窗口的改变动态改变窗口的高度
        let that = this;
        $(window).resize(function () {
            that.GetPageHeight();
        });
        this.GetPageHeight();
    },
    watch: {
        ROUTER_PATH(newVal, oldVal) {
            this.isActive = newVal;
        },
    },
    computed: {
        USER_TYPE() {
            return this.$store.getters.userType;
        },
        AVATAR() {
            return this.$store.getters.avatar;
        },
        BASER_URL() {
            return this.$store.getters.baseUrl;
        },
        USER_ID() {
            return this.$store.getters.userId;
        },
        ROUTER_PATH() {
            return this.$store.getters.routerPath;
        },


        // 获取头像信息
        avatarComputed() {
            if(this.AVATAR == 'no-avatar') {
                if(this.USER_TYPE == 'personal') {
                    return require('@/assets/imgs/register/personalRegisterIcon.png')
                } else {
                    return require('@/assets/imgs/register/companyRegisterIcon.png')
                }
            } else {
                return `${this.BASER_URL}file??uuid=${this.AVATAR}&userId=${this.USER_ID}`;
            }
        },
        // 获取用户类型的中文
        userType() {
            let map = {
                'personal': '个人',
                'club': '俱乐部',
                'company': '组织机构',
                'admin': '管理员',
            };
            return map[this.USER_TYPE];
        },
    },
    methods: {
        ...mapMutations("permissions", ["SET_ISACTIVE"]),
        ...mapMutations("other", ["SET_PAGEHEIGHT"]),
        GetPageHeight() {
            // 获取网页可视页面的高度
            let pageH2 = document.documentElement.clientHeight;
            // 设置高度
            $("#dashboardContainer").css("height", pageH2 * 0.85 + "px");
            $("#routerView").css("height", pageH2 * 0.85 + "px");
            $("#routerView").css("max-height", pageH2 * 0.85 + "px");
            this.SET_PAGEHEIGHT(pageH2);
        },
        // 路由跳转视图
        changeView(item) {
            item.buttonType = "staticOrange";

            this.$router.push(item.router);
        },
        // 设置button的type
        buttonType(item) {
            if (this.isActive == item.router) return "staticOrange";
            else return "transparent";
        },
    },
};
</script>

<style scoped>
#dashboardContainer {
    position: absolute;
    min-width: 30rem;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 25px;
    width: 88%;
    min-height: 625px;
    background: white;
    display: flex;
    border-radius: 20px;
    overflow-y: auto;
}
#menuContainer {
    width: 15%;
    min-width: 10rem;
    height: 100%;
    border-radius: 20px 0 0 20px;
    background: rgb(115, 134, 147);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;
}
/* 侧边栏头像 */
.avatarContainer {
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
}
.avatarWords {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.avatarWords span {
    color: white;
    font-size: 13px;
}
/* 侧边栏 */
.menu {
    width: 100%;
    height: 55%;
    display: flex;
    flex-direction: column;
    align-content: center;
    overflow-x: hidden;
    border-right: white;
    font-size: 0;
}
.subMenuItem {
    flex: 1;
}
.menuButton {
    position: relative;
    left: 15%;
}
/* .arrow {
    position: relative;
    right: -1px;
    top: 1px;
    float: right;
    display: inline-block;
    width: 15px;
    height: 15px;
    border: 15px solid;
    border-color: transparent white transparent transparent;
} */
/* router view */
#routerContainer {
    /* position: relative;
    left: 3%; */
    width: 100%;
    /* padding-right: 2%; */
    overflow: auto;
}
#routerView {
    width: 100%;
    padding-bottom: 30px;
}
</style>

