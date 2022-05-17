<template>
    <div id="navDiv">
        <div id="selectContainer">
            <el-select
                v-for="select in data"
                :key="select.placeholder"
                class="sortSelect"
                v-model="value"
                :placeholder="select.placeholder"
            >
                <el-option
                    v-for="item in select.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    v-mo
                >
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
import Mybutton from "@/components/mybutton.vue";
export default {
    name: "topNavigation",
    props: ['data'],
    data() {
        return {
        };
    },
};
</script>

<style scoped>
#navDiv {
    width: 100%;
    height: 50px;
    margin-top: 2%;
    margin-bottom: 25px;
    background-color: rgb(81, 108, 122);
}
#selectContainer {
    width: auto;
    height: 100%;
    float: right;
    display: flex;
    align-items: center;
}
.sortSelect {
    width: 125px;
    margin: 0 10px;
}
</style>

