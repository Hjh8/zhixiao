import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  text : `
  <marquee direction=right behavior=scroll>
    <span>知校,让你从另一个Dimension了解华广</span>
  </marquee>
  `,
  user:{}, // 存放用户的信息
  activePath:'', // 存储当前活跃路由的index
}

export default new Vuex.Store({
  state,
  mutations: {
    setUser(state,user){
      if(user){
        //设置用户信息，以显示个人信息
        state.user = user
        state.user.birthday = user.birthday.split('T')[0]
        state.user.register_date= user.register_date.split('T')[0]
      }
      else state.user = {}
    },
    setAvatar(state,avatar){
      //修改头像路径
      state.user.avatar = avatar
    }
  },
  actions: {
  },
  getters: {
  }
})
