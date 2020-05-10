<template>
  <div>
    <el-submenu :index="sort_item.sortage" v-for="sort_item in yuanjiList" :key='sort_item.sortage'>
      <template slot="title">
        {{sort_item.sortage}}
      </template>
      <router-link v-for="name_item in sort_item.name.split(',')" :key="name_item"
        :to="{path:'/'+ sort_item.sortage+name_item ,query:{table:'yuanji',sortage:sort_item.sortage,name:name_item}}">
        <el-menu-item :index="sort_item.sortage + name_item" @click="saveActivePath(sort_item.sortage + name_item)">
          {{name_item}}
        </el-menu-item>
      </router-link>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name:'yuanjiMenu',
  data(){
    return{
      yuanjiList:[]
    }
  },
  created(){
    this.getYuanjiList()
    this.$store.state.activePath = window.sessionStorage.getItem('activePath')
  },
  methods:{
    async getYuanjiList(){
      const {data:resdata} = await this.$axios.get('zhixiao/yuanji')
      this.yuanjiList = resdata.data
    },
    saveActivePath(path){
      window.sessionStorage.setItem('activePath',path)
    }
  }
}
</script>

<style>

</style>