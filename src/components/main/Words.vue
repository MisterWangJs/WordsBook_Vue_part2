<template>
    <vue-drawer-layout
            ref="drawerLayout">
        <div class="drawer" slot="drawer">
            <div class="text">
                <p class="user">{{name}}</p>
                <ul class="drawerList">
                    <li @click="modifyPassword">
                        <img src="../../assets/password.png" width="15px"/>
                        修改密码
                    </li>
                    <li @click="quit">
                        <img src="../../assets/exit.png" width="20px"/>
                        安全退出
                    </li>
                </ul>
            </div>
            <a href="javascript:void(0)" class="close"
               @click="handleToggleDrawer">
                <img src="../../assets/return.png" width="18px"/>&nbsp;返回
            </a>
        </div>

        <div class="content"   style="position:relative;bottom: -10%" slot="content" ref="viewBox">
            <Header :title="title"></Header>

          <div  v-show="searchbox" class="searchbox">
            <ul class="border1">
              <li><a href="#" class="style1">查找单词</a></li>
            </ul>
            <div class="bodys">
              <p><input  type="text" v-model="xword" class="one" placeholder="输入中文/英文" /><button  v-on:click="FindWord(xword)" class="one1">搜索</button></p>
            </div>
          </div>


            <div class="section">
                <ul class="list" v-for="(item,index) in wordAttr">
                    <li v-for=" (word,index) in item">
                        <div>
                          <div><span class="wid">{{word.wid}}</span>
                                <span class="words">{{word.word}}</span>
                                <span class="syllable">[{{word.pronounce}}]</span></div>
                            <p class="chinese">{{word.description}}</p>
                        </div>
                        <div class="btngroud">
                            <button v-on:click="del(word.wid)" class="delbtn">删除</button>
                            <button v-on:click="update(word)" class="modifybtn">修改</button><!--/////////////////////////发音////////////////////////////////////////////////////////////-->

                          <img v-on:click="read(word.word)" src="../../assets/laba.png" alt="小喇叭" width="20px" height="20px" style="float: right;margin-top: 7px">

                        </div>
                    </li>
                </ul>
            </div>

          <div class="returnbutton" v-show="showreturn">
            <button  style="font-size: xx-large;color: #41b883;width: 200px;" v-on:click="returnbutton" >返回单词首页</button>
          </div>



          <div style="position: absolute;bottom: 5%;left: 50%;transform: translate(-50%, -50%);" class="page_style" v-show="page1">
          <form class="center">
            <button v-on:click="FirstPage" class="button2">首页</button>
            <button v-on:click="UpPage" class="button2">上一页</button>
            <button v-on:click="DownPage" class="button2">下一页</button>
            <button v-on:click="LastPage" class="button2">末页
            </button><br/><br/>
            <p><label>当前第   </label><label class="CurrentPageColor">{{CurrentPage}}</label><label>   页</label></p>
            <br/>
            <input type ="text" v-model="num" placeholder="请输入需要跳转的页数" class="text1"/>
            <button v-on:click="JumpPage(num)" class="button2">转到</button>
          </form>

          </div>
            <a href="javascript:void(0)" class="btn"
               @click="handleToggleDrawer">
                <img src="../../assets/menu.png" width="20px"/>
            </a>
        </div>
    </vue-drawer-layout>
</template>



<script>
    import { realconsole } from '../../../build/jquery-1.7.2.min.js'
    import {setCookie, getCookie, delCookie} from '../../assets/js/cookie.js'
    import Header from "../header/header"
    import axios from 'axios'
    export default {
        name: 'Words',
        components: {
            Header
        },
        data() {
            return {
                updWord: {
                    wid:0,
                    id: 0,
                    word: '',
                    pronounce: '',
                    description: ''
                },
                words: [],
                count: '',
                page:1,
                num:'',
                name: '',
                title: "我的单词本", //导航标题内容
                dom: '',
                wordAttr: [], //将获取到的单词列表存到这个数组
                CurrentPage:'',
                xword:'',
                x:'',
                page1:true,
                searchbox:true,
                showreturn:false
            }

        },
        mounted() {
            let uname = getCookie('userName')
            this.name = uname
            if (uname == "") {
                this.$router.push('/')
            }
            let _this = this;
            // 设置一个开关来避免重负请求数据
            let sw = true;
            this.dom = this.$refs.viewBox


            // 注册scroll事件并监听，页面是否滚动到底部
           /* this.dom.addEventListener('scroll', function () {
                // console.log(document.documentElement.clientHeight + '-----------' + window.innerHeight); // 可视区域高度
                if (document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {
                    // 如果开关打开则加载数据
                    if (sw == true) {
                        // 将开关关闭
                        sw = false;
                        _this.page++
                        _this.show(_this.page)
                    }
                }
            });*/
        },
        methods: {
          returnbutton:function(){

            this.show(1);
            this.page1 = true;
            this.searchbox = true;
            this.showreturn = false;
          },
            /**
             * 分页方法 首页
             *
             * */
            FirstPage:function(){
              this.wordAttr=[];
              this.pageIndex=1;
              this.show(this.pageIndex);
            },
          /**
           * 分页方法 上一页
           *
           * */
          UpPage:function(){
            if((this.pageIndex-1)<1){
              this.wordAttr=[];
              alert("已经是第一页了！")
              this.show(1)
            }
            else{
              this.wordAttr=[];
              this.show(this.pageIndex=this.pageIndex-1)
            }
          },
          /**
           * 分页方法 下一页
           *
           * */
          DownPage:function(){

            if((this.pageIndex+1>this.pageCount)){
              this.wordAttr=[];
              alert("已经是最后一页了！")
              this.show(this.pageCount)
            }
            else{
              this.wordAttr=[];
              this.show(this.pageIndex=this.pageIndex+1)
            }
          },
          /**
           * 分页方法 末页
           *
           * */
          LastPage:function(){
            this.wordAttr=[];
            this.pageIndex=this.pageCount;
            this.show(this.pageIndex);
         },
          /**
           * 分页方法 跳转指定页
           *
           * */
          JumpPage:function(num){
            var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
            this.wordAttr=[];
            if (!re.test(num)) {
              alert("输入有误！")
              this.show(this.pageIndex);
              return false;
            }else{
              if(num>this.pageCount||num<1)
              {
                this.show(this.pageIndex);
                alert("您输入超出页码范围了")

              }else{
                this.pageIndex=num;
                this.show(this.pageIndex);
              }
            }
          },
            /**
             * 修改密码的方法
             *
             **/
            modifyPassword: function () {
                this.$router.push({path: "/UpdatePassword"})
            },

            /**
             * 弹出左侧菜单的方法
             *
             **/
            handleToggleDrawer: function () {
                this.$refs.drawerLayout.toggle();
            },

            /**
             * 退出当前程序
             *
             **/
            quit() {
               // this.$http.jsonp('http://app.sencha.com.cn/soya/apps/testdb/server/?action=user.logout')
                delCookie('userName')
                this.$router.push('/')
            },
            /**
             * 获取数据
             *
             **/
            show: function (page) {

              let _this = this;
              let url='http://localhost:9090/wordsbook/words_list?pageIndex='+page;
              axios.get(url)
                .then(function (res) {

                    _this.count=res.data.count;
                    _this.pageIndex=res.data.pageIndex;
                    _this.pageSize=res.data.pageSize;
                    _this.pageCount=res.data.pageCount;

                    let CurrentPage=_this.pageIndex
                   _this.CurrentPage=CurrentPage;

                    _this.words=res.data.list;
                    _this.wordAttr=[];
                    _this.wordAttr.push(_this.words);


                }, function (error) {
                    //console.log(1)
                    console.log(error);
                });
            },
          /**
           * 获取模糊数据
           *
           **/
          FindWord: function (x) {
            if(this.xword == ""){
              alert("输入为空！")
            }else{

              this.showreturn=true;
              this.page1=false;
              let _this = this;
              let url='http://localhost:9090/wordsbook/mohu_find?x='+x;
              axios.get(url)
                .then(function (res) {

                  _this.ok=res.data.ok;
                  _this.msg=res.data.msg;
                  if(_this.ok==0){
                    alert(_this.msg)
                  }else{
                    _this.count=res.data.count;
                    _this.pageIndex=res.data.pageIndex;
                    _this.pageSize=res.data.pageSize;
                    _this.pageCount=res.data.pageCount;
                    let CurrentPage=_this.pageIndex
                    _this.CurrentPage=CurrentPage;
                    _this.words=res.data.list;
                    _this.wordAttr=[];
                    _this.wordAttr.push(_this.words);
                  }

                }, function (error) {
                  //console.log(1)
                  console.log(error);
                });
            }
          },


          /**
             * 删除当前的单词信息
             *
             **/
            del: function (wid) {
              let _this=this;
              let url='http://localhost:9090/wordsbook/word_delete?wid='+wid;
              axios.get(url)
                .then(function (res) {

                }, function (error) {
                  console.log(error);
                  alert("删除失败!");
                });
              alert("删除成功!");
              history.go(0);
            },
             read:function(word){

               let url='/proxy/dictvoice?audio='+word;
               axios.get(url)
                 .then(res=>{
                   console.log(res.request.responseURL)
                     var sy = new Audio(url);
                      sy.play();
                 })
                 .catch(err=>{
                   console.log(err)
                 })

              },

            /**
             * 修改单词方法
             *
             **/
            update: function (word) {

                console.log(word);

                this.$router.push({
                    /*由于动态路由也是传递params的，所以在 this.$router.push() 方法中
                     * path不能和params一起使用，否则params将无效。需要用name来指定页面。
                     * */
                    name: 'UpdWord',
                    params: {
                        word: word,
                    }
                });
            },

        },

        created() {
            this.show(1); //默认显示第一页的内容
        }
    }
</script>

<style scoped>
    .user {
        height: 100px;
        line-height: 100px;
        font-size: 20px;
        font-weight: bold;
    }
    .CurrentPageColor{
      color: red;
      font-family: "Adobe 宋体 Std L";
      font-size: large;
    }
    .section {
        margin-top: 55px;
        margin-bottom: 40px;
    }

    .list li {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        background: #ffffff;
        border-radius: 3px;
        margin: 0 10px;
        padding: 12px;
        text-align: left;
        border: 1px #eee solid;
        margin-top: 12px;

    }

    .content {
        height: 100%;
        overflow: auto;
    }
    .wid{
      display:none;
    }
    .list li .words {
        font-size: 16px;
        font-weight: bold;
        margin-right: 8px;
    }

    .list li .syllable {
        font-size: 12px;
        color: #666;
    }

    .list li .chinese {
        font-size: 12px;
        color: #666;
    }

    .list li .delbtn {
        border-radius: 20px;
        width: 48px;
        height: 19px;
        line-height: 16px;
        color: #41b883;
        border: 1px #41b883 solid;
        font-size: 10px;
        text-align: center;
        display: inline-block;
    }

    .list li .modifybtn {
        border-radius: 20px;
        width: 48px;
        height: 19px;
        line-height: 16px;
        color: #ffffff;
        border: 1px #41b883 solid;
        background: #41b883;
        font-size: 10px;
        text-align: center;
        display: inline-block;
    }

    .btn {
        position: fixed;
        left: 10px;
        top: 0;
        top: 12px;
        z-index: 2;
    }

    .btngroud {
        flex: 0 0 100px;
    }

    .drawerList li {
        display: flex;
        align-items: center;
        margin-left: 20px;
        line-height: 45px;
    }

    .drawerList li img {
        margin-right: 10px;
    }

    button {
        background: none;
    }

    .close {
        position: fixed;
        bottom: 10px;
        right: 35%;
        color: #41b883;
        text-decoration: none;
        font-size: 14px;
        align-items: center;
        display: flex;
        font-weight: bold;

    }

    h1, h2 {
        font-weight: normal;
        text-align: center;
    }

    ul li {
        list-style: none;
    }

    .drawer {
        height: 100%;
    }

    .text {
        width: 70%;
        height: 100%;
        background-color: #ffffff;
        box-shadow: 3px 3px 6px 6px #888888;
        font-family: 微软雅黑;
        font-size: 2.1vh;
    }

    .returnbutton {
      bottom: 30%;left: 45%;
      position:fixed;
      width:100px;
      height:100px;

    }
    *{margin:0;padding:0;list-style-type:none;}
    a,img{border:0;}
    .searchbox{
      width:520px;height:80px;

      bottom: 80%;left: 32%;
      position:fixed;
    }
    .searchbox ul{ height:35px; width:500px; list-style:none; margin-left:20px}
    .searchbox ul li{ float:left}
    .searchbox ul li a{ float:left; line-height:35px; padding:0 20px; text-decoration:none; color:#000; font-size:14px; font-weight:bold;}
    .searchbox ul li .style1{ background-color:#000; color:#fff}
    .searchbox ul li .style2{ background-color:#f00;color:#fff}
    .searchbox ul li .style3{ background-color:#F90;color:#fff}
    .bodys input{ height:30px;line-height:30px;width:390px;padding:0 10px;float:left;}
    .bodys .one{ border:#000 3px solid}
    .bodys .two{ border:#f00 3px solid}
    .bodys .three{ border:#F90 3px solid}
    .bodys .one1{ background-color:#000; }
    .bodys .two2{ background-color:#f00;}
    .bodys .three3{ background-color:#F90;}
    .bodys button{float:left;border:0;height:36px;width:100px; color:#FFF; line-height:36px;text-align:center;overflow:hidden;}

    .page_style{
    }
</style>
