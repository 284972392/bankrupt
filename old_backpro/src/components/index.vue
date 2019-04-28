<style scoped='' lang='scss'>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 100%;
    }
    .ivu-layout{height: 100%;overflow-x: scroll !important; flex-direction: inherit;}

    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        text-align: left;
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
    }
      ::-webkit-scrollbar {
        width: 2px;  /*滚动条宽度*/
         height: 4px;  /*滚动条高度*/
        }
        /*定义滚动条轨道 内阴影+圆角*/  
        ::-webkit-scrollbar-track  
        {  
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
            border-radius: 10px;  /*滚动条的背景区域的圆角*/
            background-color: #ffffff;/*滚动条的背景颜色*/  
            height: 0px;
        }  
        
        /*定义滑块 内阴影+圆角*/  
        ::-webkit-scrollbar-thumb  
        {  
            border-radius: 10px;  /*滚动条的圆角*/
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
            background-color: grey;  /*滚动条的背景颜色*/
        }  


</style>
<template>
    <div class="layout">
        <div class="head">
            <router-link to="/home" style="color:#8f8f94;">米多星后台管理</router-link>
             <Tooltip content="?" placement="bottom">
                <Poptip
                    confirm
                    title="看着我的刀真要退出?"
                    @on-ok="logout"
                    @on-cancel="logout_cancel">
                    <Button>退出登录</Button>
                </Poptip>
            </Tooltip>
        </div>
        <Layout style="overflow-y:hidden;">
            <NavBar></NavBar>
            <Layout style="display: flex;flex-direction: column;">
                <!-- 头部导航栏 -->
                <Header style="{display:'flex'}" class="layout-header-bar">
                     
                    <!-- <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon> -->
                     <!-- <Breadcrumb>
                        <BreadcrumbItem :to="{ path: $route.path }" v-for="(item,index) in $route.meta" key="index">{{item}}</BreadcrumbItem>
                    </Breadcrumb> -->
              
                    
                     <tabs-view></tabs-view>

                </Header>
                <!-- margin: '20px', background: '#fff', -->
                <Content :style="{ minHeight: '260px',height:'100%',overflow:'hidden',textAlign:'center',flex:1 }">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
   import tabsView from '@/common/tabs-view.vue'
   import NavBar from '@/common/nav.vue'

    export default {
        components:{
            tabsView,
            NavBar
        },
        data () {
            return {
                isCollapsed: false
            }
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
           
        },
        methods: {
            //查看员工信息
            staffInfo(){
                this.$router.push('/system/checkStaff')
            },
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },
             //确认退出
            logout(){
                this.get(this.allUrl.logOut)
                this.$Message.info({
                    content: '走了就别回来了！',
                    duration: 3
                });
                this.$store.commit('REMOVE_TOKEN')
                localStorage.removeItem('TokenKey')
                this.$router.push('/login')
            },
            //取消退出
            logout_cancel(){
                this.$Message.warning('你退啊')
            }

          
     
        },
        beforeMount() {
      
        },
        updated() {
          
        }
    }
    
   
  
  


</script>

<style scoped lang="scss">
  
    .head{
        display: flex;
        justify-content: space-between;
        height: 40px;
        line-height: 40px;
        padding:0 20px;
        font-size:15px;
        p{
            cursor: pointer;
        }
    }
    .home{margin:0 20px 0 20px !important;overflow: scroll;}

</style>
