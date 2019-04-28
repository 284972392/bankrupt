<template>
    <!-- ham -->
   <el-dialog
        :title="info.date?'确认暂停广告投放?':'确认启用广告投放?'"
        center
        :visible.sync="dialogVisible"
        width="30%"
        @close="$emit('update:show',false)">
        <span>{{info.date?'暂停广告后，将不再继续发放优惠券。用户已领取的优惠券仍可以正常使用。':'启用广告后，系统会根据广告审核状态、预算、余额等因素综合判断，确定广告是否可以投放。'}}</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:show',false)">取 消</el-button>
            <el-button type="primary" @click="changeState()">确 定</el-button>
        </span>
     </el-dialog>

</template>

<script>
    import { advertUpdate } from '@/api/account'
    export default {
        props:{
            show:{
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
                dialogVisible:this.show,
                form:{
                    status:'',
                    id:''
                }
            }
        },
        watch:{
            show(){
                this.dialogVisible = this.show
            }
        },
        methods:{
            // 更改状态
            changeState(){
                this.form.id = this.info.id
                this.form.status = this.info.status=='4'?'3':'4'
                this.advertUpdate()
            },
                async advertUpdate() {   
                try {
                    let res = await advertUpdate( this.form )
                    if(res.data.ret == 'ok'){
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        })
                    }
                    this.advertiseList() //刷新列表
                    this.dialogVisible = false
                } catch (err) {
                    this.form = this.formData
                    this.$message({
                    type: 'error',
                        message: '修改失败'
                    })
                    this.advertiseList() //刷新列表
                    this.dialogVisible = false
                }
                }
        }
    }
</script>

<style scoped>

</style>