<template>
  <div class="r_container">
    <!-- marquee字体 -->
    <div v-html="this.$store.state.text" class="login_title"></div>
    <!-- 注册表单 -->
    <div class="r_box">
      <el-form class="r_form" :model="registermodel" :rules="registerrules"
        ref="registerref">
        <!-- prop的规则名字要与需要绑定规则的名字一样 -->
        <el-form-item label="用户名" prop="username">
          <el-input
          prefix-icon="el-icon-user-solid"
          v-model="registermodel.username">
          </el-input>
        </el-form-item>

        <el-form-item label="手机" prop="phone">
          <el-input prefix-icon='el-icon-phone'
          v-model="registermodel.phone">
          </el-input>
        </el-form-item>

        <el-form-item label="性别:" prop="sex">
          <template>
            <el-radio v-model="registermodel.sex" label="male">男</el-radio>
            <el-radio v-model="registermodel.sex" label="female">女</el-radio>
          </template>
        </el-form-item>

        <el-form-item label="出生日期:" prop="birthday" size="small">
          <template>
            <el-date-picker type="date"
              v-model="registermodel.birthday"
              value-format="yyyy-MM-dd"
              placeholder="选择日期时间">
            </el-date-picker>
          </template>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input prefix-icon='el-icon-message'
          v-model="registermodel.email">
          </el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password"
          prefix-icon="el-icon-lock"
          v-model="registermodel.password">
          </el-input>
        </el-form-item>

        <el-form-item label="确认密码" status-icon prop="password2">
          <el-input type="password"
          prefix-icon="el-icon-lock"
          v-model="registermodel.password2">
          </el-input>
        </el-form-item>

        <div class="btns">
          <el-button type="primary" @click="registersubmit" size="small">
            立即注册
          </el-button>
          <el-button type="info" @click="registerreset" size="small">取消</el-button>
          <el-button @click="turnto" size="small">返回登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import '../assets/css/Register.less'
export default {
  name:'regiser',
    data(){
      const checkpass = (rule, value, callback)=>{
        if(this.registermodel.password2!==''){
          if(value !== this.registermodel.password2){
            callback(new Error('两次输入密码不一致!'));
          }else callback();
        }else callback();
      }
      const checkpass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registermodel.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
      const checkphone = (rule, value, callback) =>{ 
        if(!(/^1[3456789]\d{9}$/.test(value))){ 
            callback(new Error("手机号码有误，请重填"));  
        }
        callback();
      }
    return{
      // 登录表单的数据绑定对象
      registermodel:{
        username:'',
        phone:'',
        birthday:'',
        sex:'',
        password:'',
        password2:'',
        email:''
      },
      registerrules:{ // 登录表单的验证规则
        username:[
          // 是否必选  不符合规则时的提示信息  鼠标失去标签触发验证
          { required: true, message: '请输入注册名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符', trigger:'blur' }
        ],
        phone:[
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator:checkphone, trigger: 'blur',message: '请输入正确的手机号' }
        ],
        sex:[{required: true}],
        birthday:[{required: true}],
        password:[
          { required: true, message: '请输入注册密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度需在6到15个字符', trigger: 'blur'},
          { validator:checkpass, trigger: 'blur' }
        ],
        password2:[
          { required: true, validator:checkpass2, message: '两次密码不一致', trigger: 'blur'}
        ],
        email:[
          { required: true, message: '请输入注册邮箱', trigger: 'blur' },
          { type:'email',message:'请输入正确的邮箱', trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    registerreset(){
      this.$refs.registerref.resetFields()
    },
    registersubmit(){
      this.$refs.registerref.validate(async valid => {
        if (valid) {
          const {data:resdata} = await this.$axios.post('users/register',this.registermodel)
          if(resdata.status === 200){
            this.$message.success('注册成功')
            this.$router.push('/login')
          }
          else{
            this.$message.warning('哦吼，手机已被注册')
            this.$refs.registerref.resetFields()
          }
        } else {
          this.$message.error('未知原因，注册失败')
          return
        }
      });
    },
    turnto(){
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
</style>