 <template>
  <div class="animated fadeInLeft login_container" id="login_div" :style="loginImgStyle" :key="mark">
    <div v-html="this.$store.state.text" class="login_title"></div>

    <div class="login_box"> 
      <!-- 知校 -->
      <div class="avatar_box">
        <img src="../assets/picture/avatar.jpg">
      </div>

      <!-- 登录框 -->
      <el-form class="login_form" :model="loginmodel" :rules="loginrules" ref="loginref">
        <!-- prop的名字要与需要绑定规则的名字一样 -->
        <el-form-item prop="phone">
          <el-input placeholder="请输入登录手机号"
            prefix-icon="el-icon-user-solid"
            v-model="loginmodel.phone">
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="请输入你的密码"
            prefix-icon="el-icon-lock"
            v-model="loginmodel.password"
            type="password">
          </el-input>
        </el-form-item>

        <el-form-item class="btns">
          <el-button type="primary" @click="btnlogin" round size="small">登录</el-button>
          <el-button type="info" @click="resetlogin" round size="small">重置</el-button>
          <el-button @click="turnto" round size="small">注册</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div style="padding-top:15px;padding-left:30px" @click="changebg">
      <img src="~assets/picture/太阳.gif" width="90px" height="90px">
    </div>
    <el-tooltip content="嗷 嗷 嗷呜~" placement="top" effect="light">
      <div style="position:absolute;bottom:5px;right:50px;padding:0px;">
        <img src="~assets/picture/lion.gif" width="110px" height="110px">
      </div>
    </el-tooltip>
  </div>
</template>

<script>
const jwt = require('jsonwebtoken')
import '../assets/css/Login.less'

export default {
  mounted(){
    //绑定事件
    window.addEventListener('keydown',this.keyDown);
  },
  data(){
    const checkphone = (rule, value, callback) =>{ 
      if(!(/^1[3456789]\d{9}$/.test(this.loginmodel.phone))){ 
          callback(new Error("手机号码有误，请重填"));  
      }
      callback();
    }
    return{
      mark: 0, // 动态背景的标记
      loginImgStyle:{
        backgroundImage: 'url('+require('assets/picture/bg0.jpg')+')'
      },
      user:{}, // 存放用户信息
      // 登录表单的数据绑定对象
      loginmodel:{
        phone: '',
        password: ''
      },
      loginrules:{ // 登录表单的验证规则
        phone:[
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator:checkphone, trigger: 'blur',message: '请输入正确的手机号' }
        ],
        password:[ // 是否必选  不符合规则时的提示信息  鼠标失去标签触发验证
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6到15个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    resetlogin(){
      this.$refs.loginref.resetFields();
    },
    btnlogin(){
      // 表单验证成功valid为true
      this.$refs.loginref.validate(async valid => {
        if(!valid) return;
        // 对返回对象进行解构
        const {data:resdata} = await this.$axios.post('users/login',this.loginmodel);

        if(resdata.status !==200){
          return this.$message.error('哦吼，手机号或密码错误！');
        }
        else{
          this.$message.success('登录成功!');
          // 登录成功之后的token，保存到客户端的sessionStorage中
          // 必须登录之后才可以访问其他API接口
          // token是持久化的存储机制 session是会话期间的存储机制 所以token应该保存在session里
          window.sessionStorage.setItem('token',resdata.token)

          // 解析token
          jwt.verify(resdata.token,'CodeKiang',(error,decoded)=>{
            if(error) throw error
            // 将用户信息存到vuex中
            this.$store.commit('setUser',decoded)
          })
          this.$router.push('/home')
        }
      })
    },
    turnto(){
      this.$router.push('/register')
    },
    keyDown(e){
      //如果是回车则执行登录方法
      if(e.keyCode == 13){
        this.btnlogin();
      }
    },
    changebg(){
      if(this.mark < 8){
        this.mark++;
      }else{
        this.mark = 0;
      }
      this.loginImgStyle.backgroundImage = "url("+ require('assets/picture/bg'+this.mark+'.jpg') +")"
    }
  },
  destroyed(){
    window.removeEventListener('keydown',this.keyDown,false);
  }
}
</script>

<style lang="less" scoped>

</style>
