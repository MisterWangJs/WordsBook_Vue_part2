<template>
	<div class="wrapper">
		<img src="../../assets/logo-bg.jpg" width="100%"/>
		<div>
			<div class="login-wrap" v-show="showLogin">
				<p v-show="showTishi">{{tishi}}</p>
				<div class="txtWrapper">
					<div class="imgwrapper" ><img src="../../assets/model.png" width="100%"/></div>
					<input class="input" type="text" v-model="userName" placeholder="请输入用户名"/>
				</div>
				<div class="txtWrapper">
					<div class="imgwrapper" ><img src="../../assets/password.png" width="100%"/></div>
					<input class="input" type="password" v-model="password" placeholder="请输入6-16位密码" />
				</div>
<!--
				<div class="txtWrapper">
					<div class="imgwrapper" ><img src="../../assets/code.png" width="100%"/></div>
					<input class="input" type="text" width="40px" v-model="verifyCode" placeholder="请输入验证码"/>
					<img v-bind:src="verifyImg" v-on:click="sendSms()"/>
				</div>
-->

				<button class="button4" v-on:click="login1">登 录</button>
				<div class="desc">
				<!--	<span v-on:click="ToLoginMobile">手机号登录</span>-->
					<span v-on:click="ToRegister">注册</span>
				</div>
			</div>
			<div class="login-wrap" v-show="showLoginMobile">
				<!--<h3>登录</h3>-->
				<p v-show="showTishi">{{tishi}}</p>
				<div class="txtWrapper">
					<div class="imgwrapper" ><img src="../../assets/model.png" width="100%"/></div>
					<input class="input" type="text" v-model="mobile" placeholder="请输入手机号"/>
				</div>
				<div class="txtWrapper">
					<div class="imgwrapper" ><img src="../../assets/code.png" width="100%"/></div>
					<input class="input" type="text" placeholder="请输入验证码" v-model="verifyCodeSms">
					<button class="btnCode" v-on:click="sendMobileSms()">发送验证码</button>
				</div>
				<button class="button4" v-on:click="loginMobile">登录</button>
				<div class="desc">
					<span v-on:click="ToRegister">没有账号，马上注册</span>
					<span v-on:click="ToLogin">登录</span>

				</div>


			</div>

			<div class="login-wrap" v-show="showRegister">
				<!--<h3>注册</h3>-->
				<p v-show="showTishi">{{tishi}}</p>
				<div class="txtWrapper">
					<div class="imgwrapper" ><img src="../../assets/model.png" width="100%"/></div>
					<input type="text" class="input" placeholder="请输入用户名" v-model="userName">
				</div>
				<div class="txtWrapper">
					<div class="imgwrapper" ><img src="../../assets/password.png" width="100%"/></div>
					<input type="password" class="input" placeholder="请输入6-16位密码" v-model="password1">
				</div>
				<div class="txtWrapper">
					<div class="imgwrapper" ><img src="../../assets/password.png" width="100%"/></div>
					<input type="password" class="input" placeholder="请再次输入密码" v-model="password2">
				</div>
        <!--
				<div class="txtWrapper">
					<div class="imgwrapper" ><img src="../../assets/code.png" width="100%"/></div>
					<input type="text" class="input" placeholder="请输入校验码" v-model="verifyCode">
					<img v-bind:src="verifyImg"  v-on:click="sendSms()">
				</div>
        -->
				<button class="button4" v-on:click="register1">注 册</button>
				<div class="desc">
					<span v-on:click="ToLogin">已有账号？马上登录</span>

				</div>
			</div>

		</div>
	</div>

</template>
<script>
	import { setCookie,getCookie } from '../../assets/js/cookie.js'
	import {nemoMD5} from "../../assets/js/md5.js"
  import axios from 'axios'
	export default{
		data(){
			return{
				userName:'',
				verifyCode: '',
				verifyImg:'',
				verifyCodeSms:'',
				mobile:'',
				password:'',
				password1: '',
				password2: '',
				tishi: '',
				showTishi: false,
				showLogin: true,
				showRegister: false,
				showLoginMobile: false
			}
		},
		methods: {
		   sendSms(){
		         var url="http://app.sencha.com.cn/soya/apps/testdb/server/?action=user.createVerifyImg";
                                 this.$http.jsonp(url).then((res)=>{
                                 		this.verifyImg=res.data.data.pic;
                                 			console.log(res.data.data.pic);
                                 })
		    },
		    sendMobileSms(){
		    	var url = "http://app.sencha.com.cn/soya/apps/testdb/server/?action=user.sendVerifySms&mobile="+this.mobile
        		this.$http.jsonp(url)
        		event.preventDefault()
		    },
		    loginMobile(){
		    	if(this.mobile == "" || this.verifyCodeMobile == ""){
					alert("请输入手机号码与校验码")
				}else{

					 var url='http://app.sencha.com.cn/soya/apps/testdb/server/?action=user.loginByMobile'
					 this.$http.jsonp(url,{ params: { mobile: this.mobile, verifyCodeSms: this.verifyCodeSms }}).then((res)=>{
						console.log(res.data.ret)
						console.log(res.data.msg)
						if(res.data.ret == 0){

							this.showTishi = true
						    this.tishi = "登录成功"
							setCookie('userName',this.mobile,1000*60)
							this.$router.push('/Words')
						}

					 })
				}
		    },
      login1(){
        let _this=this;
        let that = this;
        if(that.userName == "" || this.password == ""){
          alert("用户名密码验证码不能为空")
        }else{
          let ua = navigator.userAgent;
          let url='http://localhost:9090/wordsbook/login?&userName='+that.userName+'&password='+that.password;
          axios.post(url)
            .then(res=>{
              console.log(res.request.responseURL)
              _this.ok = res.data.ok;
              _this.msg = res.data.msg;
                console.log(res.data.ret);
                console.log(res.data.msg);

              if (_this.ok==1){
                this.showTishi = true;
                this.tishi = "登录成功"
                setCookie('userName',this.userName,1000*60);
                this.$router.push('/Words')
              }
              alert(that.msg)
            })
            .catch(err=>{
              console.log(err)
            })
        }
      },
			ToRegister(){
				this.showRegister = true
				this.showLogin = false
				this.showLoginMobile=false
				this.userName = ''
				this.password = ''
				this.password1 = ''
				this.password2 = ''
				this.verifyCode = ''
				 let url="http://app.sencha.com.cn/soya/apps/testdb/server/?action=user.createVerifyImg";
                    this.$http.jsonp(url).then((res)=>{
                    this.verifyImg=res.data.data.pic;
                })

			},

			ToLogin(){
				this.showRegister = false
				this.showLoginMobile=false
				this.showLogin = true
				this.userName = ''
				this.password = ''
				 let url="http://app.sencha.com.cn/soya/apps/testdb/server/?action=user.createVerifyImg";
                    this.$http.jsonp(url).then((res)=>{
                    this.verifyImg=res.data.data.pic;
                })

			},
			ToLoginMobile(){
				this.showRegister = false
				this.showLoginMobile=true
				this.showLogin = false
				this.userName = ''
				this.password = ''
				 let url="http://app.sencha.com.cn/soya/apps/testdb/server/?action=user.createVerifyImg";
                    this.$http.jsonp(url).then((res)=>{
                    this.verifyImg=res.data.data.pic;
                })

			},
      register1(){
        let _this=this;
        let that = this;
        if(this.userName == "" || this.password1 == ""){
          alert("请输入用户名或密码或校验码")
        }else if(this.password1!=this.password2){
          alert("两次密码不一致")

        }else {
          let ua = navigator.userAgent;
          let url='http://localhost:9090/wordsbook/register?&userName='+that.userName+'&password='+that.password1;
          axios.post(url)
            .then(res=>{
              console.log(res.request.responseURL)
              _this.ok = res.data.ok;
              _this.msg = res.data.msg;
              console.log(res.data.ret);
              console.log(res.data.msg);

                if(_this.ok==1){
                alert(_this.ok+that.msg)
                //this.tishi = "注册成功"
                this.showTishi = true
                this.userName = ''
                this.password1 = ''
                this.password2 = ''
                this.verifyCode = ''
                this.ToLogin();
              }
              else if(_this.ok==3){
                alert("此用户名已经存在")
                //this.ToRegister();
              }


            })
            .catch(err=>{
              console.log(err)
            })
        }
      },

			upatePassword(){
				if(getCookie('userName')){
					 let uname = getCookie('username')
     				 this.userName = uname
     				 alert(this.uname);
				}

			}
		},
		mounted(){

            let url="http://app.sencha.com.cn/soya/apps/testdb/server/?action=user.createVerifyImg";
                    this.$http.jsonp(url).then((res)=>{
                    this.verifyImg=res.data.data.pic;
                })


        }
	}
</script>

<style scoped>
    .wrapper{
      background: #ffffff;
      height: 100%;
    }
	.login-wrap{
		text-align:center;
		padding-top: 46px;
		width: 100%;
	}
	.txtWrapper{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom:1px #eee solid;
		margin:0 38px;
		padding-bottom: 12px;
		margin-bottom: 29px;
	}
	.desc{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin:28px 38px;
		font-size: 14px;
		color: #999999;
	}
	.imgwrapper{
		flex: 0 0 18px;
	}
	.input{
		display:block;
		outline:none;
		border: 0;
		box-sizing:border-box;
		margin-left: 10px;
		font-size: 16px;

	}
	.button4{
		display:block;
		width:calc(100% - 76px);
		height:50px;
		line-height: 50px;
		margin:0 38px;
		margin-top: calc(100px - 29px);
		border:none;
		background-color:#41b883;
		color:#fff;
		font-size:18px;
		border-radius: 25px;
	}
	.btnCode{
		background-color:#41b883;
		color: #ffffff;
		border: 0;
		border-radius: 3px;
		height: 28px;
		line-height: 28px;
	}
	span{cursor:pointer;}
	span:hover{color:#41b883;}
</style>
