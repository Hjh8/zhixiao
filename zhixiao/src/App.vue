<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken'
import './assets/css/app.less'
export default {
  name: 'app',
  created(){
    // 在根组件中也要进行token存储，以防刷新后清除
    if(window.sessionStorage.getItem('token')){
      jwt.verify(window.sessionStorage.getItem('token'),'CodeKiang',(error,decoded)=>{
        if(error) throw error
        // 将用户信息存到vuex中
        this.$store.commit('setUser',decoded)
      })
    }
    else{
      this.$router.replace('/login')
    }
  }
}
</script>

<style scpoed>

</style>