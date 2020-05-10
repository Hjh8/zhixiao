<template>
  <div>
    <el-submenu :index="sort_item.sortage" v-for="sort_item in xiehuiList" :key='sort_item.sortage'>
      <template slot="title">
        {{sort_item.sortage}}
      </template>
      <router-link v-for="name_item in sort_item.name.split(',')" :key="name_item"
        :to='{path: "/"+name_item, query:{table:"xiehui",name:name_item}}'>
        <el-menu-item :index="name_item" @click="saveActivePath(name_item)">
          {{name_item}}
        </el-menu-item>
      </router-link>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name:'xiehuiMenu',
  data(){
    return{
      xiehuiList:[],
    }
  },
  created(){
    this.getXiehuiList()
    this.$store.state.activePath = window.sessionStorage.getItem('activePath')
  },
  methods:{
    async getXiehuiList(){
      const {data:resdata} = await this.$axios.get('zhixiao/xiehui')
      this.xiehuiList = resdata.data
    },
    saveActivePath(path){
      window.sessionStorage.setItem('activePath',path)
    }
  }
}
</script>

<style lang='less' scoped>
</style>