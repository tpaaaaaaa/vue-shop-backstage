<template >
    <div>
        <el-button type="primary" v-show="showAddButton('btn.Add1')">添加按钮1</el-button>
        <el-button type="primary" v-show="showAddButton('btn.Add2')">添加按钮2</el-button>

    </div>
</template>

<script>
export default {
    name: 'ComponentTest1',
    data() {
        return {

        }
    },
    computed: {
    },
    methods: {
        showAddButton(buttonName) {
            return this.$store.state.user.buttons.includes(buttonName);
        }
    },
}
</script>

<style >

</style>