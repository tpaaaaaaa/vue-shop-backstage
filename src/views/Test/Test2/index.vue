<template >
    <div>
        <el-button type="primary" v-show="showAddButton('btn.Add3')">添加按钮3</el-button>

    </div>
</template>

<script>
export default {
    name: 'ComponentTest2',
    methods: {
        showAddButton(buttonName) {
            return this.$store.state.user.buttons.includes(buttonName);
        }
    },
}
</script>

<style >

</style>