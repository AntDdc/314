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
                <el-dropdown-item command="a" style="width:2rem;text-align:center">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-row>
      </div>
    </div>
    <div v-if="list.length" style="margin: 1rem auto;width:22rem;">
        <list-card v-for="(item,index) in list" :key="index" :cardInfo='item' @toSubmit='toSubmit'></list-card>
    </div>
    <div v-else class="imgBox">
            <img src="../assets/123-.png" alt="" style='width:400px;'>
            <p style="text-align:center">暂无参赛记录哦～</p>
    </div>  
  </div>
</template>

<script>
import { getCards } from "@/api/index"
import listCard from '../components/listCard.vue'
export default {
  components: { listCard },
  data() {
    return {
        list: []
    };
  },
  mounted(){
      this._getCards()
  },
  methods: {
    handleCommand(command) {
      if (command === "a") {
        this.$tool.sessionRem("userType")
        this.$tool.sessionRem("accessToken")
        this.$router.push({
          name: "home"
        })
      }
    },
    toHome() {
      this.$router.push({
        name: "home"
      })
    },
    async _getCards () {
        const res = await getCards()
        console.log(res)
        if (res.code !== 200) return this.$tool.messageError(res.message)
        this.list = res.result        
    },
    toSubmit (item) {
      if (item.isJudged) return this.$tool.message('已评阅结束')
      if (!item.isJudged && item.isJoined) return this.$router.push({
        name: 'modifly',
        query: {
          id: item.scheduleId
        }
      })
      if(!item.isJudged && !item.isJoined) return this.$router.push({
        name: 'submit',
        query: {
          id: item.scheduleId
        }
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
  height: 1.5rem;
  background:linear-gradient(0deg,rgba(66,111,255,1),rgba(88,167,255,1));
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
.imgBox{
  text-align: center;
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>
