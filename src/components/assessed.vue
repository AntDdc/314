<template>
  <div class="wrapper">
    <!--      顶部-->
    <div class="w">
      <div class="head">
        <el-row class="clearfix">
          <div class="match1 fl" >
            <img src="../assets/match.png" alt="">
          </div>
          <div class="fl pointer colorf">
            <span @click="toHome">首页</span>
          </div>
          <div class="fr pointer">
            <el-dropdown @command="handleCommand">
              <span class="el-icon-user-solid colorc loginInfo"></span>
              <el-dropdown-menu slot="dropdown" style="margin-top:-10px;">
                <el-dropdown-item command="a" @click="logOut" style="width:2rem;text-align:center">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-row>
      </div>
    </div>
    <!--      中间列表-->
    <div class="opus_wrapper">
      <div class="opus_title">
        <div class="sort_left">
          <div>小学组</div>
          <div>中学组</div>
          <div>教师组</div>
        </div>
        <div class="sort_right">
          <el-select v-model="value" placeholder="请选择" >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :size="200">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="opus_body clearfix">
        <div class="opus_item" v-for="item in 9" :key="item">
          <p class="p_title">作品名称</p>
          <p class="p_img"><img src="../assets/cross.png" alt="">图形化编程设计 <img src="../assets/cross.png" alt=""></p>
          <p class="p_title introduce">作品简介</p>
          <p class="p_info">以人为中心的设计指南是我翻译的第二本完整的设计</p>
          <div class="icon">
            <img src="../assets/readArrow.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <!--      底部-->
    <div class="footer_wrapper">
      <div class="foot " style="width: 70%;margin: 0 auto">
        <div class="link">
          <div class="box">
            <div class="top">
              <span @click="toPage(1)">关于我们</span>
              <span @click="toPage(2)">源码熊</span>
              <span @click="toPage(3)">源码教室</span>
            </div>
            <div class="box_info">
              深圳三点一四教育科技有限公司 / 粤ICP备18155800号-2
            </div>
          </div>
        </div>
        <div class="zw"></div>
        <div class="qrcode">
          <img src="../assets/barcode1.png" alt="">
          <img src="../assets/barcode2.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import city from '@/components/city/index.vue'
import { getGroup, postApply, getGrade, sendLoginSms } from '@/api/index'
export default {
  components: { city },
  data () {
    return {
      gradeOptions: [],
      selected: [],
      sendData: {
        groupId: '',
        contestantName: '',
        contact: '',
        location: '',
        school: '',
        grade: '',
        code: '',
        mobile: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      id: this.$route.query.id,
      buttonName: '发送验证码',
      isDisabled: false,
      time: 60
    }
  },
  created () {
    // this.initGroup()
  },
  methods: {
    _back () {
      this.$confirm(`未提交的数据将无法保存，是否返回`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.go(-1)
      }).catch(() => {
      })
    },
    change (...val) {
      if (val[0] === '清空') {
        this.sendData.location = ''
      } else {
        this.sendData.location = `${val[0][0]}${val[0][1]}${val[0][2]}`
      }
    },
    toPage (e) {
      if (e === 1) {
        window.location.href = 'http://dianyixueyuan.com'
      } else if (e === 2) {
        window.location.href = 'http://www.yuanmaxiong.cn'
      } else if (e === 3) {
        window.location.href = 'https://ymjs.dianyixueyuan.com'
      }
    },
    logOut () {
      this.$tool.sessionRem('userType')
      this.$tool.sessionRem('accessToken')
      this.$router.push({
        name: 'home'
      })
    },
    handleCommand (command) {
      if (command === 'a') {
        this.$tool.sessionRem('userType')
        this.$tool.sessionRem('accessToken')
        this.$router.push({
          name: 'home'
        })
      }
    },
    toHome () {
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .opus_wrapper{
    width: 1200px;
    margin: 40px auto 20px;
    .opus_title{
      display: flex;
      justify-content: space-between;
      .sort_left{
        width: 390px;
        height: 60px;
        background: url(../assets/opusbg.png) no-repeat ;
        -webkit-background-size: cover;
        background-size: cover;
        display: flex;
        line-height: 60px;
        text-align: center;
        color: #FFFFFF;
        cursor: pointer;
        &>div:nth-child(1){
          width: 125px;
        }
        &>div:nth-child(2){
          width: 125px;
        }
        &>div:nth-child(3){
          width: 138px;
          padding-right: 13px;
        }
      }
      .sort_right{
        width: 280px;
        height: 48px;
        box-sizing: border-box;
        /*border:1px solid rgba(210,210,210,1);*/
        /*border-radius:8px;*/
        .el-select{
          width: 279px;
          border-radius:8px;
        }
      }
    }
    .opus_body{
      width: 1200px;
      height: 794px;
      /*box-sizing: border-box;*/
      border: 1px solid #4678FF;
      padding: 0 0;
      border-radius:0 10px 10px 10px;
      /*display: flex;*/
      /*justify-content: flex-start;*/
      /*flex-wrap: wrap;*/
      /*align-items: flex-start;*/
      .opus_item{
        width: 373px;
        height: 238px;
        box-sizing: border-box;
        padding-top: 25px;
        border:1px solid rgba(204,204,204,1);
        box-shadow:0 0 4px 0 rgba(51,51,51,0.3);
        border-radius:8px;
        float: left;
        margin-left: 17px;
        margin-top: 20px;
        text-align: center;
        position: relative;
        background: url("../assets/opus.png");
        background-size: cover;
        cursor: pointer;
        p{
          margin: 0 0 10px 0;
        }
        .introduce{
          margin-top: 30px;
        }
        .p_title{
          /*margin-top: 30px;*/
          font-size: 18px;
        }
        .p_img{
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 76px;
          color:gray;
        }
        .p_info{
          width: 192px;
          margin: 0 auto;
          color:gray;
          line-height: 25px;
          /*height: 134px;*/
        }
        /*.handle{*/
        /*  margin: 30px 30px;*/
        /*  display: flex;*/
        /*  justify-content: space-between;*/
        /*  color: #FFFFFF;*/
        /*  span{*/
        /*    width: 70px;*/
        /*    height: 28px;*/
        /*    display: inline-block;*/
        /*    background:rgba(220,220,220,1);*/
        /*    box-shadow:0px 1px 2px 0px rgba(0, 0, 0, 0.35);*/
        /*    border-radius:6px;*/
        /*    text-align: center;*/
        /*    line-height: 28px;*/
        /*  }*/
        /*}*/
        .icon{
          position: absolute;
          left: 0;
          top: 31px;
        }
      }
    }
  }
  .match1 {
    margin-left: 1.4rem;
    margin-right: 1.7rem;
    position: relative;
    top: -6px;
    img{
      position: relative;
      top: 15px;
      left: 0;
    }
  }
  .w {
    width: 100%;
    background:linear-gradient(0deg,rgba(66,111,255,1),rgba(88,167,255,1));
    height: 1.5rem;
    .apply {
      padding: 0.1rem 0.3rem;
      margin-right: 0.2rem;
      border: 1px solid #ccc;
      border-radius: 30px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
    .loginInfo {
      padding: 0.1rem 0.1rem;
      background-color: #fff;
      border-radius: 100%;
      font-size: 0.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
    .head {
      width: 70%;
      margin: 0 auto;
      height: 100%;
      line-height: 1.5rem;
    }
  }
  /deep/.el-cascader{
    width: 100%;
  }
  .par{
    position: relative;
    .right{
      position: absolute;
      right:0;
    }
  }
  .formBox {
    width: 19.4rem;
    height: 11.6rem;
    background-color: #fff;
    border-radius: 8px;
    margin: 0.8rem auto 0;
    .form {
      width: 10.32rem;
      height: 8.64rem;
      margin: 0 auto;
      // border: 1px solid #ccc;
      .title {
        padding: 0.4rem 0;
        text-align: center;
        font-size: 0.4rem;
      }
    }
  }
  .footer_wrapper{
    background: url('../assets/footer.png') no-repeat;
    background-size: cover;
    height: 230px;
    /*height: 182px;*/
    padding-top: 47px;
    box-sizing: border-box;
    /*position: absolute;*/
    /*bottom: 0;*/
    /*left: 0;*/
    width: 100%;
    .foot{
      display: flex;
      box-sizing: border-box;
      .zw{
        flex: 1;
      }
      .link{
        flex: 3;
        color: #fff;
        position: relative;
        margin-left: 20px;
        text-shadow:0px 1px 2px rgba(0, 0, 0, 0.45);
        .box{
          position: absolute;
          left: 0;
          .top{
            display: flex;
            margin-bottom: 1.1rem;
            span{
              flex: 1;
              text-align: left;
              color: #fff;
              cursor: pointer;
              font-size: 28px;
            }
          }
          .box_info{
            font-size: 25px;
          }
        }
      }
      .qrcode{
        flex: 2;
        box-sizing: border-box;
        padding-left: 40px;
        img{
          width: 28%;
        }
        img:nth-child(1){
          margin-left: 0.8rem;
          margin-right: 1.2rem;
        }
      }
    }
    .intro{
      width: 100%;
      flex: 1;
    }
    .w{
      width: 70%;
      margin: 0 auto;
      .apply{
        padding: 0.1rem 0.3rem;
        margin-right: 0.2rem;
        border:1px solid #ccc;
        border-radius: 30px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      }
      .loginInfo{
        padding: 0.1rem 0.1rem;
        background-color: #fff;
        border-radius: 100%;
        font-size: 0.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      }
    }
  }

</style>
