import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import jwt from 'jsonwebtoken'
import {Loading} from 'element-ui';

let loading

//设置请求开始加载动画
function startloading() {
  loading = Loading.service({
    lock:true,
    text:'小只君在死命奔跑中......',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

//设置请求结束加载动画
function endloading() {
  loading.close()
}

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) => {
  startloading()
  if(to.path == '/login' || to.path == '/register'){
    return next()
  }
  if(to.path !== '/login' || to.path !== '/register'){
    //如果token过期则先去登录
    jwt.verify(window.sessionStorage.getItem('token'),'CodeKiang',(error,decoded)=>{
      if (error) {
        next('/login')
      }
    })
  }
  if(to.path == '/welcome' || to.path == '/profile'){
    // 清除社团活跃路由
    window.sessionStorage.removeItem('activePath')
  }

  //如果未登录先登录
  const isLogin = window.sessionStorage.getItem('token')
  if(!isLogin) return next('/login')
  next()
})

router.afterEach(() => endloading())

export default router
