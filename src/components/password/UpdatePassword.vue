<template>
	<div class="wrapper">
        <Header :title="title" :back="back"></Header>
        <div class="section" v-show="showUpdatePassword">
            <p v-show="showTishi">{{tishi}}</p>
            <input type="hidden"  v-model="userName">
            <ul>
                <li>
                    <span><img src="../../assets/password.png" width="15px"/></span>
                    <input type="password" class="input" placeholder="请输入旧密码" v-model="oldPassword">
                </li>
                <li style="height: 10px;background: #f6f6f6"></li>
                <li>
                    <span><img src="../../assets/password.png" width="15px"/></span>
                    <input type="password" class="input" placeholder="请输入新密码" v-model="password1">

                </li>
                <li>
                    <span><img src="../../assets/password.png" width="15px"/></span>
                    <input type="password" class="input" placeholder="确认新密码" v-model="password2">

                </li>
            </ul>
        </div>
        <button v-on:click="upatePassword" class="button1">确认修改</button>
	</div>
</template>

<script>
	import { setCookie,getCookie,delCookie } from '../../assets/js/cookie.js'
	import {nemoMD5} from "../../assets/js/md5.js"
  import Header from "../header/header";
  import axios from 'axios'
	export default{
		name: 'UpdatePassword',
        components: {Header},
        data(){
			return{
				uname:'',
				userName:'',
				oldPassword:'',
				password:'',
				password1:'',
				password2:'',
				showTishi:'',
				tishi:'',
				showUpdatePassword:true,
                title:"修改密码",
                back:"/words"

			}
		},
		methods: {
			upatePassword(){
			  if(this.oldPassword==""||this.password1=="" || this.password2==""){
			  	  	alert("旧密码、新密码、确认密码不能为空")
			  	  	 event.preventDefault()
			  	  	 return;
			  }
			  if(this.password1 != this.password2){
                 	alert("两次输入密码不一致, 请重新输入!")
                 	event.preventDefault()
                 	return;
               }

     		     //let pwd  = nemoMD5(this.password1);
             //let oldpwd = nemoMD5(this.oldPassword);
        this.userName=getCookie('userName')
        let url = 'http://localhost:9090/wordsbook/password_reset?userName=' + this.userName + '&password=' + this.oldPassword + '&password1=' + this.password1;
        axios.post(url).then((res)=>{
            console.log("-------------------------------"+res);
						console.log(res.data.ret);
						console.log(res.data.msg);
						var ok=res.data.ok;
						if(ok==0){
						  alert("旧密码输入错误！")
            }else{
              delCookie('userName')
              alert("新密码修改成功！")
              this.$router.push('/')
            }

					})


			}
		},
		mounted(){
			if(getCookie('userName')){
				  this.uname = getCookie('username')
			}

        }
	}
</script>

<style scoped>
    .wrapper{
        margin-top: 55px;
    }
    .button1{
        border: 0;
        background: #41b883;
        border-radius: 3px;
        height: 42px;
        width:calc(100% - 66px);
        margin:80% 33px 10% 33px;
        font-size: 16px;
        font-weight: bold;

        color: #ffffff;
    }
    .section{
        background: #ffffff;
    }
    .section li{
        height: 55px;
        line-height: 55px;
        border-bottom: 1px #eee solid;
        font-size: 16px;
        display: flex;
        align-items: center;
        padding:0 23px;
    }
    .section input{
        border: none;
        margin-left: 16px;
        font-size: 14px;
    }

</style>
