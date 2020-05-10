<template>
  <div>
    <router-link v-for="xiaoji_item in xiaojiList"  :key='xiaoji_item.name'
     :to="{path:'/'+xiaoji_item.name, query:{table:'xiaoji',name:xiaoji_item.name}}">
      <el-menu-item :index="xiaoji_item.name" @click="saveActivePath(xiaoji_item.name)">
        <template>
          {{xiaoji_item.name}}
        </template>
      </el-menu-item>
    </router-link>
  </div>
</template>

<script>
export default {
  name:'xiaojiMenu',
  data(){
    return{
      xiaojiList:[]
    }
  },
  created(){
    this.getXiaojiList()
    //获取活跃路由
    this.$store.state.activePath = window.sessionStorage.getItem('activePath')
  },
  methods:{
    async getXiaojiList(){
      const {data:resdata} = await this.$axios.get('zhixiao/xiaoji')
      this.xiaojiList = resdata.data
    },
    saveActivePath(path){
      window.sessionStorage.setItem('activePath',path)
    }
  }
}
</script>

<style>

</style>