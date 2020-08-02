<template>
    <div class="header">
        <span><router-link v-if="title!='我的单词本'" :to ="back"><img src="../../assets/back.png" width="100%"/></router-link></span>
       {{title}}

      <span class="addword">
             	<router-link v-if="title=='我的单词本'" to="Addword">添加单词</router-link>
      </span>
    </div>
</template>

<script>
    export default {
        name: "Header",
        props:["title","back"]
    }
</script>

<style scoped>
    .header {
        height: 44px;
        background: #41b883;
        color: #ffffff;
        line-height: 44px;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        position: fixed;
        top: 0;
        width: 100%;
    }

    .header img {
        width: 20px;
    }

    .header span {
        flex: 0 0 100px;
        font-size: 14px;
    }

    .header a {
        color: #ffffff;
        text-decoration: none;
    }
</style>
