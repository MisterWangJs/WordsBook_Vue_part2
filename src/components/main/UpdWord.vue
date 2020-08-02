<template>
    <div class="wrapper">
        <Header :title="title" :back="back"></Header>
        <div class="wordsWrapper">
            <p class="words">{{wordObj.words}}</p>
            <p class="sp">[{{wordObj.pronounce}}]</p>
            <p class="chinese">{{wordObj.description}}</p>
        </div>
        <div class="section">
            <ul>
                <li>
                    <span>单词</span>
                    <input type="text" v-model="newWord.word" placeholder="请输入改正后的单词（可选）" class="text1"/>
                </li>
                <li>
                    <span>发音</span><input type="text" v-model="newWord.pronounce" placeholder="请输入修改后的发音（可选）"
                                          class="text1"/>

                </li>
                <li>
                    <span>中文</span><input type="text" v-model="newWord.description" placeholder="请输入修改的汉语意思（可选）"
                                          class="text1"/>

                </li>
            </ul>
        </div>
        <button v-on:click="update()" class="button1">确认修改</button>

    </div>
</template>

<script>
    import Header from "../header/header"
    import axios from 'axios'
    export default {
        name: 'UpdWord',
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
                title: "修改单词",
                back: "/Words",
                wordObj:{
                    words:this.$route.params.word.word,
                    pronounce:this.$route.params.word.pronounce,
                    description:this.$route.params.word.description,
                }
            }

        },
        methods: {

            fun() {

                if (this.newWord.word == '') {
                    this.newWord.word = this.$route.params.word.word;
                }
                if (this.newWord.pronounce == '') {
                    this.newWord.pronounce = this.$route.params.word.pronounce;
                }
                if (this.newWord.description == '') {
                    this.newWord.description = this.$route.params.word.description;
                }
            },


            update() {
                this.fun();
                let wid = this.$route.params.word.wid;
                let word = this.newWord.word;
                let pronounce = this.newWord.pronounce;
                let description = this.newWord.description;
              let url='http://localhost:9090/wordsbook/word_modify?wid='+wid+'&word='+word+'&pronounce='+pronounce+'&description='+description;
                  axios.post(url,{
                    //请求参数
                    params: {
                      id: wid,
                      word: word,
                      pronounce: pronounce,
                      description: description
                    }
                  })
                    .then((res)=>{
                      console.log(res.data);
                      alert("修改成功！");
                      this.$router.push('/Words');
                });
            }
        }
    }

</script>

<style scoped>
    .wrapper {
        margin-top: 55px;
    }

    .wordsWrapper {
        background: #ffffff;
        margin-bottom: 12px;
        padding: 20px 0;
        color: #666;
    }

    .wordsWrapper .words {
        font-size: 25px;
        color: #44c293;
        font-weight: bold;
        padding: 10px 0;
    }
    .sp{
        font-size: 12px;
        margin-bottom: 5px;
    }
    .chinese{
        font-size: 12px;
    }

    .text {

        padding-left: 80px;
        text-align: left;

    }

    .section {
        background: #ffffff;
        padding: 0 23px;
        text-align: left;
    }

    .section li {
        height: 55px;
        line-height: 55px;
        border-bottom: 1px #eee solid;
        font-size: 16px;
    }

    .section input {
        border: none;
        margin-left: 16px;
        font-size: 14px;
        width: 80%;
    }

    .button1 {
        border: 0;
        background: #41b883;
        border-radius: 3px;
        height: 42px;
        width: calc(100% - 66px);
        margin: 50% 33px 10% 33px;
        font-size: 16px;
        font-weight: bold;
        color: #ffffff;
    }


</style>
