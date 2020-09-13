<template>
  <div class="competition">
    <div class="toptool">
      <div class="block banner_wrapper">
        <el-carousel :height="carouselsHeight" :interval="6000">
          <el-carousel-item v-for="item in carousels" :key="item">
            <img :src="item" ref="imgHeight" class="image">
          </el-carousel-item>
        </el-carousel>
        <div class="banner_header">
          <div class="w header_item" >
            <div class="head">
              <el-row class="clearfix">
                <div class="match1 fl" >
                  <img src="../assets/match.png" alt="">
                </div>
                <div class="fl pointer colorf">
                  <span @click="toPage(1)">首页</span>
                </div>
                <div class="fr pointer">
                  <span class="colorf " @click="toCardPage" >参赛记录</span>
                  <span class="colorf " @click="tip" >我要评阅</span>
                  <span v-if="!flag" class="colorf apply" @click="login">登录/注册</span>
                  <el-dropdown size='medium' v-else @command="handleCommand">
                    <span class="el-icon-user-solid colorc loginInfo"></span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="a" @click="logOut" style="width:2rem;text-align:center">注销</el-dropdown-item>
                      <el-dropdown-item    @click.native="revise" style="width:2rem;text-align:center">修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </el-row>
            </div>
          </div>
        </div>
      </div>

      </div>
      <div class="maincontainer w">
        <div class="title">
          <img src="../assets/leftArrow.png" alt="">
          <span>赛事安排</span>
          <img src="../assets/rightArrow.png" alt="">
        </div>
        <div class="enlistTime">
          <img src="../assets/enlistTime.png" alt="">
          <p class="enlistTime_info">11月16日 6:00-12月25日 22:00 参赛报名</p>
          <div>
            <img src="../assets/enlist.png" alt="">
            <p>{{countdown}}</p>
          </div>
        </div>
        <div class="tab pointer">
          <div @click="showIndex=1">
            <img v-if='showIndex==1' src="../assets/bgInfo.png" alt="">
            <img v-else src="../assets/fontShadow.png" alt="">
            <span class="font_img"><img src="../assets/marchProduce.png" alt=""></span>
          </div>
          <div @click="showIndex=2">
            <img v-if='showIndex==2' src="../assets/bgInfo.png" alt="">
            <img v-else src="../assets/fontShadow.png" alt="">
            <span class="font_img"><img src="../assets/matchAsk.png" alt=""></span>
          </div>
          <div @click="showIndex=3">
            <img v-if='showIndex==3' src="../assets/bgInfo.png" alt="">
            <img v-else src="../assets/fontShadow.png" alt="">
            <span class="font_img"><img src="../assets/matchExplain.png" alt=""></span>
            </div>
          <div @click="showIndex=4">
            <img v-if='showIndex==4' src="../assets/bgInfo.png" alt="">
            <img v-else src="../assets/fontShadow.png" alt="">
            <span class="font_img"><img src="../assets/setup.png" alt=""></span>
          </div>
        </div>
        <div class="text">
            <img v-show="showIndex==1" src="../assets/produce.png" alt="">
            <img v-show="showIndex==2" src="../assets/ask.png" alt="">
            <img v-show="showIndex==3" src="../assets/explain.png" alt="">
            <img v-show="showIndex==4" src="../assets/matchSetup.png" alt="">
        </div>
        <div class="btnColumn">
          <div class="title match_title">
            <img src="../assets/leftArrow.png" alt="">
            <span>赛事选项</span>
            <img src="../assets/rightArrow.png" alt="">
          </div>
          <div class="picture_item">
            <div class="picture_image">
              <img src="../assets/picture.png" alt="">
              <p>图形化编程赛项</p>
              <p><span>仅限</span>源码熊、scratch、编程猫</p>
            </div>
            <div class="picture_info">
              <div class="picture_title">
                <img src="../assets/left.png" alt="">
                <span>图形化编程赛项</span>
                <img src="../assets/right.png" alt="">
              </div>
              <div class="picture_body">
                <p> 趣味图形化，编程创未来 </p>
                <p>比赛时间：2019年11月16日—2019年12月25日</p>
              </div>
              <p @click="open2(1)"><span>立即参赛报名</span></p>
            </div>
          </div>

          <div class="picture_item">
            <div class="picture_image">
              <img src="../assets/python1.png" alt="">
              <p>Python赛项</p>
              <p><span>仅限</span>源码熊、编程猫及其他Python编辑器</p>
            </div>
            <div class="picture_info">
              <div class="picture_title">
                <img src="../assets/left.png" alt="">
                <span>Python赛项</span>
                <img src="../assets/right.png" alt="">
              </div>
              <div class="picture_body">
                <p>
                  创意Python编程，创客无所不能
                </p>
                <p>比赛时间：2019年11月16日—2019年12月25日</p>
              </div>
              <p @click="open3(2)"><span>立即参赛报名</span></p>
            </div>
          </div>

          <div class="picture_item">
            <div class="picture_image">
              <img src="../assets/other.png" alt="">
              <p>其他赛项</p>
              <p><span>仅限</span>使用VB、C++等语言开发</p>
            </div>
            <div class="picture_info">
              <div class="picture_title">
                <img src="../assets/left.png" alt="">
                <span>其他赛项</span>
                <img src="../assets/right.png" alt="">
              </div>
              <div class="picture_body">
                <p>
                  编程对话未来，助力科技强国
                </p>
                <p>比赛时间：2019年11月16日—2019年12月25日</p>
              </div>
              <p @click="open3(3)"><span>立即参赛报名</span></p>
            </div>
          </div>
        </div>
      </div>
    <div class="footer_wrapper">
      <div class="foot w">
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
      <el-dialog
        :visible.sync="dialogVisible"
        :lock-scroll='false'
        width="960px" class = "dialog_box"
        :show-close="false"
       >
        <login v-if="dialogVisible" class="box wrapper" @close='close' @getInfo='getInfo'></login>
      </el-dialog>
  </div>
</template>

<script>
import login from './login.vue'
import { getInfo, getMatchItem } from '@/api/index'
export default {
  components: { login },
  data () {
    return {
      showIndex: '1',
      matchList: ['图形化编程赛项', 'Python赛项', 'VB赛项', 'C++赛项'],
      dialogVisible: false,
      flag: false,
      info: [],
      scratchInfo: {},
      pythonInfo: {},
      otherInfo: {},
      vbInfo: {},
      cInfo: {},
      countdown: "",
      carouselsHeight: '635px',
      carousels: [require('../assets/banner1.png'), require('../assets/banner2.png'), require('../assets/banner3.png'), require('../assets/banner4.png'), require('../assets/banner5.png')]
    }
  },
  created () {
  },
  beforeMount () {
    this.changTime()
  },
  mounted () {
    this.initPage()
    this.changeSize()
  } ,
  methods: {
    revise () {
      this.$router.push({
        name:'revisePassword'
      })
    },
    open2 () {
      this.$router.push({
        name: 'assess'
      })
    },
    open3 (e) {
      // if (!this.$tool.sessionGet('userType')) return this.$tool.message('请先登录')
      // if (this.$tool.sessionGet('userType') !== '2') return this.$tool.message('您不是参赛学生，请前往评阅')
      this.$router.push({
        name: 'apply',
      })
      return
      if (e === 1) {
        !this.scratchInfo.isApply && this.$router.push({
          name: 'apply',
          query: { id: this.scratchInfo.scheduleId }
        })
        if (this.scratchInfo.isApply && !this.scratchInfo.isJoin) {
          this.$router.push({
            name: 'submit',
            query: { id: this.scratchInfo.scheduleId }
          })
        }
        if (this.scratchInfo.isJoin) {
          this.$router.push({
            name: 'cards'
          })
        }
      } else if (e === 2) {
        !this.pythonInfo.isApply && this.$router.push({
          name: 'apply',
          query: { id: this.pythonInfo.scheduleId }
        })
        if (this.pythonInfo.isApply && !this.pythonInfo.isJoin) {
          this.$router.push({
            name: 'submit',
            query: { id: this.pythonInfo.scheduleId }
          })
        }
        if (this.pythonInfo.isJoin) {
          this.$router.push({
            name: 'cards'
          })
        }
      } else if (e === 3) {
        !this.otherInfo.isApply && this.$router.push({
          name: 'apply',
          query: { id: this.otherInfo.scheduleId }
        })
        if (this.otherInfo.isApply && !this.otherInfo.isJoin) {
          this.$router.push({
            name: 'submit',
            query: { id: this.otherInfo.scheduleId }
          })
        }
        if (this.otherInfo.isJoin) {
          this.$router.push({
            name: 'cards'
          })
        }
      }
    },
    toCardPage () {
      if (this.$tool.sessionGet('userType') !== '2') return this.$tool.message('您不是参赛选手')
      this.$router.push(
        {
          name: 'cards'
        }
      )
    },
    changTime () {
      let timer = setInterval(() => {
        // let leftTime =( new Date(2019,11,25,22,0,0).getTime())-(new Date())
        let leftTime = (new Date(2019, 11, 25, 22, 0, 0).getTime()) - (new Date())
        let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10)
        let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10)
        let minutes = parseInt(leftTime / 1000 / 60 % 60, 10)
        let seconds = parseInt(leftTime / 1000 % 60, 10)
        this.countdown = `${days}天${hours}小时${minutes}分钟${seconds}秒`
        if (leftTime <= 0) {
          this.countdown = '报名已截止'
          clearInterval(timer)
        }
      }, 1000)
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
    close (bool) {
      this.dialogVisible = false
      this.flag = bool
    },
    async initPage () {
      this.$tool.sessionGet('userType') && (this.flag = true)
      !this.$tool.sessionGet('userType') && (this.flag = false)
      if (!this.$tool.sessionGet('accessToken')) return
      const res = await getInfo('204799291707887616')
      if (res.code !== 200) return this.$tool.messageError(res.message)
      this.info = res.result
      this.info.forEach(item => {
        if (item.scheduleId === '205049089165889536') {
          this.scratchInfo = item
        } else if (item.scheduleId === '206139175110447104') {
          this.pythonInfo = item
        } else if (item.scheduleId === '206139304429228032') {
          this.otherInfo = item
        }
      })
    },
    login () {
      this.dialogVisible = true
    },
    async getInfo () {
      const res = await getInfo('204799291707887616')
      if (res.code !== 200) return this.$tool.messageError(res.message)
      this.info = res.result
      this.info.forEach(item => {
        if (item.scheduleId === '205049089165889536') {
          this.scratchInfo = item
        } else if (item.scheduleId === '206139175110447104') {
          this.pythonInfo = item
        } else if (item.scheduleId === '206139304429228032') {
          this.otherInfo = item
        }
      })
    },
    logOut () {
      this.$tool.sessionRem('userType')
      this.$tool.sessionRem('accessToken')
    },
    handleCommand (command) {
      if (command === 'a') {
        this.$tool.sessionRem('userType')
        this.$tool.sessionRem('accessToken')
        location.reload()
      }
    },
    async tip () {
      return this.$tool.message('评审时间已过,您无法进行评审！')
      if (!this.$tool.sessionGet('userType')) return this.$tool.message('请先登录')
      if (this.$tool.sessionGet('userType') !== '1') return this.$tool.message('您不是老师')
      const res = await getMatchItem()
      if (res.code !== 200) return this.$tool.messageError(res.message)
      if (res.result.length === 0) return this.$tool.message('您没有可评阅的作品')
      console.log(res)
      this.$router.push({ name: 'assess' })
    },
    changeSize () {
      window.onload = () => {
        this.carouselsHeight = document.documentElement.clientWidth*635/1920 + 'px'
      }
      window.onresize = () => {
        this.carouselsHeight =document.documentElement.clientWidth*635/1920 + 'px'
      }
    }
  }
}
</script>

<style lang="scss" >
  .dialog_box{
    .el-dialog{
      border-radius: 40px;
    }
    .el-dialog__header{
      padding: 0;
    }
    .el-dialog__body{
      padding: 0;
      border-radius: 40px;
    }
  }
  .wrapper{
    /*background-color: #ff78a0;*/
  }
  .competition{
    .banner_wrapper{
      position: relative;
      .banner_header{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        font-size: 0.4rem;
        .match1{
          margin-left: 1.4rem;
          margin-right: 1.7rem;
          position: relative;
          top: -6px;
        }
      }
    }
    .el-carousel__item img{
      width: 100%;
    }
    /deep/ .el-dialog{
      height: 12rem;
      width: 10rem;
    }
    .competition{
      width: 100%;
      background-size: cover;
      background-color: #f2f2f2;
    }
    .toptool{
      width: 100%;
      background-size: 100%;
      display: flex;
      flex-direction: column;
    }
    .match_title{
      margin-bottom: 0.7rem;
    }
    .title{
      margin-top: 1rem;
      text-align: center;
      color: #EDAA2C;
      font-weight:bold;
      span{
        position: relative;
        top: -15px;
        font-size: 34px;
        margin: 0 8px ;
      }
    }

    .enlistTime{
      width: 100%;
      text-align: center;
      margin-top: 0.4rem;
      position: relative;
      img{
        width: 100%
      }
      .enlistTime_info{
        font-size: 0.7rem;
        color:rgba(241,175,50,1);
        font-weight:bold;
        position: absolute;
        left: 50%;
        top: 1.2rem;
        transform: translateX(-50%);
        width: 100%;
      }
      &>div{
        width: 6.32rem;
        height: 1.84rem;
        background: url('../assets/enlist.png') no-repeat ;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-15%);
        color:#FFFFFF;
        text-shadow:0 1px 2px rgba(9,9,9,0.2);
        p{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          font-size: 0.5rem;
          line-height: 1.84rem;
          width: 100%;
          /*color: black;*/
        }
      }
    }
    .text{
      width: 100%;
      text-align: center;
      margin-top: 1rem;
      img{
        width: 100%
      }
    }
    .tab{
      margin-top: 1rem;
      display: flex;
      div{
        flex:1;
        position: relative;
        text-align: center;
        img {
          width: 40%;
          position: relative;
          top: 16px;
        }
        span{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          color:#fff;
          font-size: 0.6rem;
          font-weight: bold ;
          color:rgba(237,170,44,1);
          text-shadow:0 3px 3px rgba(9,9,9,0.2);
          img{
            width: 120px;
            position: relative;
            top: 0.2rem;
          }
        }
      }
    }
    .btnColumn{
      width: 100%;
      margin-top: 1rem;
      margin-bottom: 0.9rem;
      .titleBar{
        position: relative;
        img{
          width: 80%;
        }
        span{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          color: #fccf03;
          font-size: 1rem;
        }
      }
      .picture_item{
        height: 5.74rem;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        padding: 17px 17px ;
        background-color: rgba(255,255,255,1);
        box-shadow:0 0 5px 0 rgba(9,9,9,0.2);
        border-radius:6px;
        margin-bottom: 22px;
        justify-content: space-between;
        .picture_image{
          position: relative;
          width: 40%;
          img{
            width: 100%;
            height: 100%;
          }
          &>p:nth-child(2){
            position: absolute;
            top: 16%;
            left: 50%;
            color: #FFFFFF;
            font-size: 0.49rem;
            text-shadow:0 2px 2px rgba(0, 0, 0, 1);
            transform: translateX(-50%);
          }
          &>p:nth-child(3){
            position: absolute;
            top: 33%;
            color: #FFFFFF;
            text-shadow:0 2px 2px rgba(0, 0, 0, 1);
            width: 100%;
            text-align: center;
            font-size: 0.4rem;
            span{
              color: #f8bf53;
            }
          }
        }
        .picture_info{
          width: 55%;
          height: 100%;
          padding-top: 20px;
          .picture_title{
            display: flex;
            align-items: center;
            font-size: 0.5rem;
            color: #333333;
            text-align: center;
            justify-content: space-between;
            padding: 0 1rem;
            img{
              width: 25%;
            }
            span{
              margin: 0 0.6rem;
            }
          }
          .picture_body{
            margin-left: 2rem;
            p{
              margin: 0.5rem 0;
            }
            p:nth-child(1){
              font-size: 0.4rem;
              color: #666666;
            }
            p:nth-child(2){
              font-size: 15px;
              color: #090909;
            }
          }
          &>p{
            text-align: center;
            display: flex;
            justify-content: center;
            position: relative;
            span{
              display: block;
              width: 4.51rem;
              height:1rem;
              background-color: #F8BF53;
              text-align: center;
              color: #FFFFFF;
              text-shadow:0 1px 2px rgba(9,9,9,0.2);
              line-height: 1rem;
              font-size: 0.44rem;
              cursor: pointer;
              position: relative;
              box-shadow:0 0 5px 0 rgba(9,9,9,0.2);;
              border-radius: 6px;
            }
            span:after{
              content: "";
              width: 4.3rem;
              height: 0.8rem;
              position: absolute;
              top: 4px;
              left: 4px;
              border: 1px solid #fccf79;
              border-radius: 6px;
            }
          }
        }
      }
    }
    .footer_wrapper{
      background: url('../assets/footBg.png') no-repeat;
      height: 240px;
      padding-top: 73px;
      box-sizing: border-box;
      width: 100%;
      background-size: cover;
    }
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
        text-shadow:0 1px 2px rgba(0, 0, 0, 0.45);
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
              font-size: 22px;
            }
          }
          .box_info{
            font-size: 18px;
          }
        }
      }
      .qrcode{
        flex: 2;
        box-sizing: border-box;
        padding-left: 40px;
        text-align: right;
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
    /deep/ .el-row{
      padding: 0.5rem 0.2rem;
      margin-bottom: 0.2rem;
      &>div:nth-child(3){
        margin-right: 2.9em;
        &>span:nth-child(1){
          margin-right: 3.4em;
        }
        &>span:nth-child(2){
          margin-right: 3.4em;
        }
      }
    }
  }
</style>
