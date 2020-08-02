<template>
	<div class="wrapper">
		<Header :title="title" :back="back"></Header>
		<!--<div class="title">-->
			<!--<router-link to ="/Words">返回</router-link>-->		<!--</div>-->

<p class="title">录入新单词</p>
		<div class="section">
			<ul>
				<li>
					<span>单词</span>
					<input type ="text" v-model="word" placeholder="请输入一个单词" class="text1"/>
				</li>
				<li>
<span>发音</span><input type ="text" v-model="pronounce" placeholder="请输入此单词的发音" class="text1"/>

				</li>
				<li>
<span>中文</span><input type ="text" v-model="description" placeholder="请输入汉语意思" class="text1"/>

				</li>
			</ul>
		</div>
		<button v-on:click="addWord" class="button1">确认添加</button>
	</div>
</template>

<script>
    import Header from "../header/header"
    import axios from 'axios'
	export default {
    name: 'AddWord',
    components: {
      Header
    },
    data() {

      return {
        newWord: {
          word: '',
          pronounce: '',
          description: ''
        },
        word:'',
        pronounce:'',
        description:'',

        title: "添加新单词",
        back: "/Words"
      }

    },
    methods: {
      addWord: function () {
        //console.log(newWord.word);
        if (this.word == '') {
          alert("输入的单词不能为空！");
        } else if (this.description == '') {
          alert("输入的中文意思不能为空！");
        } else if (this.pronounce == '') {
          alert("输入的单词发音不能为空！");
        } else {
          let url = 'http://localhost:9090/wordsbook/word_add?word=' + this.word + '&pronounce=' + this.pronounce + '&description=' + this.description;
          axios.post(url).then((res)=>{
            alert("添加成功！");
            this.$router.push(this.back)
            //
            // this.$router.push({ path:'/Words'  })
            //this.$router.push('/Words')

            /*
                          this.$http.jsonp("http://app.sencha.com.cn/soya/apps/testdb/server/?action=wordList.insert&word="+newWord.word+"&pronounce="+newWord.pronounce+"&memberId=100&description="+newWord.description,
                      {//请求参数

                      }).then(function(res){
                    //	console.log(res.data);
                        if(res.data.ret == 0){

                            alert("添加成功！");
                            this.$router.push({
                                path:"/words"
                            })*/

          })

        }
      }
    }
  }


</script>


<style scoped>
	.wrapper{
		margin-top: 55px;
		text-align: left;
	}
	.title{
		padding-left: 23px;
		margin-bottom: 10px;
		color: #999;
	}
	.section{
		background: #ffffff;
		padding:0 23px;
	}
	.section li{
		height: 55px;
		line-height: 55px;
		border-bottom: 1px #eee solid;
		font-size: 16px;
	}
	.section input{
		border: none;
		margin-left: 16px;
		font-size: 14px;
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
</style>
