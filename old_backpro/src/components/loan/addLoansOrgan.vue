<style>
    .ivu-tabs-nav-scroll{
        padding-left: 40px;
        font-size: 18px;
        margin-top: 20px;
    }
    .ivu-tabs-tabpane{
        padding-left: 40px;
        font-size: 15px;
        color: #000;
    }
    .ivu-tabs{
        overflow: visible;
    }
</style>

<template>
    <div class="shareDiscount">
        <div class="title">
            <p>添加贷款机构</p>  
             <!-- <div style="display:flex;width:200px;">
                 <Button type="primary" style="width:80px;height:40px;margin-top:5.5px;" class="change" @click="change">修改</Button>
                <Button type="primary" style="width:80px;height:40px;margin-top:5.5px;margin-left:10px;" class="submit" @click="submit">提交</Button>
            </div> -->
        </div>
        <div class="title2">
            基本信息
        </div>
        <div class="content">
            <p class="smallTitle">机构信息</p>
             <Form :model="formItem" :label-width="100" class="form">     
                  <Row>
                    <Col span="8" offset="2">
                        <FormItem label="机构名称">
                            <Input v-model="formItem.name" placeholder="请输入机构名称" />
                        </FormItem> 
                        <FormItem label="项目logo">
                            <lazy :time='200'>
                             <addpic @update="listStyle" @remove="removelist" :size='1' :defaultPic="formItem.logo"></addpic>
                             </lazy>
                         </FormItem>    
                       
                    </Col>
                     <Col span="8" offset="0">
                           <FormItem label="所在地">
                                <Row>
                                    <Col span="12">
                                        <al-cascader v-model="addr" placeholder="请选择省-市-区-县"/>
                                    </Col>
                                    <Col span="12" offset="0">
                                            <Input v-model="formItem.addressDetail" type="textarea" :autosize="{maxRows: 5}" placeholder="请输入详细地址"></Input>
                                    </Col>
                                </Row>
                            </FormItem>
                    </Col>
                </Row>
                
                    <div class="btm">
                        <Button type="primary" class="save" @click="save">保存</Button>
                    </div>
                    
              </Form>

        </div>
    </div>
</template>

<script>
    import lazy from "@/common/plLazy";
    import addpic from '@/common/update'
    export default {
        components:{
            addpic,
            lazy
        },
        data(){
            return{
                isChange:false,
                formItem:{
                    name:'',
                    logo:'',
                    address:'',
                    addressDetail:''
                },
                addr:[],
            }
        },
        methods: {
            save(){
                if(this.addr.length==0||this.formItem.name==''||this.formItem.logo==''||this.formItem.addressDetail==''){
                    this.$Message.warning("请输入完整信息")
                }else{
                    var a = '';
                    this.addr.map((val)=>{
                        a += val.name + '/'
                    })
                    this.formItem.address = a.slice(0,a.length-1)

                    if(!this.isChange){
                         this.$http({
                        method:'POST',
                        url:this.allUrl.addLoansOrganization,
                        headers: {
                                "content-type": "application/json"
                            },
                            responseType:'text/plain',
                            params:this.formItem
                        }).then((res)=>{
                            if(res.data.errordesc=='success'){
                                 this.$Message.success('保存成功！');
                                 this.$router.push('/loans/loans_institutions')
                            }
                        })
                    }else{
                        console.log(this.formItem)
                        this.$http({
                        method:'POST',
                        url:this.allUrl.updateLoansOrganization,
                        headers: {
                                "content-type": "application/json"
                            },
                            responseType:'text/plain',
                            params:this.formItem
                        }).then((res)=>{
                            if(res.data.errordesc=='success'){
                                 this.$Message.success('保存成功！');
                                 this.$router.push('/loans/loans_institutions')
                            }
                        })
                    }
                  
                   
                }

            },
            listStyle(){
                this.formItem.logo  = this.$store.state.shareUrl.url;
            },
            removelist(){
                this.formItem.logo = ''
            }
        },
        updated() {
             

        },
        mounted() {
        
        },
        beforeMount () {
            let query = this.$route.query
            if(query.id){
                this.isChange = true
                
                this.get(this.allUrl.findLoansById,{loansId:query.id}).then((res)=>{
          
                    this.formItem.name = res.data.data.name
                    this.formItem.addressDetail = res.data.data.addressDetail
                    this.formItem.logo = res.data.data.logo
                    let arr = res.data.data.address.split('/');
                    this.addr = arr
                    this.formItem.id = res.data.data.id

                })
            }
           
        }
      
    }



</script>

<style scoped lang='scss'>
    .shareDiscount{
        position: relative;
        width: 100%;
        height: 97%;
        overflow-y: auto;
        text-align: left;
        padding-bottom: 80px;
        img{height: 70px;width: 70px;}
        .proHeader{
            		padding-left: 40px;
            		width: 800px;
            		height: 50px;
            		line-height: 50px;
            		display: flex;
            		div:nth-child(1){
            			color: #222222;
            			font-size: 15px;
            		}
            		div:nth-child(2){
            			width: 300px;
						text-align: center;
            		}
            		div:nth-child(3){
            			width: 100px;
            			display: flex;
            			justify-content: space-between;
						text-align: center;
						color: blue;
            		}
            	}
            .addInfo{
                margin-top:30px;padding-left:50px;border-bottom: 1px solid darkcyan;
            }
        .basic_info{
            div{width: 30%;}
        }
        
        .form{
            color: #000000;
            
        }
        p{color: #000000;padding-left: 50px;
            span{margin-left: 20px;}}
        .title{
            line-height: 51px;height: 51px;width: 100%;
            padding-left: 40px;font-size: 28px;
            padding-right: 40px;
            text-align: left;border-bottom:1px solid #6962622f;
            display: flex;justify-content: space-between;
        }
        .title2{
            line-height: 51px;height: 51px;width: 100%;border-bottom:1px solid #6962622f;
             padding-left: 100px;font-size: 23px;color: rgb(44, 164, 243);
             box-shadow: 10px 10px 10px #3a36362f;
        }
        .secTitle{
            padding-left: 5px;font-size: 20px;text-align: left;
            margin-left: 30px;margin-top: 10px;
            border-left: 10px solid deepskyblue;
            line-height: 50px;height: 50px;
            margin-bottom: 20px;
            .add{height: 30px;}
        }
          
    }
    .smallTitle{
         margin-left: 100px;font-size: 20px;margin-top: 30px;margin-bottom: 25px;
        border-left: 6px solid rgb(44, 164, 243);padding-left: 20px !important;
    }
    .content{width: 100%;padding: 10px;}
    .ivu-input-number{
        width: 100% !important;
    }
     .btm{
            padding: 0 10% 0 0;
            width: 100%;
            text-align: center;
            .save{width: 100px;}
        }
</style>