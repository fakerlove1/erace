<template>
    <button
        type="button"
        class="mybutton"
        @click="handleClick"
        :style="[mystyle]"
        :class="[
            { mybutton1: type == 'normal' || !type},
            { mybutton2: type == 'orange' },
            { mybutton3: type == 'transparent' },
            { mybutton4: type == 'staticOrange' },
        ]"
    >
        <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>

<script>
export default {
    name: "mybutton",
    props: ["width", "height", "size", "type"],
    data() {
        return {
            mystyle: {
                width: this.width ? this.width + "px" : "120px",
                height: this.height ? this.height + "px" : "35px",
                "border-radius": this.height ? this.height / 2 + "px" : "20px",
                "font-size": this.size ? this.size + "px" : "13px",
                "line-height": this.height ? this.height + "px" : "35px",
            },
        };
    },
    methods: {
        handleClick(e) {
            this.$emit("click", e);
        },
    },
};
</script>

<style>
button {
    outline: none;
    border: none;
    cursor: pointer;
}
.mybutton1 {
    background: rgb(249,249,249);
    box-shadow: 0px 0px 5px #888888;
    color: black;
}
.mybutton1:hover {
    background: rgb(230,234,236);
}
.mybutton1:active {
    box-shadow: none;
}


.mybutton2 {
    background: #fca07c;
    box-shadow: 0px 0px 5px #f39671;
    color: white;
}
.mybutton2:hover {
    background: rgba(253, 176, 146, 0.986);
}
.mybutton2:active {
    box-shadow: none;
}

/* 透明按钮 */
.mybutton3 {
    background: none;
    color: white;
}
.mybutton3:hover {
    background: #f3b49c;
    box-shadow: 0px 0px 5px #f39671;
}


/* 静态橘红色按钮 */
.mybutton4 {
    background: #fca07c;
    box-shadow: 0px 0px 5px #f39671;
    color: white;
}
</style>
