<template>
    <div>
        <div class="dialog-info-title">
            <h2>{{ atyInfo.name }}</h2>
        </div>
        <div class="dialog-info-location">
            <i class="el-icon-location-outline"></i>
            <p>{{ atyInfo.location }}</p>
        </div>
        <div class="dialog-info-divider">
            <el-divider></el-divider>
        </div>
        <div class="form_box">
            <!-- 个人 -->
            <el-form
                v-show="USER_TYPE == 'personal'"
                :model="personalFormData"
                ref="ppFormRef"
                label-width="100px"
                size="small"
            >
                <el-form-item label="报名人员：">
                    <p>{{ $store.getters.uname }}</p>
                </el-form-item>
                <el-form-item label="意向岗位：">
                    <el-select class="changeInput" v-model="personalFormData.prefPos">
                        <el-option
                            v-for="(item, index) in prefPosOptionsComputed"
                            :key="index"
                            :value="item.value"
                            :label="item.label"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <!-- 团体 -->
            <el-form
                v-show="USER_TYPE == 'group' || USER_TYPE == 'club'"
                :model="groupFormData"
                ref="groupFormData"
                label-width="110px"
                size="small"
                class="changeInput"
            >
                <el-form-item label="报名人员：">
                    <p>{{ $store.getters.uname }}</p>
                </el-form-item>
                <el-form-item
                    v-show="atyInfo.staffTypes != ''"
                    v-for="(item, index) in groupFormData.formItem"
                    :key="index"
                    :label="item.title" 
                >
                    <el-cascader
                        v-model="item.staffs"
                        :options="prefPosOptionsComputed"
                        :props="{ expandTrigger: 'hover' }"
                        >
                    </el-cascader>
                    <el-button v-show="index == 0" icon="el-icon-plus" circle 
                        style="position: relative; left: 1rem;" 
                        @click="addGroupStaff"></el-button>
                    <el-button v-show="index != 0" icon="el-icon-minus" circle 
                        style="position: relative; left: 0.4rem;" 
                        @click="deleteGroupStaff(index)"></el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="buttons">
            <my-button type="orange" @click="toConfirm">确定</my-button>
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
             // 活动详细信息
            atyInfo: {},



            // 个人报名活动
            personalFormData: {
                prefPos: "",
            },


            // 团体报名活动
            groupFormData: {
                formItem:[
                    {
                        title: '意向岗位：',
                        staffs: [],
                    }
                ],
            },

        };
    },
    computed: {
        USER_TYPE() {
            return this.$store.getters.userType;
        },
        // 当前报名的活动的信息
        SELECTED_ATY() {
            return this.$store.getters.selected_aty;
        },

        // 根据活动需要的岗位要求，动态生成岗位选择的options
        prefPosOptionsComputed() {
            if(!this.atyInfo.staffTypes) return []
            const prefPos = this.atyInfo.staffTypes.split(';');
            const prefPosNum = this.atyInfo.staffTypesCount.split(';');
            let retOptions = [];
            for(let i = 0; i < prefPos.length - 1; ++i) {
                retOptions.push({
                    value: prefPos[i],
                    label: prefPos[i],
                    children: [],
                });
                for(let j = 1; j <= prefPosNum[i]; ++j) {
                    retOptions[i].children.push({
                        value: j,
                        label: j+'名',
                    })
                }
            }
            return retOptions;
        },
    },
    async created() {
        this.atyInfo = this.SELECTED_ATY;
    },
    methods: {
        
        /**
         * 团体用户报名活动
         */
        // 增加岗位
        addGroupStaff() {
            if(this.groupFormData.formItem.length >= this.prefPosOptionsComputed.length)
                return this.$message.error('岗位已达上限！');
            this.groupFormData.formItem.push({
                title: '',
                staffs: [],
            })
        },
        // 删除岗位
        deleteGroupStaff(index) {
            this.groupFormData.formItem.splice(index, 1);
        },

        // 页面跳转至确认报名界面
        toConfirm() {
            let prefPos = [], prefPosNum = [];
            if(this.USER_TYPE == 'personal') {
                if(this.personalFormData.prefPos == '') return this.$message.error('请先选择意向岗位！');
                prefPos.push(this.personalFormData.prefPos);
                prefPosNum.push(1);
            } else {
                for(let i = 0; i < this.groupFormData.formItem.length; ++i) {
                    if(this.groupFormData.formItem[i].staffs.length > 0) {
                        prefPos.push(this.groupFormData.formItem[i].staffs[0]);
                        prefPosNum.push(this.groupFormData.formItem[i].staffs[1]);
                    }
                }
                if(prefPos == '') return this.$message.error('请先选择意向岗位及人数！');
            }
            prefPos = JSON.stringify(prefPos);
            prefPosNum = JSON.stringify(prefPosNum);
            this.$router.push(`/activity/all/register/confirm?prefPos=${prefPos}&prefPosNum=${prefPosNum}&id=${this.atyInfo.id}`);
        },
    },
};
</script>

<style scoped>
.dialog-info-title {
    font-weight: bold;
}
.dialog-info-location {
    margin-top: 15px;
    display: flex;
}
.dialog-info-location i {
    height: 20px;
}
.dialog-info-location i::before {
    font-size: 20px;
    color: rgb(150, 213, 254);
}
.dialog-info-divider {
    width: 70%;
}

.form_box {
    width: 100%;
    min-height: 200px;
}

.buttons {
    position: absolute;
    bottom: 45px;
    right: 35px;
}
</style>

