<template>
    <div class="container">
        <div class="avatar">
            <el-avatar :size="75" :src="getAvatar(item.avatar)"></el-avatar>
        </div>
        <div class="info">
            <p class="margin word">{{ item.uname }}</p>
            <p class="margin word">{{ item.type }}</p>
        </div>
        <div class="noteEdit">
            <el-input
                v-if="isEditedNote"
                class="changeInput note_input"
                size="mini"
                v-model="newRemark"
            ></el-input>
            <p v-else-if="!isEditedNote" style="line-height: 28px; width: 75px">
                {{ remark }}
            </p>
            <i
                v-show="!isEditedNote"
                class="el-icon-edit edit-icon"
                @click="changeEditMode"
            ></i>
            <i
                v-show="isEditedNote"
                class="el-icon-check edit-icon"
                @click="submitNote"
            ></i>
            <i
                v-show="isEditedNote"
                class="el-icon-close edit-icon"
                @click="cancelNote"
            ></i>
        </div>
        <div class="operation">
            <p class="point"> {{ item.tolItg }} </p>
            <p class="dismiss" @click="dismissVIP">解除会员身份</p>
        </div>
    </div>
</template>

<script>
import Mybutton from "@/components/mybutton.vue";
export default {
    components: {
        Mybutton,
    },
    props: ["data"],
    data() {
        return {
            item: this.data,
            isEditedNote: false,

            newRemark: "",
        };
    },
    computed: {
        BASER_URL() {
            return this.$store.getters.baseUrl;
        },


        // 备注处理
        remark() {
            if(this.item.remark != 'no-remark') return this.item.remark;
            else return '备注';
        },
    },
    methods: {
        // 头像处理
        getAvatar(avatar) {
            if(avatar == 'no-avatar') {
                return require('@/assets/imgs/register/personalRegisterIcon.png');
            } else {
                return `${this.BASER_URL}file??uuid=${this.AVATAR}&userId=${this.USER_ID}`;
            }
        },
        // 切换至备注标记模式
        changeEditMode() {
            this.isEditedNote = true;
        },
        // 备注
        submitNote() {
            this.$store.dispatch('user/updateUserInfo', {
                uesrId: this.item.id,
                remark: this.newRemark,
            });
            this.isEditedNote = false;
        },
        cancelNote() {
            this.isEditedNote = false;
        },
        // 解除会员身份
        dismissVIP() {
            
        },
    },
};
</script>

<style scoped>
.container {
    height: 95px;
    border: 1px solid grey;
    background: rgb(237, 237, 237);
    padding: 10px 20px;
    position: relative;
}
.avatar {
    float: left;
}
.info {
    height: 100%;
    width: 85px;
    margin-left: 10px;
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.word {
    font-weight: bold;
    font-size: 13px;
}
.margin + .margin {
    margin-top: 6px;
}

.noteEdit {
    height: 100%;
    float: left;
    display: flex;
    align-items: flex-end;
    padding: 11px;
}
.note_input {
    width: 100px;
}
.edit-icon {
    line-height: 28px;
    cursor: pointer;
    font-size: 14px;
    margin-left: 5px;
}

.operation {
    float: right;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 5px;
}
.operation .point {
    font-size: 27px;
}
.operation .dismiss {
    color: gray;
    margin-top: 5px;
    cursor: pointer;
}
</style>