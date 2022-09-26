<template>
    <div>
        <!-- inline:行内表单 -->
        <el-form :inline="true" class="demo-form-inline">

            <el-form-item label="一级分类" :model="cForm">
                <el-select placeholder="请选择" v-model="cForm.category1Id" @change="handler1" :disabled="show">
                    <el-option
:label="c1.name"
                               :value="c1.id"
                               v-for="c1 of category1List"
                               :key="c1.id">
                    </el-option>
                    <!-- <el-option label="区域二" value="beijing"></el-option> -->
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select placeholder="请选择" @change="handler2" v-model="cForm.category2Id" :disabled="show">
                    <el-option :label="c2.name" :value="c2.id" v-for="c2 of category2List" :key="c2.id"></el-option>
                    <!-- <el-option label="区域二" value="beijing"></el-option> -->
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select placeholder="请选择" v-model="cForm.category3Id" @change="handler3" :disabled="show">
                    <el-option :label="c3.name" :value="c3.id" v-for="c3 of category3List" :key="c3.id"></el-option>
                    <!-- <el-option label="区域二" value="beijing"></el-option> -->
                </el-select>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
export default {
  name: 'CategorySelect',
  props: ['show'],
  data() {
    return {
      category1List: [],
      category2List: [],
      category3List: [],
      // 收集相应的一、二、三级分类id
      cForm: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      }
    }
  },
  methods: {
    // 一级分类
    async getCategory1List() {
      const result = await this.$API.attr.reqCategory1List()
      if (result.code !== 200) return
      this.category1List = result.data
    },
    // 一级分类select回调
    async handler1() {
      // 清除数据
      this.cForm.category2Id = ''
      this.cForm.category3Id = ''
      this.category2List = []
      this.category3List = []

      const { category1Id } = this.cForm
      const result = await this.$API.attr.reqCategory2List(category1Id)
      if (result.code !== 200) return
      this.category2List = result.data

      this.$emit('getCategoryId', { category1Id, noData: [2, 3] })
    },
    // 2级分类select回调
    async handler2() {
      // 清除数据
      this.cForm.category3Id = ''
      this.category3List = []

      const { category2Id } = this.cForm
      const result = await this.$API.attr.reqCategory3List(category2Id)
      if (result.code !== 200) return
      this.category3List = result.data
      this.$emit('getCategoryId', { category1Id: this.cForm.category1Id, category2Id, noData: [3] })
    },
    // 三级分类的事件回调
    handler3() {
      const { category1Id, category2Id, category3Id } = this.cForm
      this.$emit('getCategoryId', { category1Id, category2Id, category3Id })
    }
  },
  mounted() {
    this.getCategory1List()
  }

}
</script>

<style>

</style>
