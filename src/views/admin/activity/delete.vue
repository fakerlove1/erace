<template>
    <div>
        <div class="crumb-box">
            <el-breadcrumb
                separator-class="el-icon-arrow-right"
                class="bread-crumb"
            >
                <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>删除活动</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="table-box">
            <el-table 
                :data="tableData" 
                style="width: 100%" 
                stripe @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" label="50" align="center"></el-table-column>
                <el-table-column prop="name" label="活动名称" width="150" align="center"></el-table-column>
                <el-table-column prop="atyUnit" label="活动单位" width="150" align="center"></el-table-column>
                <el-table-column
                    prop="atyType"
                    label="活动类型"
                    width="150"
                    align="center"
                >
                </el-table-column>
                <el-table-column label="资料下载" width="150" align="center">
                    <template>
                        <i class="el-icon-download download-icon"></i>
                    </template>
                </el-table-column>
                <el-table-column prop="reason" label="申请理由" width="150px" align="center"></el-table-column>
                <el-table-column align="center">
                    <template slot-scope="scope">
                        <p class="text blue" @click="linkToAty(scope.row)">活动链接</p>
                    </template>
                </el-table-column>
                <el-table-column align="center">
                    <template v-slot="scope">
                        <my-button @click="handleDelete(scope)" width="75" height="30" class="button">删除</my-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import Mybutton from "@/components/mybutton.vue";
export default {
    components: {
        myButton: Mybutton,
    },
    data() {
        return {
            tableData: [
                {
                    name: "王者荣耀南京城市赛",
                    atyUnit: "腾讯公司",
                    atyType: "赛事",
                    reason: "缺少信息",
                },
                {
                    name: "江苏省高校电玩论坛",
                    atyUnit: "江苏省电竞协会",
                    atyType: "非赛事",
                    reason: "图片错误",
                },
            ],
            multipleSelection: [],
        };
    },
    methods: {
        // 多选处理
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleDelete(value) {
            console.log(value);
        },
        linkToAty(value) {

        },
    },
};
</script>

<style scoped>
.crumb-box {
    padding: 15px;
    background: rgb(115, 134, 147);
    height: 50px;
}

.table-box {
    margin: 5px 15px;
}

.download-icon::before {
    font-size: 20px;
    cursor: pointer;
}

.button {
    margin-top: 5px;
    margin-bottom: 5px;
}
.button + .button {
    margin-left: 15px;
}
.button:hover {
    background: #fca07c;
    box-shadow: 0px 0px 5px #f39671;
    color: white;
}

.text {
    display: inline-block;
    cursor: pointer;
}
.blue {
    color: rgb(146,161,171);
}

.icon-in-level {
    font-size: 16px;
    cursor: pointer;
}
.icon-in-level + .icon-in-level {
    margin-left: 10px;
}
</style>