<template >
    <div>
        <el-row :gutter="10">
            <el-col :span="12">
                <Search></Search>
            </el-col>
            <el-col :span="12">
                <Category></Category>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Search from './Search';
import Category from './Category';
export default {
    name: 'ObserveComponent',
    components: { Search, Category }
}
</script>

<style scoped>
/* div>>>.el-card__body {
    box-sizing: border-box;
    padding: 10px;
} */
</style>