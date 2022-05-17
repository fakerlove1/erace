<template>
    <div id="navDiv">
        <div id="selectContainer">
            <el-select
                class="sortSelect"
                v-model="value.atyType"
                placeholder="活动类型"
                @change="changed"
            >
                <el-option
                    v-for="item in atyTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
            <!-- <el-select
                class="sortSelect"
                v-model="value.atyLocation"
                placeholder="活动地区"
                @change="changed"
            >
                <el-option
                    v-for="item in atyLocations"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select> -->
            <el-select
                class="sortSelect"
                v-model="value.atyTime"
                placeholder="距开始时间"
                @change="changed"
            >
                <el-option
                    v-for="item in atyTimes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
            <el-input 
                class="changeInput"
                size="small"
                placeholder="输入活动名称"
                v-model="searchContext"
                @keyup.enter.native="handleSearch"
                clearable	
            >
            </el-input>
        </div>
    </div>
</template>

<script>
import { ATY_TYPES } from "@/data/wordMap.js";
export default {
    props: ['selected'],
    data() {
        return {
            atyTypes: [
                {
                    value: "所有",
                    label: "所有",
                },
                ...ATY_TYPES,
            ],
            atyLocations: [
                { value: "所有", label: "所有" },
                { value: "所在市内", label: "所在市内" },
                { value: "所在省内", label: "所在省内" },
            ],
            atyTimes: [
                { value: "所有", label: "所有" },
                { value: "一周内", label: "一周内" },
                { value: "一月内", label: "一月内" },
                { value: "三月内", label: "三月内" },
                { value: "一年内", label: "一年内" },
            ],
            value: this.selected,

            // 检索内容
            searchContext:""
        };
    },
    async created() {
    },
    methods: {
        changed() {
            this.$emit('handleSelect', this.value);
        },

        // 搜索自己可报名的活动
        handleSearch (e) {
            var keyCode = window.event? e.keyCode:e.which;
                var val = e.target.value;
                // console.log('回车搜索',keyCode,e);
                if(keyCode == 13 && val){
                    // console.log(val);
                    this.$emit('handleSearchAty',val);
                }
        }
    }
};
</script>

<style scoped>
#navDiv {
    width: 100%;
    height: 50px;
    margin-top: 1%;
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
.changeInput{
    width: 13rem;
    margin-right: 1rem;
}
</style>

