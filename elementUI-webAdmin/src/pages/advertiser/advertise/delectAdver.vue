<template>
    <!-- ham -->
   <el-dialog
        title="删除"
        center
        :visible.sync="dialogVisible"
        width="30%"
        @close="$emit('update:show2',false)">
        <span>确认删除此广告？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:show2',false)">取 消</el-button>
            <el-button type="primary" @click="changeState()">确 定</el-button>
        </span>
     </el-dialog>

</template>

<script>
    import { advertUpdate } from '@/api/account'
    export default {
        props:{
            show2:{
                type:Boolean,
                default:false
            },
             info:{
                type:Object,
                default:{}
            },
            advertiseList:{
                type:Function,
                default:()=>{}
            }
        },
        data(){
            return{
                dialogVisible:this.show2,
                form:{
                    status:'',
                    id:''
                }
            }
        },
        watch:{
            show2(){
                this.dialogVisible = this.show2
            }
        },
        methods:{
            // 更改状态
            changeState(){
                this.form = this.info
                this.advertUpdate()
            },
                async advertUpdate() {   
                try {
                    let res = await advertUpdate( this.form )
                    if(res.data.ret == 'ok'){
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                    }
                    this.advertiseList() //刷新列表
                    this.dialogVisible = false
                } catch (err) {
                    this.form = this.formData
                    this.$message({
                    type: 'error',
                        message: '删除失败'
                    })
                    this.advertiseList() //刷新列表
                    this.dialogVisible = false
                }
                }
        },

    }
</script>

<style scoped>

</style>