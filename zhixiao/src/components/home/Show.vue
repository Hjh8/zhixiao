<template>
  <div class="show_div">
    <el-carousel :interval="4000" type="card" height="550px" v-if="detailList">
      <el-carousel-item>
        <span class="gzh_img">详情请关注公众号<img :src="gzhpath"></span>
        <el-card class="box-card1">
          <form class="top_fieldset" align=center>
            <legend><img :src="logopath" class="logo_img"></legend>
            <fieldset style="margin-bottom:8px;">
              {{detailList.协会介绍}}
            </fieldset>
          </form>
        </el-card>
        <el-card class="box-card2">
          <form class="bottom_fieldset" align=left>
            <fieldset style="margin-bottom:15px;">
              <span v-for="leader in detailList.leaders" :key="leader">
                {{leader}}<br>
              </span>
            </fieldset>
          </form>
        </el-card>
      </el-carousel-item>

      <el-carousel-item>
        <p class="pp">相关部门及分队介绍</p>
        <el-timeline class="dp_timeline">
          <el-timeline-item size="large" 
          :hide-timestamp="true" v-for="(dp_value,dp_key,dp_index) in departmentList" :key="dp_key">
            <el-link :href="dp_value" target="blank"
            :underline="false" :icon="iconList[dp_index%9]" class="department-link">
            <h4>{{dp_key}}</h4>
            </el-link>
          </el-timeline-item>
        </el-timeline>
      </el-carousel-item>

      <el-carousel-item>
        <h3 style="position:absolute;left:40%;">近期重大活动</h3>
        <el-timeline class="a_timeline" reverse>
          <el-timeline-item  v-for="(a_value,a_key) in activityList"
          :key="a_key" placement="top" :timestamp="a_value.time">
            <el-card class="a_card">
              <el-link :href="a_value.link" target="blank"
              :underline="false" icon="el-icon-link">
                <h3>{{a_key}}</h3>
              </el-link>
              <h5>{{a_value.介绍}}</h5>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-carousel-item>
    </el-carousel>

    <!-- 未收集到社团 -->
    <el-carousel height="550px" type="card" v-else>
      <el-carousel-item>
        <h1 style="position:absolute;top:45%;left:24%">
          该社团或协会还没有信息，小只君会努力跟进的！
        </h1>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import '../../assets/css/Show.less'
export default {
  data(){
    return{
      logopath:'',//存放logo路径
      gzhpath:'',//存放公众号图片路径
      iconList:[ //存放icon
        'el-icon-suitcase-1','el-icon-s-promotion','el-icon-ship',
        'el-icon-bicycle','el-icon-position','el-icon-magic-stick',
        'el-icon-s-claim','el-icon-s-opportunity','el-icon-reading',
        'el-icon-edit','el-icon-search','el-icon-aim'
      ],
      detailList:{},//存放数据库detail列的数据
      departmentList:{},//存放数据库department列的数据
      activityList:{} //存放数据库activity列的数据
    }
  },
  created(){
    this.getDetail()
  },
  methods:{
    async getDetail(){
      //获取路由携带的参数
      let name = this.$route.query.name
      let table = this.$route.query.table
      let sortage = this.$route.query.sortage
      if(typeof(sortage)!=="string"){
        // 校级，协会发送请求
        const {data:resdata} = await this.$axios.get('zhixiao/show',{params:{name:name,table:table}})
        this.detailList = JSON.parse(resdata.result[0].detail)
        if(this.detailList){
          // require()里面的路径要有字符串不能光有变量
          this.logopath = require('../../'+this.detailList.logo)
          this.gzhpath = require('../../'+this.detailList.公众号)
          this.departmentList = JSON.parse(resdata.result[0].department)
          this.activityList = JSON.parse(resdata.result[0].activity)
        }
      }
      else{
        // 院级发送请求
        let sortage = this.$route.query.sortage
        const {data:resdata} = await this.$axios.get('zhixiao/show',{params:{name:name,table:table,sortage:sortage}})
        this.detailList = JSON.parse(resdata.result[0].detail)
        if(this.detailList){
          this.logopath = require('../../'+this.detailList.logo)
          this.gzhpath = require('../../'+this.detailList.公众号)
          this.departmentList = JSON.parse(resdata.result[0].department)
          this.activityList = JSON.parse(resdata.result[0].activity)
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>

</style>