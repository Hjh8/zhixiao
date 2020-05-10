<template>
  <el-col>
    <el-tooltip effect="dark" content="华广地图" placement="top">
      <div class="toggle-button" @click="showMap">
        |||
      </div>
    </el-tooltip>
    
    <!-- 设置隐藏地图 -->
    <img src="../../assets/picture/HgMap.jpg" v-viewer id="map_img" v-show="false">

    <el-menu background-color="#545c64" text-color="#fff"
    active-text-color="#ffd04b" unique-opened :default-active="this.$store.state.activePath">
      <el-submenu :index="item" v-for="item in menulist" :key='item'>
        <template slot="title">
          <i class="el-icon-office-building" v-if="item == '校级组织'"></i>
          <i class="el-icon-school" v-else-if="item == '院级组织'"></i>
          <i class="el-icon-s-home" v-else></i>
          <span>{{item}}</span>
        </template>
        
        <xiaojiMenu v-if="item === '校级组织'"></xiaojiMenu>
        <yuanjiMenu v-else-if="item === '院级组织'"></yuanjiMenu>
        <xiehuiMenu v-else></xiehuiMenu>
      </el-submenu>

    </el-menu>
  </el-col>
</template>

<script>
import xiaojiMenu from './xiaoji_menu'
import yuanjiMenu from './yuanji_menu'
import xiehuiMenu from './xiehui_menu'
import '../../assets/css/left-menu.less'

export default {
  name:'leftMenu',
  data(){
    return {
      menulist:[
      '校级组织',
      '院级组织',
      '协会社团'
      ]
    }
  },
  components:{
    xiaojiMenu,
    yuanjiMenu,
    xiehuiMenu
  },
  methods:{
    showMap(){
      document.getElementById("map_img").click();
    }
  }
}
</script>

<style lang='less' scoped>
</style>