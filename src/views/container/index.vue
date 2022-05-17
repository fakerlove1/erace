<template>
    <div id="app">
        <div class="background"></div>
        <div class="containerbody">
            <!-- 导航栏 -->
            <Nav></Nav>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Nav from "@/components/navigation";
import Mybutton from "@/components/mybutton.vue";
export default {
    components: {
        Nav,
        Mybutton,
    },
    created() {
        // console.log(123123);
        
    },
    data() {
        return {};
    },
};
</script>

<style scoped>
.background {
    width: 100%;
    height: 100%;
    /**宽高100%是为了图片铺满屏幕 */
    z-index: -1;
    position: absolute;
    background-size: 100%;
    background-image: url("../../assets/imgs/background.png");
    background-repeat: no-repeat;
}

.containerbody {
    width: 100%;
    z-index: 1;
    position: absolute;
}
</style>

