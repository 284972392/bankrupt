<template>
<!-- ham -->
    <div class="getRecord">
        <div class="content" v-for="datas in data" :key="datas.time" v-if="!isEmpty">
            <div class="top">
                <p>{{datas.time}}</p>
                提现总计 <span style="margin-left:10rpx;"> {{datas.total}} 元</span>
            </div>
            <div class="list" v-for="(info,indexs) in datas.list" :key="info.time">
                <div class="left">
                    <img src="../../../images/zfb.png" alt="">
                    <div>
                        <p>{{info.alipayAccount}} -{{info.status==0?'提现失败':info.status==1?'提现成功':'提现待审核'}}</p>
                        <span>{{info.createTime}}</span>
                        <span style="color: #666666;">{{info.status==0?'失败原因：'+info.remark:''}}</span>
                    </div>
                </div>
                <div class="right"> {{info.status==1?'+':''}} {{info.amount}}元</div>
            </div>
        </div>

        <!--<div class="empty" v-if="isEmpty">
				<img src="../../../images/empty.png"/>
		</div>-->
		<div class="empty" v-if="isEmpty">
			<img src="../../../images/empty.png"/>
				<span>暂无数据</span>
								
	</div>

    </div>
</template>

<script>
    export default {
        data(){
            return{
                id:null,
                data:[
                  
                    ],
                isEmpty:false
            }
        },
        	onLoad(options){  
              this.id = options.id
              wx.setNavigationBarTitle({  
                title:'提现记录'  
              });
              this.data = []
               this.$http.get(this.globalUrl.getWithdrawRecordList,{}).then(res =>{ 
                      if(res.data.data.length==0){
                          this.isEmpty = true
                      }
                      res.data.data.map((res)=>{
                          res.list.map((response)=>{
                              response.createTime = this.changeTime2(response.createTime)
                          })
                          
                      })
                      this.data = res.data.data
                  })
          },
    }
</script>

<style>
  page{
  height: 100%;
}
</style>
<style scoped lang='scss'>
    .getRecord{
        width: 100%;
        .top{
           background: #f4f4f4;
           height: 84rpx;
           display: flex;
           align-items: center;
           padding-left: 33rpx;
           font-size: 26rpx;
           color: #8d8d8d;
           p{margin-right: 33rpx;}
           span{color: #e65455;}
        }
        .list{
            padding-left: 33rpx;
            padding-right: 32rpx;
            height: 139rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2rpx solid #eeeeee;
            .right{
                font-size: 32rpx;
                font-weight: bold;
                color: #333333;
            }
            .left{
                display: flex;
                align-items: center;
                div{
                    margin-left: 33rpx;
                    display:flex;
                    flex-direction:column;
                    p{font-size: 28rpx;color: #333333;margin-top: 3rpx;
                        margin-bottom: 5rpx;font-weight: bold;}
                    span{font-size: 24rpx;color: #ababab;}
                }
                img{
                    height: 67rpx;
                    width: 67rpx;
                }
            }
        }
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
    }
</style>