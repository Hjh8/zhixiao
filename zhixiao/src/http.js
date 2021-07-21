import axios from 'axios'
import {Message,Loading} from 'element-ui';
import router from './router/index'

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

// axios.defaults.baseURL = 'http://47.115.46.57:8989/api/'
axios.defaults.baseURL = 'http://150.158.188.71:8989/api/'
// axios.defaults.baseURL = 'http://localhost:8989/api/'

//设置请求结束加载动画
function endloading() {
  loading.close()
}

// 请求拦截
axios.interceptors.request.use(config => {
  startloading()
  // 设置统一的请求头
  if(window.sessionStorage.getItem('token')){
    config.headers.Authorization = window.sessionStorage.getItem('token')
  }
  return config
},err => {
  endloading()
  throw err
})

// 响应拦截
axios.interceptors.response.use(response => {
  endloading()
  return response
},error => {
  endloading()
  const {status} = error.response
  if(status == 401){
    //token过期
    Message.error('亲爱的知友，请重新登录')
    window.sessionStorage.removeItem('token')
    router.push('/login')
  }
})

export default axios;
