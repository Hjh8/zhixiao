<template>
  <div v-if="flag">
    <div class="welcome_div">
      <el-tag closable size="small" effect="plain"
      @close="handleClose()" v-if="isTag">
        <el-link @click="showDetail">
          <i class="el-icon-view el-icon--right"></i>
          查看组织与协会的区别(新生必看)
        </el-link>
      </el-tag>
      <br>
      <!-- 动态显示时间 -->
      <span class="time_span">
        {{hh +":"+ mm}}
      </span>
      <br>
      <span class="goodMAE_span">
        <span v-if="6<=hh && hh<12">GoodMorning,</span>
        <span v-else-if="12<=hh && hh<17">GoodAfternoon,</span>
        <span v-else>GoodEvening,</span>
        {{this.$store.state.user.name}}
      </span>
    </div>

    <!-- 展示组织与协会的区别内容 -->
    <el-dialog title="组织和协会区别" :visible.sync="isDialog" center>
      <span>
        <pre>
            大学生活，可以参加不同的组织或协会来丰富自己的大学生活，除了锻炼自己之外，还可以认识到
            来自全国各地的朋友，真是妙哉。那到底组织跟协会有什么不同呢？到底要参加哪个？
            下面会讲到组织与协会的大致区别，因为每个组织或协会都有自己的特色，
            如果你想了解他们，可以在主页的左侧栏查看。至于参加哪个组织或协会较好，
            那完全是看个人的兴趣与想法。

            组织和协会区别：
            ①组织构成与协会的构成基础不同。一般组织下属的部门比较多，协会下属的部门相对较少。

            ②招新时间不同：
            校级学生组织优先招新，大概是每年9月15日左右；
            院级学生组织一般在校级学生组织招新之后，也可能同时，每个学院每年情况不一样；
            协会一般是最后招新，大概是每年10月10日左右。

            ③综合测评加分不同：
            在组织中，最高德育分社会工作加分，干事加3分，部长加7分，常委加10分；
            在协会中，最高德育分社会工作加分，干事不加分，部长加3分，会长加5分。
        </pre>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialog = false">取 消</el-button>
        <el-button type="primary" @click="isDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created(){
    this.getLocalTime()
    this.isMobile()
  },
  data(){
    return{
      flag:false,//判断是否为手机
      isTag:true,//影响tag
      isDialog: false,//影响对话框
      hh : "",
      mm : ""
    }
  },
  methods:{
    getLocalTime(){
      this.hh = new Date().getHours()
      this.mm = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes()
    },
    handleClose(){
      //关闭tag标签
      this.isTag = false
    },
    showDetail(){
      this.isDialog = true
    },
    isMobile() {
      let mobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      if(mobile==null){
        // PC端登录
        this.flag = true
      }
    }
  },
  mounted(){
    setInterval(() => this.getLocalTime() ,1000)
  }
}
</script>

<style lang="less" scoped>
.welcome_div{
  color: aliceblue;
  position: relative;
  margin-top:8%;
  // left: 50%;
  // transform: translate(-20%,-50%);
  text-align: center;
}
.time_span{
  font-size: 1050%;
  text-align: center;
}
.goodMAE_span{
  text-align: left;
  text-align: center;
  font-size: 337.5%;
}
pre{
  line-height: 2;
  font-family: -apple-system, BlinkMacSystemFont, "Neue Haas Grotesk Text Pro", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>