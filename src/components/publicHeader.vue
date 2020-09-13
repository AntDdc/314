<template>
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
              <el-dropdown-item    @click.native="revise" style="width:2rem;text-align:center">修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
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
  }
}
</script>

<style scoped>

</style>
