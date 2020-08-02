import Vue from 'vue'
import Router from 'vue-router'
//需要下载vue-resource   使用命令cnpm install vue-resource
import VueResource from 'vue-resource'
import Login from '@/components/login/Login'
import Words from '@/components/main/Words'
import AddWord from '@/components/main/AddWord'
import UpdWord from '@/components/main/UpdWord'
import UpdatePassword from '@/components/password/UpdatePassword'

Vue.use(Router)
Vue.use(VueResource);
//设置路由


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Words',
      name: 'Words',
      component: Words
    },
    {
      path: '/Addword',
      name: 'AddWord',
      component: AddWord
    },
    {
      path: '/updword',
      name: 'UpdWord',
      component: UpdWord
    },
    {
      path: '/UpdatePassword',
      name: 'UpdatePassword',
      component: UpdatePassword
    }

  ]
})

