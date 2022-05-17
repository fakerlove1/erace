<template>
    <div id="navDiv">
        <div id="selectContainer">
            <el-cascader
                v-model="value"
                size="small"
                class="changeInput sortSelect"
                :options="USER_TYPE == 'group'||USER_TYPE=='club'?restrictionsGroup:restrictionsPerson"
                :props="{ expandTrigger: 'hover' }"
                @change="changed">
            </el-cascader>
        </div>
    </div>
</template>

<script>
export default {
    props: ['selected'],
    data() {
        return {
            restrictionsGroup: [
                {
                    value: 'ALL',
                    label: '所有',
                },
                {
                    value: 'RELEASE',
                    label: '我发布的',
                    children: [
                        {
                            label: '所有',
                            value: 'ALL',
                        },
                        {
                            label: '审核中',
                            value: 'CHECKING',
                        },
                        {
                            label: '审核通过',
                            value: 'ACCESS',
                        },
                        {
                            label: '未通过',
                            value: 'FAILED',
                        },
                        {
                            label: '报名中',
                            value: 'ENROLLING',
                        },
                        {
                            label: '报名结束',
                            value: 'ENROLL_CLOSED',
                        },
                        {
                            label: '进行中',
                            value: 'HOLDING',
                        },
                        {
                            label: '活动结束',
                            value: 'ENDED',
                        },
                        {
                            label: '撤销中',
                            value: 'CANCELING',
                        },
                        {
                            label: '已撤销',
                            value: 'CANCELED',
                        },
                    ]
                },
                {
                    value: 'JOIN',
                    label: '我参加的',
                    children: [
                        {
                            label: '所有',
                            value: 'ALL',
                        },
                        {
                            value: 'UNDER_REVIEW',
                            label: '审核中',
                        },
                        {
                            value: 'PASSED',
                            label: '已通过',
                        },
                        {
                            value: 'TURN_DOWN',
                            label: '未通过',
                        }
                    ]
                }
            ],
            restrictionsPerson: [
                {
                    value: 'ALL',
                    label: '所有',
                },
                {
                    value: 'JOIN',
                    label: '我参加的',
                    children: [
                        {
                            label: '所有',
                            value: 'ALL',
                        },
                        {
                            value: 'UNDER_REVIEW',
                            label: '审核中',
                        },
                        {
                            value: 'PASSED',
                            label: '已通过',
                        },
                        {
                            value: 'TURN_DOWN',
                            label: '未通过',
                        }
                    ]
                }
            ],
            value: this.selected,
        };
    },
    computed: {
        USER_TYPE() {
            return this.$store.getters.userType;
        }
    },
    methods: {
        changed() {
            this.$emit('handleRestrictionsSelect', {
                type: this.value[0],
                state: this.value[1] ? this.value[1] : 'ALL'
            })
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
    width: 200px;
    margin: 0 10px;
}
</style>

