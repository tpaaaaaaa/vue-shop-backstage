<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="SPU名称">
                <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
            </el-form-item>
            <el-form-item label="品牌">
                <el-select v-model="spu.tmId" placeholder="请选择品牌" clearable filterable @change="">
                    <el-option v-for="tm of tradeMarkList"
                               :key="tm.id"
                               :label="tm.tmName"
                               :value="tm.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea" placeholder="描述" rows="4" v-model="spu.description"></el-input>
            </el-form-item>
            <el-form-item label="SPU图片">
                <el-upload
                           action="/admin/product/fileUpload"
                           list-type="picture-card"
                           :on-success="handlerSuccess"
                           :on-preview="handlePictureCardPreview"
                           :on-remove="handleRemove"
                           :file-list="fileList">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="上传的SPU图片">
                </el-dialog>

            </el-form-item>
            <el-form-item label="销售属性">
                <el-select
                           v-model="attrId"
                           :placeholder="`还有${unSelectSaleAttr.length}个未选择`"
                           @change=""
                           clearable filterable>
                    <el-option
                               v-for="unselect of unSelectSaleAttr"
                               :key="unselect.id"
                               :label="unselect.name"
                               :value="`${unselect.id}:${unselect.name}`">
                    </el-option>
                </el-select>

                <el-button
                           type="primary"
                           icon="el-icon-plus"
                           :disabled="!attrId"
                           @click="addSaleAttr">
                    添加销售属性
                </el-button>

                <el-table :data="spu.spuSaleAttrList" border stripe>
                    <el-table-column
                                     type="index"
                                     label="序号"
                                     width="80px"
                                     align="center">
                    </el-table-column>
                    <el-table-column
                                     prop="saleAttrName"
                                     label="属性名"
                                     width="120px">
                    </el-table-column>
                    <el-table-column
                                     prop="prop"
                                     label="属性值列表"
                                     width="width">

                        <template slot-scope="{row,$index}">
                            <!-- el-tag：已有属性值展示 -->
                            <el-tag
                                    :key="tag.id"
                                    v-for="(tag,index) in row.spuSaleAttrValueList"
                                    :disable-transitions="false"
                                    @close="row.spuSaleAttrValueList.splice(index,1)"
                                    closable>
                                {{tag.saleAttrValueName}}
                            </el-tag>

                            <el-input
                                      class="input-new-tag"
                                      v-if="row.inputVisible"
                                      v-model="row.inputValue"
                                      ref="saveTagInput"
                                      size="small"
                                      @keyup.enter.native="$event.target.blur"
                                      @blur="handleInputConfirm(row)">
                            </el-input>
                            <!-- @click="showInput" -->
                            <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加
                            </el-button>
                        </template>

                    </el-table-column>
                    <el-table-column
                                     prop="prop"
                                     label="操作"
                                     width="width">
                        <template slot-scope="{row,$index}">
                            <el-button type="danger" size="mini" icon="el-icon-delete"
                                       @click="spu.spuSaleAttrList.splice($index,1)"></el-button>

                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
                <el-button @click="$emit('changeScene',0);clearInput();">取消</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
export default {
    name: 'SpuForm',
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            spu: {
                category3Id: 0,             //三级分类id
                description: '',            //描述
                tmId: '',                    //品牌id
                spuName: '',                //spu名称
                spuImageList: [             //spu图片
                    // {
                    //     id: 0,
                    //     imgName: '',
                    //     imgUrl: '',
                    //     spuId: 0
                    // }
                ],
                spuSaleAttrList: [          //品牌属性
                    // {
                    //     baseSaleAttrId: 0,
                    //     id: 0,
                    //     saleAttrName: '',
                    //     spuId: 0,
                    //     spuSaleAttrValueList: [
                    //         {
                    //             baseSaleAttrId: 0,
                    //             id: 0,
                    //             isChecked: '',
                    //             saleAttrName: '',
                    //             saleAttrValueName: '',
                    //             spuId: 0
                    //         }
                    //     ]
                    // }
                ],
            }, //存储spu信息属性
            tradeMarkList: [],//品牌信息
            spuImageList: [],//spu图片
            saleAttrList: [],//销售属性
            attrId: '',   //未选择属性id
        }
    },
    computed: {
        // 格式化图片数据格式；展示图片
        fileList() {
            return this.spuImageList.map(item => { return { name: item.imgName || item.name, url: item.imgUrl || item.url } });
        },
        // 未选择的销售属性
        unSelectSaleAttr() {
            return this.saleAttrList.filter(item => this.spu.spuSaleAttrList.every(item1 => item.name !== item1.saleAttrName));
        }
    },
    methods: {
        // ----upload照片墙预览和移除的回调函数------
        handleRemove(file, fileList) {
            // file:删除图片信息；fileList剩余的图片信息
            // 收集照片墙数据
            this.spuImageList = fileList;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handlerSuccess(response, file, fileList) {
            if (response.code !== 200) return this.$message('上传遇到了问题');
            this.spuImageList = fileList;
            // console.log(response, file, fileList);
        },

        // ----tag标签事件----
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },

        // 初始化spu数据
        async initSpuData(row) {
            // 获取spu信息
            const result = await this.$API.spu.reqGetSpuById(row.id);
            if (result.code !== 200) return;
            this.spu = result.data;

            // 获取品牌信息
            const tradeMarkList = await this.$API.spu.reqTradeMarkList();
            if (tradeMarkList.code !== 200) return;
            this.tradeMarkList = tradeMarkList.data;

            // spu图片
            const spuImageResult = await this.$API.spu.reqSpuImageList(row.id);
            if (spuImageResult.code !== 200) return;
            this.spuImageList = spuImageResult.data;

            // spu销售属性
            const saleResult = await this.$API.spu.reqBaseSaleAttrList();
            if (saleResult.code !== 200) return;
            this.saleAttrList = saleResult.data;
        },
        // 添加销售属性的回调
        addSaleAttr() {
            const [baseSaleAttrId, saleAttrName] = this.attrId.split(':');
            let newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] };

            if (this.spu.spuSaleAttrList.some(item => item.saleAttrName === newSaleAttr.saleAttrName))
                return this.$message('已经添加了该属性哦');
            this.spu.spuSaleAttrList.push(newSaleAttr);
            this.attrId = '';
        },
        // 添加属性值按钮
        addSaleAttrValue(row) {
            this.$set(row, 'inputVisible', true);
            this.$set(row, 'inputValue', '');
        },
        // 失焦添加新的属性值
        handleInputConfirm(row) {
            row.inputVisible = false;
            const { baseSaleAttrId, inputValue } = row;
            // 判断重复
            let re = row.spuSaleAttrValueList.some(item => item.saleAttrValueName === inputValue);
            if (re) return this.$message('已经存在数据了哦');
            row.spuSaleAttrValueList.push({
                baseSaleAttrId,
                saleAttrValueName: inputValue,
            });
        },
        // 保存或取消后清除输入框
        clearInput() {
            this.spu = {
                category3Id: 0,             //三级分类id
                description: '',            //描述
                tmId: '',                    //品牌id
                spuName: '',                //spu名称
                spuImageList: [],
                spuSaleAttrList: [],
            };
            this.tradeMarkList = [];//品牌信息
            this.spuImageList = [];//spu图片
            this.saleAttrList = [];//销售属性
            this.attrId = '';   //未选择属性id
        },
        // 保存按钮回调
        async addOrUpdateSpu() {
            // 整理照片参数
            // 图片imageName、imageURl
            this.spu.spuImageList = this.spuImageList.map(item => { return { imgName: item.name, imgUrl: item.response?.data || item.url } });
            const result = await this.$API.spu.reqAddOrUpdateSpuInfo(this.spu);
            if (result.code !== 200) return this.$message('fail');
            this.$message({ type: 'success', message: '保存成功' });
            // 通知父组件
            this.$emit('changeScene', 0);
            this.clearInput();
        }

    }
}
</script>

<style >
.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>