<template>
<!-- ham -->
	<div class="container">
        <div class="top">
            <p class="p1">团队总人数</p>
            <p class="p2">{{total}}</p>
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
              <div v-if="!isEmpty" class="content" v-for="data in data" :key="data.count">
                  <img :src="data.headImgUrl" alt="">
                  <p>{{data.nickName}}</p>
                  <p>{{data.name}}</p>
                  <p>{{data.createTime}}</p>
                  
              </div>
              	<div class="empty" v-if="isEmpty">
						<img src="../../../images/empty.png"/>
						<span>暂无数据</span>
			  </div>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 1">
               <div v-if="!isEmpty2" class="content" v-for="data in data2" :key="data.count">
                   <img :src="data.headImgUrl" alt="">
                  <p>{{data.nickName}}</p>
                  <p>{{data.name}}</p>
                  <p>{{data.createTime}}</p>
              </div>
              <div class="empty" v-if="isEmpty2">
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
               id:null,
                total:'',
                 tabs: ["下级代理(0)", "下级会员(0)"],
                activeIndex: 0,
                fontSize: 30,
                data:[],
                isEmpty:false,
                isEmpty2:false,
                data2:[]
                 
		  	}
          },
          	onLoad(options){  
              this.id = options.id
              
              wx.setNavigationBarTitle({  
                title:'我的团队'  
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
            }
        },
          methods: {
               tabClick(e) {
                this.activeIndex = e.currentTarget.id;
                  if(e.currentTarget.id==0){
                    this.findTeamUserByPage(2)
                  }else{
                    this.findTeamUserByPage(1)
                  }
                },
                findTeamUserByPage(levelId){

                  this.$http.get(this.globalUrl.findTeamUserByPage,{levelId:levelId}).then(res =>{
                        console.log(res.data.data)
                        if(levelId==1){
                            this.tabs[1] = '下级会员('+ res.data.data.count + ')'
                            this.data2 = res.data.data.teamUserVos
                            if (this.data2.length == 0) {
				          		this.isEmpty2 = true
				          	}else{
				          		this.isEmpty2 = false
				          	}
                        }else{
                           this.tabs[0] = '下级代理('+ res.data.data.count + ')'
                           this.data = res.data.data.teamUserVos
                           if (this.data.length == 0) {
				          		this.isEmpty = true
				          	}else{
				          		this.isEmpty = false
				          	}
                        }
                    })


                }
          },
          mounted() {
            this.$http.get(this.globalUrl.wechatUserFindCommissionTotal,{}).then((res)=>{
               this.total = res.data.data
            }).catch(err=>{
              console.log(err)
            })

            this.findTeamUserByPage(1)
            this.findTeamUserByPage(2)

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


.weui-navbar__slider{width:25%;background: #e65454;}
.weui-navbar__item{color: #666666;font-size: 27rpx;font-weight: bold;}
.weui-navbar__item.weui-bar__item_on {color: #e65454 !important;font-size: 27rpx;font-weight: bold;}


.weui-navbar__slider_0 {
  left: 0rpx;
  transform: translateX(95rpx);
}
.weui-navbar__slider_1 {
  left: 0rpx;
  transform: translateX(467rpx);
}

</style>
<style scoped lang="scss">
.weui-navbar{
  background: #ffffff;
} 
.weui-tab__content {
  padding-top: 0;
  text-align: center;
  background: #ffffff;
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
    .content{
      height: 120rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24rpx;
      color: #333333;
      font-weight: bold;
      padding-left: 32rpx;
      padding-right: 32rpx;
      border-bottom: 2rpx solid #eeeeee;
      font-family: PingFangSC-Medium;    
      img{
          height: 68rpx;
          width: 68rpx;
      }
  }
}
 .container{
 	width: 100%;
     height: 100%;
     background: #f4f4f4;
 	padding: 0;
.top{
    height: 200rpx;
    width: 100%;
    background: #ffffff;
    text-align: center;
    .p1{
        font-size: 28rpx;
        color: #666666;
        margin-top: 28rpx;
    }
    .p2{
        font-size: 60rpx;
        font-weight: bold;
        color: #333333;
        margin-bottom: 22rpx;
    }
}

 }
</style>