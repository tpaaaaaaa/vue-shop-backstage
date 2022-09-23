<template>
    <div>
        <!-- 分类选择 -->
        <el-card shadow="always" style="margin: 20px 0;">
            <CategorySelect @getCategoryId="getCategoryId" :show="scene!==0"></CategorySelect>

        </el-card>
        <!-- 数据内容 -->
        <el-card shadow="always" style="margin: 20px 0;">
            <!-- 对应分类属性 -->
            <div v-show="scene===0&&isShowTable">
                <el-button
                           type="primary"
                           @click="addSpu"
                           icon="el-icon-plus"
                           :disabled="!categoryIdList.category3Id">
                    添加SPU
                </el-button>
                <el-table border stripe :data="records">
                    <el-table-column
                                     type="index"
                                     prop="prop"
                                     label="序号"
                                     width="80px"
                                     align="center">
                    </el-table-column>
                    <el-table-column
                                     prop="spuName"
                                     label="SPU名称"
                                     width="width">
                    </el-table-column>
                    <el-table-column
                                     prop="description"
                                     label="SPU描述"
                                     width="width">

                    </el-table-column>
                    <el-table-column
                                     prop="prop"
                                     label="操作"
                                     width="250px">
                        <template slot-scope="{row}">
                            <hint-button type="primary" icon="el-icon-plus" round size="mini" title="添加spu">
                            </hint-button>
                            <el-button type="warning" icon="el-icon-edit" round size="mini" title="修改spu"
                                       @click="updateSpu(row)">
                            </el-button>
                            <el-button type="info" icon="el-icon-info" round size="mini"
                                       @click="" title="查看spu">
                            </el-button>
                            <el-button type="danger" icon="el-icon-delete" round size="mini"
                                       @click="" title="删除spu">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--  分页 -->
                <el-pagination
                               style="text-align: center;"
                               :page-sizes="[3,5,10]"
                               :page-size="limit"
                               layout="prev, pager, next, jumper, ->,sizes, total"
                               :total="total" background
                               :current-page="page"
                               @current-change="getSpuList"
                               @size-change="sizeChange">
                </el-pagination>
            </div>


            <SpuForm v-show="scene===1" @changeScene="changeScene" ref="spu">2</SpuForm>
            <SkuForm v-show="scene===2">1</SkuForm>
        </el-card>


    </div>
</template>

<script>
import SpuForm from './SpuForm';
import SkuForm from './SkuForm';
export default {
    name: 'spuProduct',
    components: {
        SpuForm,
        SkuForm,
    },
    data() {
        return {
            isShowTable: true,
            categoryIdList: [],
            page: 1,        //当前页
            limit: 3,       //每页数据
            records: [],
            total: 0,
            scene: 0,        //0:展示spu列表；1：添加修改spu；2：添加sku
        }
    },
    methods: {
        // 三级联动自定义事件回调
        getCategoryId(...idList) {
            if (idList.at(-1)?.noData)
                return idList[0].noData.map(num => this.categoryIdList[`category${num}Id`] = '');
            this.categoryIdList = idList[0];
            this.getSpuList();
        },
        // 获取SPU数据
        async getSpuList(pager = 1) {
            // 切换页数
            this.page = pager;
            const result = await this.$API.spu.reqSpuList(this.page, this.limit, this.categoryIdList.category3Id);
            if (result.code !== 200) return;
            this.total = result.data.total;
            this.records = result.data.records;
        },
        sizeChange(limit) {
            this.limit = limit;
            this.getSpuList();
        },
        // 添加Spu按钮回调
        addSpu() {
            this.scene = 1;
        },
        // 修改spu
        updateSpu(row) {
            this.scene = 1;
            this.$refs.spu.initSpuData(row);
        },
        // SpuForm自定义事件回调
        changeScene(scene) {
            this.scene = scene;

        }
    },

}
</script>

<style lang="" scoped>
    
</style>