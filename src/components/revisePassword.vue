<template>
  <div>
<!--    <publicHeader></publicHeader>-->
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
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign" >
        <el-form-item label="原密码">
          <el-input v-model="formLabelAlign.oldPassword" auto-complete="new-password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="formLabelAlign.newPassword"  autocomplete="'off'" type="password" ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="formLabelAlign.makeSurePassword" auto-complete="new-password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div class="sure">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确认</el-button></div>
    </el-card>
  </div>
</template>

<script>
import { resetPassword } from '@/api/index'
import { publicHeader } from './publicHeader.vue'
export default {
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        newPassword: '',
        oldPassword: '',
        makeSurePassword: ''
      }
    };
  },
  methods: {
    async save () {
      if (this.formLabelAlign.newPassword !== this.formLabelAlign.makeSurePassword ) return this.$tool.messageError('新密码不一致')
      if (!this.formLabelAlign.newPassword || !this.formLabelAlign.makeSurePassword || !this.formLabelAlign.oldPassword) return this.$tool.messageError('请输入密码')
      let obj = {}
      obj.newPassword = this.formLabelAlign.newPassword
      obj.oldPassword = this.formLabelAlign.oldPassword
      const res = await resetPassword(obj)
      this.$tool.message('修改成功')
      this.$tool.sessionRem('userType')
      this.$tool.sessionRem('accessToken')
      this.$router.push({
        name:'home'
      })
    },
    cancel () {
      this.$router.go(-1)
    },
    revise () {
      this.$router.push({
        name:'revisePassword'
      })
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
  },
  components: {
    publicHeader
  }
}
</script>

<style scoped lang="scss">
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
.el-card{
  width: 587px;
  margin: 100px auto 0;
  .sure{
    display: flex;
    justify-content: center;
    button{
      margin-right: 20px;
    }
  }
}
</style>
