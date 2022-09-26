<template >
    <a :title="title" style="margin: 10px;">
        <el-button v-bind="$attrs" type="primary" @click="$listeners"></el-button>
    </a>
</template>

<script>
export default {
  name: 'HintButton',
  props: ['title']

}
</script>

<style scoped>

</style>
