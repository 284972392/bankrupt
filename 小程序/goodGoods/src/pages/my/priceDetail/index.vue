<template>
<!-- ham -->
	<div class="containerss">
        <div class="top">
            <div :class="chooseFirst?'choose':'noChoose'" @click="chooseF">
                <p class="p1">已收佣金</p>
                <p class="p2">￥{{total}}</p>
            </div>
            <div :class="chooseFirst?'noChoose':'choose'" @click="chooseS">
                <p class="p1">待收佣金</p>
                <p class="p2">￥{{total2}}</p>
            </div>
        </div>
		<div class="page">
    <div class="page__bd">
      <div class="weui-tab">
        <div class="weui-navbar">
          <block v-for="(item,index) in tabs" :key="index">
            <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
              <div class="weui-navbar__title">{{item}}</div>
            </div>
          </block>
          <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
        </div>
        <div class="weui-tab__panel">
          <div class="weui-tab__content" :hidden="activeIndex != 0">
              <div class="content" v-for="datas in data" :key="datas.count">
                  <p>{{datas.name}}</p>
                  <p>{{datas.createTime}}</p>
                  <p>{{datas.price}}元</p>
              </div>
              <!--<p class="null">{{data.length==0?'暂无数据':''}}</p>-->
                	<div class="empty" v-if="data.length==0">
						<img src="../../../images/empty.png"/>
						<span>暂无数据</span>
				  </div>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 1">
               <div class="content" v-for="datas in data" :key="datas.count">
                <p>{{datas.name}}</p>
                  <p>{{datas.createTime}}</p>
                  <p>{{datas.price}}元</p>
              </div>
              <!--<p class="null">{{data.length==0?'暂无数据':''}}</p>-->
              <div class="empty" v-if="data.length==0">
						<img src="../../../images/empty.png"/>
						<span>暂无数据</span>
				  </div>
             
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 2">
               <div class="content" v-for="datas in data" :key="datas.count">
                  <p>{{datas.name}}</p>
                  <p>{{datas.createTime}}</p>
                  <p>{{datas.price}}元</p>
              </div>
            <!--<p class="null">{{data.length==0?'暂无数据':''}}</p>-->
            <div class="empty" v-if="data.length==0">
						<img src="../../../images/empty.png"/>
						<span>暂无数据</span>
				  </div>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 3">
               <div class="content" v-for="datas in data" :key="datas.count">
                 <p>{{datas.name}}</p>
                  <p>{{datas.createTime}}</p>
                  <p>{{datas.price}}元</p>
              </div>
              <!--<p class="null">{{data.length==0?'暂无数据':''}}</p>-->
              <div class="empty" v-if="data.length==0">
						<img src="../../../images/empty.png"/>
						<span>暂无数据</span>
				  </div>
          </div>
        </div>
      </div>
    </div>
  </div>

	</div>
</template>

<script>
	import mpNavbar from 'mpvue-weui/src/navbar';
		export default {
		  components: {
		    mpNavbar
		  },
		  data(){
		  	return{
                type:0,
                state:1,
                chooseFirst:true,
                id:null,
                total:'0',
                total2:'0',
                 tabs: ['活动',"自买", "分享", "提成",'邀请'],
                activeIndex: 0,
                fontSize: 30,
                data:[

                ]
                 
        }
        
          },
          	onLoad(options){  
              this.id = options.id
              wx.setNavigationBarTitle({  
                title:'佣金明细'  
              });
          },
          computed: {
            navbarSliderClass() {
            if (this.activeIndex == 0) {
                return 'weui-navbar__slider_0'
            }
            if (this.activeIndex == 1) {
                return 'weui-navbar__slider_1'
            }
            if (this.activeIndex == 2) {
                return 'weui-navbar__slider_2'
            }
            if (this.activeIndex == 3) {
                return 'weui-navbar__slider_3'
            }
            if (this.activeIndex == 4) {
                return 'weui-navbar__slider_4'
            }
            }
        },
          methods: {
               tabClick(e) {
                  this.type = Number(e.currentTarget.id)
                  this.activeIndex = e.currentTarget.id;
                  if(!this.type == 0){
                     this.getList()
                  }else{
                    this.getActivity()
                  }
              
                },
                chooseF(){
                  this.chooseFirst = !this.chooseFirst
                  this.state = 1;
                  if(!this.type == 0){
                     this.getList()
                  }else{
                    this.getActivity()
                  }
                  // this.getList()
                },
                chooseS(){
                  this.chooseFirst = !this.chooseFirst
                  this.state = 0;
                  if(!this.type == 0){
                     this.getList()
                  }else{
                    this.getActivity()
                  }
                  // this.getList()
                },
                getList(){
                  this.$http.get(this.globalUrl.findAllCommissionByPage,{type:this.type,state:this.state}).then((res)=>{
                    this.data = res.data.data
                  }).catch(err=>{
                      this.data = []
                  })

                // this.$http.post(this.globalUrl.findAllCommissionByPage,{
                //   data:{
                //      type:this.type,
                //      state:this.state
                //   }
                //   }).then(res =>{
                //       console.log(res)
                //   })



                },
                getActivity(){
                  this.data = []
                   this.$http.get(this.globalUrl.findAllCommissionByPage,{type:5,state:this.state}).then((res)=>{
                     this.data = this.data.concat(res.data.data)
                       this.$http.get(this.globalUrl.findAllCommissionByPage,{type:6,state:this.state}).then((res)=>{
                        this.data = this.data.concat(res.data.data)
                        }).catch(err=>{
                            this.data = []
                        })
                    }).catch(err=>{
                        this.data = []
                    })

                   
                    
                }
          },
          mounted() {
            this.$http.get(this.globalUrl.findCommissionTotal,{}).then((res)=>{
              this.total = res.data.data.collectMoney
              this.total2 = res.data.data.noCollectMoney
            }).catch(err=>{
              console.log(err)
            })

            if(!this.type == 0){
                     this.getList()
                  }else{
                    this.getActivity()
                  }

          },
		}
</script>
<style>
  page,
.page,
.page__bd {
  height: 100%;
  width: 100%;
  margin-top: 15rpx;
  background: #ffffff;
}
.page__bd {
  padding-bottom: 0;
}

.null{
  margin-top: 100rpx;
}

.weui-navbar__slider{width:20%;background: #e65454;}
.weui-navbar__item{color: #666666;font-size: 27rpx;font-weight: bold;}
.weui-navbar__item.weui-bar__item_on {color: #e65454 !important;font-size: 27rpx;font-weight: bold;}


.weui-navbar__slider_0 {
  left: 0rpx;
  transform: translateX(0);
}
.weui-navbar__slider_1 {
  left: 0rpx;
  transform: translateX(150rpx);
}
.weui-navbar__slider_2 {
  left:0rpx;
  transform: translateX(300rpx);
}
.weui-navbar__slider_3 {
  left:0rpx;
  transform: translateX(450rpx);
}
.weui-navbar__slider_4 {
  left:0rpx;
  transform: translateX(600rpx);
}
</style>
<style scoped lang="scss">
  .empty{
	margin-top: 180rpx;
	width: 100%;
	height: 260rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	img{
		width: 200rpx;
		height: 180rpx;
	}
	span{
		font-size: 30rpx;
color: #AAAAAA;
	}
}
.weui-tab__content {
  padding-top: 0;
  text-align: center;
  background: #ffffff;
    .content{
      height: 90rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 26rpx;
      color: #323232;
      font-weight: bold;
      padding-left: 34rpx;
      padding-right: 32rpx;
      border-bottom: 2rpx solid #eeeeee;
  }
}
 .containerss{
 	width: 100%;
     height: 100%;
     background: #f4f4f4;
 	padding: 0;
.top{
    height: 200rpx;
    width: 100%;
    background: #ffffff;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    div{height: 124rpx;width: 276rpx;text-align: center;}
    .choose{
      border: 1px solid #E65454;
      border-radius: 4px;
      color: #E65454;
    }
    .noChoose{
      border: 1px solid #E2E2E2;
      border-radius: 4px;
      color: #666666;
    }
    .p1{font-size: 24rpx;margin-top: 16rpx;}
    .p2{font-size: 42rpx;}
}

 }
</style>