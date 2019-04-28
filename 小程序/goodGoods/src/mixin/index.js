export default {
  components: {},
  data() {
    return {
      userCode:'',
      globalUrl:{
        findCommissionTotal:'/commissionDetail/findCommissionTotal',//查询佣金总计
        findAllCommissionByPage: '/commissionDetail/findAllCommissionByPage',//查询佣金明细
        wechatUserFindCommissionTotal: '/wechatUserInfo/findCommissionTotal',//查询团队人数
        findTeamUserByPage: '/wechatUserInfo/findTeamUserByPage',//查询团队信息
        updateUserInfo: '/wechatUserInfo/updateUser',//修改用户信息
        getWithdrawAmount: '/withdrawRecord/getAmount',//获取当前用户已提现与未提现金额
        withdrawRecordAdd: '/withdrawRecord/add',//生成提现记录
        getWithdrawRecordList: '/withdrawRecord/getWithdrawRecordList',//获取提现记录
        pddDdkGoodsSearch: 'pinduoduo/api/pddDdkGoodsSearch',//获取商品列表
       PddGoodsCatsGet:'pinduoduo/api/PddGoodsCatsGet',//获取分类
       pddDdkGoodDetail :'pinduoduo/api/pddDdkGoodDetail',// 详情
       PddDdkThemeListGet : 'pinduoduo/api/PddDdkThemeListGet', //专题
       PddDdkThemeGoodsSearch :'pinduoduo/api/PddDdkThemeGoodsSearch',//专梯对应列表
       getPddOrderList: '/order/getPddOrderList',//获取我的订单
       getUserInfo: '/wechatUserInfo/getUserInfo',//查询用户信息
      PddGoodsLevel3CatsGet:'pinduoduo/api/PddGoodsLevel3CatsGet' ,//获取分类
      PddDdkGoodsPromotionUrlGenerate: '/pinduoduo/api/PddDdkGoodsPromotionUrlGenerate',//生成推广链接
      returnCommissionCustomParams: '/commissionDetail/returnCustomParams',//佣金自定义参数返回
      shareWXAQCode: '/wechatUserInfo/createWXACode',//获取分享二维码
			addFeedBack:'/feedBack/addFeedBack'	,//添加反馈
			findPersonFeedBack:'/feedBack/findPersonFeedBack',//查看反馈
			addCollection : '/collection/addCollection',//添加收藏
			delCollection : '/collection/delCollection',//删除收藏
			getCollectionByPage : '/collection/getCollectionByPage', //获取收藏列表
			PddDdkGoodsRecommendGet : '/pinduoduo/api/PddDdkGoodsRecommendGet',//拼多多专题列表获取
			getChannels : '/channels/getChannels',//获取首页 专题位
			getCategoryList:'/category/getCategoryList', //回去首页分类位置
			getNewCouple : '/wechatUserInfo/getNewCouple',//判断是不是新人 给红包
      getTeamList: '/team/getTeamList',//获取排行榜信息

      }
    }
  },
  computed: {},
  methods: {
    changeTime(param){
      var d = new Date(param);
      function changeLenth(i){     
          if(i < 10){
              i = '0'+ i
          }
          return i;
      }
     var times=d.getFullYear() + '-' + (changeLenth(d.getMonth() + 1)) + '-' + changeLenth(d.getDate());
      return times;
    },
    changeTime2(param) { 
      var times = ''
      if(param){
          var d = new Date(param);
          function changeLenth(i){     
              if(i < 10){
                  i = '0'+ i
              }
              return i;
          }
       times=d.getFullYear() + '-' + (changeLenth(d.getMonth() + 1)) + '-' + changeLenth(d.getDate()) + ' ' + changeLenth(d.getHours()) + ':' + changeLenth(d.getMinutes()) + ':' + changeLenth(d.getSeconds());       
      }
      return times;
   },
    Login(){
      return new Promise((resolve, reject) => {
 
        wx.login({
          success:(res)=> {  

            if (res.code) {
                  let shareOpenId = wx.getStorageSync('shareOpenId')
                  shareOpenId = shareOpenId?shareOpenId:''
                  let session3rd = wx.getStorageSync('appDt').session3rd
                  session3rd = session3rd?session3rd:''
              wx.request({
                url: 'https://good.hzqimiao.com/wechatLogin/getSessionKey',
                header: { 'content-type': 'application/x-www-form-urlencoded', },
                method:'post',
                data: {
                  code: res.code,
                  oldSession3rd:session3rd,
                  shareOpenId: shareOpenId
                },
                dataType: 'json',
                  success:res =>{ 
                    if(res.data.resultCode == '0'){
                      let data = {}
                      data.session3rd = res.data.data.session3rd;
                      data.openId = res.data.data.session3rd;
                      data.promoteName = res.data.data.promoteName;
                      data.promoteId = res.data.data.promoteId;
                      data.parentHeadImgUrl = res.data.data.parentHeadImgUrl;
                      data.parentNickName = res.data.data.parentNickName;
                      
                       wx.setStorage({
                                        key: 'appDt',
                                        data: data
                                    });
                    }
      
                    resolve(true);
                  },
                  fail:res=>{
       
                    wx.showModal({
                      title: '请求失败',
                      content: '是否重新请求数据',
                      success:res=> {
                        if (res.confirm) {
                          this.Login()
                        } else if (res.cancel) {
                        
                        }
                      }
                    })
                    
                  }
              })
          }
        }
      })

        
      });
     
  
  }
}
}
// wx.showLoading({
//   title: '加载中',
// })
// setTimeout(function () {
//   wx.hideLoading()
// }, 2000)

