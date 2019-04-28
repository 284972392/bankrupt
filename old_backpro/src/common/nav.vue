<template>
    <div class="navBar">

           <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" class="nav_side" >
                <div class="demo-avatar" style="cursor:pointer;margin-top:20px;" @click="staffInfo">
                 
                    <img :src='img' alt="" class="avatar">
                    <!-- <img src='http://p7u7xbigs.bkt.clouddn.com/null_d418a68d-f9c9-470f-96f0-0f64246d225a' alt="" class="avatar"> -->
                </div>
                <div class="user_name">{{this.roleName}}</div>
                <div class="user_identity">{{this.realName}}</div>

                <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses" @on-select="route">
                    <MenuItem name="/home">
                        <Icon type="ios-home"></Icon>
                        <span>首页</span>
                    </MenuItem>
        
                <Submenu v-for="data in navList" :name=data.name :key="data.id" v-if="data.checked">
                    <template slot="title">
                        <Icon :type=data.icon></Icon>
                        {{data.title}}
                    </template>
                    <Submenu v-for="item in data.children" :name="item.name" v-if="!item.url&&item.checked==true" :key="item.id">
                            <template slot="title">{{item.title}}</template>
                            <MenuItem :name=val.url v-for="val in item.children" :key="val.id" v-if="val.url&&val.checked==true">{{val.title}}</MenuItem>
                    </Submenu>
                    <MenuItem v-for="item in data.children" v-if="item.url&&item.checked==true" :name=item.url :key="item.id">{{item.title}}</MenuItem>
          
                </Submenu>
      
                </Menu>

            </Sider> 
            <div>
                <Icon type="logo-usd" />
                <Icon type="logo-bitcoin" />
            </div>
            
    </div>
</template>

<script>
    export default {
        name:'navBar',
         data () {
            return {
                isCollapsed: false,
                realName:'',
                roleName:'',
                navList:[],
                img:''
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
        methods:{

            staffInfo(){
             
                    this.img = JSON.parse(this.$store.state.user.token).headPic
         
                let userInfo = JSON.parse(localStorage.getItem('TokenKey'));

                 
                if(this.$route.path!=='/system/checkStaff'){
                      this.get(this.allUrl.findUser,{userId:userInfo.id}).then((res)=>{     
                        this.$store.state.staffInfo = res.data.data 
                        this.$router.push('/system/checkStaff')
                    })
                }
              
            },
            route(name) {
               this.$router.push(name)
            }
        },
        beforeMount () {
       
            this.realName = JSON.parse(this.$store.state.user.token).realName;
            this.roleName = JSON.parse(this.$store.state.user.token).roleVo.roleName;
            this.img = JSON.parse(this.$store.state.user.token).headPic
            this.navList = JSON.parse(this.$store.state.user.token).roleVo.children;
            console.log(this.navList)
        }
    }
</script>

<style scoped lang="scss">

 ::-webkit-scrollbar {
        width: 2px;  /*滚动条宽度*/
         height: 4px;  /*滚动条高度*/
        }

.navBar{height: 100%;}
  .avatar{
        margin-bottom:5px;

            height: 80px;
            width: 80px;
 
    }
    .user_name{
        color:#e0e0e1;
        font-size:12px;
    }
    .user_identity{
        font-size:13px;
        color:#7e7e81;
        margin-bottom:30px;
    }
    .ivu-menu-item-active{
        background: #28282e !important;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .nav_side{
        text-align: center;
        height: 100%;
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .ivu-menu-item{
        border-bottom: 1px solid #3b3b43;
    }
    
     .ivu-menu-dark{
        background: #32323a;
        margin-bottom: 40px;
    }
    .ivu-layout-sider{
        background: #32323a;
        overflow: auto;    
    }
   
 
</style>