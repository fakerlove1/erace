<template>
    <div id="app">
        <div class="container">
            <header>
                <div id="title">
                    <div class="title_text">
                        江苏省电子竞技协会<br />jsdj.sportsjs.cn
                    </div>
                </div>
                <div id="refs">
                    <a target="blank" href="http://jsdj.sportsjs.cn/">首页</a>
                    <a target="blank" href="http://jsdj.sportsjs.cn/category/news-information.html">新闻资讯</a>
                    <a target="blank" href="http://jsdj.sportsjs.cn/category/notice.html">通知公告</a>
                    <a target="blank" href="http://jsdj.sportsjs.cn/category/activities.html">活动沙龙</a>
                    <a target="blank" href="http://jsdj.sportsjs.cn/category/association.html">关于协会</a>
                </div>
                <div id="functions">
                    <el-row>
                        <el-col :span="10" :offset="5">
                            <el-input
                                style="line-height: 40px"
                                suffix-icon="el-icon-search"
                            ></el-input>
                        </el-col>
                        <el-col :span="6" :offset="3">
                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link">
                                    <el-avatar
                                        class="avatar"
                                        :size="50"
                                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                                    ></el-avatar>
                                    <i
                                        class="el-icon-arrow-down el-icon--right"
                                    ></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command='logout'>退出</el-dropdown-item
                                    >
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                    </el-row>
                </div>
            </header>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import router from '@/router';
export default {
    data() {
        return {};
    },
    methods: {
        handleCommand(command) {
            // console.log(command);
            if(command === 'logout') {
                // this.$store.dispatch('user/logout');
                window.localStorage.clear();
                location.reload();
            }
        }
    }
};
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    background-size: 100%;
}
header {
    height: 50px;
    padding: 10px;
    display: flex;
    color: #fff;
}
#title {
    flex-grow: 1.2;
}
#title .title_text {
    width: 55%;
    text-align: center;
    font-size: 16px;
    font-weight: 800;
}
#refs {
    width: 30%;
    flex-grow: 2;
    display: flex;
}
#refs a {
    flex: 1;
    line-height: 50px;
    text-decoration: none;
    font-size: 15px;
    color: #fff;
}
#refs a:hover {
    color: grey;
}
#functions {
    flex-grow: 1;
}
#functions .message {
    font-size: 35px;
    line-height: 50px;
}
.avatar {
    position: relative;
    top: -5px;
}
.el-icon-arrow-down {
    font-size: 25px;
    position: relative;
    top: -20px;
}
.el-icon-arrow-down:hover {
    cursor: pointer;
}
</style>


