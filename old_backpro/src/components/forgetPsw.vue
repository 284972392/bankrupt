<template>
    <div class="forgetPsw">
         <div class="logo">
            <img src="../assets/logo.png" alt="">
            <p>米多星后台管理系统</p>
        </div>
        <div class="forget_box">
            <div class="top"> <div class="back" @click="back">返回登录</div>重置密码</div>
            <div class="user_name">
                <div class="left"></div>
                <input type="text" placeholder="请输入手机号码">
            </div>

             <div class="user_name" style="margin-top:2.77vh;position:relative;">
                <div class="left2"></div>
                <input type="text" placeholder="请输入短信验证码">
                <div class="right">获取验证码</div>
            </div>

            <div class="user_name" style="margin-top:2.77vh;">
                <div class="left"></div>
                <input type="text" placeholder="请设置6-15位字母/数字新密码">
            </div>

            <div class="user_name" style="margin-top:2.77vh;">
                <div class="left"></div>
                <input type="text" placeholder="请设置6-15位字母/数字新密码">
            </div>

            <div class="confirm">确定</div>

           

        </div>
    </div>
</template>

<script>
    export default {
        name:'forgetPsw',
        data(){
            return{

            }
        },
        methods:{
            back(){
                this.$router.push('/login')
            }
        }
    }
</script>

<style lang="scss"> 
   
    .forgetPsw{
          .logo{
            position: absolute;
            top: 13.5%;
            left: 37%;
            display: flex;
            img{height: 2.66vw;width: 2.66vw;}
            p{height: 2.66vw;line-height: 2.66vw;font-size: 2.12vw;
                color: #ffffff;margin-left: 1.59vw;}
        }
        height: 100%;width:100%;
        background: url('../assets/bg.png') no-repeat center center;
        .forget_box{
            height: 56.29%;width: 39.7%;
            border-radius: 25px;
            position: absolute;
            top: 22.96%;
            right: 31.25%;
            background: #ffffff;
            
        .top{
                width: 100%;height: 8.79vh;
                line-height: 8.79vh;font-size: 2vh;
                color: #4069c1;
                position: relative;
                display: flex;
                .back{
                  color: #666666;
                    margin-left: 15%;
                    font-size: 1.6vh;
                    position: relative;
                    margin-right: 10vw;
                 cursor: pointer;
                }
        }
        .user_name{
             height: 5.55vh;border:1px solid #aec3ec;
               border-radius: 5px;width: 72.1%;margin-left: 15%;
               display: flex;padding: 10px 0;
               input{width: 100%;padding-left: 10px;font-size: 17px;color: #333;
                      background: none;border: none;}
               .left{height: 3.5vh;width: 2.76vw;border-right: 2px solid #aec3ec;
                    background: url("../assets/head.png") no-repeat center center;
                    }
                .left2{
                  height: 3.5vh;width: 2.76vw;border-right: 2px solid #aec3ec;
                    background: url("../assets/mima.png") no-repeat center center;
                }
                .right{
                   position: absolute;right: 15px;color: #4069c1;cursor: pointer;
                   top:20px;
                }
                
                 input::-webkit-input-placeholder{color:#b3b3b3;}
        }

        .confirm{
           height: 6.48vh;line-height: 6.48vh;width: 72.1%;
            font-size: 22px;color: #fbe9dd;
            margin-top: 5.18vh;margin-left: 15%;border-radius: 5px;background: #4069c1;
 
            cursor: pointer;text-align: center;
        }
        

        }  
    }
</style>