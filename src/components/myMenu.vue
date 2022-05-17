<template>
    <div>
        <div class="sub-menu" v-for="item in mymenus" :key="item.router">
            <div v-show="item.children" class="sub-menu-group-header sub-menu">
                <p @click="showSubMenu(item)">
                    {{ item.name }} <i class="el-icon-arrow-down"></i>
                </p>

                <div
                    class="arrow relative-left"
                    v-show="isRootRouter(item)"
                ></div>
                <div class="sub-menu-items" v-show="!item.ishidden">
                    <mybutton
                        v-for="i in item.children"
                        :key="i.id"
                        class="menu-button sub-menu-item margin"
                        width="100"
                        height="25"
                        @click="changeView(i)"
                        :type="
                            isActive == i.router
                                ? 'staticOrange'
                                : 'transparent'
                        "
                        >{{ i.name }}</mybutton
                    >
                </div>
            </div>

            <mybutton
                v-show="!item.children"
                class="menu-button sub-menu-item"
                @click="changeView(item)"
                :type="isActive == item.router ? 'staticOrange' : 'transparent'"
                width="120"
                size="13"
                >{{ item.name }}</mybutton
            >
            <div
                class="arrow relative-left"
                v-show="isActive == item.router && !item.children"
            ></div>
        </div>
    </div>
</template>

<script>
import Mybutton from "@/components/mybutton.vue";
export default {
    props: ["data"],
    components: {
        Mybutton,
    },
    data() {
        return {
            mymenus: this.data,
        };
    },
    computed: {
        isActive() {
            return this.$store.getters.routerPath;
        },
        rootRouter() {},
    },
    watch: {
        data(newVal, oldVal) {
            this.mymenus = newVal;
        },
        isRootRouter() {},
    },
    methods: {
        changeView(item) {
            this.$router.push(item.router);
        },
        isRootRouter(item) {},
        showSubMenu(item) {
            this.mymenus[item.id - 1].ishidden = !this.mymenus[item.id - 1].ishidden;
        },
    },
};
</script>

<style scoped>
.menu-button {
    position: relative;
    left: 13%;
}
.sub-menu + .sub-menu {
    margin-top: 20px;
}
.sub-menu-group-header p {
    width: 120px;
    height: 35px;
    text-align: center;
    color: white;
    font-size: 13px;
    position: relative;
    left: 13%;
    cursor: pointer;
    line-height: 35px;
}
.sub-menu-group-header p:hover {
    color: rgb(243, 180, 156);
}
.sub-menu-items .sub-menu-item {
    position: relative;
    left: 33%;
    font-size: 11px;
    text-align: left;
    padding-left: 7px;
    display: block;
}
.margin + .margin {
    margin-top: 2px;
}
/* .arrow {
    position: relative;
    right: -1px;
    top: 1px;
    float: right;
    display: inline;
    width: 13px;
    height: 13px;
    border: 13px solid;
    border-color: transparent rgb(255, 255, 255) transparent transparent;
} */
.arrow {
    position: relative;
    right: -1px;
    float: right;
    display: inline;
    width: 0;
    height: 0;
    border-top: 13px solid transparent;
    border-right: 13px solid white;
    border-bottom: 13px solid transparent;
    font-size: 0;
    line-height: 0;
}
</style>

