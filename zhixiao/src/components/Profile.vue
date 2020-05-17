<template>
  <div class="profile_div">
    <!-- <div class="img_div">
      <img :src="this.user.avatar" v-viewer>
    </div> -->

    <!-- <div class="change_avatar_div" @click="div_click">
      更换头像 -->
      <input id="image-file" type="file" accept="image/jpeg"
      @change.prevent="getFile" style="display:none;">
    <!-- </div> -->

    <!-- <div class="message_div">
      <h1 style="line-height:2;">
        <i class="el-icon-s-custom"></i>用户名：{{user.name}}<br>
        <i class="el-icon-phone"></i>手机号：{{user.phone}}<br>
        <i :class="'el-icon-'+user.sex"></i>性别：{{user.sex}}<br>
        <i class="el-icon-date"></i>出生日期：{{user.birthday}}<br>
        <i class="el-icon-message"></i>邮箱：{{user.email}}<br>
        <i class="el-icon-open"></i>注册时间：{{user.register_date}}
      </h1>
    </div> -->

    <div class="wrap">
    
    <div class="cube">
      <div class="out_front">
        <br>
        <i class="el-icon-s-custom"></i>
        用户名：<br>{{user.name}}
      </div>
        
        <div class="out_back">
          <br>
          <i class="el-icon-phone"></i>
          手机号：<br>{{user.phone}}
        </div>
        
        <div class="out_left">
          <br>
          <i :class="'el-icon-'+user.sex"></i>
          性别：<br>{{user.sex}}
        </div>
        <div class="out_right">
          <br>
          <i class="el-icon-date"></i>
          出生日期：<br>{{user.birthday}}
        </div>
        <div class="out_top">
          <br>
          <i class="el-icon-message"></i>
          邮箱：<br>{{user.email}}
        </div>
        <div class="out_bottom">
          <br>
          <i class="el-icon-open"></i>
          注册时间：<br>{{user.register_date}}
        </div>
        
        <span class="in_front" @click="div_click">
				  <img :src="this.user.avatar" class="in_pic">
        </span>
        <span class="in_back" @click="div_click">
          <img :src="this.user.avatar" class="in_pic">
        </span>
        <span class="in_left" @click="div_click">
          <img :src="this.user.avatar" class="in_pic">
        </span>
        <span class="in_right" @click="div_click">
         <img :src="this.user.avatar" class="in_pic">
        </span>
        <span class="in_top" @click="div_click">
          <img :src="this.user.avatar" class="in_pic">
        </span>
        <span class="in_bottom" @click="div_click">
          <img :src="this.user.avatar" class="in_pic">
        </span> 
      </div>
  </div>
  </div>
</template>

<script>
import '../assets/css/Profile.less'
export default {
  data(){
    return {
      user:this.$store.state.user, //获取user信息
    }
  },
  methods:{
    div_click(){
      document.getElementById('image-file').click()
    },
    async getFile(event) {
      let file = event.target.files[0];  //获取上传元素信息
      //用户头像大小限制为最大2M
      if(file.size > 2 * 1024 * 1024){
        return this.$message.error('图片大小不能大于2M！')
      }
      // event.preventDefault();
      // 只能通过formData方式来传输文件
      var formData = new FormData();  
      formData.append('file', file);
      formData.append('phone', this.user.phone);
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      await this.$axios.post('users/upload_avatar', formData, config)
      .then((res) => {
        if(res.data.code === -1) return this.$message.error('图片操作失败')
        //给avatar赋上新的值
        this.user.avatar = res.data.fileUrl
        this.$message.success('头像更换成功')
        this.$store.commit('setAvatar',this.user.avatar)
    })
  }
  }
}
</script>

<style lang='less' scoped>

</style>