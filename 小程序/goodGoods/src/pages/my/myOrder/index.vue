<template>
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
              <div v-if="!isEmpty" class="content" v-for="data in data" :key="data.time">
                  <div class="top">
                      <span>{{data.orderCreateTime?data.orderCreateTime:''}}</span>
                      <p :class="data.orderStatus!=='2'?'':'confirm'">{{data.orderStatusDesc}}</p>
                  </div>
                  <div class="mid">
                      <img :src="data.goodsThumbnailUrl" alt="">
                      <div class="rightContent">
                          <div class="title">{{data.goodsName}}</div>
                          <div class="price">
                              <div>付款<span>￥{{data.orderAmount/100}}</span></div>
                              <div>入账佣金<span>￥{{data.promotionAmount/100}}</span></div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="empty" v-if="isEmpty">
								<img src="../../../images/empty.png"/>
						<span>暂无数据</span>
								
							</div>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 1">
               <div v-if="!isEmpty2" class="content" v-for="data in data2" :key="data.time">
                  <div class="top">
                      <span>{{data.orderCreateTime?data.orderCreateTime:''}}</span>
                      <p>{{data.orderStatusDesc}}</p>
                  </div>
                  <div class="mid">
                      <img :src="data.goodsThumbnailUrl" alt="">
                      <div class="rightContent">
                           <div class="title">{{data.goodsName}}</div>
                          <div class="price">
                              <div>付款<span>￥{{data.orderAmount/100}}</span></div>
                              <div>入账佣金<span>￥{{data.promotionAmount/100}}</span></div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="empty" v-if="isEmpty2">
								<img src="../../../images/empty.png"/>
						<span>暂无数据</span>
								
							</div>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 2">
               <div v-if="!isEmpty3" class="content" v-for="data in data3" :key="data.time">
                  <div class="top">
                      <span>{{data.orderCreateTime?data.orderCreateTime:''}}</span>
                      <p class="confirm">{{data.orderStatusDesc}}</p>
                  </div>
                  <div class="mid">
                      <img :src="data.goodsThumbnailUrl" alt="">
                      <div class="rightContent">
                        <div class="title">{{data.goodsName}}</div>
                          <div class="price">
                              <div>付款<span>￥{{data.orderAmount/100}}</span></div>
                              <div>入账佣金<span>￥{{data.promotionAmount/100}}</span></div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="empty" v-if="isEmpty3">
								<img src="../../../images/empty.png"/>
						<span>暂无数据</span>
								
							</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id:null,
      tabs: ["全部订单", "待确认收货", "已确认收货"],
      activeIndex: 0,
      fontSize: 30,
      data:[],
      data2:[],
      data3:[],
      isEmpty:false,
      isEmpty2:false,
      isEmpty3:false
    }
  },
  	onLoad(options){  
            this.data = []
            this.data2 = []
            this.data3 = []
              this.$http.get(this.globalUrl.getPddOrderList,{}).then(res =>{
                     console.log(res.data.data)
                     res.data.data.map((res)=>{
                       res.orderCreateTime = this.changeTime(res.orderCreateTime*1000)
                     })

                     this.data = res.data.data
                     	if (this.data.length == 0) {
					          		this.isEmpty = true
					          	}else{
					          		this.isEmpty = false
					          	}
                     
                     
                     this.data.map((res)=>{
                       if(res.orderStatus==2){
                         this.data3.push(res)
                       }else{
                         this.data2.push(res)
                       }
                     })
                     if (this.data2.length == 0) {
					          		this.isEmpty2 = true
					          	}else{
					          		this.isEmpty2 = false
					          	}
					          	if (this.data3.length == 0) {
					          		this.isEmpty3 = true
					          	}else{
					          		this.isEmpty3 = false
					          	}
                     
                     
                  })
              
              wx.setNavigationBarTitle({  
                title:'我的订单'  
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
    }
  },
  methods: {
    tabClick(e) {
      console.log(e);
      this.activeIndex = e.currentTarget.id;
    }
  }
}
</script>

<style scoped>
page,
.page,
.page__bd {
  height: 100%;
  font-family: PingFangSC-Medium;
}
.page__bd {
  padding-bottom: 0;
}
.weui-tab__content {
  text-align: center;
}
.weui-navbar__slider_0 {
  left: 29rpx;
  transform: translateX(0);
}
.weui-navbar__slider_1 {
  left: 29rpx;
  transform: translateX(250rpx);
}
.weui-navbar__slider_2 {
  left:29rpx;
  transform: translateX(500rpx);
}
.weui-navbar{height: 97rpx;}
.weui-navbar__slider{width:25%;background: #e65454;}
.weui-navbar__item{color: #666666;font-size: 27rpx;font-weight: bold;}
.weui-navbar__item.weui-bar__item_on {color: #e65454 !important;font-size: 27rpx;font-weight: bold;}
</style>

<style scoped lang="scss" scoped>
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
        
        width: 100%;
        height: 292rpx;
        border-bottom: 2rpx solid #EEEEEE;
        padding: 0 24rpx 0 24rpx;
        box-sizing: border-box;
        .top{
            height: 69rpx;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 24rpx;
            color: #666666;
            .confirm{color: #E65454;}
        }
        .mid{
            height: 196rpx;
            background: #F5F5F5;
            padding: 24rpx 0 0 16rpx;
            display: flex;
            img{height: 148rpx;width: 148rpx;}
            .rightContent{
                margin-left: 30rpx;
                .title{margin-top: 4rpx;width: 476rpx;margin-bottom: 24rpx;text-align: left;
                        color: #333333;font-size: 28rpx;font-weight: bold;}
                .price{width: 488rpx;display: flex;justify-content: space-between;
                        font-size: 24rpx;color: #666666;
                      span{color: #333333;}    
                    }
                
            }
        }
    }
</style>