<template>
  <div class="loginBox">


    <!--账号登录-->
    <div class="flex_box" v-if="current=='login_a'">
      <div class="flex_left">
        <p>账号登录</p>
        <img src="../assets/bear.png" alt="">
      </div>
      <div class="flex_right">
        <p>欢迎您的加入</p>
        <p> — 每个孩子都有机会学习编程 —</p>
        <input type="text" id="loginTel" placeholder="请输入账号" v-model="sendData2.phoneNum">
        <div class="regexp">
          <input type="password" placeholder="输入密码" v-model="sendData2.pwd">
        </div>
        <p class="toLogin"><span @click="current='login'">手机号登录</span> <span @click="current='forget'">忘记密码</span></p>
        <input type="button" id="btnLogin" @click="_login_a" value="登录">
        <p class="toRegister">我还没有注册,现在<span @click="current='reg'">注册</span></p>
        <img src="../assets/topArrow.png" class="close" @click="closeDialog" alt="">
      </div>
    </div>



<!--    注册-->
    <div class=" flex_box" v-if="current=='reg'">
      <div class="flex_left">
        <p>注册</p>
        <img src="../assets/bear.png" alt="">
      </div>
      <div class="flex_right">
        <p>欢迎您的加入</p>
        <p>— 每个孩子都有机会学习编程 —</p>
        <input type="text" placeholder="请输入手机号" v-model="sendData1.phoneNum" id="tel">
        <div class="regexp">
          <input type="text" placeholder="输入验证码" v-model="sendData1.msg" >
          <span @click="sendMsg1" :disabled="isDisabled1">{{buttonName1}}</span>
        </div>
        <input placeholder="请输入密码" type="password" v-model="sendData1.pwd" class="makeSure">
        <p class="return" style="text-align: right" @click="current='login'">返回登录</p>
        <input type="button" value="注册" @click="_reg">
        <p class="toRegister">我还没有登录,现在<span @click="current='login'">登录</span></p>
        <img src="../assets/topArrow.png" class="close" @click="closeDialog" alt="">
      </div>
  </div>
<!--    手机登录-->
      <div class="flex_box" v-if="current=='login'">
        <div class="flex_left">
          <p>手机号登录</p>
          <img src="../assets/bear.png" alt="">
        </div>
        <div class="flex_right">
          <p>欢迎您的加入</p>
          <p> — 每个孩子都有机会学习编程 —</p>
          <input type="text" id="loginAccount" placeholder="请输入手机号" v-model="sendData.phoneNum">
          <div class="regexp">
            <input type="text" placeholder="输入验证码" v-model="sendData.msg">
            <span @click="sendMsg" :disabled="isDisabled">{{buttonName}}</span>
          </div>
          <p class="toLogin"><span @click="current='login_a'">账号登录</span> <span @click="current='forget'">忘记密码</span></p>
          <input type="button" id="btnAccount" @click="_login" value="登录">
          <p class="toRegister">我还没有注册,现在<span @click="current='reg'">注册</span></p>
          <img src="../assets/topArrow.png" class="close" @click="closeDialog" alt="">
        </div>
      </div>

<!--    密码找回-->
    <div class=" flex_box" v-if="current=='forget'" >
      <div class="flex_left">
        <p>密码找回</p>
        <img src="../assets/bear.png" alt="">
      </div>
      <div class="flex_right">
        <p id="resetting">—重置密码—</p>
        <input type="text" placeholder="请输入手机号" v-model="sendData3.phoneNum">
        <div class="regexp">
          <input type="text" placeholder="输入验证码" v-model="sendData3.msg">
          <span @click="sendMsg3">{{buttonName3}}</span>
        </div>
        <input  placeholder="请输入密码"  v-model="sendData3.pwd" type="password"  class="makeSure">
        <input placeholder="请再次确认密码"  v-model="sendData3.pwd_sure" type="password"  class="makeSure">
        <p class="return" style="text-align: right" @click="current='login'">返回登录</p>
        <input type="button" value="提交" @click="forget">
        <img src="../assets/topArrow.png" class="close" @click="closeDialog" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import { sendLoginSms, reg, forgetPWD, loginA, login } from '@/api/index'
export default {
  data () {
    return {
      sendData: {
        phoneNum: '',
        msg: '',
        pwd: '',
        pwd_sure: ''
      },
      sendData1: {
        phoneNum: '',
        msg: '',
        pwd: '',
        pwd_sure: ''
      },
      sendData2: {
        phoneNum: '',
        msg: '',
        pwd: '',
        pwd_sure: ''
      },
      sendData3: {
        phoneNum: '',
        msg: '',
        pwd: '',
        pwd_sure: ''
      },
      buttonName: '发送验证码',
      buttonName1: '发送验证码',
      buttonName3: '发送验证码',
      isDisabled: false,
      isDisabled1: false,
      isDisabled3: false,
      time: 60,
      time1: 60,
      time3: 60,
      current: 'login_a'
    }
  },
  methods: {
    closeDialog () {
      this.$emit('close')
    },
    async sendMsg () {
      if (this.sendData.phoneNum.length < 1) return this.$tool.messageError('请输入手机号')
      const res = await sendLoginSms(this.sendData.phoneNum)
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
    async sendMsg1 () {
      if (this.sendData1.phoneNum.length < 1) return this.$tool.messageError('请输入手机号')
      const res = await sendLoginSms(this.sendData1.phoneNum)
      if (res.code !== 200) return this.$tool.messageError('发送短信失败，请稍后重试')
      let me = this
      me.isDisabled1 = true
      let interval = window.setInterval(function () {
        me.buttonName1 = me.time1 + '秒后重新发送'
        --me.time1
        if (me.time1 < 0) {
          me.buttonName1 = '重新发送'
          me.time1 = 10
          me.isDisabled1 = false
          window.clearInterval(interval)
        }
      }, 1000)
    },
    async sendMsg3 () {
      if (this.sendData3.phoneNum.length < 1) return this.$tool.messageError('请输入手机号')
      const res = await sendLoginSms(this.sendData3.phoneNum)
      if (res.code !== 200) return this.$tool.messageError('发送短信失败，请稍后重试')
      let me = this
      me.isDisabled3 = true
      let interval = window.setInterval(function () {
        me.buttonName3 = me.time3 + '秒后重新发送'
        --me.time3
        if (me.time3 < 0) {
          me.buttonName3 = '重新发送'
          me.time3 = 10
          me.isDisabled3 = false
          window.clearInterval(interval)
        }
      }, 1000)
    },
    async _reg () {
      let sendData = {}
      sendData.mobile = this.sendData1.phoneNum
      sendData.code = this.sendData1.msg
      sendData.password = this.sendData1.pwd
      if (sendData.mobile.length < 1 || sendData.code.length < 1 || sendData.password.length < 1) return this.$tool.messageError('请填写必要信息')
      const res = await reg(sendData)
      if (res.code !== 200) return this.$tool.messageError(res.message)
      this.$tool.messageSuccess('注册成功，请前往登录')
      this.sendData1 = {
        phoneNum: '',
        msg: '',
        pwd: '',
        pwd_sure: ''
      }
      this.$emit('close')
    },
    async forget () {
      let sendData = {}
      sendData.mobile = this.sendData3.phoneNum
      sendData.code = this.sendData3.msg
      sendData.password = this.sendData3.pwd
      sendData.passStrength = this.sendData3.pwd_sure
      if (sendData.mobile.length < 1 || sendData.code.length < 1 || sendData.password.length < 1 || sendData.passStrength.length < 1) return this.$tool.messageError('请填写必要信息')
      const res = await forgetPWD(sendData)
      if (res.code !== 200) return this.$tool.messageError(res.message)
      this.$tool.messageSuccess('重置密码成功，请前往登录')
      this.sendData3 = {
        phoneNum: '',
        msg: '',
        pwd: '',
        pwd_sure: ''
      }
      this.$emit('close')
    },
    // 账号登录
    async _login_a () {
      let sendData = {}
      // console.log(this.sendData2.phoneNum)
      // console.log(this.sendData2.pwd)
      sendData.username = this.sendData2.phoneNum
      sendData.password = this.sendData2.pwd
      if (sendData.username.length < 1 || sendData.password.length < 1) return this.$tool.messageError('请填写必要信息')
      const res = await loginA(sendData)
      if (res.code !== 200) return this.$tool.messageError(res.message)
      this.$tool.sessionSet('userType', res.result.userType)
      this.$tool.sessionSet('accessToken', res.result.token)
      this.$tool.messageSuccess('登录成功')
      this.sendData2 = {
        phoneNum: '',
        msg: '',
        pwd: '',
        pwd_sure: ''
      }
      this.$emit('getInfo')
      this.$emit('close', true)
    },
    async _login () {
      let sendData = {}
      sendData.mobile = this.sendData.phoneNum
      sendData.code = this.sendData.msg
      if (sendData.mobile.length < 1 || sendData.code.length < 1) return this.$tool.messageError('请填写必要信息')
      const res = await login(sendData)
      if (res.code !== 200) return this.$tool.messageError(res.message)
      this.$tool.sessionSet('userType', res.result.userType)
      this.$tool.sessionSet('accessToken', res.result.token)
      this.$tool.messageSuccess('登录成功')
      this.sendData = {
        phoneNum: '',
        msg: '',
        pwd: '',
        pwd_sure: ''
      }
      this.$emit('getInfo')
      this.$emit('close', true)
    }
  }
}
</script>

<style lang="scss" scoped>
  .flex_box{
    display: flex;
    width: 100%;
    .flex_left{
      background-color:rgba(251,191,76,0.06);;
      height: 600px;
      width: 420px;
      padding-top: 96px;
      box-sizing: border-box;
      p{
        font-size: 32px;
        color: #7F5533;
        text-align: center;
      }
      img{
        margin-left: 63px;
        margin-top: 57px;
        margin-right: 57px;
      }
    }
    .flex_right{
      background-color: #FFFFFF;
      padding: 88px 127px 0 129px;
      box-sizing: border-box;
      width: 100%;
      border-radius:40px;
      position: relative;
      p{
        text-align: center;
      }
      p:nth-child(1){
        font-size: 34px;
        color: #7F5533;
        margin-bottom: 13px;
      }
      p:nth-child(2){
        font-size: 18px;
        color:  #7F5533;
      }
      input{
        width: 100%;
        border-radius: 24px;
        border: none;
        outline: none;
        height: 48px;
      }
      input::-webkit-input-placeholder{
        color: #999999;
      }
      input[type="text"]{
        border: 1px solid #DCDCDC;
        margin: 15px 0;
        padding-left: 20px;
        box-sizing: border-box;
      }
      input[type="password"]{
        border: 1px solid #DCDCDC;
        margin: 15px 0;
        padding-left: 20px;
        box-sizing: border-box;
      }
      input[type="button"]{
         background:rgba(127,85,51,0.9);;
        color: #FFFFFF;
        margin: 10px 0;
        cursor: pointer;
        font-size: 20px;
      }
      .regexp{
        position: relative;
        span{
          position: absolute;
          top: 30px;
          right: 14px;
          font-size: 14px;
          color: #7F5533;
          cursor: pointer;
        }
      }
      .return{
        color: #7F5533;
        cursor: pointer;
        padding-right: 5px;
      }
      .toRegister{
        font-size: 18px;
        color: #999999;
        span{
          cursor: pointer;
          color:  #7F5533;
        }
      }
    /*  login */
      .toLogin{
        display: flex;
        justify-content: space-between;
        color: #7F5533;
        font-size: 16px;
        span{
          cursor: pointer;
        }
      }
      #btnLogin{
        margin: 20px 0;
      }
      #loginTel{
        margin-top: 40px;
      }
      /*重置密码*/
      #resetting{
        font-size: 30px;
      }
      /*关闭箭头*/
      .close{
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
      }
      .makeSure{
        border: 1px solid #DCDCDC;
        margin: 11px 0;
        padding-left: 20px;
        box-sizing: border-box;
      }
      #tel{
        margin-top: 23px;
      }
      /*账号登录*/
      #loginAccount{
        margin-top: 40px;
      }
      #btnAccount{
        margin: 20px 0;
      }
    }
  }

</style>
