<template>
  <div style="background-color:#e5e5f7;height:100%;width:100%;position:relative">
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
                <el-dropdown-item    @click.native="revise" style="width:2rem;text-align:center">修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-row>
      </div>
    </div>
    <div class="formBox">
      <div class="form">
        <div class="title">报名参赛</div>
        <el-form label-width="2rem">
          <el-form-item label="组别">
            <el-select v-model="sendData.groupId" placeholder="请选择组别" style="width:100%;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="姓名">
              <el-input type='text' placeholder="请输入姓名" v-model="sendData.contestantName"></el-input>
          </el-form-item>
          <!-- <el-form-item label="联系方式">
              <el-input type="text" placeholder="请输入联系方式" v-model="sendData.contact"></el-input>
          </el-form-item>
          <el-form-item label="验证码" class="par">
            <el-input type="text" placeholder="请输入验证码" v-model='sendData.code'></el-input>
            <el-button @click="sendMsg" :disabled="isDisabled" class="right">{{buttonName}}</el-button>
          </el-form-item> -->
          <el-form-item label="活动地区">
              <city :selected="selected" @change="change"/>
          </el-form-item>
          <el-form-item label="学校">
              <el-input type="text" placeholder="请输入学校名称" v-model="sendData.school"></el-input>
          </el-form-item>
          <el-form-item label="所在年级">
              <el-select v-model="sendData.grade" placeholder="请选择年级" style="width:100%;">
              <el-option
                v-for="item in gradeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <div style="margin-left:2rem;" class="clearfix">
            <el-button class="fl" style="width:40%;background-color:#fff;color:#000;border-color:#ccc" @click="_back">返回</el-button>
            <el-button class="fr" style="width:40%;background-color:#120fb7;color:#fff" @click="_apply">提交</el-button>
          </div>
        </el-form>
      </div>
    </div>
<!--    <div class="footer_wrapper">-->
<!--      <div class="foot " style="width: 70%;margin: 0 auto">-->
<!--        <div class="link">-->
<!--          <div class="box">-->
<!--            <div class="top">-->
<!--              <span @click="toPage(1)">关于我们</span>-->
<!--              <span @click="toPage(2)">源码熊</span>-->
<!--              <span @click="toPage(3)">源码教室</span>-->
<!--            </div>-->
<!--            <div class="box_info">-->
<!--              深圳三点一四教育科技有限公司 / 粤ICP备18155800号-2-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="zw"></div>-->
<!--        <div class="qrcode">-->
<!--          <img src="../assets/barcode1.png" alt="">-->
<!--          <img src="../assets/barcode2.png" alt="">-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import city from '@/components/city/index.vue'
import { getGroup, postApply, getGrade, sendLoginSms } from '@/api/index'
export default {
  components: { city },
  data () {
    return {
      value: '',
      options: [],
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
    revise () {
      this.$router.push({
        name:'revisePassword'
      })
    },
    async sendMsg () {
      if (this.sendData.contact.length < 1) return this.$tool.messageError('请输入手机号')
      const res = await sendLoginSms(this.sendData.contact)
      if (res.code !== 200) return this.$tool.messageError('发送短信失败，请稍后重试')
      let me = this
      me.isDisabled = true
      let interval = window.setInterval(function () {
        me.buttonName = me.time + '秒后重新发送'
        --me.time
        if (me.time < 0) {
          me.buttonName = '重新发送'
          me.time = 10
          me.isDisabled = false
          window.clearInterval(interval)
        }
      }, 1000)
    },
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
    async initGroup () {
      const res = await getGroup(this.id)
      if (res.code !== 200) return this.$tool.messageError(res.message)
      res.result.forEach(item => {
        this.options.push({
          value: item.id,
          label: item.name
        })
      })
      const result = await getGrade()
      if (result.code !== 200) return this.$tool.messageError(res.message)
      result.result.forEach(item => {
        this.gradeOptions.push({
          value: item.value,
          label: item.title
        })
      })
    },
    _apply () {
      let send = this.$tool.obCopy(this.sendData)
      // if (!send.groupId || !send.contestantName || !send.contact || !send.location || !send.school || !send.grade || !send.code) return this.$tool.messageError('请填写必填信息')
      if (!send.groupId || !send.contestantName || !send.location || !send.school || !send.grade) return this.$tool.messageError('请填写必填信息')

      send.mobile = send.contact
      let groupName = ''
      this.options.forEach(item => {
        if (item.value === send.groupId) {
          groupName = item.label
        }
      })
      this.$confirm(`您已选择${groupName}，确认报名后，组别将不可被更改。`, '提示', {
        confirmButtonText: '我选好了',
        cancelButtonText: '再想想',
        type: 'warning'
      }).then(() => {
        postApply(send).then(res => {
          if (res.code !== 200) return this.$tool.messageError(res.message)
          this.$tool.messageSuccess(res.message)
          return this.$router.push({
            name: 'submit',
            query: {
              id: this.id
            }
          })
        })
      }).catch(() => {
      })
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

<style lang="scss" scoped>
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
  height: 13.6rem;
  background-color: #fff;
  border-radius: 8px;
  margin: 0.8rem auto 0;
  .form {
    width: 10.32rem;
    height: 8.64rem;
    margin: 80px auto 0;
    padding-top: 44px;
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
  position: absolute;
  bottom: 0;
  left: 0;
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
