<template>
    <div class="login">
        <div class="logo">
            <img src="../assets/logo.png" alt="">
            <p>米多星后台管理系统</p>
        </div>
        <div class="login_box">
            <div class="top">登录</div>
            <div class="user_name">
                <div class="left"></div>
                <input type="text" placeholder="请输入手机号码" v-model="phone">
            </div>
            <div class="user_name" style="margin-top:45px;">
                <div class="left2"></div>
                <input type="password" placeholder="请输入密码" v-model="psw">
            </div>
            <div class="operation">
                <input type="checkbox" id="mycheck" v-model="check">
                <label for="mycheck"></label>
                <label for="mycheck"><span>记住密码</span></label>
                <div class="forget" @click="forgetPsw">忘记密码</div>
            </div>
            <div class="login_btn" @click="login">登录</div>
          
        </div>
    </div>
</template>

<script>
    export default {
        name:'login',
        data(){
            return{
                phone:'',
                psw:'',
                check:false
            }
        },
        methods:{
            forgetPsw(){
                this.$router.push('/forgetPsw')
            },
            login(){
                if(this.phone==''||this.psw==''){
                    this.$Message.warning('请输入完整信息')
                }else{
                     this.post(this.allUrl.loginUrl, {
                    passWord: this.psw,
                    mobiPhone: this.phone
                    }).then((res) => {
                        if(res.data.errorcode == 0){
                            this.$Message.success('登录成功');
                            if(this.check){
                                let info = {phone:this.phone,psw:this.psw,check:true}
                                info = JSON.stringify(info)
                                localStorage.setItem('autoLogin',info)
                            }else{
                                localStorage.removeItem('autoLogin')
                            }
                            let a = JSON.stringify(res.data.data)
                            this.$store.commit('SET_TOKEN',a)
                            localStorage.setItem('TokenKey',a)
                            this.$router.push('/home')
                        }else{
                            this.$Message.error({
                                content: '对方不想告诉你'+res.data.errordesc+'并给你抛了个白眼',
                                duration: 10,
                                closable: true
                            });  
                        }
                    })

                    
                }
             
              

            }
        },
        mounted() {
            let info = JSON.parse(localStorage.getItem('autoLogin'))
            if(info){
                this.phone = info.phone
                this.psw = info.psw
                this.check = info.check
            }
        },
    }
</script>

<style scoped lang="scss">
    .login{
        height: 100%;width:100%;
        background: url('../assets/bg.png') no-repeat center center;
        background-size:100% 100%;
        position: relative;
        overflow: hidden;
        .logo{
            position: absolute;
            top: 13.5vh;
            left: 37vw;
            display: flex;
            img{height: 2.66vw;width: 2.66vw;}
            p{height: 2.66vw;line-height: 2.66vw;font-size: 2.12vw;
                color: #ffffff;margin-left: 1.59vw;}
        }
        .login_box{
            height: 56.29vh;width: 39.7vw;
            border-radius: 25px;
            // border: 2px solid #46311a;
            position: absolute;
            top: 22.96%;
            right: 31.25%;
            background: #ffffff;
            // box-shadow:inset 0 0 1px 1px #ccc;
            .top{
                width: 100%;height: 10.6vh;
                line-height: 10.6vh;text-align: center;font-size: 2vh;
                color: #4069c1;
                position: relative;
              
            }
           .user_name{
               height: 5.55vh;border:1px solid #aec3ec;
               border-radius: 5px;width: 72.1%;margin-left: 15%;
               display: flex;padding: 0.92vh 0;
               .left{height: 3.518vh;width: 2.7vw;border-right: 2px solid #aec3ec;
                    background: url("../assets/head.png") no-repeat center center;
                    }
                .left2{height: 3.518vh;width: 2.7vw;border-right: 2px solid #aec3ec;
                    background: url("../assets/mima.png") no-repeat center center;
                    }
                input{width: 100%;padding-left: 10px;font-size: 1.57vh;color: #333;
                      background: none;border: none;}
                 input::-webkit-input-placeholder{color:#b3b3b3;}
           }
           .operation{margin-left: 15%;margin-bottom: 8.425vh;
                        margin-top: 2.82vh;display: flex;
                      #mycheck + label{height: 28px;width: 28px;border-radius: 5px;border: 2px solid #aec3ec;
                        cursor: pointer;}
                    #myCheck:checked + label{
                            background-color: #dbdada;
                        }
                        input{display: none;}
                       input[type="checkbox"]:checked + label::before {
                            content: "\2713";
                            font-size: 20px;
                            position: relative;
                            top: -2px;
                            left: 4px; 
                            color: #4069c1;
                        }
                        span{font-size: 15px;display: inline-block;height: 28px;line-height: 28px;
                            margin-left: 10px;color: #666666;
                        //    text-shadow: 0 -3px 5px #71696b;
                           cursor: pointer;
                            }
                        .forget{height: 28px;line-height: 28px;font-size: 15px;color: #666666;
                                position: absolute;right: 14.7%;
                                // text-shadow: 0 -3px 3px #71696b;
                                cursor: pointer;
                            }
                     }
        }
        .login_btn{
            height: 6.574vh;line-height: 6.574vh;width: 72.1%;
            font-size: 22px;color: #fbe9dd;
            margin-left: 15%;border-radius: 5px;background: #4069c1;
 
            cursor: pointer;text-align: center;
        }
    }
</style>