<template>
  <el-container class="home-container" v-if="isRouterAlive">
    <el-header>
      <div>
      <span class="s1" @click="goHome('/welcome')">知 校</span>
      <span class="sub"><sub>---- 让 你 从 另 一 个 Dimension 了 解 华 广</sub></span>
      </div>
      <div>
        <img :src="this.user.avatar" v-viewer class="ava_img">
        <div style="font-size:15px;text-align:center;">
          welcome,<br>{{user.name}}
        </div>
        <!-- 下拉菜单 -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-user" command='profile'>个人信息</el-dropdown-item>
            <el-dropdown-item icon="el-icon-question" command='question'>常见疑答</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" command='exit'>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>

    <el-container class="sidebar-container">
      <!-- 侧边栏的设置 -->
      <el-aside>
          <leftMenu></leftMenu>
      </el-aside>
      <!-- 右边主区域的设置 -->
      <el-main class="Fmain">
        <!-- 鸡汤 -->
        <div class="quotes_div" id="quotes">
          <b style='font-family:"Neue Haas Grotesk Text Pro";'>
            {{quotes[new Date().getMinutes()%9]}}
          </b>
        </div>
        <!-- 展示页面的路由占位符 -->
        <router-view :key="new Date().getTime()"></router-view>
      </el-main>
    </el-container>

    <el-dialog title="新生常见问题" :visible.sync="isQuestion" 
    center destroy-on-close :width="flag?'60%':'85%'">
      <div>
        <pre class="question_pre">
          首先，先推荐一些华广必备的东西。
          app: 
            <b>华广智慧校园</b> (可以进行医疗预约,一卡通、电费、网费充值,支持在食堂支付的二维码等功能)
            <b>中国大学慕课</b>（可以学习到其他知名高校的课程）
          公众号：
            <b>华广计协小哥哥</b>（可以查询期末成绩，课表以及预约计算机维护等功能）
            <b>华广图书馆</b>（可以查询图书馆位置以及一些图书的信息）
            <b>华广校园网</b>（查看一些校园网的常见问题与开通流程）
            <b>华广智慧后勤</b>（在这里可以点学校食堂的外卖）
            <b>华广智慧校园</b>（有对水卡的一系列操作进行答疑）
          教务系统的链接：
            <b>http://jwxt.gcu.edu.cn/</b>（在教务系统进行选课以及你在大学的一些信息）

            <el-divider>答疑区<i class="el-icon-bell"></i></el-divider>
            <div class="question_div" v-for="(answer,question) in questions" :key="question">
              Q:<b>{{question}}</b>
              <!-- 答案太长，对其进行分割 -->
              答:<b>{{answer.split('。')[0]}}
                  {{answer.split('。')[1]}}
                  {{answer.split('。')[2]}}
                 </b>
            </div>
        </pre>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import leftMenu from './home/left-menu'
import '../assets/css/Home.less'

export default {
  beforeCreate(){
    /**
     * 防止刷新后vuex存储的数据初始化
     * */
    //在页面刷新前将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }
  },
  async created(){
    const {data:resdata} = await this.$axios.get('zhixiao/question')
    const q = resdata.result[0].question
    this.questions = JSON.parse(q)

    //判断是否为手机端登录，若是则常见问题的width为85
    this.isMobile()
  },
  data(){
    return {
      flag:false,
      quotes:[
        '知足上进，不负野心',
        '若你一开始就把它定义为不可能，那么它又怎么可能变成可能呢？',
        '有期有盼，无灾无难',
        '见自己想见的人，做自己爱做的事，走自己坚持的路。',
        '水不撩，不知深浅，人不拼，怎知输赢。',
        '说不出醉人的情话，我只想带你回家。',
        '世界上遗憾的事情那么多，你要不甘心哪件？',
        '如果你遇见从前的我，请把我带回家。',
        '没有遗憾的人生才是最大的遗憾',
        '优秀不是逼出来的，是自己努力的'
      ],
      user:this.$store.state.user,
      questions:{},
      isRouterAlive:true,//配合刷新路由功能
      isQuestion:false //是否点击问题答疑组件
    }
  },
  methods:{
    goHome(path){
      this.$router.push(path)
      /**
       * 实现无短暂白页面刷新路由功能
       */
      this.isRouterAlive = false
      //Dom刷新之前会执行此函数
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    exitlogin(){
      //清空信息
      window.sessionStorage.clear();
      this.$store.commit('setUser',null)
      this.$router.push('/login')
    },
    handleCommand(command){
      switch(command){
        case 'profile':this.goHome('/profile');break;
        case 'question':this.isQuestion=true;break;
        case 'exit':this.exitlogin();break;
      }
    },
    isMobile() {
      let mobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      if(mobile==null){
        // PC端登录
        this.flag = true
      }
    }
  },
  components:{
    leftMenu,
  }
}
</script>

<style lang='less' scoped>
</style>